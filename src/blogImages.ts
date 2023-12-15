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
        scale: Vector3.create(2.5, 2.5, 1.5),
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
    Vector3.create(14.49, 54.41, -14.15),
    Vector3.create(17.36, 54.27, -2.28),
    Vector3.create(23.062, 54.31, 11.41),
    Vector3.create(10.935, 54.79, 16.39),
    Vector3.create(4.78, 56.19, 26.38),
    Vector3.create(-5.34, 57, 19.81),
    Vector3.create(-19.92, 57.23, 19.986),
    Vector3.create(-17.761, 56.5, 5.934),
    Vector3.create(-21.511, 55.15, -7.56),
    Vector3.create(-10.21, 54.7, -16.78),
    Vector3.create(3.77, 54.7, -16.385),
  ];

export const imageRotations: Quaternion[] = [
    Quaternion.fromEulerDegrees(0, 127.3, 0),
    Quaternion.fromEulerDegrees(0, -63, 0),
    Quaternion.fromEulerDegrees(0, 58, 0),
    Quaternion.fromEulerDegrees(0, -148.47, 0),
    Quaternion.fromEulerDegrees(0, 6.5, 0),
    Quaternion.fromEulerDegrees(0, -183, 0),
    Quaternion.fromEulerDegrees(0, -55.9, 0),
    Quaternion.fromEulerDegrees(0, -267, 0),
    Quaternion.fromEulerDegrees(0, -108, 0),
    Quaternion.fromEulerDegrees(0, 93.84, 0),
    Quaternion.fromEulerDegrees(0, -102, 0),
];

export const imageLinks: string[] = [
    'https://bafybeidct7djai7nxt6yyasrb7o464qdkbybiqm3i3myu5gironzz6bqpe.ipfs.nftstorage.link/', 
    'https://bafybeidokyz7r6fahsq6s4klqlwy3qqphsptvnirjl5ramzieta5swfzzq.ipfs.nftstorage.link/',
    'https://bafkreiavrm6df2dfhkug7nobyk2z44kv7leyryvvorllbkj2bjceb7ifua.ipfs.nftstorage.link/',
    'https://bafkreick4ch43r2agpd4gnxdck5icypfyrycbo3ik3brcdxshy2vdn76oi.ipfs.nftstorage.link/',
    'https://bafkreiaxuile5jekvsvufvgvptbir6rv456nxlon6opwrg3wo634wwwifu.ipfs.nftstorage.link/',
    'https://bafkreig7iucgkqvcg4xn7brsz6tzlwy5cguw3i4eysj2qdwvrct4lfy3um.ipfs.nftstorage.link/',
    'https://bafybeicxbepzibvfzxyvzekwhnpyu465sfdf7ebqksedwqblp4vo6edaza.ipfs.nftstorage.link/',
    'https://bafybeidvemo2louxdkhx2khjfzuvpwmhy7ohwuznfee2shkmcdnlylt5na.ipfs.nftstorage.link/',
    'https://bafybeihlu5ysjgtjqgfo2mkffj2jtthczqqmrt2gac3lpd4xkbassgczra.ipfs.nftstorage.link/',
    'https://bafkreif54ik3om3x5foo7l7it643g4pqrdctixefknw5qc7tcvb6j3ijme.ipfs.nftstorage.link/',
    'https://bafybeidwbjxttg6xhhkojf5gtroscncxe2pfztgeqfdenfjmjybsbogjai.ipfs.nftstorage.link/',
  ];

export const blogLinks: string[] = [
    'https://decentraland.org/blog/announcements/the-ultimate-guide-to-mvfw23-in-decentraland',
    'https://decentraland.org/blog/announcements/metaverse-art-week-2023-the-metaverse-is-dead-long-live-the-metaverse',
    'https://decentraland.org/blog/announcements/a-new-wearable-category-handwear',
    'https://decentraland.org/blog/announcements/ai-npcs-herald-the-beginning-of-ai-in-decentraland',
    'https://decentraland.org/blog/announcements/smart-wearables-and-portable-experiences',
    'https://decentraland.org/blog/announcements/expression-in-decentraland-gets-an-upgrade-emotes-2-0-are-live',
    'https://decentraland.org/blog/announcements/the-ultimate-guide-to-the-ai-world-fair',
    'https://decentraland.org/blog/announcements/the-ultimate-guide-to-decentraland-music-festival-23',
    'https://decentraland.org/blog/announcements/the-ultimate-guide-to-decentraland-music-festival-23',
    'https://decentraland.org/blog/announcements/the-ultimate-guide-to-decentraland-music-festival-23',
    'https://decentraland.org/blog/announcements/the-ultimate-guide-to-mvfw23-in-decentraland',
];

