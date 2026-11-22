const {
  TAMANHO_DO_TABULEIRO,
  TIPO_DE_NAVIO,
  ESPECIFICACAO_DOS_NAVIOS,
  ORIENTACAO,
  RESULTADO_DO_TIRO,
  ESTADO_DA_CASA,
  JOGADOR,
  ESTADO_DA_PARTIDA,
} = require('../src/constantes');

describe('constantes do jogo', () => {
  test('o tabuleiro tem 10 linhas por 10 colunas', () => {
    expect(TAMANHO_DO_TABULEIRO).toBe(10);
  });

  test('a frota tem exatamente quatro tipos de navio', () => {
    expect(TIPO_DE_NAVIO).toEqual({
      PORTA_AVIOES: 'PORTA_AVIOES',
      ENCOURACADO: 'ENCOURACADO',
      SUBMARINO: 'SUBMARINO',
      DESTROIER: 'DESTROIER',
    });
    expect(Object.keys(ESPECIFICACAO_DOS_NAVIOS)).toEqual(Object.values(TIPO_DE_NAVIO));
  });

  test.each([
    [TIPO_DE_NAVIO.PORTA_AVIOES, 'Porta-aviões', 5],
    [TIPO_DE_NAVIO.ENCOURACADO, 'Encouraçado', 4],
    [TIPO_DE_NAVIO.SUBMARINO, 'Submarino', 3],
    [TIPO_DE_NAVIO.DESTROIER, 'Destroier ou Hidroavião', 2],
  ])('o navio %s se chama "%s" e ocupa %i casas', (tipo, nome, tamanho) => {
    expect(ESPECIFICACAO_DOS_NAVIOS[tipo]).toEqual({ nome, tamanho });
  });

  test('a frota completa ocupa 14 casas', () => {
    const totalDeCasas = Object.values(ESPECIFICACAO_DOS_NAVIOS)
      .reduce((soma, especificacao) => soma + especificacao.tamanho, 0);

    expect(totalDeCasas).toBe(14);
  });

  test('os navios só podem ficar na horizontal ou na vertical', () => {
    expect(ORIENTACAO).toEqual({
      HORIZONTAL: 'HORIZONTAL',
      VERTICAL: 'VERTICAL',
    });
  });

  test('um tiro resulta em água, acerto ou navio afundado', () => {
    expect(RESULTADO_DO_TIRO).toEqual({
      AGUA: 'AGUA',
      ACERTO: 'ACERTO',
      AFUNDOU: 'AFUNDOU',
    });
  });

  test('o adversário enxerga cada casa como desconhecida, água, acerto ou afundado', () => {
    expect(ESTADO_DA_CASA).toEqual({
      DESCONHECIDA: 'DESCONHECIDA',
      AGUA: 'AGUA',
      ACERTO: 'ACERTO',
      AFUNDADO: 'AFUNDADO',
    });
  });

  test('a partida tem dois jogadores e dois estados', () => {
    expect(JOGADOR).toEqual({
      PRIMEIRO: 'PRIMEIRO',
      SEGUNDO: 'SEGUNDO',
    });
    expect(ESTADO_DA_PARTIDA).toEqual({
      EM_ANDAMENTO: 'EM_ANDAMENTO',
      ENCERRADA: 'ENCERRADA',
    });
  });

  test.each([
    ['TIPO_DE_NAVIO', TIPO_DE_NAVIO],
    ['ESPECIFICACAO_DOS_NAVIOS', ESPECIFICACAO_DOS_NAVIOS],
    ['a especificação do porta-aviões', ESPECIFICACAO_DOS_NAVIOS.PORTA_AVIOES],
    ['a especificação do encouraçado', ESPECIFICACAO_DOS_NAVIOS.ENCOURACADO],
    ['a especificação do submarino', ESPECIFICACAO_DOS_NAVIOS.SUBMARINO],
    ['a especificação do destroier', ESPECIFICACAO_DOS_NAVIOS.DESTROIER],
    ['ORIENTACAO', ORIENTACAO],
    ['RESULTADO_DO_TIRO', RESULTADO_DO_TIRO],
    ['ESTADO_DA_CASA', ESTADO_DA_CASA],
    ['JOGADOR', JOGADOR],
    ['ESTADO_DA_PARTIDA', ESTADO_DA_PARTIDA],
  ])('%s é congelado e não pode ser alterado', (_descricao, enumeracao) => {
    expect(Object.isFrozen(enumeracao)).toBe(true);
  });
});
