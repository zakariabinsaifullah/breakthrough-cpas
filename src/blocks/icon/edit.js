/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
    RichText,
    BlockControls,
    InspectorControls,
    useBlockProps,
    JustifyToolbar,
    __experimentalUseBorderProps as useBorderProps,
    __experimentalUseColorProps as useColorProps,
    __experimentalGetSpacingClassesAndStyles as useSpacingProps,
    __experimentalGetShadowClassesAndStyles as useShadowProps,
    __experimentalLinkControl as LinkControl
} from '@wordpress/block-editor';
import { link } from '@wordpress/icons';
import {
    PanelBody,
    RangeControl,
    ToolbarButton,
    Popover,
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import classNames from 'classnames';

/**
 * Internal dependencies
 */
import {
    NativeResponsiveControl,
    NativeToggleControl,
    NativeTextControl,
    NativeIconPicker,
    PanelColorControl,
    NativeSelectControl,
    NativeUnitControl
} from '../../components';

import { RenderIcon } from '../../helpers';

import './editor.scss';

export default function Edit(props) {
    const { attributes, setAttributes, className } = props;
    const {
        iconName,
        iconSize,
        customSvgCode,
        iconType,
        strokeWidth,
        justifyContent,
        href,
        linkTarget,
        sizes,
        resMode,
        heading,
        headingTag,
        showTitle,
        listGap,
        titleColor,
        titleSize,
        titleFontFamily
    } = attributes;

    const fontFamilies = useSelect(select => {
        const settings = select('core/block-editor').getSettings();
        const typography = settings?.typography || settings?.__experimentalFeatures?.typography;
        const fontFamiliesSetting = typography?.fontFamilies;

        if (!fontFamiliesSetting) {
            return [];
        }

        const families = [];
        if (Array.isArray(fontFamiliesSetting)) {
            families.push(...fontFamiliesSetting);
        } else {
            const { theme = [], custom = [], default: defaultFonts = [] } = fontFamiliesSetting;
            families.push(...theme, ...custom, ...defaultFonts);
        }

        return families;
    }, []);

    const fontFamilyOptions = [
        { label: __('Default', 'breakthrough-cpas'), value: '' },
        ...fontFamilies.map(f => {
            const value = f.fontFamily || (f.slug ? `var(--wp--preset--font-family--${f.slug})` : f.slug);
            return {
                label: f.name || f.slug || __('Unknown', 'breakthrough-cpas'),
                value: value
            };
        })
    ];

    // Default size, and the value each breakpoint falls back to when unset.
    const DEFAULT_ICON_SIZE = 32;

    const resolvedSizes = {
        Desktop: sizes?.Desktop ?? DEFAULT_ICON_SIZE,
        Tablet: sizes?.Tablet ?? sizes?.Desktop ?? DEFAULT_ICON_SIZE,
        Mobile: sizes?.Mobile ?? sizes?.Tablet ?? sizes?.Desktop ?? DEFAULT_ICON_SIZE
    };

    const isInheritedSize = undefined === sizes?.[resMode];

    // Only explicit sizes are written out; style.scss cascades the rest.
    const sizeCustomProperties = {
        ...(sizes?.Desktop && { '--dsize': `${sizes.Desktop}px` }),
        ...(sizes?.Tablet && { '--tsize': `${sizes.Tablet}px` }),
        ...(sizes?.Mobile && { '--msize': `${sizes.Mobile}px` })
    };

    const cssCustomProperties = {
        ...(listGap && { '--list-gap': `${listGap}` }),
        ...(titleColor && { '--title-color': titleColor }),
        ...(titleSize && { '--title-size': `${titleSize}` }),
        ...(titleFontFamily && { '--title-font-family': titleFontFamily })
    };

    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [listGap, titleColor, titleSize, titleFontFamily]);

    // states
    const [isEditingURL, setIsEditingURL] = useState(false);
    const [popoverAnchor, setPopoverAnchor] = useState(null);

    const borderProps = useBorderProps(attributes);
    const colorProps = useColorProps(attributes);
    const spacingProps = useSpacingProps(attributes);
    const shadowProps = useShadowProps(attributes);

    const blockProps = useBlockProps({
        style: cssCustomProperties,
        className: classNames(className, {
            [`is-${iconType}`]: iconType,
            [`justify-${justifyContent}`]: justifyContent
        })
    });

    return (
        <>
            <BlockControls group="block">
                <JustifyToolbar
                    allowedControls={['left', 'center', 'right']}
                    value={justifyContent}
                    onChange={value =>
                        setAttributes({
                            justifyContent: value
                        })
                    }
                />
                <ToolbarButton
                    ref={setPopoverAnchor}
                    name="link"
                    icon={link}
                    title={__('Link', 'breakthrough-cpas')}
                    onClick={() => setIsEditingURL(true)}
                    isActive={!!href || isEditingURL}
                />
                {isEditingURL && (
                    <Popover
                        anchor={popoverAnchor}
                        onClose={() => setIsEditingURL(false)}
                        placement="bottom"
                        focusOnMount={true}
                        offset={12}
                        className="btcpa-icon__link-popover"
                        variant="alternate"
                    >
                        <LinkControl
                            value={{
                                url: href,
                                opensInNewTab: linkTarget === '_blank'
                            }}
                            onChange={({ url: newURL = '', opensInNewTab }) => {
                                setAttributes({
                                    href: newURL,
                                    linkTarget: opensInNewTab ? '_blank' : undefined,
                                    linkRel: newURL ? 'nofollow' : undefined,
                                    tagName: 'a'
                                });
                            }}
                            onRemove={() =>
                                setAttributes({
                                    href: undefined,
                                    linkTarget: undefined,
                                    linkRel: undefined,
                                    tagName: 'div'
                                })
                            }
                        />
                    </Popover>
                )}
            </BlockControls>
            <InspectorControls>
                <PanelBody title={__('Settings', 'breakthrough-cpas')}>
                    <NativeToggleControl
                        label={__('Add List Title', 'breakthrough-cpas')}
                        checked={showTitle}
                        onChange={value => setAttributes({ showTitle: value })}
                    />
                    <NativeIconPicker
                        onIconSelect={(iconName, iconType) => {
                            setAttributes({ iconName, iconType, customSvgCode: undefined });
                        }}
                        onCustomSvgInsert={({ customSvgCode, iconType, strokeWidth }) => {
                            setAttributes({ customSvgCode, iconType, strokeWidth });
                        }}
                        iconName={iconName}
                        customSvgCode={customSvgCode}
                        iconSize={iconSize}
                        strokeWidth={strokeWidth}
                    />
                    <NativeResponsiveControl label={__('Icon Size (px)', 'breakthrough-cpas')} props={props}>
                        <RangeControl
                            value={resolvedSizes[resMode]}
                            onChange={value => setAttributes({ sizes: { ...sizes, [resMode]: value } })}
                            min={8}
                            max={256}
                            allowReset
                            help={
                                'Desktop' !== resMode && isInheritedSize
                                    ? __(
                                          'Inherited from the larger screen size. Change it to set a size just for this device.',
                                          'breakthrough-cpas'
                                      )
                                    : undefined
                            }
                            __next40pxDefaultSize
                        />
                    </NativeResponsiveControl>
                </PanelBody>
                {showTitle && (
                    <PanelBody title={__('List Title', 'breakthrough-cpas')} initialOpen={false}>
                        <NativeUnitControl
                            label={__('Gap ', 'breakthrough-cpas')}
                            value={listGap}
                            onChange={value => setAttributes({ listGap: value })}
                        />
                        {showTitle && (
                            <>
                                <NativeSelectControl
                                    label={__('Select Tag', 'breakthrough-cpas')}
                                    value={headingTag}
                                    onChange={value => setAttributes({ headingTag: value })}
                                    options={[
                                        { label: __('H1', 'breakthrough-cpas'), value: 'h1' },
                                        { label: __('H2', 'breakthrough-cpas'), value: 'h2' },
                                        { label: __('H3', 'breakthrough-cpas'), value: 'h3' },
                                        { label: __('H4', 'breakthrough-cpas'), value: 'h4' },
                                        { label: __('H5', 'breakthrough-cpas'), value: 'h5' },
                                        { label: __('H6', 'breakthrough-cpas'), value: 'h6' },
                                        { label: __('Paragraph', 'breakthrough-cpas'), value: 'p' },
                                        { label: __('Div', 'breakthrough-cpas'), value: 'div' }
                                    ]}
                                />
                                <NativeTextControl
                                    label={__('Title Text', 'breakthrough-cpas')}
                                    value={heading}
                                    onChange={value => setAttributes({ heading: value })}
                                    placeholder={__('List title...', 'breakthrough-cpas')}
                                />
                            </>
                        )}
                    </PanelBody>
                )}
            </InspectorControls>
            <InspectorControls group="styles">
                {showTitle && (
                    <ToolsPanel
                        label={__('Title', 'breakthrough-cpas')}
                        resetAll={() =>
                            setAttributes({
                                titleSize: undefined,
                                titleColor: undefined
                            })
                        }
                    >
                        <ToolsPanelItem
                            hasValue={() => !!titleSize}
                            label={__('Size', 'breakthrough-cpas')}
                            onDeselect={() => {
                                setAttributes({
                                    titleSize: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeUnitControl
                                label={__('Font Size', 'breakthrough-cpas')}
                                value={titleSize}
                                onChange={value => setAttributes({ titleSize: value })}
                            />
                        </ToolsPanelItem>

                        <ToolsPanelItem
                            hasValue={() => !!titleColor}
                            label={__('Color', 'breakthrough-cpas')}
                            onDeselect={() => {
                                setAttributes({
                                    titleColor: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <PanelColorControl
                                label={__('Color', 'breakthrough-cpas')}
                                colorSettings={[
                                    {
                                        value: titleColor,
                                        onChange: color => setAttributes({ titleColor: color }),
                                        label: __('Color', 'breakthrough-cpas')
                                    }
                                ]}
                            />
                        </ToolsPanelItem>

                        <ToolsPanelItem
                            hasValue={() => !!titleFontFamily}
                            label={__('Font', 'breakthrough-cpas')}
                            onDeselect={() => {
                                setAttributes({
                                    titleFontFamily: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeSelectControl
                                label={__('Font', 'breakthrough-cpas')}
                                value={titleFontFamily}
                                onChange={value => setAttributes({ titleFontFamily: value })}
                                options={fontFamilyOptions}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}
            </InspectorControls>
            <div {...blockProps}>
                <div className="btcpa-icon-block-wrapper">
                    <div
                        className={classNames('icon-container', colorProps.className, borderProps.className)}
                        style={{
                            ...borderProps.style,
                            ...colorProps.style,
                            ...spacingProps.style,
                            ...shadowProps.style,
                            ...sizeCustomProperties
                        }}
                    >
                        <RenderIcon customSvgCode={customSvgCode} iconName={iconName} size={iconSize} />
                    </div>
                    {showTitle && (
                        <div className="icon-content">
                            <RichText
                                tagName={headingTag}
                                value={heading}
                                onChange={value => setAttributes({ heading: value })}
                                placeholder={__('List title...', 'breakthrough-cpas')}
                                className="icon-heading"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
