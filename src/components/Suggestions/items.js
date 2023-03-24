const items = {
  boots:
    "https://images.unsplash.com/photo-1481729379561-01e43a3e1ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ym9vdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
  sunglasses:
    "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3VuZ2xhc3Nlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
  fan: "https://images.unsplash.com/photo-1565151443833-29bf2ba5dd8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
  caps: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2836&q=80",
  torch:
    "https://images.unsplash.com/photo-1580846841980-225e3e2832ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dG9yY2glMjBsaWdodHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
  sweater:
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3dlYXRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
  socks:
    "https://images.unsplash.com/photo-1585499583264-491df5142e83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29ja3N8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
  umbrella:
    "https://images.unsplash.com/photo-1602427670924-d4942df40999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dW1icmVsbGFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
};

const { boots, sunglasses, fan, caps, torch, sweater, socks, umbrella } = items;

export const Items = {
  Clear: { sunglasses, caps, fan },
  Rain: {
    boots,
    torch,
    umbrella,
  },
  Snow: { sweater, umbrella, socks },
  Drizzle: {
    boots,
    torch,
    umbrella,
  },
  Clouds: {
    boots,
    socks,
    umbrella,
  },

  Tornado: {
    boots,
    torch,
  },
  Thunderstorm: {
    boots,
    torch,
    umbrella,
  },
  Squall: {
    sunglasses,
    torch,
  },
  Ash: {
    sunglasses,
    torch,
    caps,
  },
  Dust: {
    sunglasses,
    torch,
  },
  Smoke: {
    sunglasses,
    torch,
  },
  Haze: {
    sunglasses,
    torch,
  },
  Fog: {
    sunglasses,
    torch,
    sweater,
  },
  Mist: {
    umbrella,
    torch,
    sweater,
  },
};
