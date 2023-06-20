import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.created(<App />).toJSON();
    expect(tree).toMatchSnapshot();
})