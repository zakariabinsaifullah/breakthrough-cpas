import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
    __experimentalToolsPanelItem as ToolsPanelItem // eslint-disable-line
} from '@wordpress/components';
import { NativeTextControl, PanelColorControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { tabTitles, navItemBg, numberBg, numberColor } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Tabs', 'insignia-capital-corp')} initialOpen={true}>
                    {tabTitles &&
                        tabTitles.length > 0 &&
                        tabTitles.map((item, index) => (
                            <NativeTextControl
                                key={index}
                                label={__('Title', 'insignia-capital-corp')}
                                value={item?.title}
                                onChange={v => {
                                    const newItems = [...tabTitles];
                                    newItems[index].title = v;
                                    setAttributes({
                                        tabTitles: newItems
                                    });
                                }}
                            />
                        ))}
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <ToolsPanel
                    label={__('Colors', 'insignia-capital-corp')}
                    resetAll={() =>
                        setAttributes({
                            navItemBg: undefined,
                            numberBg: undefined,
                            numberColor: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!navItemBg}
                        label={__('Nav Item Background', 'insignia-capital-corp')}
                        onDeselect={() => setAttributes({ navItemBg: undefined })}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Nav Item Background', 'insignia-capital-corp')}
                            colorSettings={[
                                {
                                    value: navItemBg,
                                    onChange: color => setAttributes({ navItemBg: color }),
                                    label: __('Background', 'insignia-capital-corp')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!numberBg}
                        label={__('Number Background', 'insignia-capital-corp')}
                        onDeselect={() => setAttributes({ numberBg: undefined })}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Number Background', 'insignia-capital-corp')}
                            colorSettings={[
                                {
                                    value: numberBg,
                                    onChange: color => setAttributes({ numberBg: color }),
                                    label: __('Background', 'insignia-capital-corp')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!numberColor}
                        label={__('Number Text', 'insignia-capital-corp')}
                        onDeselect={() => setAttributes({ numberColor: undefined })}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Number Text', 'insignia-capital-corp')}
                            colorSettings={[
                                {
                                    value: numberColor,
                                    onChange: color => setAttributes({ numberColor: color }),
                                    label: __('Text', 'insignia-capital-corp')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>
        </>
    );
};

export default Inspector;
