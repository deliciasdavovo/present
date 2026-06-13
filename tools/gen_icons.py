#!/usr/bin/env python3
"""Gera os ícones do PWA (PNG) sem dependências externas.

Desenha um gradiente quente com um coração branco, no espírito visual do app.
Uso: python3 tools/gen_icons.py
"""
import struct, zlib, os, math

def png_bytes(width, height, pixels):
    def chunk(tag, data):
        c = tag + data
        return struct.pack(">I", len(data)) + c + struct.pack(">I", zlib.crc32(c) & 0xFFFFFFFF)
    raw = b""
    for y in range(height):
        raw += b"\x00" + bytes(v for px in pixels[y] for v in px)
    return (b"\x89PNG\r\n\x1a\n"
            + chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0))
            + chunk(b"IDAT", zlib.compress(raw, 9))
            + chunk(b"IEND", b""))

def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))

def in_heart(nx, ny):
    # curva implícita do coração: (x^2 + y^2 - 1)^3 - x^2*y^3 <= 0
    x, y = nx * 1.25, -ny * 1.25
    v = (x * x + y * y - 1) ** 3 - x * x * y ** 3
    return v <= 0

def make_icon(size, path, heart_scale=0.56):
    bg = (251, 251, 253)        # off-white da identidade do app
    heart = (29, 29, 31)        # quase-preto, tom único, sem gradiente
    cx, cy = size / 2, size / 2 + size * 0.02
    half = size * heart_scale / 2
    ss = 3  # supersampling para bordas suaves
    rows = []
    for y in range(size):
        row = []
        for x in range(size):
            hits = 0
            for sy in range(ss):
                for sx in range(ss):
                    nx = (x + (sx + 0.5) / ss - cx) / half
                    ny = (y + (sy + 0.5) / ss - cy) / half
                    if in_heart(nx, ny):
                        hits += 1
            a = hits / (ss * ss)
            row.append(lerp(bg, heart, a))
        rows.append(row)
    with open(path, "wb") as f:
        f.write(png_bytes(size, size, rows))
    print(path, os.path.getsize(path), "bytes")

os.makedirs("icons", exist_ok=True)
make_icon(192, "icons/icon-192.png")
make_icon(512, "icons/icon-512.png")
# maskable: coração menor para caber na zona segura (80% central)
make_icon(512, "icons/icon-maskable-512.png", heart_scale=0.46)
