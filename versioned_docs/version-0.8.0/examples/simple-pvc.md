---
title: Simple PersistentVolumeClaim
sidebar_position: 6
---

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: longhorn-simple-pvc
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: longhorn
  resources:
    requests:
      storage: 1Gi
```