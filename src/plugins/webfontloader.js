/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts () {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */'webfontloader')

  webFontLoader.load({
    google: {
      
      families: ['Bellefair ','Roboto','Grandiflora One','Homemade Apple', 
      'Pinyon Script', 'Petit Formal Script', 'Caudex', 'Glegoo', 
      'Kameron', 'BioRhyme', 'Hepta Slab', 'Major Mono Display', 
      'Marcellus', 'Cinzel', 'Quattrocento'],
      
    },
  })
}
