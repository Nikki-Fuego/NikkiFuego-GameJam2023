import * as npcLib from 'dcl-npc-toolkit'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { Entity, Transform, engine } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'


export const npc4DefaultDialog: number = 0


export function getnpc4Dialog(npc: Entity): npcLib.Dialog[] {
  let dialog = [
    {
      name: 'default',
      text: 'Why is everything so confusing? Why cant I stop crying? Sorry, the name is Goron. I am a bit of a mess. I only know random facts about being sad. Like...',
      skipable: true,
    },
    {
      text: 'Sadness is an emotional state characterized by feelings of sorrow, grief, and melancholy. It arises when one experiences a deep sense of loss, disappointment, or unhappiness.',
      skipable: true,
    },
    {
      text: 'Sadness often manifests as a heaviness in the heart, accompanied by tearfulness, a subdued mood, and a general lack of energy or motivation. It can be triggered by various factors such as personal setbacks, bereavement, loneliness, or the realization of unmet expectations.',
      skipable: true,
    },
    {
      text: 'Sadness is a natural response to challenging or distressing situations, allowing individuals to process and reflect on their emotions. While it can be a difficult emotion to endure, it also serves as a catalyst for personal growth, empathy, and a deeper appreciation for the joyful moments in life.',
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

export function createnpc4Npc(): void {
  let npc4: Entity
  let position = Vector3.create(53, 0, 18)

  npc4 = npcLib.create(
    { position: position },
    {
      type: npcLib.NPCType.CUSTOM,
      model: {src:"models/npc4.glb"},
      //dialogSound: navigationForwardSfx,
      onlyETrigger: true,
      faceUser: true,
      onActivate: async () => {

        
        npcLib.playAnimation(npc4, `Talk`, false)
        npcLib.talk(npc4, getnpc4Dialog(npc4), npc4DefaultDialog)

        let targetPosition = Vector3.clone(Transform.get(engine.PlayerEntity).position)
        targetPosition.y = position.y

      },
      onWalkAway: () => {
        console.log('NPC', 'npc4', 'bye bish');
        npcLib.playAnimation(npc4, `Idle`, false)
        
      },
      portrait: {
        path: `images/npc4Portrait.png`,
        offsetX: -70, offsetY: 10
      }
    }
  )

}

