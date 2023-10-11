const baseSat = '77%';
const baseLight = '63%';
const selectSat = '58%';
const selectLight = '58%';

const graphColors = {
  // nodes
  resource: {
    base: `hsl(31, ${baseSat}, ${baseLight})`,
    selected: `hsl(31, ${selectSat}, ${selectLight})`,
  },
  input: {
    base: `hsl(0, ${baseSat}, ${baseLight})`,
    selected: `hsl(0, ${selectSat}, ${selectLight})`,
  },
  handGathered: {
    base: `hsl(261, ${baseSat}, ${baseLight})`,
    selected: `hsl(261, ${selectSat}, ${selectLight})`,
  },
  sideProduct: {
    base: `hsl(311, ${baseSat}, ${baseLight})`,
    selected: `hsl(311, ${selectSat}, ${selectLight})`,
  },
  finalProduct: {
    base: `hsl(128, ${baseSat}, ${baseLight})`,
    selected: `hsl(128, ${selectSat}, ${selectLight})`,
  },
  recipe: {
    base: `hsl(197, ${baseSat}, ${baseLight})`,
    selected: `hsl(197, ${selectSat}, ${selectLight})`,
  },
  nuclear: {
    base: `hsl(50, ${baseSat}, ${baseLight})`,
    selected: `hsl(50, ${selectSat}, ${selectLight})`,
  },

  // edges
  edge: { line: '#999999', label: '#eeeeee' },
  incoming: {
    line: `hsl(31, ${baseSat}, ${baseLight})`,
    label: `hsl(31, ${baseSat}, ${baseLight})`,
  },
  outgoing: {
    line: `hsl(128, ${baseSat}, ${baseLight})`,
    label: `hsl(128, ${baseSat}, ${baseLight})`,
  },
};

export const stylesheet = [
  {
    // ====== BASE ====== //
    selector: 'core',
    style: {
      'active-bg-color': '#000',
      'active-bg-opacity': 0,
      'active-bg-size': 0,
      'selection-box-color': '#000',
      'selection-box-border-color': '#000',
      'selection-box-border-width': 0,
      'selection-box-opacity': 0,
      'outside-texture-bg-color': '#000',
      'outside-texture-bg-opacity': 0,
    },
  },
  {
    selector: 'node',
    style: {
      label: 'data(label)',
      'text-valign': 'center',
      'text-halign': 'center',
      height: '30px',
      width: '150px',
      'text-max-width': '157px',
      'padding-top': '20px',
      'overlay-padding': 0,
      'overlay-opacity': 0,
      'text-wrap': 'wrap',
      'font-size': '14px',
    },
  },
  {
    selector: 'edge',
    style: {
      label: 'data(label)',
      width: 1,
      'curve-style': 'bezier',
      'control-point-step-size': 100,
      'target-arrow-shape': 'triangle-backcurve',
      'arrow-scale': 1.2,
      'overlay-padding': 0,
      'overlay-opacity': 0,
      'text-wrap': 'wrap',
      'font-size': '14px',
      color: graphColors.edge.label,
      'line-color': graphColors.edge.line,
      'target-arrow-color': graphColors.edge.line,
    },
  },
  {
    selector: 'edge.loop',
    style: {
      'loop-direction': '180deg',
      'loop-sweep': '-40deg',
      'edge-distances': 'node-position',
      'source-endpoint': '-15% 50%',
      'target-endpoint': '15% 50%',
    },
  },

  // ====== NODES ====== //
  {
    selector: 'node.item-shape',
    style: {
      shape: 'ellipse',
      height: '40px',
      width: '130px',
    },
  },
  {
    selector: 'node.recipe-shape',
    style: {
      shape: 'round-rectangle',
    },
  },
  {
    selector: 'node.selected, node.grabbed',
    style: {
      'z-index': 100,
      height: '45px',
      width: '195px',
      'text-max-width': '192px',
      'font-size': '16px',
      'font-weight': 'bold',
      'border-width': 2,
    },
  },
  {
    selector: 'node.item-shape.selected, node.item-shape.grabbed',
    style: {
      height: '55px',
      width: '170px',
    },
  },
  {
    selector: 'node.resource',
    style: { 'background-color': graphColors.resource.base },
  },
  {
    selector: 'node.resource.selected, node.resource.grabbed',
    style: { 'background-color': graphColors.resource.selected },
  },
  {
    selector: 'node.input',
    style: { 'background-color': graphColors.input.base },
  },
  {
    selector: 'node.input.selected, node.input.grabbed',
    style: { 'background-color': graphColors.input.selected },
  },
  {
    selector: 'node.hand-gathered',
    style: { 'background-color': graphColors.handGathered.base },
  },
  {
    selector: 'node.hand-gathered.selected, node.hand-gathered.grabbed',
    style: { 'background-color': graphColors.handGathered.selected },
  },
  {
    selector: 'node.side-product',
    style: { 'background-color': graphColors.sideProduct.base },
  },
  {
    selector: 'node.side-product.selected, node.side-product.grabbed',
    style: { 'background-color': graphColors.sideProduct.selected },
  },
  {
    selector: 'node.final-product',
    style: { 'background-color': graphColors.finalProduct.base },
  },
  {
    selector: 'node.final-product.selected, node.final-product.grabbed',
    style: { 'background-color': graphColors.finalProduct.selected },
  },
  {
    selector: 'node.recipe',
    style: { 'background-color': graphColors.recipe.base },
  },
  {
    selector: 'node.recipe.selected, node.recipe.grabbed',
    style: { 'background-color': graphColors.recipe.selected },
  },
  {
    selector: 'node.nuclear',
    style: { 'background-color': graphColors.nuclear.base },
  },
  {
    selector: 'node.nuclear.selected, node.nuclear.grabbed',
    style: { 'background-color': graphColors.nuclear.selected },
  },

  // ====== EDGES ====== //
  {
    selector: 'edge.selected, edge.grabbed',
    style: {
      width: 4,
      'font-size': '14px',
      'font-weight': 'bold',
      'text-outline-width': 2,
      'z-index': 100,
    },
  },
  {
    selector: 'edge.selected-incoming, edge.grabbed-incoming',
    style: {
      color: graphColors.incoming.label,
      'line-color': graphColors.incoming.line,
      'target-arrow-color': graphColors.incoming.line,
    },
  },
  {
    selector: 'edge.selected-outgoing, edge.grabbed-outgoing',
    style: {
      color: graphColors.outgoing.label,
      'line-color': graphColors.outgoing.line,
      'target-arrow-color': graphColors.outgoing.line,
    },
  },
];

export const NODE_TYPE = {
  FINAL_PRODUCT: 'FINAL_PRODUCT',
  SIDE_PRODUCT: 'SIDE_PRODUCT',
  INPUT_ITEM: 'INPUT_ITEM',
  HAND_GATHERED_RESOURCE: 'HAND_GATHERED_RESOURCE',
  RESOURCE: 'RESOURCE',
  RECIPE: 'RECIPE',
};

export const NODE_COLOR_CLASS = {
  [NODE_TYPE.FINAL_PRODUCT]: 'final-product',
  [NODE_TYPE.SIDE_PRODUCT]: 'side-product',
  [NODE_TYPE.INPUT_ITEM]: 'input',
  [NODE_TYPE.HAND_GATHERED_RESOURCE]: 'hand-gathered',
  [NODE_TYPE.RESOURCE]: 'resource',
  [NODE_TYPE.RECIPE]: 'recipe',
};
