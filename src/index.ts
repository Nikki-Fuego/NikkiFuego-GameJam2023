import { engine, InputAction, inputSystem, Material, MeshCollider, MeshRenderer, pointerEventsSystem, Transform,  AvatarAnchorPointType, AvatarAttach, Entity } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'


import { BounceScaling, bounceScalingSystem, circularSystem } from './systems'

import { setupUi } from './ui'
import { Spinner } from './components'
import { createCube } from './factory'
import { createCoin } from './coin'
import { createArissaCharacter } from './modules/arissa'
import { createAvatarSwappingArea, avatarSwappingSystem } from './modules/avatarSwappingArea'

import { movePlayerTo } from '~system/RestrictedActions'
import { createnpc1Npc } from './modules/sceneNpc'
import { createnpc2Npc } from './modules/sceneNpc2'
import { createnpc3Npc } from './modules/sceneNpc3'
import { createnpc4Npc } from './modules/sceneNpc4'
import { createnpc5Npc } from './modules/sceneNpc5'
import { createCoins } from './coin'

export function main() {

  // Defining behavior. See `src/systems.ts` file.
  engine.addSystem(circularSystem)
  engine.addSystem(bounceScalingSystem)

 
  // draw UI
  setupUi()

  const arissaCharaEntity = createArissaCharacter()
  const parent = Transform.get(arissaCharaEntity).parent
  if (parent) {
    AvatarAttach.create(parent, {
      anchorPointId: AvatarAnchorPointType.AAPT_POSITION
    })
  }

  // Set avatar modifier area to swap player avatar
  createAvatarSwappingArea(Vector3.create(64, 100, 64), Vector3.create(64, 110, 64), arissaCharaEntity)

  // Register avatar swapping system
  engine.addSystem(avatarSwappingSystem)

  createCoins()

  createnpc1Npc() 

  createnpc2Npc()

  createnpc3Npc()

  createnpc4Npc()

  createnpc5Npc()

}




