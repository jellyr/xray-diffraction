// Copyright 2019-2020, University of Colorado Boulder

/**
 * Shows the major parameters, including frequency, wavelength, amplitude, path length difference, etc.
 *
 * @author Todd Holden (Queensborough Community College of CUNY)
 */
  // modules
  import merge from '../../../../phet-core/js/merge.js';
  import Node from '../../../../scenery/js/nodes/Node.js';
  import Panel from '../../../../sun/js/Panel.js';
  import Property from '../../../../axon/js/Property.js';
  import RichText from '../../../../scenery/js/nodes/RichText.js';
  import Utils from '../../../../dot/js/Utils.js';
  import xrayDiffractionStrings from '../../xrayDiffractionStrings.js';
  import xrayDiffraction from '../../xrayDiffraction.js';

  // strings
  const wavelengthUnitString = xrayDiffractionStrings.wavelengthUnit;
  const angleUnitString = xrayDiffractionStrings.angleUnit;
  const incidentAngleString = xrayDiffractionStrings.incidentAngle;
  const wavelengthString = xrayDiffractionStrings.wavelength;
  const aLatticeConstantString = xrayDiffractionStrings.aLatticeConstant;
  const bLatticeConstantString = xrayDiffractionStrings.bLatticeConstant;
  const distanceString = xrayDiffractionStrings.distance;
  
  //constants
  //const ENERGY_FONT = new PhetFont( { size: 22, weight: 'bold' } );
  const INSET = 10;
  const LABEL_SPACING = 5;
  
      
  class XrayParameterPanel extends Panel {

    /**
     * @param {WavesModel} model
     * @param {Object} [options]
     */
    constructor( model, options ) {
      options = merge ( {
        xMargin: 15,
        yMargin: 8,
        fill: '#F0F0F0',
        stroke: 'gray',
        lineWidth: 1
      }, options );

      // Text nodes that reflects the incident angle, lattice parameters, wavelength, 2dsin(Theta), and 2dsin(Theta)/wavelength
      const angleText = new RichText( '?', { /*font: ENERGY_FONT, fill: Color.BLACK */  maxWidth: 400 } );
      const latticeConstanstText = new RichText( '?', { maxWidth: 400 } );
      const wavelengthText = new RichText( '?', { maxWidth: 400 } );
      const _2dSinText = new RichText( '?', { maxWidth: 400 } );
      const _2dSinLambdaText = new RichText( '?', { maxWidth: 400 } );
     
      // Links the current incident angle, lattice parameters, wavelength, 2dsin(Theta), and 2dsin(Theta)/wavelength to the text variables declared above
      Property.multilink( [
        model.sourceAngleProperty,
        model.lattice.latticeConstantsP,
        model.sourceWavelengthProperty
        ], () => {
          angleText.text = incidentAngleString + ' = ' + Utils.toFixed( model.sourceAngleProperty.value * 180 / Math.PI, 1 ) + angleUnitString;
          latticeConstanstText.text = aLatticeConstantString + ' = ' + Utils.toFixed( model.lattice.latticeConstantsP.value.x, 1 ) + wavelengthUnitString +
                             '   ' + bLatticeConstantString + ' = ' + distanceString + ' = ' + Utils.toFixed( model.lattice.latticeConstantsP.value.z, 1 ) + wavelengthUnitString;
          wavelengthText.text = wavelengthString + ' = ' + Utils.toFixed( model.sourceWavelengthProperty.value, 1 ) + wavelengthUnitString;
          _2dSinText.text = '2d sin(θ) = ' + Utils.toFixed( 2 * model.lattice.latticeConstantsP.value.z * Math.sin(model.sourceAngleProperty.value), 1 ) + wavelengthUnitString;
          _2dSinLambdaText.text = '2d sin(θ)/λ = ' + Utils.toFixed( 2 * model.lattice.latticeConstantsP.value.z * Math.sin(model.sourceAngleProperty.value) / model.sourceWavelengthProperty.value, 2 );
        } );
      
      const content = new Node();
      content.addChild( angleText );
      content.addChild( latticeConstanstText );
      content.addChild( wavelengthText );
      content.addChild( _2dSinText );
      content.addChild( _2dSinLambdaText );

      // Define positioning in the panel
      angleText.left = INSET;
      angleText.top = INSET;
      latticeConstanstText.left = INSET;
      latticeConstanstText.top = angleText.bottom + LABEL_SPACING;
      wavelengthText.left = INSET;
      wavelengthText.top = latticeConstanstText.bottom + LABEL_SPACING;
      _2dSinText.left = INSET;
      _2dSinText.top = wavelengthText.bottom + LABEL_SPACING;
      _2dSinLambdaText.left = INSET;
      _2dSinLambdaText.top = _2dSinText.bottom + LABEL_SPACING;

      super( content, options );
    }
  }

xrayDiffraction.register( 'XrayParameterPanel', XrayParameterPanel );
export default XrayParameterPanel;