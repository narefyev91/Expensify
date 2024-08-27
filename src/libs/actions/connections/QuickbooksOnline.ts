import type {OnyxUpdate} from 'react-native-onyx';
import Onyx from 'react-native-onyx';
import * as API from '@libs/API';
import type {ConnectPolicyToAccountingIntegrationParams} from '@libs/API/parameters';
import type UpdateQuickbooksOnlineGenericTypeParams from '@libs/API/parameters/UpdateQuickbooksOnlineGenericTypeParams';
import {READ_COMMANDS, WRITE_COMMANDS} from '@libs/API/types';
import {getCommandURL} from '@libs/ApiUtils';
import * as ErrorUtils from '@libs/ErrorUtils';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {ConnectionName, Connections} from '@src/types/onyx/Policy';

type ConnectionNameExceptNetSuite = Exclude<ConnectionName, typeof CONST.POLICY.CONNECTIONS.NAME.NETSUITE>;

function getQuickbooksOnlineSetupLink(policyID: string) {
    const params: ConnectPolicyToAccountingIntegrationParams = {policyID};
    const commandURL = getCommandURL({
        command: READ_COMMANDS.CONNECT_POLICY_TO_QUICKBOOKS_ONLINE,
        shouldSkipWebProxy: true,
    });
    return commandURL + new URLSearchParams(params).toString();
}

function updateQuickbooksOnlineEnableNewCategories(policyID: string, settingValue: boolean) {
    const optimisticData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            [CONST.QUICK_BOOKS_CONFIG.ENABLE_NEW_CATEGORIES]: settingValue ?? null,
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.ENABLE_NEW_CATEGORIES]: CONST.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                            },
                            errorFields: {
                                [CONST.QUICK_BOOKS_CONFIG.ENABLE_NEW_CATEGORIES]: null,
                            },
                        },
                    },
                },
            },
        },
    ];

    const failureData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            [CONST.QUICK_BOOKS_CONFIG.ENABLE_NEW_CATEGORIES]: settingValue ?? null,
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.ENABLE_NEW_CATEGORIES]: null,
                            },
                            errorFields: {
                                [CONST.QUICK_BOOKS_CONFIG.ENABLE_NEW_CATEGORIES]: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
                            },
                        },
                    },
                },
            },
        },
    ];

    const successData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            [CONST.QUICK_BOOKS_CONFIG.ENABLE_NEW_CATEGORIES]: settingValue ?? null,
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.ENABLE_NEW_CATEGORIES]: null,
                            },
                            errorFields: {
                                [CONST.QUICK_BOOKS_CONFIG.ENABLE_NEW_CATEGORIES]: null,
                            },
                        },
                    },
                },
            },
        },
    ];

    const parameters: UpdateQuickbooksOnlineGenericTypeParams = {
        policyID,
        settingValue: JSON.stringify(settingValue),
        idempotencyKey: String(CONST.QUICK_BOOKS_CONFIG.ENABLE_NEW_CATEGORIES),
    };
    API.write(WRITE_COMMANDS.UPDATE_QUICKBOOKS_ONLINE_ENABLE_NEW_CATEGORIES, parameters, {optimisticData, failureData, successData});
}

function updateQuickbooksOnlineAutoSync(policyID: string, settingValue: boolean) {
    const optimisticData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            autoSync: {
                                enabled: settingValue ?? null,
                            },
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.AUTO_SYNC]: CONST.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                            },
                            errorFields: {
                                [CONST.QUICK_BOOKS_CONFIG.AUTO_SYNC]: null,
                            },
                        },
                    },
                },
            },
        },
    ];

    const failureData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            autoSync: {
                                enabled: !settingValue ?? null,
                            },
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.AUTO_SYNC]: null,
                            },
                            errorFields: {
                                [CONST.QUICK_BOOKS_CONFIG.AUTO_SYNC]: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
                            },
                        },
                    },
                },
            },
        },
    ];

    const successData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            autoSync: {
                                enabled: settingValue ?? null,
                            },
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.AUTO_SYNC]: null,
                            },
                            errorFields: {
                                [CONST.QUICK_BOOKS_CONFIG.AUTO_SYNC]: null,
                            },
                        },
                    },
                },
            },
        },
    ];

    const parameters: UpdateQuickbooksOnlineGenericTypeParams = {
        policyID,
        settingValue: JSON.stringify(settingValue),
        idempotencyKey: String(CONST.QUICK_BOOKS_CONFIG.AUTO_SYNC),
    };
    API.write(WRITE_COMMANDS.UPDATE_QUICKBOOKS_ONLINE_AUTO_SYNC, parameters, {optimisticData, failureData, successData});
}

function updateQuickbooksOnlineAutoCreateVendor(policyID: string, settingValue: boolean) {
    const optimisticData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            [CONST.QUICK_BOOKS_CONFIG.AUTO_CREATE_VENDOR]: settingValue ?? null,
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.AUTO_CREATE_VENDOR]: CONST.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                            },
                            errorFields: {
                                [CONST.QUICK_BOOKS_CONFIG.AUTO_CREATE_VENDOR]: null,
                            },
                        },
                    },
                },
            },
        },
    ];

    const failureData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            [CONST.QUICK_BOOKS_CONFIG.AUTO_CREATE_VENDOR]: settingValue ?? null,
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.AUTO_CREATE_VENDOR]: null,
                            },
                            errorFields: {
                                [CONST.QUICK_BOOKS_CONFIG.AUTO_CREATE_VENDOR]: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
                            },
                        },
                    },
                },
            },
        },
    ];

    const successData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            [CONST.QUICK_BOOKS_CONFIG.AUTO_CREATE_VENDOR]: settingValue ?? null,
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.AUTO_CREATE_VENDOR]: null,
                            },
                            errorFields: {
                                [CONST.QUICK_BOOKS_CONFIG.AUTO_CREATE_VENDOR]: null,
                            },
                        },
                    },
                },
            },
        },
    ];

    const parameters: UpdateQuickbooksOnlineGenericTypeParams = {
        policyID,
        settingValue: JSON.stringify(settingValue),
        idempotencyKey: String(CONST.QUICK_BOOKS_CONFIG.AUTO_CREATE_VENDOR),
    };
    API.write(WRITE_COMMANDS.UPDATE_QUICKBOOKS_ONLINE_AUTO_CREATE_VENDOR, parameters, {optimisticData, failureData, successData});
}

function updateQuickbooksOnlineReimbursableExpensesAccount<TConnectionName extends ConnectionNameExceptNetSuite, TSettingName extends keyof Connections[TConnectionName]['config']>(
    policyID: string,
    settingValue: Partial<Connections[TConnectionName]['config'][TSettingName]>,
) {
    const optimisticData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            [CONST.QUICK_BOOKS_CONFIG.REIMBURSABLE_EXPENSES_ACCOUNT]: settingValue ?? null,
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.REIMBURSABLE_EXPENSES_ACCOUNT]: CONST.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                            },
                            errorFields: {
                                [CONST.QUICK_BOOKS_CONFIG.REIMBURSABLE_EXPENSES_ACCOUNT]: null,
                            },
                        },
                    },
                },
            },
        },
    ];

    const failureData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            [CONST.QUICK_BOOKS_CONFIG.REIMBURSABLE_EXPENSES_ACCOUNT]: settingValue ?? null,
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.REIMBURSABLE_EXPENSES_ACCOUNT]: null,
                            },
                            errorFields: {
                                [CONST.QUICK_BOOKS_CONFIG.REIMBURSABLE_EXPENSES_ACCOUNT]: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
                            },
                        },
                    },
                },
            },
        },
    ];

    const successData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            [CONST.QUICK_BOOKS_CONFIG.REIMBURSABLE_EXPENSES_ACCOUNT]: settingValue ?? null,
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.REIMBURSABLE_EXPENSES_ACCOUNT]: null,
                            },
                            errorFields: {
                                [CONST.QUICK_BOOKS_CONFIG.REIMBURSABLE_EXPENSES_ACCOUNT]: null,
                            },
                        },
                    },
                },
            },
        },
    ];

    const parameters: UpdateQuickbooksOnlineGenericTypeParams = {
        policyID,
        settingValue: JSON.stringify(settingValue),
        idempotencyKey: String(CONST.QUICK_BOOKS_CONFIG.REIMBURSABLE_EXPENSES_ACCOUNT),
    };
    API.write(WRITE_COMMANDS.UPDATE_QUICKBOOKS_ONLINE_REIMBURSABLE_EXPENSES_ACCOUNT, parameters, {optimisticData, failureData, successData});
}

function updateQuickbooksOnlineReimbursementAccountID(policyID: string, currentValue: string | undefined, settingValue: string) {
    const optimisticData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            [CONST.QUICK_BOOKS_CONFIG.REIMBURSEMENT_ACCOUNT_ID]: settingValue ?? null,
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.REIMBURSEMENT_ACCOUNT_ID]: CONST.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                            },
                            errorFields: {
                                [CONST.QUICK_BOOKS_CONFIG.REIMBURSEMENT_ACCOUNT_ID]: null,
                            },
                        },
                    },
                },
            },
        },
    ];

    const failureData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            [CONST.QUICK_BOOKS_CONFIG.REIMBURSEMENT_ACCOUNT_ID]: currentValue ?? null,
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.REIMBURSEMENT_ACCOUNT_ID]: null,
                            },
                            errorFields: {
                                [CONST.QUICK_BOOKS_CONFIG.REIMBURSEMENT_ACCOUNT_ID]: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
                            },
                        },
                    },
                },
            },
        },
    ];

    const successData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            [CONST.QUICK_BOOKS_CONFIG.REIMBURSEMENT_ACCOUNT_ID]: settingValue ?? null,
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.REIMBURSEMENT_ACCOUNT_ID]: null,
                            },
                            errorFields: {
                                [CONST.QUICK_BOOKS_CONFIG.REIMBURSEMENT_ACCOUNT_ID]: null,
                            },
                        },
                    },
                },
            },
        },
    ];

    const parameters: UpdateQuickbooksOnlineGenericTypeParams = {
        policyID,
        settingValue,
        idempotencyKey: String(CONST.QUICK_BOOKS_CONFIG.REIMBURSEMENT_ACCOUNT_ID),
    };
    API.write(WRITE_COMMANDS.UPDATE_QUICKBOOKS_ONLINE_REIMBURSEMENT_ACCOUNT_ID, parameters, {optimisticData, failureData, successData});
}

function updateQuickbooksOnlinePreferredExporter(policyID: string, currentValue: string | undefined, settingValue: string) {
    const optimisticData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            export: {
                                exporter: settingValue ?? null,
                            },
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.EXPORT]: CONST.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                            },
                            errorFields: {
                                exporter: null,
                            },
                        },
                    },
                },
            },
        },
    ];

    const failureData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            export: {
                                exporter: currentValue ?? null,
                            },
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.EXPORT]: null,
                            },
                            errorFields: {
                                exporter: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
                            },
                        },
                    },
                },
            },
        },
    ];

    const successData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY}${policyID}`,
            value: {
                connections: {
                    [CONST.POLICY.CONNECTIONS.NAME.QBO]: {
                        config: {
                            export: {
                                exporter: settingValue ?? null,
                            },
                            pendingFields: {
                                [CONST.QUICK_BOOKS_CONFIG.EXPORT]: null,
                            },
                            errorFields: {
                                exporter: null,
                            },
                        },
                    },
                },
            },
        },
    ];

    const parameters: UpdateQuickbooksOnlineGenericTypeParams = {
        policyID,
        settingValue: JSON.stringify({exporter: settingValue}),
        idempotencyKey: String(CONST.QUICK_BOOKS_CONFIG.EXPORT),
    };
    API.write(WRITE_COMMANDS.UPDATE_QUICKBOOKS_ONLINE_EXPORT, parameters, {optimisticData, failureData, successData});
}

export {
    getQuickbooksOnlineSetupLink,
    updateQuickbooksOnlineEnableNewCategories,
    updateQuickbooksOnlineAutoCreateVendor,
    updateQuickbooksOnlineReimbursableExpensesAccount,
    updateQuickbooksOnlineAutoSync,
    updateQuickbooksOnlineReimbursementAccountID,
    updateQuickbooksOnlinePreferredExporter,
};
