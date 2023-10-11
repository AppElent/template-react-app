import PropTypes from 'prop-types';
import CytoscapeComponent from 'react-cytoscapejs';
import { useEffect, useRef, useState } from 'react';
import popper from 'cytoscape-popper';
import DefaultCytoscape from 'cytoscape';
import { Button, Container, Stack } from '@mui/material';

DefaultCytoscape.use(popper);

const Cytoscape = ({ elements, layout, ...options }) => {
  const cyRef = useRef(null);
  const popperRef = useRef(null);
  const popupRef = useRef(null);
  const graphRef = useRef(null);
  const [doFirstRender, setDoFirstRender] = useState(false);
  const [popupNode, setPopupNode] = useState(null);
  // graph page: https://github.com/Greven145/yet-another-factory-planner/blob/master/client/src/containers/ProductionPlanner/PlannerResults/ProductionGraphTab/index.tsx
  // tooltip: https://github.com/Greven145/yet-another-factory-planner/blob/master/client/src/components/GraphTooltip/index.tsx

  console.log(elements, layout);

  /**
   *
   * @param {any} instance cy instance
   */
  function setCyRef(instance) {
    if (instance && cyRef.current !== instance) {
      cyRef.current = instance;
      setCyListeners(cyRef.current);
    }
  }

  /**
   *
   * @param {any} graphRef GraphRef
   */
  function _resizeListener(graphRef) {
    if (graphRef?.current) {
      const bounds = graphRef.current.getBoundingClientRect();
      graphRef.current.style.height = `${window.innerHeight - bounds.top - 50}px`;
      //console.log(graphRef.current.style.height);
      if (cyRef.current) {
        //console.log(cyRef.current);
        cyRef.current.fit();
      }
    }
  }

  /**
   *
   * @param {any} cy cy
   */
  function setCyListeners(cy) {
    // cy.on('select', 'node', function (e) {
    //   e.target.addClass('selected');
    //   e.target.outgoers('edge').addClass('selected').addClass('selected-outgoing');
    //   e.target.incomers('edge').addClass('selected').addClass('selected-incoming');
    //   deactivatePopper(cy);
    // });

    // cy.on('unselect', 'node', function (e) {
    //   e.target.removeClass('selected');
    //   e.target.outgoers('edge').removeClass('selected').removeClass('selected-outgoing');
    //   e.target.incomers('edge').removeClass('selected').removeClass('selected-incoming');
    //   deactivatePopper(cy);
    // });

    // cy.on('grab', 'node', function (e) {
    //   e.target.addClass('grabbed');
    //   e.target.outgoers('edge').addClass('grabbed').addClass('grabbed-outgoing');
    //   e.target.incomers('edge').addClass('grabbed').addClass('grabbed-incoming');
    //   registerNodePosition(e.target.data('key'), e.target.position('x'), e.target.position('y'));
    //   deactivatePopper(cy);
    // });

    // cy.on('free', 'node', function (e) {
    //   e.target.removeClass('grabbed');
    //   e.target.outgoers('edge').removeClass('grabbed').removeClass('grabbed-outgoing');
    //   e.target.incomers('edge').removeClass('grabbed').removeClass('grabbed-incoming');
    //   if (currentNodePosition && !areNodesSame(currentNodePosition, { key: e.target.data('key'), x: e.target.position('x'), y: e.target.position('y') })) {
    //     updateStateNodePosition(e.target.data('key'), e.target.position('x'), e.target.position('y'));
    //     ctx.dispatch({ type: 'UPDATE_NODES_POSTIONS', nodesPositions: nodesPositions });
    //     currentNodePosition = undefined;
    //   }
    // });

    cy.on('mouseover', 'node', function (e) {
      const nodeId = e.target.id();
      if (popperRef.current?.nodeId === nodeId) return;
      deactivatePopper(cy);
      activatePopper(cy, e.target);
    });

    cy.on('mouseout', 'node', function (e) {
      const nodeId = e.target.id();
      if (popperRef.current?.nodeId === nodeId) {
        deactivatePopper(cy);
      }
    });
  }

  /**
   *
   * @param {any} instance Graph insance
   */
  function setGraphRef(instance) {
    if (instance && !graphRef.current) {
      graphRef.current = instance;
      _resizeListener(graphRef);
      setDoFirstRender(true);
    }
  }

  console.log(popperRef.current, cyRef.current);

  /**
   *
   * @param {any} cy cy
   * @param {any} node node
   */
  function activatePopper(cy, node) {
    const popper = node.popper({
      content: () => popupRef.current || undefined,
      popper: {
        placement: 'top',
      },
    });
    popperRef.current = { popper, nodeId: node.id() };
    node.on('position', () => {
      popper.update();
    });
    cy.on('pan zoom resize', () => {
      popper.update();
    });
    setPopupNode(node);
  }

  /**
   *
   * @param {any} cy cy instance
   */
  function deactivatePopper(cy) {
    if (!popperRef.current) return;
    const node = cy.getElementById(popperRef.current.nodeId);
    node.off('position');
    cy.off('pan zoom resize');
    popperRef.current.popper.destroy();
    popperRef.current = null;
    setPopupNode(null);
  }

  useEffect(() => {
    /**
     *
     */
    function resizeListener() {
      _resizeListener(graphRef);
    }
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  console.log(popupNode);

  return (
    <Container
      ref={setGraphRef}
      maxWidth={false}
    >
      <Stack
        spacing={1}
        justifyContent="flex-end"
        direction="row"
      >
        <Button
          onClick={() => {
            cyRef.current?.fit();
          }}
          variant="contained"
        >
          Fit Graph
        </Button>
        {/* <Button
          onClick={() => {
            cyRef.current?.reset();
          }}
          variant="outlined"
        >
          Reset positions
        </Button> */}
      </Stack>
      {doFirstRender && (
        <CytoscapeComponent
          cy={setCyRef}
          elements={elements}
          //style={{ width: '100%', height: '100%' }}
          //style={{ width: '100vw', height: '100vh' }}
          //style={{ height: '45vw', width: '100%', overflow: 'hidden' }}
          layout={layout}
          style={{ height: '70vh', width: '100%', overflow: 'hidden' }}
          // /stylesheet={}
          {...options}
        />
      )}

      <div ref={popupRef}>{JSON.stringify(popupNode?.data())}</div>
    </Container>
  );
};

Cytoscape.propTypes = {
  elements: PropTypes.array,
  layout: PropTypes.object,
};

export default Cytoscape;
