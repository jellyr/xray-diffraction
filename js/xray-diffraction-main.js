// Copyright 2020, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Todd Holden (Queensborough Community College of CUNY)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import xrayDiffractionStrings from './xrayDiffractionStrings.js';
import XrayDiffractionScreen from './xray-diffraction/XrayDiffractionScreen.js';

const xrayDiffractionTitleString = xrayDiffractionStrings[ 'xray-diffraction' ].title;

const simOptions = {
  credits: {
    //TODO fill in credits, all of these fields are optional, see joist.CreditsNode
    leadDesign: '',
    softwareDevelopment: '',
    team: '',
    qualityAssurance: '',
    graphicArts: '',
    soundDesign: '',
    thanks: ''
  }
};

// launch the sim - beware that scenery Image nodes created outside of simLauncher.launch() will have zero bounds
// until the images are fully loaded, see https://github.com/phetsims/coulombs-law/issues/70
simLauncher.launch( () => {
  const sim = new Sim( xrayDiffractionTitleString, [
    new XrayDiffractionScreen( Tandem.ROOT.createTandem( 'xrayDiffractionScreen' ) )
  ], simOptions );
  sim.start();
} );