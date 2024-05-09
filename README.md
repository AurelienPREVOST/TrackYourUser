## Interactive Testing Tool  

### Tracker Module  

The Tracker module enables automatic recording of user interactions during testing sessions. By opening `tracker/index.html`, the tool captures various actions such as mouse movements, left clicks, scrolling, and key presses. Once testing is complete, simply click on the "Save interactions" button to generate a comprehensive log of user activities.

#### Usage Example:

Your interaction log will resemble the following format:

```json
[
    {"screenshot":"data:image/png;base64 .....=="},
    {"type":"mousemove","details":{"x":1064,"y":314}},
    {"type":"mousemove","details":{"x":1063,"y":312}},
    {"type":"mousemove","details":{"x":1059,"y":308}},
    {"type":"keydown","details":{"key":"y"}},
    {"type":"mousemove","details":{"x":949,"y":246}},
    {"type":"mousemove","details":{"x":902,"y":232}},
    {"type":"keydown","details":{"key":"u"}},
    {"type":"mousemove","details":{"x":851,"y":221}},
    {"type":"scroll","details":{"deltaX":0,"deltaY":80}},
    {"type":"mousemove","details":{"x":782,"y":211}},
    {"type":"mousemove","details":{"x":723,"y":202}},
    {"details":{"screenWidth":2752,"screenHeight":1023}}
]
```

Once obtained, you can simply copy and paste the content into the interactions.json file stored within the "simulation" folder.

### Simulation Module  

The Simulation module, accessed through simulation/index.html, is designed to provide a realistic playback environment for testing. To launch the simulation, use a live server (e.g., with Visual Studio Code) to avoid CORS policy issues when fetching the interactions.json file.

#### Features:  
Automatic Screen Adjustment: The simulation dynamically adjusts its display to fit various screen resolutions. It means than when you will "replay action", capture footage will be adapted to your screen.
Visual Feedback: The base64 image stored at the beginning of the interaction log is rendered in the background (with low resolution to avoid heavy Json), offering a visual representation of user interactions.