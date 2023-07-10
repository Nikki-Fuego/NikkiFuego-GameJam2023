import { AudioSource, ColliderLayer, Entity, GltfContainer, InputAction, Material, MeshCollider, MeshRenderer, Schemas, TextShape, Transform, engine, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { movePlayerTo } from '~system/RestrictedActions'
import { addRaceResetCallback, endRace, setRaceStartGate, setRaceStatus, toStartArea } from './raceState'

// We use this component to track and group all the cubes.
// engine.getEntitiesWith(Cube)
export const Cube = engine.defineComponent('cube-id', {})

// We use this component to track and group all the cubes.
// engine.getEntitiesWith(Cube)
export const Spinner = engine.defineComponent('spinner', { speed: Schemas.Number })

const drop = engine.addEntity()
GltfContainer.create(drop, {
  src: 'models/drop.glb',
})
Transform.create(drop, {
    position: Vector3.create(64, 0, 64),
})

const ground = engine.addEntity()
GltfContainer.create(ground, {
  src: 'models/ground.glb',
})
Transform.create(ground, {
    position: Vector3.create(64, 0, 64),
})

const drake = engine.addEntity()
GltfContainer.create(drake, {
  src: 'models/drake.glb',
  invisibleMeshesCollisionMask: ColliderLayer.CL_NONE,
  visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS | ColliderLayer.CL_POINTER
})
Transform.create(drake, {
    position: Vector3.create(64, 0.3, 88),
	scale: Vector3.create(2,2,2)
})
pointerEventsSystem.onPointerDown(
	{
		entity: drake, opts: {
			button: InputAction.IA_POINTER,
			hoverText: 'To Start Area'
		}
	}
		, 
	function () {
		createHatch()
		playSound(endBeam)
		toStartArea()
	}
)

const trees = engine.addEntity()
GltfContainer.create(trees, {
  src: 'models/trees.glb',
})
Transform.create(trees, {
    position: Vector3.create(64, 0, 64),
})

const skybox = engine.addEntity()
GltfContainer.create(skybox, {
  src: 'models/skybox.glb',
})
Transform.create(skybox, {
    position: Vector3.create(64, 0, 64),
})

const floor1 = engine.addEntity()
GltfContainer.create(floor1, {
  src: 'models/floor1.glb',
})
Transform.create(floor1, {
    position: Vector3.create(64, 0, 64),
})

const floor2 = engine.addEntity()
GltfContainer.create(floor2, {
  src: 'models/floor2.glb',
})
Transform.create(floor2, {
    position: Vector3.create(64, 0, 64)
})

const floor3 = engine.addEntity()
GltfContainer.create(floor3, {
  src: 'models/floor3.glb',
})
Transform.create(floor3, {
    position: Vector3.create(64, 0, 64)
})

const floor4 = engine.addEntity()
GltfContainer.create(floor4, {
  src: 'models/floor4.glb',
})
Transform.create(floor4, {
    position: Vector3.create(64, 0, 64)
})

const floor5 = engine.addEntity()
GltfContainer.create(floor5, {
  src: 'models/floor5.glb',
})
Transform.create(floor5, {
    position: Vector3.create(64, 0, 64)
})

const floor6 = engine.addEntity()
GltfContainer.create(floor6, {
  src: 'models/floor6.glb',
})
Transform.create(floor6, {
    position: Vector3.create(64, 0, 64)
})

const startFloor = engine.addEntity()
GltfContainer.create(startFloor, {
  src: 'models/startFloor.glb',
})
Transform.create(startFloor, {
    position: Vector3.create(64, 0, 64)
})

const basement = engine.addEntity()
GltfContainer.create(basement, {
  src: 'models/basement.glb',
})
Transform.create(basement, {
    position: Vector3.create(64, 0, 64)
})

const logo = engine.addEntity()
GltfContainer.create(logo, {
  src: 'models/logo.glb',
})
Transform.create(logo, {
    position: Vector3.create(64, 0, 64)
})

const endZone = engine.addEntity()
GltfContainer.create(endZone, {
  src: 'models/endZone.glb',
})
Transform.create(endZone, {
    position: Vector3.create(64, 0, 64)
})

const stars = engine.addEntity()
GltfContainer.create(stars, {
  src: 'models/stars.glb',
})
Transform.create(stars, {
    position: Vector3.create(64, 0, 64)
})

const npc1Title = engine.addEntity()
GltfContainer.create(npc1Title, {
  src: 'models/npc1Title.glb',
})
Transform.create(npc1Title, {
    position: Vector3.create(74, 0, 89),
	rotation: Quaternion.fromEulerDegrees(0,-45,0)
})

const npc2Title = engine.addEntity()
GltfContainer.create(npc2Title, {
  src: 'models/npc2Title.glb',
})
Transform.create(npc2Title, {
    position: Vector3.create(66.28, 101, 72.20),
	rotation: Quaternion.fromEulerDegrees(0,180,0)
})

const npc3Title = engine.addEntity()
GltfContainer.create(npc3Title, {
  src: 'models/npc3Title.glb',
})
Transform.create(npc3Title, {
    position: Vector3.create(21, -1, 74.82)
})

const npc4Title = engine.addEntity()
GltfContainer.create(npc4Title, {
  src: 'models/npc4Title.glb',
})
Transform.create(npc4Title, {
    position: Vector3.create(53, 0, 18)
})

const npc5Title = engine.addEntity()
GltfContainer.create(npc5Title, {
  src: 'models/npc5Title.glb',
})
Transform.create(npc5Title, {
    position: Vector3.create(99, 0, 72)
})

const howto = engine.addEntity()
Transform.create(howto, {
	position: Vector3.create(70, 3, 88),
    scale: Vector3.create(5,5,5),
    rotation: Quaternion.fromEulerDegrees(0,180,0)
})
MeshRenderer.setPlane(howto)
Material.setBasicMaterial(howto, {
    texture: Material.Texture.Common({
      src: "images/howTo.png"
    }),
    
})
const endPoster = engine.addEntity()
Transform.create(endPoster, {
	position: Vector3.create(62.28, 105, 72.20),
    scale: Vector3.create(5,5,5),
    rotation: Quaternion.fromEulerDegrees(0,0,0)
})
MeshRenderer.setPlane(endPoster)
Material.setBasicMaterial(endPoster, {
    texture: Material.Texture.Common({
      src: "images/endPoster.png"
    }),
    
})

function createHatch(){
	const hatch = engine.addEntity()
	GltfContainer.create(hatch, {
	src: 'models/hatch.glb',
	})
	Transform.create(hatch, {
		position: Vector3.create(64, 0, 64)
	})

	pointerEventsSystem.onPointerDown(
		{
			entity: hatch, opts: {
				button: InputAction.IA_POINTER,
				hoverText: 'Start Game'
			}
		}
			,
		function () {
			playSound(openDing)
			setRaceStatus("started")
			
			//engine.removeEntity(hatch)
		}
	)

	setRaceStartGate(hatch)

	return hatch
}
//const hatch = createHatch()

addRaceResetCallback(createHatch)
//addRaceResetDestroyCallback(createHatch)

const endCube = engine.addEntity()
GltfContainer.create(endCube, {
  src: 'models/endCube.glb',
  invisibleMeshesCollisionMask: ColliderLayer.CL_NONE,
  visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS | ColliderLayer.CL_POINTER
})
Transform.create(endCube, {
    position: Vector3.create(64, 0, 64)
})
pointerEventsSystem.onPointerDown(
	{
		entity: endCube, opts: {
			button: InputAction.IA_POINTER,
			hoverText: 'Click to Finish!'
		}
	}
		,
	function () {
		endRace()
		playSound(endBeam)
	}

)

const backCube1 = engine.addEntity()
GltfContainer.create(backCube1, {
  src: 'models/backCube1.glb',
  invisibleMeshesCollisionMask: ColliderLayer.CL_NONE,
  visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS | ColliderLayer.CL_POINTER
})
Transform.create(backCube1, {
    position: Vector3.create(68, 35, 64)
})
pointerEventsSystem.onPointerDown(
	{
		entity: backCube1, opts: {
			button: InputAction.IA_POINTER,
			hoverText: 'Click to Go Back!'
		}
	}
		,
	function () {
		playSound(endBeam)
		movePlayerTo({ newRelativePosition: Vector3.create(64,100,112), cameraTarget: Vector3.create(64,30,64) })
	}

)

const backCube2 = engine.addEntity()
GltfContainer.create(backCube2, {
  src: 'models/backCube2.glb',
  invisibleMeshesCollisionMask: ColliderLayer.CL_NONE,
  visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS | ColliderLayer.CL_POINTER
})
Transform.create(backCube2, {
    position: Vector3.create(69.28, 101, 72.20)
})
pointerEventsSystem.onPointerDown(
	{
		entity: backCube2, opts: {
			button: InputAction.IA_POINTER,
			hoverText: 'Click to Go Back!'
		}
	}
		,
	function () {
		playSound(endBeam)
		movePlayerTo({ newRelativePosition: Vector3.create(64,100,112), cameraTarget: Vector3.create(64,30,64) })
	}

)

const musicLoop = engine.addEntity()
AudioSource.create(musicLoop, {
	audioClipUrl: 'sounds/GameJamMusic.mp3',
	loop: true,
	playing: true,
	volume: 2
})
Transform.create(musicLoop, {position: Vector3.create(64,30,64)})

const openDing = engine.addEntity()
AudioSource.create(openDing, {
	audioClipUrl: 'sounds/openDing.mp3',
	playing: false,
	volume: 2
})
Transform.create(openDing, {position: Vector3.create(64,34,64)})

const endBeam = engine.addEntity()
AudioSource.create(endBeam, {
	audioClipUrl: 'sounds/endBeam.mp3',
	playing: false,
	volume: 2
})
Transform.create(endBeam, {position: Vector3.create(64,0,64)})

const musicLoop2 = engine.addEntity()
AudioSource.create(musicLoop2, {
	audioClipUrl: 'sounds/GameJamMusic2.mp3',
	playing: true,
	loop:true,
	volume: 2
})
Transform.create(musicLoop2, {position: Vector3.create(64,100,64)})


function playSound(entity: Entity){
    const audioSource = AudioSource.getMutable(entity)
    audioSource.playing = true
}

function SimpleRotate() {
	let transform = Transform.getMutable(endCube)
	transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.fromAngleAxis(1, Vector3.Up()))
}
engine.addSystem(SimpleRotate)

function SimpleRotate2() {
	let transform = Transform.getMutable(backCube1)
	transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.fromAngleAxis(1, Vector3.Up()))
}
engine.addSystem(SimpleRotate2)

function SimpleRotate3() {
	let transform = Transform.getMutable(backCube2)
	transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.fromAngleAxis(1, Vector3.Up()))
}
engine.addSystem(SimpleRotate3)
