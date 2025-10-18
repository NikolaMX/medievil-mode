var newBuild = {



   

    


    //Mages
    "/pa/units/medieval/infantry/mage/mage.json": ["m_factory", 0, { row: 2, column: 1 }],
    "/pa/units/medieval/infantry/firemage/firemage.json": ["m_factory", 0, { row: 2, column: 2 }],
    "/pa/units/medieval/infantry/fogmage/fogmage.json": ["m_factory", 0, { row: 2, column: 3 }],
    "/pa/units/medieval/infantry/darkmage/darkmage.json": ["m_factory", 0, { row: 2, column: 4 }],
    "/pa/units/medieval/infantry/ghostmage/ghostmage.json": ["m_factory", 0, { row: 2, column: 5 }],

    //Infantry
    "/pa/units/medieval/infantry/sword_dox/sword_dox.json": ["i_factory", 0, { row: 2, column: 1 }],
    "/pa/units/medieval/infantry/axe_dox/axe_dox.json": ["i_factory", 0, { row: 2, column: 2 }],
    "/pa/units/medieval/infantry/mace/mace.json": ["i_factory", 0, { row: 2, column: 3 }],          
    "/pa/units/medieval/infantry/pike/pike.json": ["i_factory", 0, { row: 2, column: 4 }],
    "/pa/units/medieval/infantry/zweihander/zweihander.json": ["i_factory", 0, { row: 2, column: 5 }],


    "/pa/units/medieval/infantry/ghsot/ghost.json": ["i_factory", 0, { row: 2, column: 6 }],
    "/pa/units/medieval/infantry/shield/shield.json": ["i_factory", 0, { row: 2, column: 7 }],
    "/pa/units/medieval/infantry/assassin/assassin.json": ["i_factory", 0, { row: 2, column: 8 }],
    "/pa/units/medieval/infantry/dual_sword/dual_sword.json": ["i_factory", 0, { row: 2, column: 9 }],
    "/pa/units/medieval/infantry/sword_light/sword_light.json": ["i_factory", 0, { row: 2, column: 10 }],



    //Archers
    "/pa/units/medieval/infantry/axe_thrower/axe_thrower.json": ["a_factory", 0, { row: 2, column: 0 }],
    "/pa/units/medieval/infantry/javelin/javelin.json": ["a_factory", 0, { row: 2, column: 1 }],
    "/pa/units/medieval/infantry/recurve/recurve.json": ["a_factory", 0, { row: 2, column: 2 }],
    "/pa/units/medieval/infantry/crossbow/crossbow.json": ["a_factory", 0, { row: 2, column: 3 }],
    "/pa/units/medieval/infantry/longbow/longbow.json": ["a_factory", 0, { row: 2, column: 4 }],


    //Cavalry
    "/pa/units/medieval/cavalry/light_cav/light_cav.json": ["c_factory", 0, { row: 2, column: 1 }],
    "/pa/units/medieval/cavalry/heavy_cav/heavy_cav.json": ["c_factory", 0, { row: 2, column: 2 }],
    "/pa/units/medieval/cavalry/recurve_cav/recurve_cav.json": ["c_factory", 0, { row: 2, column: 3 }],


    //Beasts
    "/pa/units/medieval/cavalry/hound/hound.json": ["b_factory", 0, { row: 2, column: 0 }],
    "/pa/units/medieval/cavalry/spider/spider.json": ["b_factory", 0, { row: 2, column: 1 }],
    "/pa/units/medieval/cavalry/gorilla/gorilla.json": ["c_factory", 0, { row: 2, column: 2 }],
    "/pa/units/medieval/cavalry/gorilla_big/gorilla_big.json": ["c_factory", 0, { row: 2, column: 3 }],
    "/pa/units/medieval/cavalry/snake/snake.json": ["c_factory", 0, { row: 2, column: 4 }],
    "/pa/units/medieval/cavalry/mini_snake/mini_snake.json": ["c_factory", 0, { row: 2, column: 5 }],
    "/pa/units/medieval/cavalry/goliath/goliath.json": ["c_factory", 0, { row: 2, column: 6 }],
    "/pa/units/medieval/cavalry/crossbow_bear/crossbow_bear.json": ["c_factory", 0, { row: 2, column: 7 }],
    "/pa/units/medieval/cavalry/pumpkin/pumpkin.json": ["c_factory", 0, { row: 2, column: 8 }],
    "/pa/units/medieval/cavalry/bugsniper/bugsniper.json": ["c_factory", 0, { row: 2, column: 8 }],



    //Flying
    "/pa/units/medieval/flying/eagle/eagle.json": ["f_factory", 0, { row: 2, column: 1 }],
    "/pa/units/medieval/flying/creep/creep.json": ["f_factory", 0, { row: 2, column: 2 }],


    //Structures
    "/pa/units/medieval/structures/mana_shrine/mana_shrine.json": ["c_build", 0, { row: 2, column: 3 }],
    "/pa/units/medieval/structures/spawn8/spawn8.json": ["c_build", 0, { row: 2, column: 5 }],
    "/pa/units/medieval/structures/spawn_cav/spawn_cav.json": ["c_build", 0, { row: 2, column: 4 }],


}
if (Build && Build.HotkeyModel && Build.HotkeyModel.SpecIdToGridMap) {
    _.extend(Build.HotkeyModel.SpecIdToGridMap, newBuild);
}
