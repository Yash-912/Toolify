const chroma = require('chroma-js');

exports.colorPicker = (req, res) => {
  const { hex = '' } = req.body;

  if (!hex || !chroma.valid(hex)) {
    return res.status(400).json({ success: false, message: 'Invalid HEX color.' });
  }

  const rgb = chroma(hex).rgb();
  const hsl = chroma(hex).hsl();
  const lighten = chroma(hex).brighten(1).hex();
  const darken = chroma(hex).darken(1).hex();

  return res.status(200).json({
    success: true,
    color: {
      input: hex,
      rgb,
      hsl,
      variations: {
        lighten,
        darken
      }
    }
  });
};

exports.colorPalette = (req, res) => {
  const { base = '#3498db', mode = 'analogous' } = req.body;

  if (!chroma.valid(base)) {
    return res.status(400).json({ success: false, message: 'Invalid base color.' });
  }

  let palette = [];

  try {
    const scale = chroma.scale([base]).mode('lch');

    switch (mode) {
      case 'analogous':
        palette = chroma.scale([chroma(base).set('hsl.h', '-30'), base, chroma(base).set('hsl.h', '+30')]).colors(5);
        break;
      case 'complementary':
        palette = [base, chroma(base).set('hsl.h', '+180').hex()];
        break;
      case 'monochromatic':
        palette = chroma.scale([chroma(base).darken(2), base, chroma(base).brighten(2)]).colors(5);
        break;
      case 'triadic':
        palette = [
          base,
          chroma(base).set('hsl.h', '+120').hex(),
          chroma(base).set('hsl.h', '-120').hex()
        ];
        break;
      default:
        palette = scale.colors(5);
    }

    return res.status(200).json({ success: true, palette });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Palette generation failed.', error: err.message });
  }
};
