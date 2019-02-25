const DW = require('./countriesES.js');
const UX = require('./countriesEN.js');

function codeAreaSelect (Lang) {
  let XT = DW;
  if (Lang==='EN') {
    XT = UX;
  }
  const codeArea = {
    ac: {
      name: XT.COUNTRY.AC,
      Ua: '247',
      index: 5
    },
    ad: {
      name: XT.COUNTRY.AD,
      Ua: '376',
      index: 45
    },
    ae: {
      name: XT.COUNTRY.AE,
      Ua: '971',
      index: 180
    },
    af: {
      name: XT.COUNTRY.AF,
      Ua: '93',
      index: 187
    },
    ag: {
      name: XT.COUNTRY.AG,
      Ua: '1',
      index: 67,
      Pe: !0
    },
    ai: {
      name: XT.COUNTRY.AI,
      Ua: '1',
      index: 158,
      Pe: !0
    },
    al: {
      name: XT.COUNTRY.AL,
      Ua: '355',
      index: 77
    },
    am: {
      name: XT.COUNTRY.AM,
      Ua: '374',
      index: 12
    },
    ao: {
      name: XT.COUNTRY.AO,
      Ua: '244',
      index: 155
    },
    ar: {
      name: XT.COUNTRY.AR,
      Ua: '54',
      index: 193
    },
    as: {
      name: XT.COUNTRY.AS,
      Ua: '1',
      index: 121,
      Pe: !0
    },
    at: {
      name: XT.COUNTRY.AT,
      Ua: '43',
      index: 102
    },
    au: {
      name: XT.COUNTRY.AU,
      Ua: '61',
      index: 134
    },
    aw: {
      name: XT.COUNTRY.AW,
      Ua: '297',
      index: 60
    },
    az: {
      name: XT.COUNTRY.AZ,
      Ua: '994',
      index: 94
    },
    ba: {
      name: XT.COUNTRY.BA,
      Ua: '387',
      index: 123
    },
    bb: {
      name: XT.COUNTRY.BB,
      Ua: '1',
      index: 122,
      Pe: !0
    },
    bd: {
      name: XT.COUNTRY.BD,
      Ua: '880',
      index: 139
    },
    be: {
      name: XT.COUNTRY.BE,
      Ua: '32',
      index: 0
    },
    bf: {
      name: XT.COUNTRY.BF,
      Ua: '226',
      index: 56
    },
    bg: {
      name: XT.COUNTRY.BG,
      Ua: '359',
      index: 208
    },
    bh: {
      name: XT.COUNTRY.BH,
      Ua: '973',
      index: 115
    },
    bi: {
      name: XT.COUNTRY.BI,
      Ua: '257',
      index: 150
    },
    bj: {
      name: XT.COUNTRY.BJ,
      Ua: '229',
      index: 99
    },
    bl: {
      name: XT.COUNTRY.BL,
      Ua: '590',
      index: 19,
      Pe: !0
    },
    bm: {
      name: XT.COUNTRY.BM,
      Ua: '1',
      index: 152,
      Pe: !0
    },
    bn: {
      name: XT.COUNTRY.BN,
      Ua: '673',
      index: 131
    },
    bo: {
      name: XT.COUNTRY.BO,
      Ua: '591',
      index: 128
    },
    bq: {
      name: XT.COUNTRY.BQ,
      Ua: '599',
      index: 220,
      Pe: !0
    },
    br: {
      name: XT.COUNTRY.BR,
      Ua: '55',
      index: 59
    },
    bs: {
      name: XT.COUNTRY.BS,
      Ua: '1',
      index: 27,
      Pe: !0
    },
    bt: {
      name: XT.COUNTRY.BT,
      Ua: '975',
      index: 146
    },
    bw: {
      name: XT.COUNTRY.BW,
      Ua: '267',
      index: 219
    },
    by: {
      name: XT.COUNTRY.BY,
      Ua: '375',
      index: 83
    },
    bz: {
      name: XT.COUNTRY.BZ,
      Ua: '501',
      index: 36
    },
    ca: {
      name: XT.COUNTRY.CA,
      Ua: '1',
      index: 106,
      Pe: !0
    },
    cd: {
      name: XT.COUNTRY.CD,
      Ua: '243',
      index: 117
    },
    cf: {
      name: XT.COUNTRY.CF,
      Ua: '236',
      index: 145
    },
    cg: {
      name: XT.COUNTRY.CG,
      Ua: '242',
      index: 141
    },
    ch: {
      name: XT.COUNTRY.CH,
      Ua: '41',
      index: 101
    },
    ci: {
      name: XT.COUNTRY.CI,
      Ua: '225',
      index: 129
    },
    ck: {
      name: XT.COUNTRY.CK,
      Ua: '682',
      index: 183
    },
    cl: {
      name: XT.COUNTRY.CL,
      Ua: '56',
      index: 103
    },
    cm: {
      name: XT.COUNTRY.CM,
      Ua: '237',
      index: 165
    },
    cn: {
      name: XT.COUNTRY.CN,
      Ua: '86',
      index: 63
    },
    co: {
      name: XT.COUNTRY.CO,
      Ua: '57',
      index: 24
    },
    cr: {
      name: XT.COUNTRY.CR,
      Ua: '506',
      index: 168
    },
    cu: {
      name: XT.COUNTRY.CU,
      Ua: '53',
      index: 58
    },
    cv: {
      name: XT.COUNTRY.CV,
      Ua: '238',
      index: 214
    },
    cw: {
      name: XT.COUNTRY.CW,
      Ua: '599',
      index: 221
    },
    cy: {
      name: XT.COUNTRY.CY,
      Ua: '357',
      index: 43
    },
    cz: {
      name: XT.COUNTRY.CZ,
      Ua: '420',
      index: 182
    },
    de: {
      name: XT.COUNTRY.DE,
      Ua: '49',
      index: 203
    },
    dj: {
      name: XT.COUNTRY.DJ,
      Ua: '253',
      index: 169
    },
    dk: {
      name: XT.COUNTRY.DK,
      Ua: '45',
      index: 107
    },
    dm: {
      name: XT.COUNTRY.DM,
      Ua: '1',
      index: 197,
      Pe: !0
    },
    'do': {
      name: XT.COUNTRY.DO,
      Ua: '1',
      index: 118,
      Pe: !0
    },
    dz: {
      name: XT.COUNTRY.DZ,
      Ua: '213',
      index: 40
    },
    ec: {
      name: XT.COUNTRY.EC,
      Ua: '593',
      index: 90
    },
    ee: {
      name: XT.COUNTRY.EE,
      Ua: '372',
      index: 196
    },
    eg: {
      name: XT.COUNTRY.EG,
      Ua: '20',
      index: 178
    },
    er: {
      name: XT.COUNTRY.ER,
      Ua: '291',
      index: 55
    },
    es: {
      name: XT.COUNTRY.ES,
      Ua: '34',
      index: 87
    },
    et: {
      name: XT.COUNTRY.ET,
      Ua: '251',
      index: 198
    },
    fi: {
      name: XT.COUNTRY.FI,
      Ua: '358',
      index: 151
    },
    fj: {
      name: XT.COUNTRY.FJ,
      Ua: '679',
      index: 147
    },
    fk: {
      name: XT.COUNTRY.FK,
      Ua: '500',
      index: 224
    },
    fm: {
      name: XT.COUNTRY.FM,
      Ua: '691',
      index: 136
    },
    fo: {
      name: XT.COUNTRY.FO,
      Ua: '298',
      index: 84
    },
    fr: {
      name: XT.COUNTRY.FR,
      Ua: '33',
      index: 19
    },
    ga: {
      name: XT.COUNTRY.GA,
      Ua: '241',
      index: 68
    },
    gb: {
      name: XT.COUNTRY.GB,
      Ua: '44',
      index: 5
    },
    gd: {
      name: XT.COUNTRY.GD,
      Ua: '1',
      index: 195,
      Pe: !0
    },
    ge: {
      name: XT.COUNTRY.GE,
      Ua: '995',
      index: 66
    },
    gf: {
      name: XT.COUNTRY.GF,
      Ua: '594',
      index: 19
    },
    gh: {
      name: XT.COUNTRY.GH,
      Ua: '233',
      index: 170
    },
    gi: {
      name: XT.COUNTRY.GI,
      Ua: '350',
      index: 20
    },
    gl: {
      name: XT.COUNTRY.GL,
      Ua: '299',
      index: 138
    },
    gm: {
      name: XT.COUNTRY.GM,
      Ua: '220',
      index: 48
    },
    gn: {
      name: XT.COUNTRY.GN,
      Ua: '224',
      index: 207
    },
    gp: {
      name: XT.COUNTRY.GP,
      Ua: '590',
      index: 30
    },
    gq: {
      name: XT.COUNTRY.GQ,
      Ua: '240',
      index: 116
    },
    gr: {
      name: XT.COUNTRY.GR,
      Ua: '30',
      index: 11
    },
    gt: {
      name: XT.COUNTRY.GT,
      Ua: '502',
      index: 71
    },
    gu: {
      name: XT.COUNTRY.GU,
      Ua: '1',
      index: 192,
      Pe: !0
    },
    gw: {
      name: XT.COUNTRY.GW,
      Ua: '245',
      index: 153
    },
    gy: {
      name: XT.COUNTRY.GY,
      Ua: '592',
      index: 61
    },
    hk: {
      name: XT.COUNTRY.HK,
      Ua: '852',
      index: 218
    },
    hn: {
      name: XT.COUNTRY.HN,
      Ua: '504',
      index: 174
    },
    hr: {
      name: XT.COUNTRY.HR,
      Ua: '385',
      index: 69
    },
    ht: {
      name: XT.COUNTRY.HT,
      Ua: '509',
      index: 23
    },
    hu: {
      name: XT.COUNTRY.HU,
      Ua: '36',
      index: 53
    },
    id: {
      name: XT.COUNTRY.ID,
      Ua: '62',
      index: 156
    },
    ie: {
      name: XT.COUNTRY.IE,
      Ua: '353',
      index: 157
    },
    il: {
      name: XT.COUNTRY.IL,
      Ua: '972',
      index: 25
    },
    'in': {
      name: XT.COUNTRY.IN,
      Ua: '91',
      index: 132
    },
    io: {
      name: XT.COUNTRY.IO,
      Ua: '246',
      index: 5
    },
    iq: {
      name: XT.COUNTRY.IQ,
      Ua: '964',
      index: 50
    },
    ir: {
      name: XT.COUNTRY.IR,
      Ua: '98',
      index: 161
    },
    is: {
      name: XT.COUNTRY.IS,
      Ua: '354',
      index: 159
    },
    it: {
      name: XT.COUNTRY.IT,
      Ua: '39',
      index: 9
    },
    jm: {
      name: XT.COUNTRY.JM,
      Ua: '1',
      index: 135,
      Pe: !0
    },
    jo: {
      name: XT.COUNTRY.JO,
      Ua: '962',
      index: 112
    },
    jp: {
      name: XT.COUNTRY.JP,
      Ua: '81',
      index: 31
    },
    ke: {
      name: XT.COUNTRY.KE,
      Ua: '254',
      index: 212
    },
    kg: {
      name: XT.COUNTRY.KG,
      Ua: '996',
      index: 126
    },
    kh: {
      name: XT.COUNTRY.KH,
      Ua: '855',
      index: 17
    },
    ki: {
      name: XT.COUNTRY.KI,
      Ua: '686',
      index: 28
    },
    km: {
      name: XT.COUNTRY.KM,
      Ua: '269',
      index: 110
    },
    kn: {
      name: XT.COUNTRY.KN,
      Ua: '1',
      index: 6,
      Pe: !0
    },
    kp: {
      name: XT.COUNTRY.KP,
      Ua: '850',
      index: 142
    },
    kr: {
      name: XT.COUNTRY.KR,
      Ua: '82',
      index: 181
    },
    kw: {
      name: XT.COUNTRY.KW,
      Ua: '965',
      index: 202
    },
    ky: {
      name: XT.COUNTRY.KY,
      Ua: '1',
      index: 22,
      Pe: !0
    },
    kz: {
      name: XT.COUNTRY.KZ,
      Ua: '7',
      index: 92,
      Pe: !0
    },
    la: {
      name: XT.COUNTRY.LA,
      Ua: '856',
      index: 33
    },
    lb: {
      name: XT.COUNTRY.LB,
      Ua: '961',
      index: 95
    },
    lc: {
      name: XT.COUNTRY.LC,
      Ua: '1',
      index: 108,
      Pe: !0
    },
    li: {
      name: XT.COUNTRY.LI,
      Ua: '423',
      index: 75
    },
    lk: {
      name: XT.COUNTRY.LK,
      Ua: '94',
      index: 213
    },
    lr: {
      name: XT.COUNTRY.LR,
      Ua: '231',
      index: 166
    },
    ls: {
      name: XT.COUNTRY.LS,
      Ua: '266',
      index: 177
    },
    lt: {
      name: XT.COUNTRY.LT,
      Ua: '370',
      index: 85
    },
    lu: {
      name: XT.COUNTRY.LU,
      Ua: '352',
      index: 113
    },
    lv: {
      name: XT.COUNTRY.LV,
      Ua: '371',
      index: 154
    },
    ly: {
      name: XT.COUNTRY.LY,
      Ua: '218',
      index: 8
    },
    ma: {
      name: XT.COUNTRY.MA,
      Ua: '212',
      index: 189
    },
    mc: {
      name: XT.COUNTRY.MC,
      Ua: '377',
      index: 70
    },
    md: {
      name: XT.COUNTRY.MD,
      Ua: '373',
      index: 217
    },
    me: {
      name: XT.COUNTRY.ME,
      Ua: '382',
      index: 175
    },
    mf: {
      name: XT.COUNTRY.MF,
      Ua: '590',
      index: 5,
      Pe: !0
    },
    mg: {
      name: XT.COUNTRY.MG,
      Ua: '261',
      index: 98
    },
    mh: {
      name: XT.COUNTRY.MH,
      Ua: '692',
      index: 86
    },
    mk: {
      name: XT.COUNTRY.MK,
      Ua: '389',
      index: 104
    },
    ml: {
      name: XT.COUNTRY.ML,
      Ua: '223',
      index: 204
    },
    mm: {
      name: XT.COUNTRY.MM,
      Ua: '95',
      index: 1
    },
    mn: {
      name: XT.COUNTRY.MN,
      Ua: '976',
      index: 206
    },
    mo: {
      name: XT.COUNTRY.MO,
      Ua: '853',
      index: 209
    },
    mp: {
      name: XT.COUNTRY.MP,
      Ua: '1',
      index: 54,
      Pe: !0
    },
    mq: {
      name: XT.COUNTRY.MQ,
      Ua: '596',
      index: 14
    },
    mr: {
      name: XT.COUNTRY.MR,
      Ua: '222',
      index: 18
    },
    ms: {
      name: XT.COUNTRY.MS,
      Ua: '1',
      index: 44,
      Pe: !0
    },
    mt: {
      name: XT.COUNTRY.MT,
      Ua: '356',
      index: 120
    },
    mu: {
      name: XT.COUNTRY.MU,
      Ua: '230',
      index: 176
    },
    mv: {
      name: XT.COUNTRY.MV,
      Ua: '960',
      index: 47
    },
    mw: {
      name: XT.COUNTRY.MW,
      Ua: '265',
      index: 173
    },
    mx: {
      name: XT.COUNTRY.MX,
      Ua: '52',
      index: 162
    },
    my: {
      name: XT.COUNTRY.MY,
      Ua: '60',
      index: 148
    },
    mz: {
      name: XT.COUNTRY.MZ,
      Ua: '258',
      index: 49
    },
    na: {
      name: XT.COUNTRY.NA,
      Ua: '264',
      index: 149
    },
    nc: {
      name: XT.COUNTRY.NC,
      Ua: '687',
      index: 97
    },
    ne: {
      name: XT.COUNTRY.NE,
      Ua: '227',
      index: 42
    },
    nf: {
      name: XT.COUNTRY.NF,
      Ua: '672',
      index: 15
    },
    ng: {
      name: XT.COUNTRY.NG,
      Ua: '234',
      index: 201
    },
    ni: {
      name: XT.COUNTRY.NI,
      Ua: '505',
      index: 10
    },
    nl: {
      name: XT.COUNTRY.NL,
      Ua: '31',
      index: 111
    },
    no: {
      name: XT.COUNTRY.NO,
      Ua: '47',
      index: 64
    },
    np: {
      name: XT.COUNTRY.NP,
      Ua: '977',
      index: 7
    },
    nr: {
      name: XT.COUNTRY.NR,
      Ua: '674',
      index: 137
    },
    nu: {
      name: XT.COUNTRY.NU,
      Ua: '683',
      index: 167
    },
    nz: {
      name: XT.COUNTRY.NZ,
      Ua: '64',
      index: 119
    },
    om: {
      name: XT.COUNTRY.OM,
      Ua: '968',
      index: 199
    },
    pa: {
      name: XT.COUNTRY.PA,
      Ua: '507',
      index: 65
    },
    pe: {
      name: XT.COUNTRY.PE,
      Ua: '51',
      index: 72
    },
    pf: {
      name: XT.COUNTRY.PF,
      Ua: '689',
      index: 133
    },
    pg: {
      name: XT.COUNTRY.PG,
      Ua: '675',
      index: 114
    },
    ph: {
      name: XT.COUNTRY.PH,
      Ua: '63',
      index: 143
    },
    pk: {
      name: XT.COUNTRY.PK,
      Ua: '92',
      index: 163
    },
    pl: {
      name: XT.COUNTRY.PL,
      Ua: '48',
      index: 89
    },
    pm: {
      name: XT.COUNTRY.PM,
      Ua: '508',
      index: 81
    },
    pr: {
      name: XT.COUNTRY.PR,
      Ua: '1',
      index: 35,
      Pe: !0
    },
    ps: {
      name: XT.COUNTRY.PS,
      Ua: '970',
      index: 91
    },
    pt: {
      name: XT.COUNTRY.PT,
      Ua: '351',
      index: 39
    },
    pw: {
      name: XT.COUNTRY.PW,
      Ua: '680',
      index: 16
    },
    py: {
      name: XT.COUNTRY.PY,
      Ua: '595',
      index: 190
    },
    qa: {
      name: XT.COUNTRY.QA,
      Ua: '974',
      index: 34
    },
    re: {
      name: XT.COUNTRY.RE,
      Ua: '262',
      index: 19
    },
    ro: {
      name: XT.COUNTRY.RO,
      Ua: '40',
      index: 52
    },
    rs: {
      name: XT.COUNTRY.RS,
      Ua: '381',
      index: 200
    },
    ru: {
      name: XT.COUNTRY.RU,
      Ua: '7',
      index: 51
    },
    rw: {
      name: XT.COUNTRY.RW,
      Ua: '250',
      index: 216
    },
    sa: {
      name: XT.COUNTRY.SA,
      Ua: '966',
      index: 3
    },
    sb: {
      name: XT.COUNTRY.SB,
      Ua: '677',
      index: 80
    },
    sc: {
      name: XT.COUNTRY.SC,
      Ua: '248',
      index: 78
    },
    sd: {
      name: XT.COUNTRY.SD,
      Ua: '249',
      index: 26
    },
    se: {
      name: XT.COUNTRY.SE,
      Ua: '46',
      index: 29
    },
    sg: {
      name: XT.COUNTRY.SG,
      Ua: '65',
      index: 2
    },
    sh: {
      name: XT.COUNTRY.SH,
      Ua: '290',
      index: 37
    },
    si: {
      name: XT.COUNTRY.SI,
      Ua: '386',
      index: 93
    },
    sk: {
      name: XT.COUNTRY.SK,
      Ua: '421',
      index: 179
    },
    sl: {
      name: XT.COUNTRY.SL,
      Ua: '232',
      index: 57
    },
    sm: {
      name: XT.COUNTRY.SM,
      Ua: '378',
      index: 171
    },
    sn: {
      name: XT.COUNTRY.SN,
      Ua: '221',
      index: 172
    },
    so: {
      name: XT.COUNTRY.SO,
      Ua: '252',
      index: 105
    },
    sr: {
      name: XT.COUNTRY.SR,
      Ua: '597',
      index: 215
    },
    ss: {
      name: XT.COUNTRY.SS,
      Ua: '211',
      index: 222
    },
    st: {
      name: XT.COUNTRY.ST,
      Ua: '239',
      index: 194
    },
    sv: {
      name: XT.COUNTRY.SV,
      Ua: '503',
      index: 127
    },
    sx: {
      name: XT.COUNTRY.SX,
      Ua: '1',
      index: 225,
      Pe: !0
    },
    sy: {
      name: XT.COUNTRY.SY,
      Ua: '963',
      index: 144
    },
    sz: {
      name: XT.COUNTRY.SZ,
      Ua: '268',
      index: 184
    },
    tc: {
      name: XT.COUNTRY.TC,
      Ua: '1',
      index: 100,
      Pe: !0
    },
    td: {
      name: XT.COUNTRY.TD,
      Ua: '235',
      index: 62
    },
    tg: {
      name: XT.COUNTRY.TG,
      Ua: '228',
      index: 46
    },
    th: {
      name: XT.COUNTRY.TH,
      Ua: '66',
      index: 73
    },
    tj: {
      name: XT.COUNTRY.TJ,
      Ua: '992',
      index: 13
    },
    tk: {
      name: XT.COUNTRY.TK,
      Ua: '690',
      index: 223
    },
    tl: {
      name: XT.COUNTRY.TL,
      Ua: '670',
      index: 226
    },
    tm: {
      name: XT.COUNTRY.TM,
      Ua: '993',
      index: 205
    },
    tn: {
      name: XT.COUNTRY.TN,
      Ua: '216',
      index: 41
    },
    to: {
      name: XT.COUNTRY.TO,
      Ua: '676',
      index: 82
    },
    tr: {
      name: XT.COUNTRY.TR,
      Ua: '90',
      index: 125
    },
    tt: {
      name: XT.COUNTRY.TT,
      Ua: '1',
      index: 32,
      Pe: !0
    },
    tv: {
      name: XT.COUNTRY.TV,
      Ua: '688',
      index: 21
    },
    tw: {
      name: XT.COUNTRY.TW,
      Ua: '886',
      index: 38
    },
    tz: {
      name: XT.COUNTRY.TZ,
      Ua: '255',
      index: 185
    },
    ua: {
      name: XT.COUNTRY.UA,
      Ua: '380',
      index: 160
    },
    ug: {
      name: XT.COUNTRY.UG,
      Ua: '256',
      index: 88
    },
    us: {
      name: XT.COUNTRY.US,
      Ua: '1',
      index: 4
    },
    uy: {
      name: XT.COUNTRY.UY,
      Ua: '598',
      index: 210
    },
    uz: {
      name: XT.COUNTRY.UZ,
      Ua: '998',
      index: 76
    },
    va: {
      name: XT.COUNTRY.VA,
      Ua: '39',
      index: 188,
      Pe: !0
    },
    vc: {
      name: XT.COUNTRY.VC,
      Ua: '1',
      index: 211,
      Pe: !0
    },
    ve: {
      name: XT.COUNTRY.VE,
      Ua: '58',
      index: 79
    },
    vg: {
      name: XT.COUNTRY.VG,
      Ua: '1',
      index: 109,
      Pe: !0
    },
    vi: {
      name: XT.COUNTRY.VI,
      Ua: '1',
      index: 140,
      Pe: !0
    },
    vn: {
      name: XT.COUNTRY.VN,
      Ua: '84',
      index: 74
    },
    vu: {
      name: XT.COUNTRY.VU,
      Ua: '678',
      index: 96
    },
    wf: {
      name: XT.COUNTRY.WF,
      Ua: '681',
      index: 19
    },
    ws: {
      name: XT.COUNTRY.WS,
      Ua: '685',
      index: 186
    },
    xk: {
      name: XT.COUNTRY.XK,
      Ua: '383',
      index: 227
    },
    ye: {
      name: XT.COUNTRY.YE,
      Ua: '967',
      index: 130
    },
    za: {
      name: XT.COUNTRY.ZA,
      Ua: '27',
      index: 191
    },
    zm: {
      name: XT.COUNTRY.ZM,
      Ua: '260',
      index: 124
    },
    zw: {
      name: XT.COUNTRY.ZW,
      Ua: '263',
      index: 164
    }
  };
  return codeArea;
}

module.exports = codeAreaSelect;