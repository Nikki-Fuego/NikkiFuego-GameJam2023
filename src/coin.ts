import { AudioSource, AvatarAttach, engine, Entity, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Color3, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'

/**
 * Sound is a separated from the coin entity so that you can
 * still hear it even when the coin is removed from the engine.
 */
const coinPickupSound = engine.addEntity()
Transform.create(coinPickupSound)
AudioSource.create(coinPickupSound, { audioClipUrl: 'sounds/coinPickup.mp3' })

let coinCount = 0
export function getStarCount() {
  return coinCount
}
export function getStarCountTotal(){
  return coins.length
}
export function createCoin(model: string, position: Vector3, size: Vector3, centerOffset: Vector3): Entity {
  const entity = engine.addEntity()
  GltfContainer.create(entity, { src: model })
  Transform.create(entity, { position })

  utils.triggers.oneTimeTrigger(
    entity,
    utils.LAYER_1,
    utils.LAYER_1,
    [{ type: 'box' }],
    () => {
      Transform.getMutable(coinPickupSound).position = Transform.get(engine.PlayerEntity).position
      AudioSource.getMutable(coinPickupSound).playing = true
      engine.removeEntity(entity)
      coinCount++
    },
    Color3.Yellow()
  )

  return entity
}

let coins:Entity[] = []
export function createCoins(){

  const coinPositions = [
    Vector3.create(64, 31, 64),
    Vector3.create(52, 31, 61),
    Vector3.create(66, 31, 58),
    Vector3.create(75, 31, 52),
    Vector3.create(64, 31, 72),
    Vector3.create(75, 31, 68),
    Vector3.create(75, 31, 58),
    Vector3.create(52.23, 26, 55.46),
    Vector3.create(75.86, 26, 52.19),
    Vector3.create(55.41, 26, 66.92),
    Vector3.create(73.10, 26, 69.92),
    Vector3.create(75.66, 26, 60.76),
    Vector3.create(58.00, 21, 75.67),
    Vector3.create(52.42, 21, 52.51),
    Vector3.create(75.66, 21, 52.43),
    Vector3.create(75.61, 21, 72.79),
    Vector3.create(63.92, 21, 63.86),
    Vector3.create(69.85, 21, 58.27),
    Vector3.create(70.07, 16, 66.83),
    Vector3.create(69.83, 16, 72.73),
    Vector3.create(69.83, 16, 52.21),
    Vector3.create(64.08, 16, 66.70),
    Vector3.create(75.30, 16, 66.81),
    Vector3.create(58.75, 16, 72.45),
    Vector3.create(52.31, 16, 60.95),
    Vector3.create(64.59, 16, 60.89),
    Vector3.create(52.15, 11, 58.28),
    Vector3.create(58.10, 11, 66.72),
    Vector3.create(58.68, 11, 72.80),
    Vector3.create(69.50, 11, 66.88),
    Vector3.create(64.14, 11, 75.31),
    Vector3.create(66.82, 6, 55.33),
    Vector3.create(72.72, 6, 75.73),
    Vector3.create(52.48, 6, 75.78),
    Vector3.create(76.20, 6, 64.32),
    Vector3.create(75.77, 6, 52.24),
  ]

  // Setup the coins
  for (const coinPosition of coinPositions) {
    coins.push( createCoin('models/coin.glb', coinPosition, Vector3.create(1.5, 3, 1.5), Vector3.create(0, 1, 0)) )
  }
}
export function clearCoins(){
  coinCount = 0
  for(const p of coins){
    engine.removeEntity(p)
  }
  coins = []
}




