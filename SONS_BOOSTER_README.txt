=== SONS BOOSTER — SLIBARRE-DEX ===

Les sons sont chargés depuis Mixkit (CDN gratuit).
Voici les URLs utilisées dans le jeu :

🔵 STANDARD (ouverture normale) :
  https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3

⚡ ÉPIQUE (son puissant) :
  https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3

✦ LÉGENDAIRE (son épique/majestueux) :
  https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3

Pour remplacer par tes propres sons :
  1. Renomme tes fichiers : son_standard.mp3, son_epic.mp3, son_legendary.mp3
  2. Place-les dans le même dossier que slibarre-dex.html
  3. Dans le HTML, change les src="" de chaque <audio> :
       <audio id="snd-rip"       src="son_standard.mp3">
       <audio id="snd-epic"      src="son_epic.mp3">
       <audio id="snd-legendary" src="son_legendary.mp3">

=== VIBRATIONS PAR RARETÉ ===
  STANDARD  : vibration courte [40ms]
  ÉPIQUE    : vibration triple [50,30,100,30,200ms]
  LÉGENDAIRE: vibration longue [30,20,80,20,150,20,300ms]
