import type {ParamListBase, StackActionHelpers} from '@react-navigation/native';
import {StackRouter, useNavigationBuilder} from '@react-navigation/native';
import {NativeStackView} from '@react-navigation/native-stack';
import type {NativeStackNavigationEventMap, NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {useMemo} from 'react';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import withNativeNavigationOptions from '@libs/Navigation/PlatformStackNavigation/platformOptions/withNativeNavigationOptions';
import type {
    PlatformStackNavigationOptions,
    PlatformStackNavigationState,
    PlatformStackNavigatorProps,
    PlatformStackRouterOptions,
    PlatformStackScreenOptionsWithoutNavigation,
} from '@libs/Navigation/PlatformStackNavigation/types';
import type {CreatePlaformStackNavigatorOptions, CustomComponentProps, PlatformNavigationBuilderOptions} from './types';

function createPlatformStackNavigatorComponent<RouterOptions extends PlatformStackRouterOptions = PlatformStackRouterOptions>(
    displayName: string,
    options?: CreatePlaformStackNavigatorOptions<RouterOptions>,
) {
    const createRouter = options?.createRouter ?? StackRouter;
    const transformState = options?.transformState;
    const ExtraContent = options?.ExtraContent;
    const NavigationContentWrapper = options?.NavigationContentWrapper;

    function PlatformNavigator({id, initialRouteName, screenOptions, screenListeners, children, ...props}: PlatformStackNavigatorProps<ParamListBase>) {
        const styles = useThemeStyles();
        const windowDimensions = useWindowDimensions();

        const nativeScreenOptions = withNativeNavigationOptions(screenOptions);

        const transformScreenProps = <ParamList2 extends ParamListBase, RouteName extends keyof ParamList2>(
            screenOptionsToTransform: PlatformStackScreenOptionsWithoutNavigation<ParamList2, RouteName>,
        ) => withNativeNavigationOptions<ParamList2, RouteName>(screenOptionsToTransform);

        const {navigation, state, descriptors, NavigationContent} = useNavigationBuilder<
            PlatformStackNavigationState<ParamListBase>,
            RouterOptions,
            StackActionHelpers<ParamListBase>,
            PlatformStackNavigationOptions,
            NativeStackNavigationEventMap,
            NativeStackNavigationOptions
        >(
            createRouter,
            {
                id,
                children,
                screenOptions: nativeScreenOptions,
                screenListeners,
                initialRouteName,
            } as PlatformNavigationBuilderOptions<NativeStackNavigationOptions, NativeStackNavigationEventMap, ParamListBase, RouterOptions>,
            transformScreenProps,
        );

        const {stateToRender, searchRoute} = transformState?.({state, displayName, styles, windowDimensions, descriptors}) ?? {stateToRender: state, undefined};

        const customComponentProps = useMemo<CustomComponentProps<NativeStackNavigationOptions, NativeStackNavigationEventMap>>(
            () => ({
                state,
                displayName,
                searchRoute,
                descriptors,
            }),
            [state, searchRoute, descriptors],
        );

        const Content = useMemo(
            () => (
                <NavigationContent>
                    <NativeStackView
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...props}
                        state={stateToRender}
                        descriptors={descriptors}
                        navigation={navigation}
                    />

                    {ExtraContent && (
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        <ExtraContent {...customComponentProps} />
                    )}
                </NavigationContent>
            ),
            [NavigationContent, customComponentProps, descriptors, navigation, props, stateToRender],
        );

        // eslint-disable-next-line react/jsx-props-no-spreading
        return NavigationContentWrapper === undefined ? Content : <NavigationContentWrapper {...customComponentProps}>{Content}</NavigationContentWrapper>;
    }
    PlatformNavigator.displayName = displayName;

    return PlatformNavigator;
}

export default createPlatformStackNavigatorComponent;
