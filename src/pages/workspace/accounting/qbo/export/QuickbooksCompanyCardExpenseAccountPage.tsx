import React from 'react';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import MenuItemWithTopDescription from '@components/MenuItemWithTopDescription';
import OfflineWithFeedback from '@components/OfflineWithFeedback';
import ScreenWrapper from '@components/ScreenWrapper';
import ScrollView from '@components/ScrollView';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import * as Connections from '@libs/actions/connections';
import Navigation from '@navigation/Navigation';
import AccessOrNotFoundWrapper from '@pages/workspace/AccessOrNotFoundWrapper';
import type {WithPolicyConnectionsProps} from '@pages/workspace/withPolicyConnections';
import withPolicyConnections from '@pages/workspace/withPolicyConnections';
import ToggleSettingOptionRow from '@pages/workspace/workflows/ToggleSettingsOptionRow';
import * as Policy from '@userActions/Policy';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';

function QuickbooksCompanyCardExpenseAccountPage({policy}: WithPolicyConnectionsProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const policyID = policy?.id ?? '';
    const {exportCompanyCardAccount, exportAccountPayable, autoCreateVendor, errorFields, pendingFields, exportCompanyCard} = policy?.connections?.quickbooksOnline?.config ?? {};
    const isVendorSelected = exportCompanyCard === CONST.QUICKBOOKS_EXPORT_COMPANY_CARD.VENDOR_BILL;
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const showAccountSelection = Boolean(autoCreateVendor || (!isVendorSelected && exportCompanyCard));
    const {vendors} = policy?.connections?.quickbooksOnline?.data ?? {};

    const updateAutoCreateVendor = (value: boolean) => {
        Connections.updatePolicyConnectionConfig(policyID, CONST.POLICY.CONNECTIONS.NAME.QBO, CONST.QUICK_BOOKS_CONFIG.EXPORT_COMPANY_CARD_ACCOUNT, value ? vendors?.[0]?.name : undefined);
        Connections.updatePolicyConnectionConfig(policyID, CONST.POLICY.CONNECTIONS.NAME.QBO, CONST.QUICK_BOOKS_CONFIG.AUTO_CREATE_VENDOR, value);
    };

    return (
        <AccessOrNotFoundWrapper
            policyID={policyID}
            accessVariants={[CONST.POLICY.ACCESS_VARIANTS.ADMIN]}
            featureName={CONST.POLICY.MORE_FEATURES.ARE_CONNECTIONS_ENABLED}
        >
            <ScreenWrapper
                includeSafeAreaPaddingBottom={false}
                testID={QuickbooksCompanyCardExpenseAccountPage.displayName}
            >
                <HeaderWithBackButton title={translate('workspace.qbo.exportCompany')} />
                <ScrollView contentContainerStyle={styles.pb2}>
                    <Text style={[styles.ph5, styles.pb5]}>{translate('workspace.qbo.exportCompanyCardsDescription')}</Text>
                    <OfflineWithFeedback pendingAction={pendingFields?.exportCompanyCard}>
                        <MenuItemWithTopDescription
                            title={exportCompanyCard ? translate(`workspace.qbo.${exportCompanyCard}`) : undefined}
                            description={translate('workspace.qbo.exportCompany')}
                            error={errorFields?.exportCompanyCard ? translate('common.genericErrorMessage') : undefined}
                            onPress={() => Navigation.navigate(ROUTES.POLICY_ACCOUNTING_QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_SELECT.getRoute(policyID))}
                            brickRoadIndicator={errorFields?.exportCompanyCard ? CONST.BRICK_ROAD_INDICATOR_STATUS.ERROR : undefined}
                            shouldShowRightIcon
                        />
                    </OfflineWithFeedback>
                    {!!exportCompanyCard && (
                        <Text style={[styles.ph5, styles.mutedNormalTextLabel, styles.pt1, styles.pb2]}>{translate(`workspace.qbo.${exportCompanyCard}Description`)}</Text>
                    )}
                    {isVendorSelected && (
                        <>
                            <OfflineWithFeedback pendingAction={pendingFields?.exportAccountPayable}>
                                <MenuItemWithTopDescription
                                    title={exportAccountPayable}
                                    description={translate('workspace.qbo.accountsPayable')}
                                    error={errorFields?.exportAccountPayable ? translate('common.genericErrorMessage') : undefined}
                                    onPress={() => Navigation.navigate(ROUTES.POLICY_ACCOUNTING_QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_ACCOUNT_PAYABLE_SELECT.getRoute(policyID))}
                                    brickRoadIndicator={errorFields?.exportAccountPayable ? CONST.BRICK_ROAD_INDICATOR_STATUS.ERROR : undefined}
                                    shouldShowRightIcon
                                />
                            </OfflineWithFeedback>
                            <ToggleSettingOptionRow
                                subtitle={translate('workspace.qbo.defaultVendorDescription')}
                                errors={errorFields?.autoCreateVendor ?? undefined}
                                title={translate('workspace.qbo.defaultVendor')}
                                wrapperStyle={[styles.ph5, styles.mb3, styles.mt1]}
                                isActive={Boolean(autoCreateVendor)}
                                onCloseError={() => Policy.clearQBOErrorField(policyID, CONST.QUICK_BOOKS_CONFIG.AUTO_CREATE_VENDOR)}
                                onToggle={updateAutoCreateVendor}
                                pendingAction={pendingFields?.autoCreateVendor}
                            />
                        </>
                    )}
                    {showAccountSelection && (
                        <OfflineWithFeedback pendingAction={pendingFields?.exportCompanyCardAccount}>
                            <MenuItemWithTopDescription
                                title={exportCompanyCardAccount}
                                description={isVendorSelected ? translate('workspace.qbo.vendor') : translate('workspace.qbo.account')}
                                onPress={() => Navigation.navigate(ROUTES.POLICY_ACCOUNTING_QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_ACCOUNT_SELECT.getRoute(policyID))}
                                brickRoadIndicator={errorFields?.exportCompanyCardAccount ? CONST.BRICK_ROAD_INDICATOR_STATUS.ERROR : undefined}
                                shouldShowRightIcon
                                error={errorFields?.exportCompanyCardAccount ? translate('common.genericErrorMessage') : undefined}
                            />
                        </OfflineWithFeedback>
                    )}
                </ScrollView>
            </ScreenWrapper>
        </AccessOrNotFoundWrapper>
    );
}

QuickbooksCompanyCardExpenseAccountPage.displayName = 'QuickbooksCompanyCardExpenseAccountPage';

export default withPolicyConnections(QuickbooksCompanyCardExpenseAccountPage);
