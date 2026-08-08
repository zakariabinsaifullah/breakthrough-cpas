import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

import { NativeToggleGroupControl, NativeRangeControl, NativeToggleControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { speed, direction, pauseOnHover, gap, orientation, height } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Marquee Settings', 'breakthrough-cpas')}>
                    <NativeToggleGroupControl
                        label={__('Orientation', 'breakthrough-cpas')}
                        value={orientation}
                        onChange={value => setAttributes({ orientation: value })}
                        options={[
                            { value: 'horizontal', label: __('Horizontal', 'breakthrough-cpas') },
                            { value: 'vertical', label: __('Vertical', 'breakthrough-cpas') }
                        ]}
                    />

                    <NativeToggleGroupControl
                        label={__('Direction', 'breakthrough-cpas')}
                        value={direction}
                        onChange={value => setAttributes({ direction: value })}
                        options={[
                            {
                                value: 'left',
                                label: orientation === 'vertical' ? __('Up', 'breakthrough-cpas') : __('Left', 'breakthrough-cpas')
                            },
                            {
                                value: 'right',
                                label: orientation === 'vertical' ? __('Down', 'breakthrough-cpas') : __('Right', 'breakthrough-cpas')
                            }
                        ]}
                    />

                    <NativeRangeControl
                        label={__('Speed', 'breakthrough-cpas')}
                        value={speed}
                        onChange={value => setAttributes({ speed: value })}
                        min={1}
                        max={200}
                        step={1}
                        help={__('Higher values = Slower scrolling', 'breakthrough-cpas')}
                    />
                    <NativeRangeControl
                        label={__('Gap between items (px)', 'breakthrough-cpas')}
                        value={gap}
                        onChange={value => setAttributes({ gap: value })}
                        min={1}
                        max={100}
                        step={1}
                    />
                    {orientation === 'vertical' && (
                        <NativeRangeControl
                            label={__('Vertical Height', 'breakthrough-cpas')}
                            value={height || 500}
                            onChange={value => setAttributes({ height: value })}
                            min={200}
                            max={1000}
                            help={__('Set the visible height for vertical scrolling', 'breakthrough-cpas')}
                        />
                    )}
                    <NativeToggleControl
                        label={__('Pause on Hover', 'breakthrough-cpas')}
                        checked={pauseOnHover}
                        onChange={value => setAttributes({ pauseOnHover: value })}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    );
};

export default Inspector;
