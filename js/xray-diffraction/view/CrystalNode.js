// Copyright 2019-2020, University of Colorado Boulder

/**
 * View for the Crystal lattice, displays a 2D array of atomic nuclei to represent the crystal.
 *
 * @author Todd Holden (Queensborough Community College of CUNY)
 */
  // modules
  import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
  import Circle from '../../../../scenery/js/nodes/Circle.js';
  import Node from '../../../../scenery/js/nodes/Node.js';
  import RadialGradient from '../../../../scenery/js/util/RadialGradient.js';
  import RichText from '../../../../scenery/js/nodes/RichText.js';
  import xrayDiffraction from '../../xrayDiffraction.js';

  // constants
  const RADIUS = 5;   //Atomic Nucleus Radius
  const DIMENSION_ARROW_OPTIONS = { fill: 'black', stroke: null, tailWidth: 2, headWidth: 7, headHeight: 20, doubleHead: true };
  const ScaleF = 8;
  
  class CrystalNode extends Node {
    /**
     * @param {Array of Vector2} lattice - Array of points for the crystal lattice
     */
    constructor( lattice ) {

      //----------------------------------------------------------------------------------------

      super();
      
      const atomsNode = new Node( );
      let xMin = 0;
      let yMin = 0;

      lattice.sites.forEach( function (site) {
        const atom = new Circle( RADIUS, {
          x: ScaleF * site.x, y: ScaleF * site.y,
          fill: new RadialGradient( 2, -3, 2, 2, -3, 7 )
            .addColorStop( 0, '#f97d7d' )
            .addColorStop( 0.5, '#ed4545' )
            .addColorStop( 1, '#f00' )
        } );
        if (site.x < xMin) { xMin = site.x; }
        if (site.y < yMin) { yMin = site.y; }
        atomsNode.addChild( atom );
      });
      this.addChild(atomsNode);
      
      // Label lattice constants
      const aDimensionArrow = new ArrowNode( ScaleF * xMin, ScaleF * lattice.latticeConstantsP.value.z, ScaleF * (xMin + lattice.latticeConstantsP.value.x), ScaleF * lattice.latticeConstantsP.value.z, DIMENSION_ARROW_OPTIONS );
      const bDimensionArrow = new ArrowNode( ScaleF * xMin, 0, ScaleF * xMin, ScaleF * lattice.latticeConstantsP.value.z, DIMENSION_ARROW_OPTIONS );
      const dDimensionArrow = new ArrowNode( ScaleF * xMin, ScaleF * yMin, ScaleF * xMin, ScaleF * (yMin + lattice.latticeConstantsP.value.z), DIMENSION_ARROW_OPTIONS );
      this.addChild( aDimensionArrow );
      this.addChild( bDimensionArrow );
      this.addChild( dDimensionArrow );
      const aDimensionLabel = new RichText( 'a', { maxWidth: 400, centerX: aDimensionArrow.centerX, top: aDimensionArrow.centerY } );
      const bDimensionLabel = new RichText( 'b', { maxWidth: 400, centerY: bDimensionArrow.centerY, right: bDimensionArrow.centerX - 5 } );
      const dDimensionLabel = new RichText( 'd', { maxWidth: 400, centerY: dDimensionArrow.centerY, right: dDimensionArrow.centerX - 5 } );
      
      // fake labels to keep field centered
      const fakeLabel1 = new RichText( 'd', { fill: 'white', width: dDimensionLabel.width, centerY: dDimensionArrow.centerY, left: - dDimensionArrow.centerX + 5 } );
      const fakeLabel2 = new RichText( 'a', { fill: 'white', width: dDimensionLabel.width, centerX: aDimensionArrow.centerX, bottom: - aDimensionArrow.centerY } );
      this.addChild( aDimensionLabel );
      this.addChild( bDimensionLabel );
      this.addChild( dDimensionLabel );
      this.addChild( fakeLabel1 );
      this.addChild( fakeLabel2 );
    }
  }

xrayDiffraction.register( 'CrystalNode', CrystalNode );
export default CrystalNode;