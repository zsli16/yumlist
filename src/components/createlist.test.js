import React from 'react';
import {mount, shallow} from 'enzyme';
import CreateList from './createlist';

describe('unit test component CreateList', () => {
  let wrapper;
  let button;

  beforeEach(() => {
    wrapper = shallow(<CreateList />);
    button = wrapper.find('button');
  });

  it('all components are present', () => {
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('input').length).toBe(3);
    expect(wrapper.find('button').length).toBe(1);
  });

  it('saveList button is enabled if all input are filled in', () => {
    const firstInput = wrapper.find({ name: 'list-title' })
    firstInput.simulate('change', { target: { value: 'aa' } })
    const secondInput = wrapper.find({ name: 'list-details' })
    secondInput.simulate('change', { target: { value: 'aa' } })
    const thirdInput = wrapper.find({ name: 'list-location' })
    thirdInput.simulate('change', { target: { value: 'aa' } })
    wrapper.instance().updateSendEnable();
    expect(wrapper.find('button').at(0).props().disabled).toBe(false);

  });

  it('saveList button is disabled if at least one input is missing', () => {
    const firstInput = wrapper.find({ name: 'list-title' })
    firstInput.simulate('change', { target: { value: '' } })
    const secondInput = wrapper.find({ name: 'list-details' })
    secondInput.simulate('change', { target: { value: 'aa' } })
    const thirdInput = wrapper.find({ name: 'list-location' })
    thirdInput.simulate('change', { target: { value: 'aa' } })
    wrapper.instance().updateSendEnable();
    expect(wrapper.find('button').at(0).props().disabled).toBe(true);
  });
});

