# Prompt — a marca (Tier 2)

Cole em um gerador de imagem. Gere 4–6 variações e escolha pelo teste de
redução, não pela versão grande.

---

A two-ink screenprint logo mark, in the style of a hand-pulled poster
print. Exactly two inks: safety orange #ff6b00 and dark graphite
#26241f, on a painted bone off-white ground #f3efe5. No other colours,
no gradients, no glow, no bevel, no drop shadow, no 3D.

Subject: three vertical fields side by side, like columns on a printed
sheet, with one small rectangular card lifted and tilted mid-move
between the second and third field. Geometric, flat, front-on. The
card in transit is the only element printed in orange; everything else
is graphite.

Print behaviour, which is the whole point of the style:
- mid-tones are built from visible halftone dots, never from smooth
  tone or opacity
- the orange plate sits very slightly out of register with the
  graphite plate, offset about one percent, as a real press would
- contours carry a little hand pressure: edges are confident but not
  mechanically perfect
- the bone ground is painted as a real ink on the subject, not left
  transparent

Hard constraints:
- the whole mark must read at 32 pixels, in one flat colour, and
  inside a circular crop
- the silhouette is compact and closed: nothing protrudes past the
  outer contour, and every element sits tangent INSIDE the silhouette
  rather than sticking out of it
- no more than three distinct shapes total
- no text, no letters, no numbers, no wordmark
- no face, no eyes, no two matched shapes placed side by side
- centred, generous even margin, square canvas

Flat vector-poster aesthetic, silkscreen texture, 1970s technical
print, high contrast.

---

## Como julgar as variações

Descarte qualquer uma que falhe em um destes — todos são falhas reais,
não gosto:

1. **Reduza para 32px.** Se virar borrão, tem forma demais.
2. **Achate para uma cor só** (tudo grafite). Se o desenho depender do
   laranja para ser legível, a marca não sobrevive a um carimbo, a um
   favicon monocromático ou a um fax.
3. **Corte em círculo.** Se algo importante ficar de fora, a silhueta
   está larga demais.
4. **Olhe se algo protrude.** Duas formas simétricas saindo da
   silhueta leem como orelhas de animal quando reduzidas. Devem ficar
   tangentes por dentro.
5. **Olhe se lê como rosto.** Duas formas iguais lado a lado viram
   olhos. Se acontecer, quebre a simetria.

## Depois de escolher

Raster gerado não resolve o requisito de 32px + uma cor + crop
circular: para isso a marca precisa ser **vetor**. Me mande a variação
escolhida e eu redesenho como SVG inline, gero o favicon e integro no
header — o asset gerado vira só a referência de desenho.

Masters ficam fora da pasta servida. O que for servido sai como WebP
com alpha, ~900px.
