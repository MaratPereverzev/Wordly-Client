export type DictionarySettingsInstance = {
  id: string;
  padding: number;
  dictionaryId: number;
};

export type DictionarySettingsGetParams = Partial<DictionarySettingsInstance>;

export type DictionarySettingsPostParams = Omit<
  DictionarySettingsInstance,
  "id"
>;

export type DictionarySettingsPutParams = Partial<DictionarySettingsPostParams>;

export type DictionarySettingsDeleteParams = { id: string };
