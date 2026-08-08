import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { allowedBlocks } from './allowed-blocks';
import { NativeIconPicker, NativeToggleControl, NativeToggleGroupControl, NativeUnitControl, PanelColorControl } from '../../components';
import { getSVGString } from '../../helpers';

// Track panel open state
let initialOpen = false;

const btcpaIconicButtonPanel = createHigherOrderComponent( BlockEdit => {
    return props => {
        // Check if the block is in the allowed list
        if ( ! allowedBlocks.includes( props.name ) ) {
            return <BlockEdit { ...props } />;
        }

        const { attributes, setAttributes, clientId, isSelected } = props;
        const {
            iconicButtonEnabled,
            iconicButtonIconName,
            iconicButtonCustomSvg,
            iconicButtonIconPosition,
            iconicButtonIconSize,
            iconicButtonIconGap,
            iconicButtonUniqueClass,
            iconicButtonIconPadding,
            iconicButtonIconBgColor
        } = attributes;

        return (
            <>
                <BlockEdit key="edit" { ...props } />
                { isSelected && (
                    <InspectorControls>
                        <PanelBody title={ __( 'Icon Settings', 'breakthrough-cpas' ) } initialOpen={ initialOpen }>
                            <NativeToggleControl
                                label={ __( 'Add Icon to Button', 'breakthrough-cpas' ) }
                                checked={ iconicButtonEnabled }
                                onChange={ () => {
                                    const newEnabled = ! iconicButtonEnabled;
                                    const newAttrs = { iconicButtonEnabled: newEnabled };
                                    if ( newEnabled && ! iconicButtonUniqueClass ) {
                                        newAttrs.iconicButtonUniqueClass = `btcpa-icon-button-${ clientId.slice( 0, 8 ) }`;
                                    }
                                    setAttributes( newAttrs );
                                    initialOpen = true;
                                } }
                            />
                            { iconicButtonEnabled && (
                                <>
                                    <NativeIconPicker
                                        onIconSelect={ ( iconName, iconType, iconObj ) => {
                                            // Important: We save the icon SVG string so it works with CSS masks in PHP
                                            const svgString = getSVGString( iconObj );
                                            setAttributes( {
                                                iconicButtonIcon: svgString,
                                                iconicButtonIconName: iconName,
                                                iconicButtonIconType: iconType,
                                                iconicButtonCustomSvg: ''
                                            } );
                                        } }
                                        onCustomSvgInsert={ ( { customSvgCode, iconType } ) => {
                                            setAttributes( {
                                                iconicButtonCustomSvg: customSvgCode,
                                                iconicButtonIconType: iconType,
                                                iconicButtonIconName: '',
                                                iconicButtonIcon: ''
                                            } );
                                        } }
                                        iconName={ iconicButtonIconName }
                                        customSvgCode={ iconicButtonCustomSvg }
                                        iconSize={ 24 }
                                    />
                                    <NativeToggleGroupControl
                                        label={ __( 'Position', 'breakthrough-cpas' ) }
                                        value={ iconicButtonIconPosition }
                                        options={ [
                                            { label: __( 'Before', 'breakthrough-cpas' ), value: 'btcpa-icon-before' },
                                            { label: __( 'After', 'breakthrough-cpas' ), value: '' }
                                        ] }
                                        onChange={ value => setAttributes( { iconicButtonIconPosition: value } ) }
                                    />
                                    <NativeUnitControl
                                        label={ __( 'Size', 'breakthrough-cpas' ) }
                                        value={ iconicButtonIconSize }
                                        onChange={ value => setAttributes( { iconicButtonIconSize: value } ) }
                                        mb="16px"
                                    />
                                    <NativeUnitControl
                                        label={ __( 'Gap', 'breakthrough-cpas' ) }
                                        value={ iconicButtonIconGap }
                                        onChange={ value => setAttributes( { iconicButtonIconGap: value } ) }
                                        mb="16px"
                                    />
                                    <NativeUnitControl
                                        label={ __( 'Icon Padding', 'breakthrough-cpas' ) }
                                        value={ iconicButtonIconPadding }
                                        onChange={ value => setAttributes( { iconicButtonIconPadding: value } ) }
                                        mb="16px"
                                    />
                                    <PanelColorControl
                                        label={ __( 'Icon Background', 'breakthrough-cpas' ) }
                                        colorSettings={ [
                                            {
                                                value: iconicButtonIconBgColor,
                                                onChange: color => setAttributes( { iconicButtonIconBgColor: color } )
                                            }
                                        ] }
                                    />
                                </>
                            ) }
                        </PanelBody>
                    </InspectorControls>
                ) }
            </>
        );
    };
}, 'withBtcpaIconicButtonPanel' );

addFilter( 'editor.BlockEdit', 'btcpa/iconic-button-panel', btcpaIconicButtonPanel );
