import { supabase, isSupabaseConfigured } from './supabaseClient';
import { storageService } from './storageService';

export const dbService = {
  // 1. TENDÊNCIAS
  async getTrends() {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('trends')
          .select('*')
          .order('score', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((t) => ({
            id: t.id,
            keyword: t.keyword,
            category: t.category,
            monthlySearches: t.monthly_searches,
            growth: t.growth_rate,
            competition: t.competition_level,
            score: parseFloat(t.score),
            summary: t.summary,
            suggestedFormat: t.suggested_format,
            suggestedTicket: t.suggested_ticket,
            statusBadge: t.status_badge,
          }));
        }
      } catch (err) {
        console.warn('Erro ao carregar tendências do Supabase, usando dados locais:', err);
      }
    }
    return storageService.getTrends();
  },

  async addTrend(trend) {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('trends').upsert({
          id: trend.id,
          keyword: trend.keyword,
          category: trend.category,
          monthly_searches: trend.volume,
          growth_rate: trend.growth,
          competition_level: trend.competition,
          score: trend.score,
          summary: trend.summary,
          suggested_format: trend.suggestedFormat,
          suggested_ticket: trend.ticketAvg,
          status_badge: trend.trendStatus,
        });
      } catch (err) {
        console.warn('Erro ao salvar tendência no Supabase:', err);
      }
    }
    return storageService.addTrend(trend);
  },

  // 2. IDEIAS DO USUÁRIO
  async getUserIdeas(userId) {
    if (isSupabaseConfigured() && supabase && userId && !userId.startsWith('usr-demo')) {
      try {
        const { data, error } = await supabase
          .from('ideas')
          .select(`
            *,
            chapters:chapters(*)
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data.map((i) => ({
            id: i.id,
            title: i.title,
            format: i.format,
            suggestedPrice: i.suggested_price,
            orderBump: i.order_bump,
            orderBumpPrice: i.order_bump_price,
            score: parseFloat(i.score),
            status: i.status,
            targetAudience: i.target_audience,
            coreProblem: i.core_problem,
            whySellNow: i.why_sell_now,
            saved: i.saved,
            chapters: (i.chapters || [])
              .sort((a, b) => a.chapter_number - b.chapter_number)
              .map((c) => ({
                number: c.chapter_number,
                title: c.title,
                description: c.description,
              })),
          }));
        }
      } catch (err) {
        console.warn('Erro ao buscar ideias no Supabase, usando armazenamento local:', err);
      }
    }
    return storageService.getIdeas();
  },

  // 3. SALVAR NOVA IDEIA
  async saveIdea(userId, idea) {
    if (isSupabaseConfigured() && supabase && userId && !userId.startsWith('usr-demo')) {
      try {
        const { data: ideaRecord, error: ideaError } = await supabase
          .from('ideas')
          .insert([
            {
              id: idea.id,
              user_id: userId,
              title: idea.title,
              format: idea.format,
              suggested_price: idea.suggestedPrice,
              order_bump: idea.orderBump,
              order_bump_price: idea.orderBumpPrice || 'R$ 19,90',
              score: idea.score,
              status: idea.status || 'Pronto para Produção',
              target_audience: idea.targetAudience,
              core_problem: idea.coreProblem || '',
              why_sell_now: idea.whySellNow || '',
              saved: true,
            },
          ])
          .select()
          .single();

        if (ideaError) throw ideaError;

        if (idea.chapters && idea.chapters.length > 0) {
          const chaptersPayload = idea.chapters.map((c) => ({
            idea_id: idea.id,
            chapter_number: c.number,
            title: c.title,
            description: c.description || '',
          }));

          await supabase.from('chapters').insert(chaptersPayload);
        }
      } catch (err) {
        console.warn('Erro ao salvar no Supabase, mantendo localmente:', err);
      }
    }
    return storageService.addIdea(idea);
  },

  // 4. ALTERNAR SALVAMENTO
  async toggleSaveIdea(userId, ideaId) {
    if (isSupabaseConfigured() && supabase && userId && !userId.startsWith('usr-demo')) {
      try {
        const currentIdeas = await this.getUserIdeas(userId);
        const target = currentIdeas.find((i) => i.id === ideaId);
        if (target) {
          await supabase
            .from('ideas')
            .update({ saved: !target.saved, updated_at: new Date().toISOString() })
            .eq('id', ideaId)
            .eq('user_id', userId);
        }
      } catch (err) {
        console.warn('Erro ao atualizar no Supabase:', err);
      }
    }
    return storageService.toggleSaveIdea(ideaId);
  },

  // 5. EXCLUIR IDEIA
  async deleteIdea(userId, ideaId) {
    if (isSupabaseConfigured() && supabase && userId && !userId.startsWith('usr-demo')) {
      try {
        await supabase
          .from('ideas')
          .delete()
          .eq('id', ideaId)
          .eq('user_id', userId);
      } catch (err) {
        console.warn('Erro ao deletar no Supabase:', err);
      }
    }
    return storageService.deleteIdea(ideaId);
  },

  // 6. CONFIGURAÇÕES
  async getUserSettings(userId) {
    if (isSupabaseConfigured() && supabase && userId && !userId.startsWith('usr-demo')) {
      try {
        const { data, error } = await supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (!error && data) {
          return {
            authorName: data.author_name,
            currentPlan: data.current_plan,
            currency: data.currency,
            defaultEbookPages: data.default_ebook_pages,
            geminiApiKey: data.gemini_api_key || '',
            themePreference: data.theme_preference || 'system',
          };
        }
      } catch (err) {
        console.warn('Erro ao buscar configurações no Supabase:', err);
      }
    }
    return storageService.getSettings();
  },

  async saveUserSettings(userId, settings) {
    if (isSupabaseConfigured() && supabase && userId && !userId.startsWith('usr-demo')) {
      try {
        await supabase.from('user_settings').upsert({
          user_id: userId,
          author_name: settings.authorName,
          currency: settings.currency,
          default_ebook_pages: settings.defaultEbookPages,
          gemini_api_key: settings.geminiApiKey,
          theme_preference: settings.themePreference,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Erro ao salvar configurações no Supabase:', err);
      }
    }
    return storageService.saveSettings(settings);
  },
};
