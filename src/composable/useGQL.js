import { ref, watch, computed } from 'vue';
import { request } from '../datocms';
import { useI18n } from 'vue-i18n';

export default function useGQL(query) {
  const { locale } = useI18n();
  const _data = ref(null);
  const error = ref(null);
  const loading = ref(true);

  const fetchData = async (currentLocale) => {
    try {
      loading.value = true;
      const response = await request({
        query,
        variables: {
          locale: currentLocale || 'en',
        },
      });

      if (response) {
        _data.value = response;
      } else {
        throw new Error('Invalid data structure');
      }
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  fetchData(locale.value);

  watch(
    () => locale.value,
    (newLocale) => {
      fetchData(newLocale);
    },
  );

  const data = computed(() => _data.value);

  return {
    data,
    error,
    loading,
    fetchData,
  };
}
