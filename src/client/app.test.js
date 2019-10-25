import App from './app';

describe('App', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find('div').text()).toBe('React Boiler Plate');
    expect(wrapper).toMatchSnapshot();
  });
});