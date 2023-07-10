import {
  engine,
  Transform,
} from '@dcl/sdk/ecs'
import { Color3, Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Cube } from './components'
import { createCube } from './factory'
import { getRaceStatus, getRaceTime, getRaceTotalTime, resetRaceState, toStartArea } from './raceState'
import { NpcUtilsUi } from 'dcl-npc-toolkit'
import { getStarCount, getStarCountTotal } from './coin'


function formatTime(timeSeconds: number, fractionDigits: number = 1): string {
  if (timeSeconds <= 0) {
    return "00:00.0";
  } else {
    let minutes = Math.floor((timeSeconds % (60 * 60)) / 60);
    let seconds = timeSeconds % 60;

    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds.toFixed(1) : seconds.toFixed(fractionDigits))
    ); // + "-"+timeSeconds.toFixed(1)
  }
}

function getRaceUIText(){
  const status = getRaceStatus()

  let text  = ""
  if(status === "not-started"){
    text = "Not Started"
  }else if(status === "started"){
    text = "Started"
  }else if(status === "finished"){
    text = "Finished"
  }else{
    text = "unknown status " + status
  }

  return text
}
function getRaceButtonUIText(){
  const status = getRaceStatus()

  let text  = ""
  if(status === "not-started"){
    text = "To Start Area"
  }else if(status === "started"){
    text = "Give Up"
  }else if(status === "finished"){
    text = "Play Again"
  }else{
    text = "unknown status " + status
  }

  return text
}

function getRaceTimeUIText(){
  const status = getRaceStatus()

  let text  = ""
  if(status === "not-started"){
    text = "Not Started"
  }else if(status === "started"){
    text = formatTime(getRaceTime()/1000)
  }else if(status === "finished"){
    text = formatTime(getRaceTotalTime()/1000)
  }else{ 
    text = "unknown status " + status
  }

  return text
}

function getStarCountText(){
  return getStarCount() +"/"+getStarCountTotal()
}

const uiComponent = () => (
  <UiEntity
    uiTransform={{
      width: 500,
      height: 150,
      //  { top: 16, right: 0, bottom: 8 left: 270 },
      margin: '16px 0 8px 600px',
      // { top: 4, bottom: 4, left: 4, right: 4 },
      padding: 4,
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}
    uiBackground={{ textureMode: 'center',
	      texture: {
			  src: "images/uiBackgroundMain.png"
		} }}
  >
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'none'
      }}

    >
      <Label
        onMouseDown={() => {console.log('Player Position clicked !')}}
        value={`Player: ${getPlayerPosition()}`}
        fontSize={18}
        uiTransform={{ width: '100%', height: 30 } }
      />
     </UiEntity>

     <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Label
        onMouseDown={() => {console.log('Player Position clicked !')}}
        value={`Race: ${getRaceUIText()}`}
        fontSize={20}
        font="serif"
        uiTransform={{ width: '100%', height: 30 } }
        color= {Color4.Black()}
      />
      <Label
        onMouseDown={() => {console.log('Player Position clicked !')}}
        value={`Time: ${getRaceTimeUIText()}`}
        fontSize={30}
        font="monospace"
        uiTransform={{ width: '100%', height: 30 } }
        color= {Color4.Black()}
      />
      <Button 
        value={`${getRaceButtonUIText()}`}
        onMouseDown={() => {
          console.log('Player Giveup clicked !')
          toStartArea() 
        }}
        fontSize={18}
        uiTransform={{ width: '40%', height: 30 }}
        uiBackground={{ color: Color4.create(1, 0, 1.5, 1)}}
      /> 

     </UiEntity>
    
  </UiEntity>
)

const uiComponentCounter = () => (
  <UiEntity
    uiTransform={{
      width: 150,
      height: 150,
      //  { top: 16, right: 0, bottom: 8 left: 270 },
      margin: '16px 0 8px 600px',
      // { top: 4, bottom: 4, left: 4, right: 4 },
      padding: 4,
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent: 'center',
      alignItems: 'flex-start',
      positionType: 'absolute',
      position: { top: '0px', left: '500px' } ,
    }}
    uiBackground={{ textureMode: 'center',
	      texture: {
			  src: "images/starUI.png"
		} }}
  >
     <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Label
        onMouseDown={() => {console.log('Player Position clicked !')}}
        value={`Stars`}
        fontSize={28}
        font="monospace"
        uiTransform={{ width: '100%', height: 28 } }
        color= {Color4.Black()}
      /> 
      <Label
        onMouseDown={() => {console.log('Player Position clicked !')}}
        value={` ${getStarCountText()}`}
        fontSize={30}
        font="monospace"
        uiTransform={{ width: '100%', height: 30 } }
        color= {Color4.Black()}
      /> 

     </UiEntity>
    
  </UiEntity> 
)

function getPlayerPosition() {
  const playerPosition = Transform.getOrNull(engine.PlayerEntity)
  if (!playerPosition) return ' no data yet'
  const { x, y, z } = playerPosition.position
  return `{X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, z: ${z.toFixed(2)} }`
}

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(()=>{return [uiComponent(),uiComponentCounter(),NpcUtilsUi()]})
}