import * as npcLib from 'dcl-npc-toolkit'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { Entity, Transform, engine } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'


export const npc1DefaultDialog: number = 0


export function getnpc1Dialog(npc: Entity): npcLib.Dialog[] {
  let dialog = [
    {
      name: 'default',
      text: 'Welcome to the Fortress dreamer. I assume you have come to find yourself?',
      skipable: true,
    },
    {
      text: 'Thats how most people make their way here at least. You must have a yearning for self discovery.',
      skipable: true,
    },
    {
      text: 'To find your real identity, interact with my dragon friend Drayke over there. He will teleport you to the top of the Fortress.',
      skipable: true,
    },
    {
      text: 'Click one the Start Hatch to begin your journey. Stay the course and dont get distracted! Once your reach the tesseract you will be teleported deeper into the dream to find what you are searching for.',
      skipable: true,
      isEndOfDialog: true,
      triggeredByNext: () => {
        console.log("barNpcs", "end dialog")
        npcLib.playAnimation(npc, `Idle`, false)
      },
    },
  ]
  return dialog
}

export function createnpc1Npc(): void {
  let npc1: Entity
  let position = Vector3.create(74, 0, 89)

  npc1 = npcLib.create(
    { position: position,
      rotation: Quaternion.fromEulerDegrees(0,-45,0) },
    {
      type: npcLib.NPCType.CUSTOM,
      model: {src:"models/npc1.glb"},
      //dialogSound: navigationForwardSfx,
      onlyETrigger: true,
      faceUser: true,
      onActivate: async () => {

        
        npcLib.playAnimation(npc1, `Talk`, false)
        npcLib.talk(npc1, getnpc1Dialog(npc1), npc1DefaultDialog)

        let targetPosition = Vector3.clone(Transform.get(engine.PlayerEntity).position)
        targetPosition.y = position.y

      },
      onWalkAway: () => {
        console.log('NPC', 'npc1', 'bye bish');
        npcLib.playAnimation(npc1, `Idle`, false)
        
      },
      portrait: {
        path: `images/npc1Portrait.png`,
        offsetX: -70, offsetY: 10
      }
    }
  )

}

