import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// Die Abmessungen des Renderers
const rendererWidth = 600;
const rendererHeight = 400;
// Die Grundkomponenten
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  rendererWidth / rendererHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
// Wird gebraucht, um Klicks auf Objekte zu detektieren
const raycaster = new THREE.Raycaster();
// Wird verwendet, um die Koordinaten des Mouse-Cursor festzuhalten
const pointer = new THREE.Vector2();
// Wird verwendet, um getroffene Objekte zu speichern
let hitObjects = [];
// stellt die Größe der "Leinwand" ein
renderer.setSize(rendererWidth, rendererHeight);
// übergibt die Funktion, die für neue Frames eingesetzt werden soll
renderer.setAnimationLoop(animate);
// hängt die Leinwand auf der HTML-Seite ein.
document.body.appendChild(renderer.domElement);
// Initiiert die Steuerung, die es ermöglicht, die Kamera zu drehen
const controls = new OrbitControls(camera, renderer.domElement);
// Erzeugt einen grauen Würfel mit Breite, Länge, Höhe von 1
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhysicalMaterial({ color: 0xf2f2f2 });
const cube = new THREE.Mesh(geometry, material);
// setzt den Würfel an x = 2, y = 0, z = 0
cube.position.set(3, 0, 0);
// fügt den Würfel der Szene hinzu
scene.add(cube);
// siehe vorheriger Würfel
const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshPhysicalMaterial({ color: 0xde3300 });
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.set(4.5, 0, 0);
scene.add(cube2);
// fügt ein Point Light hinzu mit einer blauen Farbe (0x81d4fa = Hexadezimal-Code für Farbe)
// mit Stärke von 10
const geometry3 = new THREE.RingGeometry(1, 3, 12);
const material3 = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});
const ring = new THREE.Mesh(geometry3, material3);
ring.position.set(3, 0, -5);
scene.add(ring);

const geometry4 = new THREE.CapsuleGeometry(1, 1, 4, 8);
const material4 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const capsule = new THREE.Mesh(geometry4, material4);
capsule.position.set(3, 0, 3);
scene.add(capsule);

const geometry5 = new THREE.CircleGeometry(2, 32);
const material5 = new THREE.MeshBasicMaterial({ color: "blue" });
const circle = new THREE.Mesh(geometry5, material5);
circle.position.set(3, 0, -6);
scene.add(circle);

const geometry6 = new THREE.ConeGeometry(1, 4, 32);
const material6 = new THREE.MeshBasicMaterial({ color: "pink" });
const cone = new THREE.Mesh(geometry6, material6);
cone.position.set(3, 0, -3);
scene.add(cone);

const geometry7 = new THREE.CylinderGeometry(1, 1, 3, 32);
const material7 = new THREE.MeshBasicMaterial({ color: "purple" });
const cylinder = new THREE.Mesh(geometry7, material7);
cylinder.position.set(3, 0, 6);
scene.add(cylinder);

const geometry8 = new THREE.SphereGeometry(1, 12, 16);
const material8 = new THREE.MeshBasicMaterial({ color: "cyan" });
const sphere = new THREE.Mesh(geometry8, material8);
sphere.position.set(3, 2, 0);
scene.add(sphere);

const geometry9 = new THREE.TorusGeometry(2, 1, 3, 20);
const material9 = new THREE.MeshBasicMaterial({ color: "beige" });
const torus = new THREE.Mesh(geometry9, material9);
torus.position.set(3, 0, -8);
scene.add(torus);

const geometry10 = new THREE.PlaneGeometry(1, 1);
const material10 = new THREE.MeshBasicMaterial({
  color: "grey",
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry10, material10);
plane.position.set(1, 0, 0);
scene.add(plane);

const light = new THREE.PointLight(0x81d4fa, 10);
light.position.set(1, 1, 1);
scene.add(light);
// fügt Ambient Light ein, mit weißer Farbe und Stärke von 3
const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);
// Setzt Kamera nach vorne (Z-Achse)
camera.position.z = 5;
// Aktualisiert die Steuerung. Muss einfach immer passieren, wenn die Kamera verändert wurde.
controls.update();
// lädt ein 3D-Model, das im gleichen Ordner wie die Script-Datei liegt mit dem Dateinamen

renderer.domElement.addEventListener("mousemove", onPointerMove);
// detektiert Klicks der Mouse und führt dann Funktion 'onClick' aus
renderer.domElement.addEventListener("click", onClick);

function animate() {
  controls.update();
  // schickt einen Strahl aus der Kamera in die Szene an den Punkt, an dem der Cursor gerade steht.
  raycaster.setFromCamera(pointer, camera);
  // prüft, welche Objekte in der Szene von diesem Strahl getroffen wurden und speichert sie in einer
  // Variablen
  hitObjects = raycaster.intersectObjects(scene.children);
  // rendert ein neues Bild
  renderer.render(scene, camera);
}
// Diese Funktion wurde oben als Reaktion auf das Event "mousemove" hinterlegt
// wird immer ausgeführt, wenn die Maus bewegt wird und speichert die Position in die Variable pointer
function onPointerMove(event) {
  pointer.x = (event.offsetX / renderer.domElement.width) * 2 - 1;
  pointer.y = -(event.offsetY / renderer.domElement.height) * 2 + 1;
}
// Diese Funktion wurde oben als Reaktion auf das Event "click" hinterlegt
function onClick() {
  // prüft, ob überhaupt ein Objekt getroffen wurde. Falls nicht, hört es hier auf
  if (hitObjects.length === 0) return;
  // holt sich das erste getroffene Objekt
  // warum das Erste? Der Strahl schneidet durch alle Objekte auch Objekte hinter dem geklickten Objekt
  // also müssen wir nur das erste holen. Die hinter dem Objekt interessieren uns nicht.
  const clickedThing = hitObjects[0];
  // bewegt geklicktes Element nach unten und dann wieder nach oben
  bounceObject(clickedThing);
  // gibt Namen des Elements aus. Dieser Name ist das, was in Blender hinterlegt wurde.
  // Diese Information können wir für interessante Dinge verwenden.
  console.log(clickedThing.object.name);
}
let bouncingSave = [];
// bewegt Objekt nach oben und unten
function bounceObject(clickedThing) {
  if (bouncingSave.includes(clickedThing.object.name)) return;
  bouncingSave.push(clickedThing.object.name);
  const currentPosition = clickedThing.object.position;
  // speichert alte y Koordinate
  const oldY = currentPosition.y;
  // bewegt es nach unten
  clickedThing.object.position.setY(oldY - 0.02);
  // setzt das Objekt nach 200ms wieder an die alte y Koordinate zurück
  setTimeout(() => {
    clickedThing.object.position.setY(oldY);
    bouncingSave = bouncingSave.filter(
      (element) => element !== clickedThing.object.name
    );
  }, 80);
}
