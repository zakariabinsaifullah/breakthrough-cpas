/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { NativeRangeControl, NativeSelectControl } from '../../../components';

const HoverTransitionControls = ( { attributes, setAttributes } ) => {
    const {
        hoverTransitionDuration,
        hoverTransitionTiming,
        hoverTextColor,
        hoverBackgroundColor,
        hoverBorderColor,
        customHoverTextColor,
        customHoverBackgroundColor,
        customHoverBorderColor
    } = attributes;

    const hasHoverColor =
        customHoverBorderColor ||
        customHoverTextColor ||
        customHoverBackgroundColor ||
        hoverTextColor ||
        hoverBackgroundColor ||
        hoverBorderColor;

    if ( ! hasHoverColor ) {
        return null;
    }

    const timingOptions = [
        { label: __( 'Standard', 'insignia-capital-corp' ), value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
        { label: __( 'Ease', 'insignia-capital-corp' ), value: 'ease' },
        { label: __( 'Linear', 'insignia-capital-corp' ), value: 'linear' },
        { label: __( 'Ease In', 'insignia-capital-corp' ), value: 'ease-in' },
        { label: __( 'Ease Out', 'insignia-capital-corp' ), value: 'ease-out' },
        { label: __( 'Ease In Out', 'insignia-capital-corp' ), value: 'ease-in-out' }
    ];

    return (
        <div
            className="incc-hover-color__transition-controls"
            style={ {
                gridTemplateColumns: 'repeat(2, minmax(0px, 1fr))',
                gap: 'calc(16px)',
                gridColumn: '1 / -1'
            } }
        >
            <NativeRangeControl
                label={ __( 'Transition Duration', 'insignia-capital-corp' ) }
                value={ hoverTransitionDuration }
                onChange={ value => setAttributes( { hoverTransitionDuration: value } ) }
                min={ 0 }
                max={ 2000 }
                step={ 50 }
                resetFallbackValue={ 200 }
                help={ __( 'Duration in milliseconds', 'insignia-capital-corp' ) }
            />
            <NativeSelectControl
                label={ __( 'Timing Function', 'insignia-capital-corp' ) }
                value={ hoverTransitionTiming }
                options={ timingOptions }
                onChange={ value => setAttributes( { hoverTransitionTiming: value } ) }
            />
        </div>
    );
};

export default HoverTransitionControls;
