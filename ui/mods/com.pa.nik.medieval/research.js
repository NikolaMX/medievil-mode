/**
 * This file controls locking/unlocking units even when a scenario is not picked
 */


model.unitsToCommand = [["/pa/units/structure/control_node/portal/portal_charging.json", "altFireSelf"]]

//hardcoded locks, research packs can add to this by appending to it, units that have been locked will be removed, ensures units stay locked on resets

model.unitsToLock = [
    //Cabal Initial Factories
                    "/pa/units/medieval/structures/factory_infantry/factory_infantry_c.json",
                    "/pa/units/medieval/structures/factory_ranged/factory_ranged_c.json",
                    "/pa/units/medieval/structures/factory_cav/factory_cav_c.json",
    //Cabal Infantry
                    "/pa/units/medieval/infantry/sword_dox/sword_dox.json",           
                    "/pa/units/medieval/infantry/assassin/assassin.json",
                    "/pa/units/medieval/infantry/assassin/assassin_upg.json",
                    "/pa/units/medieval/infantry/axe_dox/axe_dox.json",
                    "/pa/units/medieval/infantry/axe_dox/axe_dox_upg.json",
    //Cabal Archers
                    "/pa/units/medieval/infantry/crossbow/crossbow.json",
                    "/pa/units/medieval/infantry/axe_thrower/axe_thrower.json",
                    "/pa/units/medieval/infantry/longbow/longbow_c_upg.json",
    //Cabal Cav
                    "/pa/units/medieval/cavalry/gorilla/gorilla.json",
                    "/pa/units/medieval/cavalry/gorilla_big/gorilla_big.json",
                    "/pa/units/medieval/cavalry/crossbow_bear/crossbow_bear.json",
                    "/pa/units/medieval/cavalry/burrow_bear/burrow_bear.json",


    //Cabal Advanced Buildings
                    "/pa/units/medieval/structures/arcmage_tower/arcmage_tower_c.json",
                    "/pa/units/medieval/structures/blood_shrine/blood_shrine.json",
                    "/pa/units/medieval/structures/spectral_shrine/spectral_shrine.json",
                    "/pa/units/medieval/structures/lair/lair.json",
                    "/pa/units/medieval/structures/witch_hut/witch_hut.json",


    //Cabal Spiders
                    "/pa/units/medieval/cavalry/big_spider/big_spider.json",
                    "/pa/units/medieval/cavalry/jumping_spider/jumping_spider.json",
                    "/pa/units/medieval/flying/creep/creep.json",
    //Cabal SpiderWeb
                    "/pa/units/medieval/structures/web_mine/web_mine.json",


    //Spider Research
                    "/pa/units/medieval/research/cabal/spiders/spiders_t2.json",
                    "/pa/units/medieval/research/cabal/spiders/spiders_t3.json",
    //Cabal Cav Research
                    "/pa/units/medieval/research/cabal/cavalry/gorilla_t2.json",
                    "/pa/units/medieval/research/cabal/cavalry/snake.json",
    //Cabal Ranged Research
                    "/pa/units/medieval/research/cabal/ranged/ranged_t2.json",
                    "/pa/units/medieval/research/cabal/ranged/ranged_t3.json",

    //Cabal Stealth/Infantry Research
                    "/pa/units/medieval/research/cabal/infantry/assassin.json",
                    "/pa/units/medieval/research/cabal/cavalry/burrow_bear.json",

    //Cabal Pumpkins
                    "/pa/units/medieval/cavalry/pumpkin/pumpkin.json",
    //Cabal Dark Mages
                    "/pa/units/medieval/flying/witch/witch.json",
    //Cabal Ghosts
                    "/pa/units/medieval/infantry/phantom/phantom.json",
    //Cabal Snakes
                    "/pa/units/medieval/cavalry/snake/snake.json",
                    "/pa/units/medieval/cavalry/mini_snake/mini_snake.json",
                    ];

//tracks locked units
model.lockedUnits = [];

//hardcoded pairs, can be added to by research packs by appending, format is [[researchfactoryunit,[unitsToUnlock],[unitToLock],replaceLockedUnitsBool]

//with the addition of replacing units queued I think I will have it be default as the only edge case is research which I will just not track

//to combo replace/lock have locked units be on the end of the unitsToLock array and not match up numerically with the unitsToUnlock array

//issue when I want to unlock a unit + replace another so need to double up on the unlock

model.unlockPairs = [

    //alpha grunt
    ["/pa/units/medieval/infantry/axe_dox/axe_dox.json",//trigger unit
    ["/pa/units/medieval/infantry/sword_dox/sword_dox.json"],//units added
    ["/pa/units/medieval/infantry/sword_light/sword_light.json", "/pa/units/medieval/infantry/axe_dox/axe_dox.json"],//units replaced/locked
    true],//is a replace rather than just locks

     
     //Cabal Initial Factories
    ["/pa/units/medieval/structures/spawn8/spawn8.json",
    ["/pa/units/medieval/structures/factory_infantry/factory_infantry_c.json",
    "/pa/units/medieval/structures/factory_ranged/factory_ranged_c.json"
                ],
    [],
    false],

 //Cabal Axe
    ["/pa/units/medieval/research/cabal/infantry/axe.json",
    ["/pa/units/medieval/infantry/axe_dox/axe_dox.json",
    "/pa/units/medieval/infantry/axe_thrower/axe_thrower.json",
    "/pa/units/medieval/research/cabal/infantry/assassin.json"
                ],
    ["/pa/units/medieval/research/cabal/infantry/axe.json"],
    false],
//Cabal Assassin
["/pa/units/medieval/research/cabal/infantry/assassin.json",
    ["/pa/units/medieval/infantry/assassin/assassin.json",
        "/pa/units/medieval/research/cabal/cavalry/burrow_bear.json"
                ],
    ["/pa/units/medieval/research/cabal/infantry/assassin.json"],
    false],
//Cabal Burrow Bear
["/pa/units/medieval/research/cabal/cavalry/burrow_bear.json",
    ["/pa/units/medieval/cavalry/burrow_bear/burrow_bear.json",
                ],
    ["/pa/units/medieval/research/cabal/cavalry/burrow_bear.json"],
    false],



//Cabal Cav T1 
    ["/pa/units/medieval/research/cabal/cavalry/gorilla_t1.json",
    ["/pa/units/medieval/cavalry/gorilla/gorilla.json", 
        "/pa/units/medieval/structures/factory_cav/factory_cav_c.json",
        "/pa/units/medieval/research/cabal/cavalry/gorilla_t2.json"
                ],
    ["/pa/units/medieval/research/cabal/cavalry/gorilla_t1.json"],
    false],
//Cabal Cav T2
    ["/pa/units/medieval/research/cabal/cavalry/gorilla_t2.json",
    ["/pa/units/medieval/cavalry/gorilla_big/gorilla_big.json",
        "/pa/units/medieval/research/cabal/cavalry/snake.json"
                ],
    ["/pa/units/medieval/research/cabal/cavalry/gorilla_t2.json"],
    false],
//Cabal Cav T3
    ["/pa/units/medieval/research/cabal/cavalry/snake.json",
    ["/pa/units/medieval/cavalry/snake/snake.json"
                ],
    ["/pa/units/medieval/research/cabal/cavalry/snake.json"],
    false],

//Cabal Ranged T1
    ["/pa/units/medieval/research/cabal/ranged/ranged_t1.json",
    ["/pa/units/medieval/infantry/crossbow/crossbow.json",
        "/pa/units/medieval/research/cabal/ranged/ranged_t2.json"
                ],
    ["/pa/units/medieval/research/cabal/ranged/ranged_t1.json"],
    false],
//Cabal Ranged T2
    ["/pa/units/medieval/research/cabal/ranged/ranged_t2.json",
    ["/pa/units/medieval/cavalry/mini_snake/mini_snake.json",
        "/pa/units/medieval/research/cabal/ranged/ranged_t3.json"
                ],
    ["/pa/units/medieval/research/cabal/ranged/ranged_t2.json"],
    false],
//Cabal Ranged T3
    ["/pa/units/medieval/research/cabal/ranged/ranged_t3.json",
    ["/pa/units/medieval/cavalry/crossbow_bear/crossbow_bear.json"
                ],
    ["/pa/units/medieval/research/cabal/ranged/ranged_t3.json"],
    false],


     //Cabal Spiders T1
    ["/pa/units/medieval/research/cabal/spiders/spiders_t1.json",
    ["/pa/units/medieval/structures/lair/lair.json",
    "/pa/units/medieval/research/cabal/spiders/spiders_t2.json"
                ],
    ["/pa/units/medieval/research/cabal/spiders/spiders_t1.json"],
    false],
     //Cabal Spiders T2
    ["/pa/units/medieval/research/cabal/spiders/spiders_t2.json",
    ["/pa/units/medieval/cavalry/jumping_spider/jumping_spider.json",
        "/pa/units/medieval/structures/web_mine/web_mine.json",
        "/pa/units/medieval/research/cabal/spiders/spiders_t3.json"    
                ],
    ["/pa/units/medieval/research/cabal/spiders/spiders_t2.json"],
    false],
     //Cabal Spiders T3
    ["/pa/units/medieval/research/cabal/spiders/spiders_t3.json",
    ["/pa/units/medieval/flying/creep/creep.json",
        "/pa/units/medieval/cavalry/big_spider/big_spider.json"   
                ],
    ["/pa/units/medieval/research/cabal/spiders/spiders_t3.json"],
    false],


//=============UPGRADES==============

//Cabal

//Infantry
     //Swordsman -> Sword Dox Upgrade
    ["/pa/units/medieval/upgrades/cabal/infantry/sword_dox.json",
    ["/pa/units/medieval/infantry/sword_dox/sword_dox.json"    
                ],
    ["/pa/units/medieval/infantry/sword_light/sword_light_c.json", "/pa/units/medieval/upgrades/cabal/infantry/sword_dox.json"],
    true],

    //Assassin speed upgrade
     ["/pa/units/medieval/upgrades/cabal/infantry/assassin.json",
    ["/pa/units/medieval/infantry/assassin/assassin_upg.json"  
                ],
    ["/pa/units/medieval/infantry/assassin/assassin.json", "/pa/units/medieval/upgrades/cabal/infantry/assassin.json"],
    true],
    
//Axe respawn upgrade
     ["/pa/units/medieval/upgrades/cabal/infantry/axe.json",
    ["/pa/units/medieval/infantry/axe_dox/axe_dox_upg.json"
                ],
    ["/pa/units/medieval/infantry/axe_dox/axe_dox.json", "/pa/units/medieval/upgrades/cabal/infantry/axe.json"],
    true],
    


    //Longbow fire arrows
     ["/pa/units/medieval/upgrades/cabal/infantry/longbow.json",
    ["/pa/units/medieval/infantry/longbow/longbow_c_upg.json"  
                ],
    ["/pa/units/medieval/infantry/longbow/longbow_c.json", "/pa/units/medieval/upgrades/cabal/infantry/longbow.json"],
    true],           

]

//for circular research the older ones need to be deleted if a newer research is done.
model.deleteOldPairs = [

]

model.reLockUnits = function(){
    model.lockedUnits.forEach(function(unit){
       
        api.Panel.message("build_bar", 'lockUnit',unit)
      

    })
}
var hasPrinted = false;

model.unitCommand = function(unitId, unitState, commandType){
    if(hasPrinted == false){console.log(unitId,unitState,commandType);hasPrinted = true}
    if(commandType == "altFireSelf"){
        order = {
            units: [unitId],
            command: 'fire_secondary_weapon',
            location: {      
                planet: unitState.planet,
                multi_pos: [unitState.pos,unitState.pos]
            },                       
            queue: true
        }
        api.getWorldView(0).sendOrder(order);
    }
    else{return}
}

researchLoop = function(){
   
    model.unitsToLock.forEach(function(unit){
       
        api.Panel.message("build_bar", 'lockUnit',unit)
        model.lockedUnits.push(unit)

    })
    model.unitsToLock = []
    
    if(model.lockedUnits.length > 0){
       
        var armyPromise = model.allPlayerArmy(model.armyIndex())
        
        armyPromise.then(function(result){
            
            var armyKeys = _.keys(result)
            model.unitsToCommand.forEach(function(unitCommandArray){
                var unitSpec = unitCommandArray[0]
                var unitCommand = unitCommandArray[1]
                var unitDataPromise = api.getWorldView(0).getUnitState(result[unitSpec])
                unitDataPromise.then(function(ready){
     
                    for(var i = 0; i<ready.length;i++){
                        model.unitCommand(result[unitSpec][i],ready[i],unitCommand)
                    }

                })
            })
            model.unlockPairs.forEach(function(pair){
              
                
                if(_.contains(model.lockedUnits,pair[1][0])){//if the pair is not already unlocked
                
                 
                    if(_.contains(armyKeys,pair[0])){//unlock unit exists so unit should be unlocked
                      
                        var armyDataPromise = api.getWorldView(0).getUnitState(result[pair[0]])
                        armyDataPromise.then(function(result){
                       
                        if(result[0].built_frac == undefined){
                      
                       

                        //if the unlock should actually be a replace
                        if(pair[3] !== true){
                        pair[1].forEach(function(unit){
                            console.log("unlocking ",+unit)
                            api.Panel.message("build_bar", 'unlockUnit',unit)
                            api.Panel.message(api.panels["LiveGame_FloatZone"].id, 'unlockResearch', pair[0]);
                     
                        })
                        if(pair[2] !== undefined){
                            pair[2].forEach(function(unit){
                                console.log("locking ",+unit)
                                api.Panel.message("build_bar", 'lockUnit',unit)
                                model.lockedUnits.push(unit)
                            })

                        }}
                        else{
                            console.log("replacing units")
                            for(var i = 0; i< pair[2].length;i++){
                                if(pair[1][i] == pair[2][i] && pair[1][i] !== undefined){//needed for more unlocks combined with replace
                                    api.Panel.message("build_bar", 'unlockUnit',pair[1][i])
                                    api.Panel.message(api.panels["LiveGame_FloatZone"].id, 'unlockResearch', pair[0]);
                                }
                                else if(pair[1][i] !== undefined){//matching replace
                                 
                                    api.Panel.message("build_bar", 'replaceUnit',[[pair[2][i]],[pair[1][i]], pair[3]])
                                    api.Panel.message(api.panels["LiveGame_FloatZone"].id, 'unlockResearch', pair[0]);
                                }
                                else{//lock the pair 2 as it has no match
                                   
                                    //replace that sets the new unit to undefined as a way to cancel its build order
                                    api.Panel.message("build_bar", 'replaceUnit',[[pair[2][i]],[undefined], pair[3]])
                                    api.Panel.message("build_bar", 'lockUnit',pair[2][i])
                                    api.Panel.message(api.panels["LiveGame_FloatZone"].id, 'unlockResearch', pair[0]);
                                }
                            }
                        }



                        for(var i = 0;i<model.lockedUnits.length;i++){
                           // console.log(lockedUnits[i],pair[1])
                           pair[1].forEach(function(unit){
                            if(model.lockedUnits[i] == unit){
                                model.lockedUnits.splice(i,1)
                            }
                        })
                        
                     
                        
                           
                        }

                        }
                        })
                        
                    }
                    
                }
        
            })

        })
        
    }
    

    _.delay(researchLoop,1000)

}



_.delay(researchLoop,1000)


var world = api.getWorldView(0)

// the below is yoinked from scenarios, it is not really needed to be this complex for research


var unitJsons = model.unitSpecs//I think this has a list of unit keys that then have types

model.allPlayerArmy = function(playerId,unitType, stateFlag,unitTypeValue){
    var planets = model.planetListState()
    var promiseArray = [];
    for(planet in planets.planets){
        planet = planets.planets[planet]
        if(planet.id !== undefined || planet.id === 0){
            var chosenPlanet = planet.index;
        }
        else{continue}

        promiseArray.push(model.playerArmy(playerId, chosenPlanet,unitType, stateFlag,unitTypeValue))
    }
    var allPlanetArmyPromise = Promise.all(promiseArray)
    return allPlanetArmyPromise.then(function(result){
        var finalUnits = {};
        for(army in result){// for each player planet
            var armyKeys = _.keys(result[army])
           

            for(unit in armyKeys){//for each unit on a planet
              
                if(!(armyKeys[unit] in finalUnits)){finalUnits[armyKeys[unit]] = []};//if 
               
                
                for(i in result[army][armyKeys[unit]]){
                 
                    finalUnits[armyKeys[unit]].push(result[army][armyKeys[unit]][i])
                }
               
            
        }
    }
      
        return finalUnits;

    })

}
model.playerArmy = function(playerId, planetId,unitType, stateFlag,unitTypeValue){

    if(unitJsons == undefined){unitJsons = model.unitSpecs}
    var one = !_.isArray(unitType);
    if (one){
        unitType = [unitType];

    }
    var one = !_.isArray(unitTypeValue);
    if (one){
        unitTypeValue = [unitTypeValue];

    }

    var promise = new Promise(function(resolve,reject){

        if(world){

            if(stateFlag !== true){
                
            
                
                var promise2 = world.getArmyUnits(playerId,planetId).then(function (result){
                   
                   
                    if(unitType.length>0 && unitType[0] !== "" && unitType[0] !== undefined){
                 
                        var finalResult = {};
                        
                        for(var i = 0;i<unitType.length;i++){

                            finalResult[unitType[i]] = result[unitType[i]]

                        }
                       
                        result =  finalResult;
                    }
                
                    if(unitTypeValue.length>0 && unitTypeValue[0] !== "" && unitTypeValue[0] !== undefined){
                      
         
                        var finalResult = {};
                        var jsonKeys = _.keys(unitJsons)
                        for(var i = 0;i<jsonKeys.length;i++){
                            var matchedValue = 0;
                            for(var j = 0;j<unitTypeValue.length;j++){
                                
                                if(_.contains(unitJsons[jsonKeys[i]].types,unitTypeValue[j])){//check if each unit json contains every type in the value array
                                  
                                    //if(_.contains(unitJsons[jsonKeys[i]].types,"UNITTYPE_NoBuild")){continue}
                                    matchedValue++;
                             
                                }
                            }
                            
                           
                            if(matchedValue == unitTypeValue.length && result[jsonKeys[i]] !== undefined){finalResult[jsonKeys[i]] = result[jsonKeys[i]]}
                        }
                     
                        result = finalResult;

                    }
               

                    return result
                
                
                
                
                })
           
                resolve(promise2)
            
            
            
            }//TODO add unit filter here
    
            else{
         
                    var promise2 = world.getArmyUnits(playerId,planetId).then(function(result){ 
    
                    var unitArray = [];
                    
                    if(unitType.length>0 && unitType[0] !== "" && unitType[0] !== undefined){
                        
                        var finalResult = {};
                        
                        for(var i = 0;i<unitType.length;i++){

                            finalResult[unitType[i]] = result[unitType[i]]

                        }
                      
                        result =  finalResult;
                    }
                 
                    if(unitTypeValue.length>0 && unitTypeValue[0] !== "" && unitTypeValue[0] !== undefined){
         
                        var finalResult = {};
                        var jsonKeys = _.keys(unitJsons)
                        for(var i = 0;i<jsonKeys.length;i++){
                            var matchedValue = 0;
                            for(var j = 0;j<unitTypeValue.length;j++){
                                
                                if(_.contains(unitJsons[jsonKeys[i]].types,unitTypeValue[j])){//check if each unit json contains every type in the value array
                                    matchedValue++;
                             
                                }
                            }
                            if(matchedValue == unitTypeValue.length && result[jsonKeys[i]] !== undefined){finalResult[jsonKeys[i]] = result[jsonKeys[i]]}
                        }
                        result = finalResult;

                    }
                    
                    armyKeys = _.keys(result)
                    for(var i = 0;i<armyKeys.length;i++){
                        unitArray.push(result[armyKeys[i]])
                    }
                    unitArray = _.flatten(unitArray)
                   
                    return world.getUnitState(unitArray).then(function (ready) {
                        var unitData = this.result;
                        var one = !_.isArray(unitData);
                        if (one){
                                unitData = [unitData];
    
                        }
              
                        
                      return unitData;
                    }
                    
                   
                    )
                })
                
            }
          
            promise2.then(function(result){resolve(result)})
    
        }

    })

    promise.then(function(result){return result})
    
    return promise;
   


}



handlers.buildRestart = function(payload){//build ui has restarted so tell it what to lock again
    model.reLockUnits();
}