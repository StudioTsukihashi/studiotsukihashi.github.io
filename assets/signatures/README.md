# Creative Signature System 2.0 – V4.1.0

Intern freigegebene Framework-Grundlage für Studio Tsukihashi.

## Aufbau
- `core/`: Rendering, Registry und Loader
- `effects/`: wiederverwendbare Licht-, Partikel- und Bewegungsanimationen
- `presets/`: visuelle Symbol-Presets
- `data/`: reine Identitätsdaten je Creative Signature

Leitsatz: **Jede Signatur ist einzigartig – aber keine wirkt fremd.**

Das Datenmodell enthält kein CSS, JavaScript oder Layout. Neue Signaturen werden über eine JSON-Datei registriert und mit `<div data-signature="id"></div>` eingebunden.
