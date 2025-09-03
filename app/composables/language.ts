export function useLanguage() {
  const { setLocale } = useI18n()

  async function changeLocale(newLocale: string) {
    await setLocale(newLocale as 'en' | 'fr' | 'es')
  }

  return {
    changeLocale,
  }
}
