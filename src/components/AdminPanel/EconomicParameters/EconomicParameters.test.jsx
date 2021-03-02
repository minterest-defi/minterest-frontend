import React from 'react';
import renderer from 'react-test-renderer';
import EconomicParameters from './EconomicParameters';

test('simpleSnapshot', () => {
	const component = renderer.create(<EconomicParameters />);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
