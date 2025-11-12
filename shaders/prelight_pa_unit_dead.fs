#version 140

// prelight_pa_unit_dead.fs

#include "prelight_include.fs"

uniform vec4 GBufferDepth_range;

uniform vec3 TeamColor_Primary;
uniform vec3 TeamColor_Secondary;

uniform vec4 BuildInfo; // vec4(frac,age,radius,height)

uniform sampler2D DiffuseTexture;
uniform sampler2D MaskTexture;
uniform sampler2D GrimeTexture; // This is now your 4096px wide texture with 4 horizontal sections

in vec2 v_TexCoord;
in vec3 v_Forward;
in vec3 v_Normal;

out vec4 out_FragData[4];

// Enum-like defines for mirroring type
#define MIRROR_MIN 0
#define MIRROR_MAX 1
#define MIRROR_NONE 2 // Option to disable mirroring if not desired for a faction

// Generic wreckage main function to handle texture atlas selection
// u_offset: The starting U-coordinate of the faction's texture section (e.g., 0.0, 0.25, 0.5, 0.75)
// u_scale: The width of a single texture section in normalized U-coordinates (e.g., 0.25 for 4 textures)
// mirror_type: 0 for min mirroring (MLA-like), 1 for max mirroring (Bug-like)
void wreckageMain(float u_offset, float u_scale, int mirror_type)
{
    vec2 tc = v_TexCoord;

    vec4 diffuse_raw = texture(DiffuseTexture, tc);
    vec4 mask = texture(MaskTexture, tc);

    // Apply the scaling and offset specific to this faction's texture section
    // v_TexCoord.x is scaled by u_scale, v_TexCoord.y uses full 0-1 range (hence 1.0)
    vec2 noise_tc = tc * vec2(u_scale, 1.0) + vec2(u_offset, 0.0);

    // Ensure the U coordinate wraps
    // This mod is essential to keep the coordinate within [0, 1) before mirroring
    noise_tc.x = mod(noise_tc.x, 1.0);

    // Apply mirroring based on type
    if (mirror_type == MIRROR_MIN) {
        noise_tc.x = min(noise_tc.x, 1.0 - noise_tc.x);
    } else if (mirror_type == MIRROR_MAX) {
        noise_tc.x = max(noise_tc.x, 1.0 - noise_tc.x);
    }
    // If MIRROR_NONE, no mirroring is applied, just wrapping.


    vec3 noise = texture(GrimeTexture, noise_tc).rgb;
    vec3 viewNormal = normalize(v_Normal);

    float specularMask = 0.0;
    float specularExp = 0.0;
    float emissive = mask.b; // Assuming emissive info is in the blue channel of the mask

    vec3 weight = vec3(0.299, 0.587, 0.114); // Standard luminance weights
    float lum = dot(diffuse_raw.rgb, weight);

    float base = lum * (1.0 - emissive);

    // Complex diffuse calculation applying the noise for wreckage effect
    vec3 diffuse = clamp(2.0 * base, 0.0, 1.0) * (1.0 - 2.0 * (1.0 - clamp(base, 0.5, 1.0)) * (1.0 - noise));

    vec3 ambientColor = calcAmbient(viewNormal, v_Forward);
    vec3 ambient = ambientColor * diffuse.rgb;

    // Output to GBuffer
    out_FragData[0] = vec4(ambient, 1.0);
    out_FragData[1] = vec4(diffuse.rgb, specularMask);
    // Depth buffer (length of view vector scaled by range)
    out_FragData[2] = vec4(length(v_Forward) * GBufferDepth_range.z - GBufferDepth_range.w, 0.0, 0.0, 1.0);
    // Encoded view normal and specular exponent
    out_FragData[3] = vec4(encodeViewNormal(viewNormal), encodeSpecularExp(specularExp));
}

// Original MLA-style wreckage handling
// If you want MLA to explicitly use the first 0.25 section of your 4096 texture,
// and you want it to use MIRROR_MIN, you would replace this entire function call
// with wreckageMain(0.0, 0.25, MIRROR_MIN); inside the main() else block.
void mlaMain()
{
    vec2 tc = v_TexCoord;

    vec4 diffuse_raw = texture(DiffuseTexture, tc);
    vec4 mask = texture(MaskTexture, tc);

    float wire_width = BuildInfo.y; // Assuming BuildInfo.y is relevant for MLA scaling
    vec2 noise_tc = tc * wire_width / 24.0;
    noise_tc += vec2(BuildInfo.x * 0.0121, BuildInfo.x * 0.0749); // Animated offset

    noise_tc.x = mod(noise_tc.x, 1.0); // Wrap U coordinate
    noise_tc.x = min(noise_tc.x, 1.0 - noise_tc.x); // MLA uses min for mirroring

    vec3 noise = texture(GrimeTexture, noise_tc).rgb;
    vec3 viewNormal = normalize(v_Normal);

    float specularMask = 0.0;
    float specularExp = 0.0;
    float emissive = mask.b;

    vec3 weight = vec3(0.299, 0.587, 0.114);
    float lum = dot(diffuse_raw.rgb, weight);

    float base = lum * (1.0 - emissive);

    vec3 diffuse = clamp(2.0 * base, 0.0, 1.0) * (1.0 - 2.0 * (1.0 - clamp(base, 0.5, 1.0)) * (1.0 - noise));

    vec3 ambientColor = calcAmbient(viewNormal, v_Forward);
    vec3 ambient = ambientColor * diffuse.rgb;

    out_FragData[0] = vec4(ambient, 1.0);
    out_FragData[1] = vec4(diffuse.rgb, specularMask);
    out_FragData[2] = vec4(length(v_Forward) * GBufferDepth_range.z - GBufferDepth_range.w, 0.0, 0.0, 1.0);
    out_FragData[3] = vec4(encodeViewNormal(viewNormal), encodeSpecularExp(specularExp));
}

// Main entry point of the fragment shader
void main()
{
    // Get the dimensions of the DiffuseTexture
    ivec2 size2 = textureSize(DiffuseTexture, 0);
    // Fetch the texel (pixel) from the top-right corner of the DiffuseTexture
    vec4 tex = texelFetch(DiffuseTexture, ivec2(size2.x-1, 0), 0);

    // Faction determination based on the color of the top-right pixel
    // Each 'else if' block checks for a specific color dominance.

    // Bugs Faction: Predominantly Green top-right pixel
    if (tex.g > tex.b * 1.5 && tex.g > tex.r * 1.5) {
        // Bugs texture is the 2nd of 4 sections (U-range 0.25 to 0.50)
        // Uses MIRROR_MAX as per original bugMain behavior
        wreckageMain(0.25, 0.25, MIRROR_MAX);
    }
    // Spiders Faction: Predominantly Red top-right pixel
    else if (tex.r > tex.g * 1.5 && tex.r > tex.b * 1.5) {
        // Spiders texture is the 3rd of 4 sections (U-range 0.50 to 0.75)
        // Using MIRROR_MAX for consistency with Bug faction, can be changed.
        wreckageMain(0.50, 0.25, MIRROR_MAX);
    }
    // Arcane Faction: Predominantly Blue top-right pixel
    else if (tex.b > tex.g * 1.5 && tex.b > tex.r * 1.5) {
        // Arcane texture is the 4th of 4 sections (U-range 0.75 to 1.00)
        // Using MIRROR_MAX for consistency with Bug faction, can be changed.
        wreckageMain(0.75, 0.25, MIRROR_MAX);
    }
    // Default Faction (MLA): If none of the above conditions are met
    else {
        // If you want MLA to explicitly use the first 0.25 section of your 4096 texture,
        // AND use the MLA-style min mirroring, use this:
        wreckageMain(0.0, 0.25, MIRROR_MIN);
        // If you want to revert to the original mlaMain function, use this:
        // mlaMain();
    }
}