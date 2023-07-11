import { Entity, engine } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
import { movePlayerTo } from "~system/RestrictedActions"
import { clearCoins, createCoins } from "./coin"

export type RaceStatus = "not-started"|"starting"|"started"|"finished" 
let status: RaceStatus = "not-started"
let startTime:number = -1
let totalTime:number = -1
let endTime:number = -1 

let resetCallbacks: (()=>void)[] = []

let hatch:Entity|undefined = undefined

export function getRaceStartGate(){
  return hatch
}
export function setRaceStartGate(_hatch:Entity){
  if(hatch){
    engine.removeEntity(hatch)
  }
  hatch = _hatch
}
export function addRaceResetCallback(callback:()=>void){
  resetCallbacks.push(callback)
}
export function getRaceTime(){
  return Date.now() - startTime
}
export function getRaceTotalTime(){
  return totalTime
}
export function getRaceStatus(){
  return status
}
export function resetRaceState(){
  status = "not-started"
  startTime = -1
  totalTime = -1
  endTime = -1
  for(const p of resetCallbacks){
    p()
  }
}
export function setRaceStatus(_status:RaceStatus){
  status = _status
  switch(status){
    case "not-started":
      resetRaceState()
      break;
    case "started":
      startTime = Date.now()
      if(hatch){ 
        engine.removeEntity(hatch)
        hatch = undefined
      }
      clearCoins() 
      createCoins()
      break;
    case "finished":
      endTime = Date.now()
      totalTime = endTime - startTime
  }
}

export function toStartArea(){
  resetRaceState()
  movePlayerTo({ newRelativePosition: Vector3.create(64,40,72), cameraTarget: Vector3.create(64,40,64) })
}

export function endRace(){
  setRaceStatus("finished")
  movePlayerTo({ newRelativePosition: Vector3.create(64,115,64), cameraTarget: Vector3.create(66.28, 101, 72.20) })
}