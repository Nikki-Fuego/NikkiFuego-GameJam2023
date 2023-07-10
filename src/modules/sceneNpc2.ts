import * as npcLib from 'dcl-npc-toolkit'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { Entity, Transform, engine } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'


export const npc2DefaultDialog: number = 0


export function getnpc2Dialog(npc: Entity): npcLib.Dialog[] {
  let dialog = [
    {
      name: 'default',
      text: 'Congratulations Dreamer, you have found your way to me. I am Shezrah. Some refer to me as Rah, the source of light. Reveal your true identity by shifting your perspective into third person (v key).',
      skipable: true,
    },
    {
      text: 'This is who you really are. A being of pure light. We are all one conciousness and one experiencing life itself through our avatars in the 3rd dimension.',
      skipable: true,
    },
    {
      text: 'Do not be afraid. You may leave at any time. You may also stay as long as you like. There is no stress here. No worry. Just pure light and love. There may even yet to be some hidden secrets you have yet to find.',
      skipable: true,
    },
    {
      text: 'Find the secrets within this experience and you will be rewarded in the waking world. Leave here knowing that you are loved and protected.',
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

export function createnpc2Npc(): void {
  let npc2: Entity
  let position = Vector3.create(66.28, 101, 72.20)

  npc2 = npcLib.create(
    { position: position },
    {
      type: npcLib.NPCType.CUSTOM,
      model: {src:"models/npc2.glb"},
      //dialogSound: navigationForwardSfx,
      onlyETrigger: true,
      faceUser: true,
      onActivate: async () => {

        
        npcLib.playAnimation(npc2, `Talk`, false)
        npcLib.talk(npc2, getnpc2Dialog(npc2), npc2DefaultDialog)

        let targetPosition = Vector3.clone(Transform.get(engine.PlayerEntity).position)
        targetPosition.y = position.y

      },
      onWalkAway: () => {
        console.log('NPC', 'npc2', 'bye bish');
        npcLib.playAnimation(npc2, `Idle`, false)
        
      },
      portrait: {
        path: `images/npc2Portrait.png`,
        offsetX: -70, offsetY: 10
      }
    }
  )

}

