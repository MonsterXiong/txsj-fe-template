//所有项目基本都通用的常量
export const DialogWidths = Object.freeze({
  //微型表单
  MINI_FORM: '300px',
  //小表单
  SMALL_FORM: '420px',
  //正常大小表单
  FORM: '540px',
  //中等表单
  MEDIUM_FORM: '740px',
  //大表单
  LATGE_FORM: '940px',
  //超大表单
  WIDE_FORM: '1140',

  //微型表格
  MINI_TABLE: '560px',

  SMALL_TABLE: '660px',
  TABLE: '760px',
  //中等表单
  MEDIUM_TABLE: '960px',
  //大表单
  LATGE_TABLE: '1100px',
  //超大表单
  WIDE_TABLE: '1200px',
})

export const InitPaginationData = Object.freeze({
  page: 1,
  rows: 20,
  count: 0,
})

export const MaxPageSize = 999999 //lcl 后续最好不需要使用该项

export const ElementCloumnSpans = Object.freeze({
  ALL: 24,
  HALF: 12,
  THIRD: 8,
})

export const FormLabelConstants = Object.freeze({
  MAXLENGTH: 7,
  LABEL: '暂用的七个中文',
  PADDING_VALUE: 12,
  REQUIRE_WIDTH: 10,
})
