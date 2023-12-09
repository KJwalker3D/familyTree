import { ColliderLayer, GltfContainer, Transform, engine, Entity, Material, PointerEvents, pointerEventsSystem, InputAction, MeshRenderer, MeshCollider } from '@dcl/sdk/ecs';
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { openExternalUrl } from '~system/RestrictedActions';


let imagePlanes: Record<string, Entity> = {};
let parent = engine.addEntity();
Transform.create(parent, {
    position: Vector3.create(48, 0, 48),
})

export function addImagePlanes(imagePositions: Vector3[], imageRotations: Quaternion[], imageLinks: string[], blogLinks: string[]): void {
for (let i = 0; i < imagePositions.length; i++) {
    addImagePlane(imagePositions[i], imageRotations[i], imageLinks[i], blogLinks[i]);
}
}


function addImagePlane(position: Vector3, rotation: Quaternion, imageLink: string, link: string): void {
    const imagePlane = engine.addEntity();
    MeshRenderer.setPlane(imagePlane),
    MeshCollider.setPlane(imagePlane)
    Transform.create(imagePlane, ({
        position: position,
        rotation: rotation,
        parent: parent }));
    Material.setBasicMaterial(imagePlane, {
        texture: Material.Texture.Common({
            src: imageLink
        })
    });
    pointerEventsSystem.onPointerDown({
        entity: imagePlane,
        opts: {
            button: InputAction.IA_POINTER,
            hoverText: 'Blog post'
        }
    },
    function () {
        openExternalUrl({url: link})
    }
    )
    imagePlanes[link] = imagePlane;
    
}

export const imagePositions: Vector3[] = [
    Vector3.create(14.49, 14.15, 54.86),
    Vector3.create(-5, 0, 5),
    Vector3.create(5, 0, -5),
    Vector3.create(-5, 0, -5),
  ];

export const imageRotations: Quaternion[] = [
    Quaternion.fromEulerDegrees(-90, 0, 127.3),
    Quaternion.fromEulerDegrees(0, 0, 0),
    Quaternion.fromEulerDegrees(0, 0, 0),
    Quaternion.fromEulerDegrees(0, 0, 0)
];

export const imageLinks: string[] = [
    'https://bafybeidct7djai7nxt6yyasrb7o464qdkbybiqm3i3myu5gironzz6bqpe.ipfs.nftstorage.link/',
    'https://bafybeidct7djai7nxt6yyasrb7o464qdkbybiqm3i3myu5gironzz6bqpe.ipfs.nftstorage.link/',
    'https://bafybeidct7djai7nxt6yyasrb7o464qdkbybiqm3i3myu5gironzz6bqpe.ipfs.nftstorage.link/',
    'https://bafybeidct7djai7nxt6yyasrb7o464qdkbybiqm3i3myu5gironzz6bqpe.ipfs.nftstorage.link/',
  ];

export const blogLinks: string[] = [
    'https://decentraland.org/blog/announcements/the-ultimate-guide-to-mvfw23-in-decentraland',
    'https://decentraland.org/blog/announcements/the-ultimate-guide-to-mvfw23-in-decentraland',
    'https://decentraland.org/blog/announcements/the-ultimate-guide-to-mvfw23-in-decentraland',
    'https://decentraland.org/blog/announcements/the-ultimate-guide-to-mvfw23-in-decentraland',
];