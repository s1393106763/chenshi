import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '../button.vue';

describe('Button.vue', () => {
  it('should render slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Hello Chenshi',
      },
    });
    expect(wrapper.text()).toContain('Hello Chenshi');
    expect(wrapper.classes()).toContain('chenshi-button');
  });

  it('should handle type prop', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info'] as const;
    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: { type },
      });
      expect(wrapper.classes()).toContain(`chenshi-button--${type}`);
    });
  });

  it('should handle size prop', () => {
    const sizes = ['large', 'normal', 'small', 'mini'] as const;
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size },
      });
      expect(wrapper.classes()).toContain(`chenshi-button--${size}`);
    });
  });

  it('should handle plain, round, circle props', () => {
    const wrapper = mount(Button, {
      props: {
        plain: true,
        round: true,
        circle: true,
      },
    });
    expect(wrapper.classes()).toContain('is-plain');
    expect(wrapper.classes()).toContain('is-round');
    expect(wrapper.classes()).toContain('is-circle');
  });

  it('should handle disabled prop', async () => {
    const handleClick = vi.fn();
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
      attrs: {
        onClick: handleClick,
      },
    });

    expect(wrapper.classes()).toContain('is-disabled');
    expect(wrapper.attributes('disabled')).toBeDefined();
    
    await wrapper.trigger('click');
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should handle loading prop', async () => {
    const handleClick = vi.fn();
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
      attrs: {
        onClick: handleClick,
      },
    });

    expect(wrapper.classes()).toContain('is-loading');
    expect(wrapper.find('.chenshi-button__loading').exists()).toBe(true);
    expect(wrapper.attributes('disabled')).toBeDefined();

    await wrapper.trigger('click');
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should render icon when icon prop is provided', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'chenshi-icon-edit',
      },
    });
    expect(wrapper.find('.chenshi-button__icon i').classes()).toContain('chenshi-icon-edit');
  });

  it('should emit click event when clicked', async () => {
    const wrapper = mount(Button);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('should handle nativeType prop', () => {
    const wrapper = mount(Button, {
      props: {
        nativeType: 'submit',
      },
    });
    expect(wrapper.attributes('type')).toBe('submit');
  });
});
