import { ref, watch, computed } from 'vue';
import { request } from '../datocms';
import { useI18n } from 'vue-i18n';

export default function useGQL(query) {
  const { locale } = useI18n();
  const _data = ref(null); // Dati grezzi come ref
  const error = ref(null);
  const loading = ref(true);

  const fetchData = async (currentLocale) => {
    try {
      loading.value = true; // Assicurati che loading sia true all'inizio del fetch
      const response = await request({
        query,
        variables: {
          locale: currentLocale || 'en', // Fallback su 'en' se locale non è disponibile
        },
      });

      if (response) {
        _data.value = response; // Aggiorna rawData con la risposta
      } else {
        throw new Error('Invalid data structure');
      }
    } catch (e) {
      error.value = e; // Cattura e assegna l'errore
    } finally {
      loading.value = false; // Imposta loading su false a prescindere dall'esito del fetch
    }
  };

  // Esegui fetchData inizialmente con il locale corrente
  fetchData(locale.value);

  // Aggiorna i dati quando cambia il valore di locale
  watch(
    () => locale.value,
    (newLocale) => {
      fetchData(newLocale);
    },
  );

  // Crea una computed property per esporre i dati grezzi come una proprietà reattiva
  const data = computed(() => _data.value);

  return {
    data, // Restituisce 'data' come computed property
    error,
    loading,
    fetchData, // Espone fetchData per eventuali richiami manuali
  };
}
