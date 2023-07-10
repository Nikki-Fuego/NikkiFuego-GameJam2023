import * as npcLib from 'dcl-npc-toolkit'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { Entity, Transform, engine } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'


export const npc5DefaultDialog: number = 0


export function getnpc5Dialog(npc: Entity): npcLib.Dialog[] {
  let dialog = [
    {
      name: 'default',
      text: 'Oh great another dreamer. Just what I needed right now. What? Why am I angry? Well for starters my name is Angsten! I do not expect you to understand what I am about to say but whatever...',
      skipable: true,
    },
    {
      text: 'Anger is an intense emotional response characterized by feelings of frustration, hostility, and a strong desire to react aggressively or assertively. It arises when one perceives a threat, injustice, or violation of personal boundaries.',
      skipable: true,
    },
    {
      text: 'Anger can manifest as a surge of energy, increased heart rate, and a tense or agitated demeanor. It often stems from a sense of being wronged, disrespected, or experiencing a loss of control. Anger can motivate individuals to take action, set boundaries, or address injustices.',
      skipable: true,
    },
    {
      text: 'However, it can also be destructive if not managed appropriately. It is essential to channel anger in healthy ways, such as through effective communication, problem-solving, or seeking support, to prevent harmful consequences and promote personal well-being.',
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

export function createnpc5Npc(): void {
  let npc5: Entity
  let position = Vector3.create(99, 0, 72)

  npc5 = npcLib.create(
    { position: position },
    {
      type: npcLib.NPCType.CUSTOM,
      model: {src:"models/npc5.glb"},
      //dialogSound: navigationForwardSfx,
      onlyETrigger: true,
      faceUser: true,
      onActivate: async () => {

        
        npcLib.playAnimation(npc5, `Talk`, false)
        npcLib.talk(npc5, getnpc5Dialog(npc5), npc5DefaultDialog)

        let targetPosition = Vector3.clone(Transform.get(engine.PlayerEntity).position)
        targetPosition.y = position.y

      },
      onWalkAway: () => {
        console.log('NPC', 'npc5', 'bye bish');
        npcLib.playAnimation(npc5, `Idle`, false)
        
      },
      portrait: {
        path: `images/npc5Portrait.png`,
        offsetX: -70, offsetY: 10
      }
    }
  )

}

