/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts () {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */'webfontloader')

  webFontLoader.load({
    google: {
      
      families: ['Bellefair ','Grandiflora One','Homemade Apple', 
      'Pinyon Script', 'Petit Formal Script', 'Caudex', 'Glegoo', 
      'Kameron', 'BioRhyme', 'Hepta Slab', 'Major Mono Display', 
      'Marcellus', 'Cinzel', 'Quattrocento'],
      /* 'Roboto:100,300,400,500,700,900&display=swap' */
    },
  })
}
