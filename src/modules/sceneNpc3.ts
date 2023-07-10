import * as npcLib from 'dcl-npc-toolkit'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { Entity, Transform, engine } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'


export const npc3DefaultDialog: number = 0


export function getnpc3Dialog(npc: Entity): npcLib.Dialog[] {
  let dialog = [
    {
      name: 'default',
      text: 'Another lucid and another lucid dreamer. My name is Lemni, keep of content and happiness.',
      skipable: true,
    },
    {
      text: 'The emotion of content can be described as a state of peaceful satisfaction and fulfillment. It arises when one feels a sense of harmony, gratification, and balance in their life, typically accompanied by a tranquil and serene mindset.',
      skipable: true,
    },
    {
      text: 'Contentment stems from a deep appreciation and acceptance of ones circumstances achievements and experiences. It is characterized by a lack of longing or desire for something more as one feels a sense of completeness and happiness in the present moment.',
      skipable: true,
    },
    {
      text: 'Contentment can manifest in various aspects of life, including relationships, personal achievements, career, and overall well-being, fostering a sense of inner peace and tranquility. Never wake up :)',
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

export function createnpc3Npc(): void {
  let npc3: Entity
  let position = Vector3.create(21, 0.5, 74.82)

  npc3 = npcLib.create(
    { position: position },
    {
      type: npcLib.NPCType.CUSTOM,
      model: {src:"models/npc3.glb"},
      //dialogSound: navigationForwardSfx,
      onlyETrigger: true,
      faceUser: true,
      onActivate: async () => {

        
        npcLib.playAnimation(npc3, `Talk`, false)
        npcLib.talk(npc3, getnpc3Dialog(npc3), npc3DefaultDialog)

        let targetPosition = Vector3.clone(Transform.get(engine.PlayerEntity).position)
        targetPosition.y = position.y

      },
      onWalkAway: () => {
        console.log('NPC', 'npc3', 'bye bish');
        npcLib.playAnimation(npc3, `Idle`, false)
        
      },
      portrait: {
        path: `images/npc3Portrait.png`,
        offsetX: -70, offsetY: 10
      }
    }
  )

}

