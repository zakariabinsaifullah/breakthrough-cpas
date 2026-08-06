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
                <PanelBody title={__('Marquee Settings', 'insignia-capital-corp')}>
                    <NativeToggleGroupControl
                        label={__('Orientation', 'insignia-capital-corp')}
                        value={orientation}
                        onChange={value => setAttributes({ orientation: value })}
                        options={[
                            { value: 'horizontal', label: __('Horizontal', 'insignia-capital-corp') },
                            { value: 'vertical', label: __('Vertical', 'insignia-capital-corp') }
                        ]}
                    />

                    <NativeToggleGroupControl
                        label={__('Direction', 'insignia-capital-corp')}
                        value={direction}
                        onChange={value => setAttributes({ direction: value })}
                        options={[
                            {
                                value: 'left',
                                label: orientation === 'vertical' ? __('Up', 'insignia-capital-corp') : __('Left', 'insignia-capital-corp')
                            },
                            {
                                value: 'right',
                                label: orientation === 'vertical' ? __('Down', 'insignia-capital-corp') : __('Right', 'insignia-capital-corp')
                            }
                        ]}
                    />

                    <NativeRangeControl
                        label={__('Speed', 'insignia-capital-corp')}
                        value={speed}
                        onChange={value => setAttributes({ speed: value })}
                        min={1}
                        max={200}
                        step={1}
                        help={__('Higher values = Slower scrolling', 'insignia-capital-corp')}
                    />
                    <NativeRangeControl
                        label={__('Gap between items (px)', 'insignia-capital-corp')}
                        value={gap}
                        onChange={value => setAttributes({ gap: value })}
                        min={1}
                        max={100}
                        step={1}
                    />
                    {orientation === 'vertical' && (
                        <NativeRangeControl
                            label={__('Vertical Height', 'insignia-capital-corp')}
                            value={height || 500}
                            onChange={value => setAttributes({ height: value })}
                            min={200}
                            max={1000}
                            help={__('Set the visible height for vertical scrolling', 'insignia-capital-corp')}
                        />
                    )}
                    <NativeToggleControl
                        label={__('Pause on Hover', 'insignia-capital-corp')}
                        checked={pauseOnHover}
                        onChange={value => setAttributes({ pauseOnHover: value })}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    );
};

export default Inspector;
