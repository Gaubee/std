import {decimal, decimal_div, type DecimalAble, setDefaultDecimalPlaces, setDefaultDecimalRoundingMode} from "../decimal.ts";
import {areEqual, endCheck, isException, isNegativeZero, isPositiveZero} from "./test-helper.ts";

Deno.test("div", function () {
  function t(dividend: DecimalAble, divisor: DecimalAble, expected: unknown) {
    areEqual(String(expected), String(decimal_div(decimal(dividend), divisor)));
  }

  setDefaultDecimalPlaces(40);
  setDefaultDecimalRoundingMode(1);

  isPositiveZero(decimal_div(decimal(0), 1));
  isNegativeZero(decimal_div(decimal(0), -1));
  isNegativeZero(decimal_div(decimal(-0), 1));
  isPositiveZero(decimal_div(decimal(-0), -1));

  t(1, 1, "1");
  t(-1, 1, "-1");
  t(1, -1, "-1");
  t(-1, -1, "1");
  t("0.00000", "1.000000", "0");
  t(1, "1", "1");
  t(1, "-45", "-0.0222222222222222222222222222222222222222");
  t(1, "22", "0.0454545454545454545454545454545454545455");
  t(1, 0o144, "0.01");
  t(1, "0144", "0.0069444444444444444444444444444444444444");
  t(1, "6.1915", "0.1615117499798110312525236210934345473633");
  t(1, "-1.02", "-0.9803921568627450980392156862745098039216");
  t(1, "0.09", "11.1111111111111111111111111111111111111111");
  t(1, "-0.0001", "-10000");
  t(1, "8e5", "0.00000125");
  t(1, "9E12", "1.111111111111111111111111111e-13");
  t(1, "1e-14", "100000000000000");
  t(1, "3.345E-9", "298953662.1823617339312406576980568011958146487294");
  t(1, "-345.43e+4", "-2.894942535390672495150971253220624e-7");
  t(1, "-94.12E+0", "-0.0106247343816404589885252868678283042924");
  t(0, "0.001", "0");
  t(0, "111.1111111110000", "0");
  t(-1, 1, "-1");
  t(-0.01, 0.01, "-1");
  t(54, -54, "-1");
  t(9.99, "-9.99", "-1");
  t("0.00023432495704937", "-0.00023432495704937", "-1");
  t(100, 100, "1");
  t(-999.99, "0.01", "-99999");
  t("03.333", -4, "-0.83325");
  t(-1, -0.1, "10");
  t(43534.5435, "0.054645", "796679.3576722481471314850398023606917375789185");
  t("99999", "1", "99999");

  setDefaultDecimalPlaces(0);
  setDefaultDecimalRoundingMode(0);
  t("999.5", 1, "999");
  t("-999.5", 1, "-999");
  t("998.5", 1, "998");
  t("-998.5", 1, "-998");

  setDefaultDecimalRoundingMode(1);
  t("999.5", 1, "1000");
  t("-999.5", 1, "-1000");
  t("998.5", 1, "999");
  t("-998.5", 1, "-999");

  setDefaultDecimalRoundingMode(2);
  t("999.5", 1, "1000");
  t("-999.5", 1, "-1000");
  t("999.4", 1, "999");
  t("-999.4", 1, "-999");
  t("999.500001", 1, "1000");
  t("-999.500001", 1, "-1000");
  t("998.5", 1, "998");
  t("-998.5", 1, "-998");
  t("998.6", 1, "999");
  t("-998.6", 1, "-999");
  t("998.500001", 1, "999");
  t("-998.500001", 1, "-999");

  setDefaultDecimalRoundingMode(0);
  setDefaultDecimalPlaces(2);
  t("0", "-19", "0");
  setDefaultDecimalPlaces(2);
  t("-0.000000000000004556", "-2021.9", "0");
  setDefaultDecimalPlaces(5);
  t("2", "8639.4", "0.00023");
  setDefaultDecimalPlaces(7);
  t("-2949.53", "48.6", "-60.6899176");
  setDefaultDecimalPlaces(8);
  t("1.80", "-214368", "-0.00000839");
  setDefaultDecimalPlaces(0);
  t("-8", "0.00000000000190", "-4210526315789");
  setDefaultDecimalPlaces(4);
  t("1.7135", "336.0", "0.005");
  setDefaultDecimalPlaces(5);
  t("-0.0000000000000013895", "1.000", "0");
  setDefaultDecimalPlaces(6);
  t("-1.08916", "-8.3", "0.131224");
  setDefaultDecimalPlaces(5);
  t("8.80", "-14.1", "-0.62411");
  setDefaultDecimalPlaces(6);
  t("84.6", "2.2", "38.454545");
  setDefaultDecimalPlaces(0);
  t("0.0000395", "-2.03", "0");
  setDefaultDecimalPlaces(8);
  t("-3", "8", "-0.375");
  setDefaultDecimalPlaces(11);
  t("0.000000000000512", "-0.3546", "0");
  setDefaultDecimalPlaces(9);
  t("0", "26.569", "0");
  setDefaultDecimalPlaces(11);
  t("-0.0000000000000000001865", "24.4", "0");
  setDefaultDecimalPlaces(0);
  t("274900", "-1612", "-170");
  setDefaultDecimalPlaces(10);
  t("-0.000073", "1.9", "-0.000038421");
  setDefaultDecimalPlaces(3);
  t("0", "3", "0");
  setDefaultDecimalPlaces(6);
  t("0", "2.0", "0");
  setDefaultDecimalPlaces(3);
  t("-36.54", "-2.1", "17.4");
  setDefaultDecimalPlaces(10);
  t("-5.9", "-1.48", "3.9864864864");
  setDefaultDecimalPlaces(4);
  t("2", "1.06", "1.8867");
  setDefaultDecimalPlaces(9);
  t("6.4926", "-2.03223", "-3.194815547");
  setDefaultDecimalPlaces(3);
  t("7", "0.0000006929", "10102467.888");
  setDefaultDecimalPlaces(7);
  t("0", "-61.6", "0");
  setDefaultDecimalPlaces(1);
  t("30.72", "-6664", "0");
  setDefaultDecimalPlaces(1);
  t("374.7", "9784.7", "0");
  setDefaultDecimalPlaces(7);
  t("0.012783", "-4.2172", "-0.0030311");
  setDefaultDecimalPlaces(2);
  t("-5", "-0.27", "18.51");
  setDefaultDecimalPlaces(1);
  t("-42.5", "-0.0000000000000000085", "5000000000000000000");
  setDefaultDecimalPlaces(1);
  t("0", "3.537", "0");
  setDefaultDecimalPlaces(1);
  t("-1", "-183", "0");
  setDefaultDecimalPlaces(3);
  t("-194.9", "0.00000000000000030", "-649666666666666666.666");
  setDefaultDecimalPlaces(4);
  t("-15198", "-255.98", "59.3718");
  setDefaultDecimalPlaces(6);
  t("0.000000000000000133668", "2", "0");
  setDefaultDecimalPlaces(2);
  t("-2259.2", "-0.00000000010", "22592000000000");
  setDefaultDecimalPlaces(4);
  t("6.1", "-0.0000042954", "-1420123.8534");
  setDefaultDecimalPlaces(7);
  t("-3306", "-3", "1102");
  setDefaultDecimalPlaces(8);
  t("-6", "82", "-0.07317073");
  setDefaultDecimalPlaces(2);
  t("0", "-2", "0");
  setDefaultDecimalPlaces(2);
  t("2.6", "64.9", "0.04");
  setDefaultDecimalPlaces(7);
  t("-24562.0", "0.00000001652", "-1486803874092.0096852");
  setDefaultDecimalPlaces(11);
  t("-1", "1.2", "-0.83333333333");
  setDefaultDecimalPlaces(1);
  t("-5.3", "0.00000000007373", "-71883900718.8");
  setDefaultDecimalPlaces(6);
  t("-0.00000022686", "-3.5902", "0");
  setDefaultDecimalPlaces(4);
  t("-0.0000000000010995", "-2029.4", "0");
  setDefaultDecimalPlaces(8);
  t("-199.16", "54.80", "-3.63430656");
  setDefaultDecimalPlaces(1);
  t("-14.0", "0.0000035634", "-3928832");
  setDefaultDecimalPlaces(1);
  t("-7", "3481", "0");
  setDefaultDecimalPlaces(0);
  t("1", "-8266", "0");
  setDefaultDecimalPlaces(7);
  t("2482", "-0.0006766", "-3668341.7085427");
  setDefaultDecimalPlaces(3);
  t("-1.2", "-40", "0.03");
  setDefaultDecimalPlaces(10);
  t("-13.7", "-1", "13.7");
  setDefaultDecimalPlaces(7);
  t("1.8", "-1", "-1.8");
  setDefaultDecimalPlaces(8);
  t("66.626", "-3327", "-0.02002584");
  setDefaultDecimalPlaces(6);
  t("-33.74", "3", "-11.246666");
  setDefaultDecimalPlaces(2);
  t("0", "2.5", "0");
  setDefaultDecimalPlaces(5);
  t("2061.8", "2", "1030.9");
  setDefaultDecimalPlaces(4);
  t("-4.604", "5", "-0.9208");
  setDefaultDecimalPlaces(1);
  t("2", "35.88", "0");
  setDefaultDecimalPlaces(8);
  t("-0.0000000546", "-80.0", "0");
  setDefaultDecimalPlaces(7);
  t("-9", "369.0", "-0.0243902");
  setDefaultDecimalPlaces(11);
  t("-32", "-9.773", "3.27432722807");
  setDefaultDecimalPlaces(7);
  t("0.00000000005460", "14.49", "0");
  setDefaultDecimalPlaces(5);
  t("-0.0000000672", "-0.00000000015861", "423.68072");
  setDefaultDecimalPlaces(5);
  t("-16069.0", "-702.5", "22.87402");
  setDefaultDecimalPlaces(2);
  t("0", "0.01938", "0");
  setDefaultDecimalPlaces(0);
  t("1", "18", "0");
  setDefaultDecimalPlaces(0);
  t("13.9", "250.571", "0");
  setDefaultDecimalPlaces(5);
  t("0", "-1.2", "0");
  setDefaultDecimalPlaces(5);
  t("1.2837", "187", "0.00686");
  setDefaultDecimalPlaces(0);
  t("-31874", "-105.084", "303");
  setDefaultDecimalPlaces(8);
  t("-592.15", "0.059380", "-9972.21286628");
  setDefaultDecimalPlaces(5);
  t("1.534", "74.40", "0.02061");
  setDefaultDecimalPlaces(6);
  t("-4", "-1.2", "3.333333");
  setDefaultDecimalPlaces(4);
  t("154642", "2.28275", "67743.7301");
  setDefaultDecimalPlaces(5);
  t("-0.00000000000000158719", "3.014", "0");
  setDefaultDecimalPlaces(11);
  t("-446149", "608.6", "-733.07426881367");
  setDefaultDecimalPlaces(1);
  t("0", "-11.8954", "0");
  setDefaultDecimalPlaces(2);
  t("0.0014970", "3", "0");
  setDefaultDecimalPlaces(9);
  t("2250.56", "0.0000000001102", "20422504537205.081669691");
  setDefaultDecimalPlaces(0);
  t("-3.86", "-5", "0");
  setDefaultDecimalPlaces(8);
  t("-4", "20707", "-0.00019317");
  setDefaultDecimalPlaces(9);
  t("-0.0000000000054397", "0.0000000000045", "-1.208822222");
  setDefaultDecimalPlaces(3);
  t("-1", "-483542", "0");
  setDefaultDecimalPlaces(8);
  t("-2377.90", "0.00007863", "-30241638.05163423");
  setDefaultDecimalPlaces(6);
  t("0.000000000000000000027346", "1", "0");
  setDefaultDecimalPlaces(11);
  t("-28", "-2", "14");
  setDefaultDecimalPlaces(0);
  t("-1.0", "-0.034", "29");
  setDefaultDecimalPlaces(4);
  t("-7894.7", "581.33", "-13.5804");
  setDefaultDecimalPlaces(6);
  t("2", "-778", "-0.00257");
  setDefaultDecimalPlaces(2);
  t("11", "1.3", "8.46");
  setDefaultDecimalPlaces(10);
  t("0", "-5", "0");
  setDefaultDecimalPlaces(9);
  t("0", "-1", "0");
  setDefaultDecimalPlaces(9);
  t("-0.00000000000000000051935", "-7", "0");
  setDefaultDecimalPlaces(9);
  t("5", "1.5", "3.333333333");
  setDefaultDecimalPlaces(0);
  t("6.80", "-193488", "0");
  setDefaultDecimalPlaces(0);
  t("-9.6050", "-21.5", "0");
  setDefaultDecimalPlaces(4);
  t("-0.000000000322", "-0.00000000000000000371", "86792452.8301");
  setDefaultDecimalPlaces(10);
  t("3", "3", "1");
  setDefaultDecimalPlaces(2);
  t("1.3", "-61.56", "-0.02");
  setDefaultDecimalPlaces(4);
  t("-849", "-3.102", "273.6943");
  setDefaultDecimalPlaces(3);
  t("0.0000000029", "-27.6", "0");
  setDefaultDecimalPlaces(5);
  t("-2.6", "2.4", "-1.08333");
  setDefaultDecimalPlaces(2);
  t("1.28086", "2.4160", "0.53");
  setDefaultDecimalPlaces(4);
  t("1083.9", "-3.635", "-298.1843");
  setDefaultDecimalPlaces(9);
  t("-5", "4.47", "-1.118568232");
  setDefaultDecimalPlaces(2);
  t("-0.00000000000000000010", "19.216", "0");
  setDefaultDecimalPlaces(8);
  t("2.72", "0.019588", "138.86052685");
  setDefaultDecimalPlaces(11);
  t("3.689", "0.0000000000000000086", "428953488372093023.25581395348");
  setDefaultDecimalPlaces(7);
  t("3179", "-2343.55", "-1.356489");
  setDefaultDecimalPlaces(2);
  t("-71.0", "-84", "0.84");
  setDefaultDecimalPlaces(8);
  t("3.7360", "0.00007358", "50774.66702908");
  setDefaultDecimalPlaces(11);
  t("-45", "-4775.2", "0.00942368906");
  setDefaultDecimalPlaces(4);
  t("0.0000000000220819", "-16.3820", "0");
  setDefaultDecimalPlaces(4);
  t("20.51", "1", "20.51");
  setDefaultDecimalPlaces(7);
  t("-136.7", "-2", "68.35");
  setDefaultDecimalPlaces(5);
  t("3.36", "-23", "-0.14608");
  setDefaultDecimalPlaces(8);
  t("9.92", "-2.039", "-4.86512996");
  setDefaultDecimalPlaces(11);
  t("-303052", "25.5", "-11884.39215686274");
  setDefaultDecimalPlaces(6);
  t("298.7", "-1", "-298.7");
  setDefaultDecimalPlaces(3);
  t("0", "-5", "0");
  setDefaultDecimalPlaces(8);
  t("7.2583", "-2", "-3.62915");
  setDefaultDecimalPlaces(10);
  t("0.014973", "1.4", "0.010695");
  setDefaultDecimalPlaces(7);
  t("-0.0001731", "-12.94", "0.0000133");
  setDefaultDecimalPlaces(4);
  t("86738", "43.0", "2017.1627");
  setDefaultDecimalPlaces(10);
  t("-7", "3", "-2.3333333333");
  setDefaultDecimalPlaces(11);
  t("0.00000000000000000002070", "502.66", "0");
  setDefaultDecimalPlaces(3);
  t("-0.0000000000000000000114", "-1", "0");
  setDefaultDecimalPlaces(4);
  t("0.0000000000675", "-14701", "0");
  setDefaultDecimalPlaces(0);
  t("0.0000000000043", "2", "0");
  setDefaultDecimalPlaces(8);
  t("-2.91", "0.000000000000164", "-17743902439024.3902439");
  setDefaultDecimalPlaces(0);
  t("0.05450", "-6", "0");
  setDefaultDecimalPlaces(0);
  t("-1", "21.30", "0");
  setDefaultDecimalPlaces(7);
  t("1652.54", "85.203", "19.3953264");
  setDefaultDecimalPlaces(0);
  t("14.07", "-6", "-2");
  setDefaultDecimalPlaces(1);
  t("7", "-0.000000000000000000044", "-159090909090909090909");
  setDefaultDecimalPlaces(2);
  t("2", "6", "0.33");
  setDefaultDecimalPlaces(3);
  t("9.6", "-273.5", "-0.035");
  setDefaultDecimalPlaces(1);
  t("9", "-0.000000000000000013", "-692307692307692307.6");
  setDefaultDecimalPlaces(9);
  t("0", "-0.0000000000028", "0");
  setDefaultDecimalPlaces(0);
  t("0.000000048", "-3.2", "0");
  setDefaultDecimalPlaces(1);
  t("-62.46", "56", "-1.1");
  setDefaultDecimalPlaces(11);
  t("30", "4", "7.5");
  setDefaultDecimalPlaces(1);
  t("6.3", "-0.0000000019", "-3315789473.6");
  setDefaultDecimalPlaces(7);
  t("-2", "-26.1", "0.0766283");
  setDefaultDecimalPlaces(2);
  t("-1.609", "26.5", "-0.06");
  setDefaultDecimalPlaces(4);
  t("8.5", "-13.384", "-0.635");
  setDefaultDecimalPlaces(2);
  t("0", "0.0000000000000000002043", "0");
  setDefaultDecimalPlaces(0);
  t("3", "1.3", "2");
  setDefaultDecimalPlaces(7);
  t("0.000009924", "-1.7", "-0.0000058");
  setDefaultDecimalPlaces(4);
  t("-0.00000000000000000012", "0.0000000000051854", "0");
  setDefaultDecimalPlaces(7);
  t("0", "305.5", "0");
  setDefaultDecimalPlaces(11);
  t("0", "1.0", "0");
  setDefaultDecimalPlaces(4);
  t("2268", "-5", "-453.6");
  setDefaultDecimalPlaces(7);
  t("-18.21", "5.3797", "-3.3849471");
  setDefaultDecimalPlaces(5);
  t("-594", "1.5802", "-375.90178");
  setDefaultDecimalPlaces(2);
  t("30.877", "-24.9", "-1.24");
  setDefaultDecimalPlaces(3);
  t("-499.20", "0.141904", "-3517.871");
  setDefaultDecimalPlaces(11);
  t("-1", "6", "-0.16666666666");
  setDefaultDecimalPlaces(10);
  t("77618", "16.43", "4724.1631162507");
  setDefaultDecimalPlaces(11);
  t("-3.63796", "38.2", "-0.09523455497");
  setDefaultDecimalPlaces(4);
  t("0.000031", "20.373", "0");
  setDefaultDecimalPlaces(3);
  t("-153967", "14.659", "-10503.24");
  setDefaultDecimalPlaces(6);
  t("0", "1", "0");
  setDefaultDecimalPlaces(1);
  t("-7503.3", "-69.0", "108.7");
  setDefaultDecimalPlaces(8);
  t("-5.46", "0.0000113328", "-481787.37822956");
  setDefaultDecimalPlaces(0);
  t("-2", "-5", "0");
  setDefaultDecimalPlaces(4);
  t("-37.202", "-2", "18.601");
  setDefaultDecimalPlaces(6);
  t("4.16", "9.9", "0.420202");
  setDefaultDecimalPlaces(7);
  t("-0.00012", "-1.3", "0.0000923");
  setDefaultDecimalPlaces(5);
  t("0", "-0.0000000000013828", "0");
  setDefaultDecimalPlaces(9);
  t("0.00000000000000336", "73518", "0");
  setDefaultDecimalPlaces(10);
  t("0", "47234.4", "0");
  setDefaultDecimalPlaces(3);
  t("0.038327", "-0.00000000000000259", "-14798069498069.498");
  setDefaultDecimalPlaces(9);
  t("0.000000000000497", "117", "0");
  setDefaultDecimalPlaces(7);
  t("-4694", "-4", "1173.5");
  setDefaultDecimalPlaces(8);
  t("-2.6950", "-95.8", "0.02813152");
  setDefaultDecimalPlaces(8);
  t("333.48", "90.012", "3.70483935");
  setDefaultDecimalPlaces(10);
  t("1", "14.9", "0.0671140939");
  setDefaultDecimalPlaces(8);
  t("636.6", "7", "90.94285714");
  setDefaultDecimalPlaces(5);
  t("1.2", "-1", "-1.2");
  setDefaultDecimalPlaces(11);
  t("1.0", "0.0000000000021", "476190476190.47619047619");
  setDefaultDecimalPlaces(8);
  t("-19.16", "-1", "19.16");
  setDefaultDecimalPlaces(4);
  t("-3", "3", "-1");
  setDefaultDecimalPlaces(0);
  t("-7.8", "86.5", "0");
  setDefaultDecimalPlaces(6);
  t("-0.000000016187", "-11623.5", "0");
  setDefaultDecimalPlaces(6);
  t("-23.8", "-0.00000011", "216363636.363636");
  setDefaultDecimalPlaces(11);
  t("-5", "853.76", "-0.00585644677");
  setDefaultDecimalPlaces(8);
  t("-0.000000000000000000018", "0.000000000137", "0");
  setDefaultDecimalPlaces(9);
  t("-384.98", "4.2", "-91.661904761");
  setDefaultDecimalPlaces(3);
  t("-2485.1", "-2.6", "955.807");
  setDefaultDecimalPlaces(10);
  t("0", "2", "0");
  setDefaultDecimalPlaces(10);
  t("-13949", "33.74", "-413.4262003556");
  setDefaultDecimalPlaces(0);
  t("-1.01", "-0.0000000000000001275", "7921568627450980");
  setDefaultDecimalPlaces(4);
  t("-0.51154", "-0.000826", "619.2978");
  setDefaultDecimalPlaces(8);
  t("-6.10", "-0.00000000000000001360", "448529411764705882.35294117");
  setDefaultDecimalPlaces(8);
  t("492.24", "-4", "-123.06");
  setDefaultDecimalPlaces(8);
  t("4", "1.515", "2.64026402");
  setDefaultDecimalPlaces(5);
  t("-31.7", "-64.89", "0.48851");
  setDefaultDecimalPlaces(4);
  t("125.593", "-3", "-41.8643");
  setDefaultDecimalPlaces(3);
  t("0", "0.0000000000010", "0");
  setDefaultDecimalPlaces(7);
  t("164.6", "9.5", "17.3263157");
  setDefaultDecimalPlaces(7);
  t("-0.0000034", "-3", "0.0000011");
  setDefaultDecimalPlaces(6);
  t("-858", "-0.000021", "40857142.857142");
  setDefaultDecimalPlaces(4);
  t("4480.34", "-27100", "-0.1653");
  setDefaultDecimalPlaces(0);
  t("-1257.20", "-0.0000000000003639", "3454795273426765");
  setDefaultDecimalPlaces(6);
  t("4.591", "-0.000000017", "-270058823.529411");
  setDefaultDecimalPlaces(4);
  t("-0.000000000020028", "0.000000000000123", "-162.8292");
  setDefaultDecimalPlaces(8);
  t("-8.17", "52191", "-0.00015654");
  setDefaultDecimalPlaces(8);
  t("-5", "0.056326", "-88.76895217");
  setDefaultDecimalPlaces(5);
  t("0", "2", "0");
  setDefaultDecimalPlaces(6);
  t("0.0000000000000000043", "-1574", "0");
  setDefaultDecimalPlaces(9);
  t("-8", "-24455", "0.000327131");
  setDefaultDecimalPlaces(6);
  t("-1", "-154643", "0.000006");
  setDefaultDecimalPlaces(11);
  t("124.635", "5", "24.927");
  setDefaultDecimalPlaces(3);
  t("-0.0000000000000010", "51.6", "0");

  setDefaultDecimalRoundingMode(2);
  setDefaultDecimalPlaces(9);
  t("21.4", "9", "2.377777778");
  setDefaultDecimalPlaces(7);
  t("2.55", "-9", "-0.2833333");
  setDefaultDecimalPlaces(4);
  t("0.000000000000001668", "-9", "0");
  setDefaultDecimalPlaces(1);
  t("-2.0", "6240.6", "0");
  setDefaultDecimalPlaces(7);
  t("0", "-0.000000000000013", "0");
  setDefaultDecimalPlaces(7);
  t("1.6", "5", "0.32");
  setDefaultDecimalPlaces(2);
  t("-0.000000000352", "1.00", "0");
  setDefaultDecimalPlaces(2);
  t("-450031", "-9.0758", "49585.82");
  setDefaultDecimalPlaces(0);
  t("-1.141", "3451", "0");
  setDefaultDecimalPlaces(11);
  t("26.261", "-0.0000000000001727", "-152061378112333.5263462652");
  setDefaultDecimalPlaces(6);
  t("0", "-1292.02", "0");
  setDefaultDecimalPlaces(8);
  t("-0.000000000000000136", "10447", "0");
  setDefaultDecimalPlaces(8);
  t("2", "2.8048", "0.71306332");
  setDefaultDecimalPlaces(3);
  t("-0.0000000000000000198022", "-0.0000000000056765", "0");
  setDefaultDecimalPlaces(11);
  t("41.235", "-3", "-13.745");
  setDefaultDecimalPlaces(5);
  t("-11.800", "-0.00000000000000000183668", "6424635755820284426.24736");
  setDefaultDecimalPlaces(9);
  t("7.861", "1", "7.861");
  setDefaultDecimalPlaces(5);
  t("2.21", "3153", "0.0007");
  setDefaultDecimalPlaces(9);
  t("0", "-129.33", "0");
  setDefaultDecimalPlaces(2);
  t("1831.2", "-626.6", "-2.92");
  setDefaultDecimalPlaces(6);
  t("18.0", "36", "0.5");
  setDefaultDecimalPlaces(11);
  t("-6.248", "-0.000000000000000031898", "195874349488996175.30879678977");
  setDefaultDecimalPlaces(4);
  t("-25.7246", "-1", "25.7246");
  setDefaultDecimalPlaces(8);
  t("146.7", "-1", "-146.7");
  setDefaultDecimalPlaces(1);
  t("41.7", "105.8", "0.4");
  setDefaultDecimalPlaces(1);
  t("1.3759", "-2", "-0.7");
  setDefaultDecimalPlaces(5);
  t("-0.0000000000000174554", "3", "0");
  setDefaultDecimalPlaces(1);
  t("-752.4", "0.02277", "-33043.5");
  setDefaultDecimalPlaces(5);
  t("1201.7", "-11.1", "-108.26126");
  setDefaultDecimalPlaces(6);
  t("-3.2", "-1.599", "2.001251");
  setDefaultDecimalPlaces(4);
  t("-1", "-1", "1");
  setDefaultDecimalPlaces(2);
  t("-1.37", "-701.9", "0");
  setDefaultDecimalPlaces(7);
  t("-4.0", "0.000000000300700", "-13302294645.8264051");
  setDefaultDecimalPlaces(5);
  t("0.2376", "3.56", "0.06674");
  setDefaultDecimalPlaces(1);
  t("0.0000000027396", "2.899", "0");
  setDefaultDecimalPlaces(8);
  t("109.07", "-0.000000004824", "-22609867330.01658375");
  setDefaultDecimalPlaces(4);
  t("-57.669", "111.54", "-0.517");
  setDefaultDecimalPlaces(8);
  t("0", "1", "0");
  setDefaultDecimalPlaces(3);
  t("0", "6744", "0");
  setDefaultDecimalPlaces(7);
  t("2.4", "1", "2.4");
  setDefaultDecimalPlaces(11);
  t("3.51", "-3010.8", "-0.00116580311");
  setDefaultDecimalPlaces(0);
  t("-5", "-2.36", "2");
  setDefaultDecimalPlaces(1);
  t("-1", "159.44", "0");

  setDefaultDecimalRoundingMode(1);
  setDefaultDecimalPlaces(0);
  t("-1.5e+1", "-3e+0", "5");
  setDefaultDecimalPlaces(1);
  t("-4.4e-13", "-1e+0", "0");
  setDefaultDecimalPlaces(1);
  t("-1e+0", "1.4e+1", "-0.1");
  setDefaultDecimalPlaces(1);
  t("2.7e+0", "-1e+0", "-2.7");
  setDefaultDecimalPlaces(1);
  t("-4e+0", "-4e+0", "1");
  setDefaultDecimalPlaces(0);
  t("-3e+0", "1.5e+0", "-2");
  setDefaultDecimalPlaces(1);
  t("1.2e+0", "-1e+0", "-1.2");
  setDefaultDecimalPlaces(0);
  t("1e+0", "2e+0", "1");
  setDefaultDecimalPlaces(1);
  t("3e-9", "1e+0", "0");
  setDefaultDecimalPlaces(0);
  t("-2e+0", "1.4e+1", "0");
  setDefaultDecimalPlaces(1);
  t("3.3e+0", "-2.4e+1", "-0.1");
  setDefaultDecimalPlaces(1);
  t("6.3e-12", "-2e+0", "0");
  setDefaultDecimalPlaces(0);
  t("-8e+0", "-1e+0", "8");
  setDefaultDecimalPlaces(1);
  t("3.4e-13", "-6e+0", "0");
  setDefaultDecimalPlaces(1);
  t("1e+0", "-3e+0", "-0.3");
  setDefaultDecimalPlaces(0);
  t("-2e+0", "-2e+0", "1");
  setDefaultDecimalPlaces(1);
  t("3.3e+0", "-1.1e+0", "-3");
  setDefaultDecimalPlaces(0);
  t("-2e+0", "1.7e+0", "-1");
  setDefaultDecimalPlaces(1);
  t("-7e+0", "-3e+0", "2.3");
  setDefaultDecimalPlaces(0);
  t("1.9e+0", "2e+0", "1");
  setDefaultDecimalPlaces(0);
  t("2e+0", "-3e+0", "-1");
  setDefaultDecimalPlaces(1);
  t("2.4e+1", "-2e+0", "-12");
  setDefaultDecimalPlaces(1);
  t("-6e+0", "-1e+0", "6");
  setDefaultDecimalPlaces(1);
  t("-2e+0", "6e+0", "-0.3");
  setDefaultDecimalPlaces(1);
  t("1e+0", "-2.5e+0", "-0.4");
  setDefaultDecimalPlaces(1);
  t("-1.1e-17", "3.1e+1", "0");
  setDefaultDecimalPlaces(0);
  t("1.4e-4", "-5e+1", "0");
  setDefaultDecimalPlaces(1);
  t("-1e+0", "-1e+0", "1");
  setDefaultDecimalPlaces(0);
  t("-5.9e+0", "1e+0", "-6");
  setDefaultDecimalPlaces(0);
  t("-1e+0", "1.6e+0", "-1");
  setDefaultDecimalPlaces(1);
  t("1e+0", "-1.9e-1", "-5.3");
  setDefaultDecimalPlaces(0);
  t("5.1e-1", "8e+0", "0");
  setDefaultDecimalPlaces(1);
  t("-2e+0", "1e+0", "-2");
  setDefaultDecimalPlaces(0);
  t("1e+0", "-1e-7", "-10000000");
  setDefaultDecimalPlaces(0);
  t("3e+0", "1e-11", "300000000000");
  setDefaultDecimalPlaces(0);
  t("1e+1", "-4.4e-8", "-227272727");
  setDefaultDecimalPlaces(1);
  t("4.3e+1", "-7e+0", "-6.1");
  setDefaultDecimalPlaces(0);
  t("-9e+0", "-5e+0", "2");
  setDefaultDecimalPlaces(0);
  t("1e+0", "-3.2e+0", "0");
  setDefaultDecimalPlaces(0);
  t("3e+0", "1.2e+0", "3");
  setDefaultDecimalPlaces(1);
  t("1.4e+0", "2e+0", "0.7");
  setDefaultDecimalPlaces(1);
  t("-3e+0", "6e+0", "-0.5");
  setDefaultDecimalPlaces(0);
  t("-2e+0", "-6e+0", "0");
  setDefaultDecimalPlaces(0);
  t("-3e+0", "6.3e+1", "0");
  setDefaultDecimalPlaces(0);
  t("-1e+0", "1.4e+0", "-1");
  setDefaultDecimalPlaces(1);
  t("-8e+0", "2.8e+0", "-2.9");
  setDefaultDecimalPlaces(1);
  t("-2e+0", "1.4e+1", "-0.1");
  setDefaultDecimalPlaces(1);
  t("1e+0", "-1e+0", "-1");
  setDefaultDecimalPlaces(0);
  t("-7e+0", "-1.2e+0", "6");
  setDefaultDecimalPlaces(1);
  t("1e+0", "3e+0", "0.3");
  setDefaultDecimalPlaces(0);
  t("4e+0", "-2e+0", "-2");

  setDefaultDecimalRoundingMode(0);
  setDefaultDecimalPlaces(35);
  t("2395718.91845", "2.3790141850", "1007021.7040130847307242936846969661931629");
  setDefaultDecimalPlaces(15);
  t("5202573.04", "-6", "-867095.506666666666666");
  setDefaultDecimalPlaces(73);
  t("5.7038", "-48147.1", "-0.0001184661173777859933412396592941215566461946825457815735527165706761154");
  setDefaultDecimalPlaces(97);
  t("-0.0000001384016", "-3778", "3.66335627316040232927474854420328215987294865007940709370037056643726839597670725251455e-11");
  setDefaultDecimalPlaces(62);
  t("-422535.39661", "2165.85", "-195.08987077129071727035574947480204076921301105801417457349308585");
  setDefaultDecimalPlaces(35);
  t("0.000000000000007203370", "-5.28", "-1.36427462121212121212e-15");
  setDefaultDecimalPlaces(40);
  t("-337928", "-128512360693", "0.0000026295369424211873387284863048282592");
  setDefaultDecimalPlaces(2);
  t("1", "-282090", "0");
  setDefaultDecimalPlaces(73);
  t("-19618.9", "0.000000000178999841", "-109602890652847.0044842106870921745679092530590571865368304991958065482303975901297029643");
  setDefaultDecimalPlaces(85);
  t("-0.0185894437055", "72.4", "-0.0002567602721754143646408839779005524861878453038674033149171270718232044198895027624");
  setDefaultDecimalPlaces(68);
  t("0", "2305", "0");
  setDefaultDecimalPlaces(26);
  t("-8.982575884", "-3", "2.99419196133333333333333333");
  setDefaultDecimalPlaces(87);
  t("-2581945.955", "1.9", "-1358918.923684210526315789473684210526315789473684210526315789473684210526315789473684210526315");
  setDefaultDecimalPlaces(35);
  t("0.000000000000000000295100916", "-3.7", "-7.975700432432432e-20");
  setDefaultDecimalPlaces(65);
  t("8.003", "0.0034", "2353.82352941176470588235294117647058823529411764705882352941176470588");
  setDefaultDecimalPlaces(78);
  t("-932103672", "-0.31", "3006786038.709677419354838709677419354838709677419354838709677419354838709677419354838709");
  setDefaultDecimalPlaces(29);
  t("-0.0000000000000000107741", "6", "-1.79568333333e-18");
  setDefaultDecimalPlaces(62);
  t("0", "-0.00000000000294632", "0");
  setDefaultDecimalPlaces(13);
  t("0.00000000000000000092356339", "-1.2", "0");
  setDefaultDecimalPlaces(22);
  t("2560470", "11957938", "0.2141230369316181435294");
  setDefaultDecimalPlaces(6);
  t("-4", "-666768.17", "0.000005");
  setDefaultDecimalPlaces(63);
  t("7", "-159.975505035", "-0.043756698867545475412850913397961881921056190025860730047983748");
  setDefaultDecimalPlaces(17);
  t("-137.87", "-0.0000000000000059307584", "23246605358262444.14205104021772325");
  setDefaultDecimalPlaces(45);
  t("-996.903075", "-20579390", "0.000048441818489274949354669890604143271496385");
  setDefaultDecimalPlaces(14);
  t("121286", "-47.7", "-2542.68343815513626");
  setDefaultDecimalPlaces(37);
  t("-3.4506718185", "5308325.62646", "-6.500490100493653204117308896623e-7");
  setDefaultDecimalPlaces(21);
  t("-177875258.346", "24", "-7411469.09775");
  setDefaultDecimalPlaces(15);
  t("-0.0000051885410549", "0.000000000000000720190856", "-7204397295.069239257322645");
  setDefaultDecimalPlaces(97);
  t("0", "-890218.520", "0");
  setDefaultDecimalPlaces(90);
  t("-0.0000000000007259", "47717.7756077", "-1.5212360399357442489941792107079027396563964918902411497246142200123945112e-17");
  setDefaultDecimalPlaces(13);
  t("-3598260024.00", "1915578129", "-1.8784198720615");
  setDefaultDecimalPlaces(21);
  t("84.3", "1329.157879", "0.063423616811739186929");
  setDefaultDecimalPlaces(80);
  t("-0.0004876", "754756922041", "-6.4603581068384362795146701715706802394395292610287306517711169044e-16");
  setDefaultDecimalPlaces(17);
  t("-4.1", "-1", "4.1");
  setDefaultDecimalPlaces(47);
  t("4309", "6421.38", "0.67103955847496955483089304791181957772316854009");
  setDefaultDecimalPlaces(39);
  t("0.000000000016", "-508", "-3.1496062992125984251968503e-14");
  setDefaultDecimalPlaces(100);
  t("-247006395", "-207347168", "1.1912696825451698477019951388967125897760031137729356399987097967019255358240533094717744107312813647");
  setDefaultDecimalPlaces(63);
  t("0.0000000026", "423.31", "6.142070822801256762183742410999031442677942878741347e-12");
  setDefaultDecimalPlaces(32);
  t("-0.00000000000000055225885943", "5", "-1.10451771886e-16");
  setDefaultDecimalPlaces(78);
  t("-1.1", "-3840.757473", "0.000286401838109500438118395089821908158791988374007910183919077152310470815296");
  setDefaultDecimalPlaces(30);
  t("-414648", "-2.53", "163892.490118577075098814229249011857");
  setDefaultDecimalPlaces(9);
  t("0.0003333968", "0.00000008649230825", "3854.641028151");
  setDefaultDecimalPlaces(48);
  t("-0.000000000000000009496", "-7", "1.356571428571428571428571428571e-18");
  setDefaultDecimalPlaces(9);
  t("1881464.479", "16246013", "0.115810844");
  setDefaultDecimalPlaces(56);
  t("-591029.090", "58.7", "-10068.63867120954003407155025553662691652470187393526405451448");
  setDefaultDecimalPlaces(99);
  t("-0.000000021320", "-205.684723960", "1.03653784245767086571925893061834945615472142815131403305406657872250475513631333265883436e-10");
  setDefaultDecimalPlaces(42);
  t("-0.0000000000200300518728", "-0.0000000034", "0.005891191727294117647058823529411764705882");
  setDefaultDecimalPlaces(25);
  t("33385.88", "-0.00000000000006869446", "-486005421689027033.6210518286336336292620977");
  setDefaultDecimalPlaces(67);
  t("6918205.004", "524.701273", "13185.0356764810059837609732652583063201373250718223433774668962924357151");
  setDefaultDecimalPlaces(15);
  t("-3.3323", "-2", "1.66615");
  setDefaultDecimalPlaces(67);
  t("1.019453358", "0.00357", "285.5611647058823529411764705882352941176470588235294117647058823529411");
  setDefaultDecimalPlaces(57);
  t("62305899", "2711", "22982.625968277388417558096643305053485798598303209147915898192");
  setDefaultDecimalPlaces(8);
  t("-0.0000000000445", "-2.6", "0");
  setDefaultDecimalPlaces(73);
  t("-2", "-41922.095601", "0.0000477075387412716186177183466320391114552956863288271379656691795253272");
  setDefaultDecimalPlaces(65);
  t("-3", "-0.00000000134", "2238805970.14925373134328358208955223880597014925373134328358208955223880597");
  setDefaultDecimalPlaces(11);
  t("4187.8131", "-0.00000000035", "-11965180285714.28571428571");
  setDefaultDecimalPlaces(66);
  t("156800146", "-2.3", "-68173976.521739130434782608695652173913043478260869565217391304347826086956");
  setDefaultDecimalPlaces(66);
  t("-249866.3", "-0.00000009156", "2728989733508.082131935342944517256443861948449104412407164700742682394058540847");
  setDefaultDecimalPlaces(82);
  t("-0.0076881854", "2069.12", "-0.0000037156788393133312712650788741107330652644602536343952984843798329724713888029");
  setDefaultDecimalPlaces(67);
  t("-0.0000000000000054071", "-71.0662", "7.60853964331848332962786810044718867759919624237682e-17");
  setDefaultDecimalPlaces(42);
  t("0.000000000000001922921", "-3.2", "-6.009128125e-16");
  setDefaultDecimalPlaces(9);
  t("6.10", "1", "6.1");
  setDefaultDecimalPlaces(4);
  t("-45773057", "-5625.60758", "8136.5534");
  setDefaultDecimalPlaces(34);
  t("4", "-126.6353", "-0.0315867692499642674672859779224276");
  setDefaultDecimalPlaces(60);
  t("-5", "197955422709", "-2.5258211831610895767168604763336359752725140993197e-11");
  setDefaultDecimalPlaces(19);
  t("-0.0008326", "-4.2", "0.0001982380952380952");
  setDefaultDecimalPlaces(56);
  t("21.068252126", "3.984", "5.28821589508032128514056224899598393574297188755020080321");
  setDefaultDecimalPlaces(83);
  t("-56053240608.9", "8983574", "-6239.52567306731151766546365622412638889600063404609345901753578252931405696663710901696");
  setDefaultDecimalPlaces(37);
  t("0", "-2.25255", "0");
  setDefaultDecimalPlaces(13);
  t("0", "-0.00000000000002644587810", "0");
  setDefaultDecimalPlaces(50);
  t("640.8804817", "-1", "-640.8804817");
  setDefaultDecimalPlaces(46);
  t("0.000000000000005498542", "0.00000000000000000001610669", "341382.4938581421757046295669687564608246635404294737");
  setDefaultDecimalPlaces(33);
  t("-834.996721289", "-8823138.883", "0.000094637150379422402207697403191");
  setDefaultDecimalPlaces(89);
  t("775069961", "-28718.585", "-26988.44532207976124171855960173525262473760458601981956980122802011310794038076736719444916941");
  setDefaultDecimalPlaces(5);
  t("-0.00000000000000000003468598661", "-19.10319398", "0");
  setDefaultDecimalPlaces(8);
  t("-0.00000000000000007569460", "-5.94", "0");
  setDefaultDecimalPlaces(90);
  t("0.0000002467", "0.13", "0.000001897692307692307692307692307692307692307692307692307692307692307692307692307692307692");
  setDefaultDecimalPlaces(86);
  t("-0.00000000307005672384", "15.5", "-1.980681757316129032258064516129032258064516129032258064516129032258064516129e-10");
  setDefaultDecimalPlaces(79);
  t("6", "0.00000000000000000592667", "1012372883929761569.3129531423210673109857643499638076693995110238970619251620218436322589244887938");
  setDefaultDecimalPlaces(89);
  t("-5434.72575", "-837132690.0", "0.00000649207206327111655381657596001895470119557748963309508317014833096530969301891675022");
  setDefaultDecimalPlaces(30);
  t("-0.00000000000000168743408", "33499.4", "-5.0372068753e-20");
  setDefaultDecimalPlaces(2);
  t("-16.81", "-2054513", "0");
  setDefaultDecimalPlaces(30);
  t("5", "80257.9587", "0.000062299117507956254561455722");
  setDefaultDecimalPlaces(61);
  t("4.1227", "14565.90", "0.0002830377800204587426798206770608064039983797774253564832931");
  setDefaultDecimalPlaces(1);
  t("-9", "51.0", "-0.1");
  setDefaultDecimalPlaces(64);
  t("0.90395666", "-5.63", "-0.160560685612788632326820603907637655417406749555950266429840142");
  setDefaultDecimalPlaces(53);
  t("1.029", "-0.000000000000000000501", "-2053892215568862275.44910179640718562874251497005988023952095808383233532");
  setDefaultDecimalPlaces(30);
  t("0", "-3.9", "0");
  setDefaultDecimalPlaces(37);
  t("-4.965", "1.23", "-4.0365853658536585365853658536585365853");
  setDefaultDecimalPlaces(58);
  t("-4", "-0.00005123", "78079.2504391957837204762834276790942806949053289088424751122389");
  setDefaultDecimalPlaces(80);
  t("-22627.540", "11", "-2057.0490909090909090909090909090909090909090909090909090909090909090909090909090909");
  setDefaultDecimalPlaces(44);
  t("-0.000000000000014402425", "-41.06807", "3.506964169487390081881130523e-16");
  setDefaultDecimalPlaces(12);
  t("7.9151639", "-0.0000000000436607289932", "-181287946457.164241025584");
  setDefaultDecimalPlaces(48);
  t("-9.32", "-1603.959082", "0.005810622044284793045612119923144024443386642453");
  setDefaultDecimalPlaces(54);
  t("-1901397510", "-4.7", "404552661.702127659574468085106382978723404255319148936170212765");
  setDefaultDecimalPlaces(85);
  t("20.498", "-0.00000000000010710", "-191391223155929.0382819794584500466853408029878618113912231559290382819794584500466853408029878618113");
  setDefaultDecimalPlaces(5);
  t("1", "-0.000000000116915", "-8553222426.5492");
  setDefaultDecimalPlaces(7);
  t("684371", "-0.0000000016133991819", "-424179587840164.1329107");
  setDefaultDecimalPlaces(92);
  t("20.5", "3.968", "5.16633064516129032258064516129032258064516129032258064516129032258064516129032258064516129032");
  setDefaultDecimalPlaces(66);
  t("14165799.6", "591.9", "23932.758236188545362392295995945261023821591485048150025342118601115053");
  setDefaultDecimalPlaces(54);
  t("26", "-7", "-3.714285714285714285714285714285714285714285714285714285");
  setDefaultDecimalPlaces(4);
  t("10.7363", "-2", "-5.3681");
  setDefaultDecimalPlaces(97);
  t("439867.352", "21138153414", "0.0000208091664103767772947813463153816052628635728568376261288875514639596796333479387623863519377");
  setDefaultDecimalPlaces(8);
  t("1767", "3.6", "490.83333333");
  setDefaultDecimalPlaces(61);
  t("-2796021235.1", "-15", "186401415.6733333333333333333333333333333333333333333333333333333333333");
  setDefaultDecimalPlaces(97);
  t("-2", "-2", "1");
  setDefaultDecimalPlaces(22);
  t("-3.2", "-0.000870818300", "3674.7045853308319312995604");
  setDefaultDecimalPlaces(74);
  t("2", "0.000000014235090928", "140497873.18646904817298122424750555832908972620508434310438006357074672561585761863");
  setDefaultDecimalPlaces(80);
  t("0", "-0.00000001143", "0");
  setDefaultDecimalPlaces(83);
  t("0", "-2.279685", "0");
  setDefaultDecimalPlaces(11);
  t("-0.7953", "4420854.94", "-1.7989e-7");
  setDefaultDecimalPlaces(14);
  t("33.78883", "-987959", "-0.0000342006399");
  setDefaultDecimalPlaces(25);
  t("0", "-64833982.471", "0");
  setDefaultDecimalPlaces(3);
  t("-6", "-29358.0", "0");
  setDefaultDecimalPlaces(21);
  t("-0.0053532224600", "4476.01048750", "-0.000001195980767906992");
  setDefaultDecimalPlaces(38);
  t("-0.00000000000000000029", "2.02", "-1.4356435643564356435e-19");
  setDefaultDecimalPlaces(95);
  t("38.8678", "-7", "-5.55254285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714");
  setDefaultDecimalPlaces(20);
  t("1.42", "-0.000000000006461137", "-219775559626.73442770212115917059");
  setDefaultDecimalPlaces(30);
  t("-2702.3754", "-4.52949723527", "596.617076826389405944051726614003");
  setDefaultDecimalPlaces(18);
  t("8406.369658", "823661079", "0.000010206102816228");
  setDefaultDecimalPlaces(48);
  t("6.9", "-5956112", "-0.000001158473850055203797376543624431508339668562");
  setDefaultDecimalPlaces(76);
  t("-1.68", "-3561867.7", "4.716626616985240636534591107917904980019330869588446533261187662865748e-7");
  setDefaultDecimalPlaces(71);
  t("2392272.4832", "358.2", "6678.59431379117811278615298715801228364042434394193188163037409268565047459");
  setDefaultDecimalPlaces(83);
  t("-8.9544", "1", "-8.9544");
  setDefaultDecimalPlaces(2);
  t("-1.07965", "-19.6", "0.05");
  setDefaultDecimalPlaces(57);
  t("13.533079", "-1786.34554", "-0.007575846160200338395896238529528839084514410353105592325");
  setDefaultDecimalPlaces(67);
  t("697.5483975", "8.1145131", "85.9630625896703524947171506815362711041775260674605356173496102926988");
  setDefaultDecimalPlaces(81);
  t("-0.000000000000000339006158334", "-656753.31774", "5.16184919324926926405693470536041208610035091194787269747215e-22");
  setDefaultDecimalPlaces(8);
  t("0.00000000000000003630049486", "-0.0000007062563", "0");
  setDefaultDecimalPlaces(96);
  t("-3", "16.65154", "-0.180163516407491439230245370698445909507468978845199903432355205584588572588481305632992503996627");
  setDefaultDecimalPlaces(76);
  t("-76", "-4", "19");
  setDefaultDecimalPlaces(92);
  t("648.8858", "10.9", "59.53080733944954128440366972477064220183486238532110091743119266055045871559633027522935779816");
  setDefaultDecimalPlaces(13);
  t("0", "2.1065", "0");
  setDefaultDecimalPlaces(98);
  t("-101.8876519702", "-0.0000005975", "170523266.89573221757322175732217573221757322175732217573221757322175732217573221757322175732217573221757322");
  setDefaultDecimalPlaces(62);
  t("20.3", "38461", "0.00052780738930345024830347624866748134473882634356880996333948");
  setDefaultDecimalPlaces(43);
  t("-5", "280.2", "-0.0178443968593861527480371163454675231977159");
  setDefaultDecimalPlaces(92);
  t("698.48373500", "-0.00000921116664560", "-75830105.11851421801400830797710478456051612659361351984787936578377606591762344133004510800509710409");
  setDefaultDecimalPlaces(65);
  t("-0.000000000000000000018", "-0.0000000000000000000137392092132", "1.31011907022322858822568788278010352643168381562322914726222927416");
  setDefaultDecimalPlaces(40);
  t("-25", "0.00000002127852757", "-1174893324.6324242725785560546659573212189136449726");
  setDefaultDecimalPlaces(81);
  t("-74.064", "-49445296448", "1.497897784431137647044328223338797606636204022865604804068905721125225682e-9");
  setDefaultDecimalPlaces(54);
  t("-60.1", "-12.1636", "4.94097142293399980268999309414975829524154033345391167");
  setDefaultDecimalPlaces(18);
  t("-9000836.8469", "-0.074938253233", "120110043.38350881880903262");
  setDefaultDecimalPlaces(62);
  t("0.1226104094", "-0.00000000000028", "-437894319285.71428571428571428571428571428571428571428571428571428571428571");
  setDefaultDecimalPlaces(2);
  t("-0.000000000638972219287", "-1.4", "0");
  setDefaultDecimalPlaces(51);
  t("179.9816", "22.723600", "7.920470348008238131282015173652062173247196746994314");
  setDefaultDecimalPlaces(44);
  t("-2", "-1637", "0.00122174709835064141722663408674404398289554");
  setDefaultDecimalPlaces(70);
  t("-477.942804", "-12560.6", "0.0380509532984093116570864449150518287342961323503654284031017626546502");
  setDefaultDecimalPlaces(29);
  t("1.1", "0.00000000000011231044919", "9794280122048.90015897549274150490110776842");
  setDefaultDecimalPlaces(2);
  t("2", "-140319624", "0");
  setDefaultDecimalPlaces(29);
  t("-7344182.527", "-49431850.9971", "0.14857186973295534537489948538");
  setDefaultDecimalPlaces(58);
  t("26409276.3", "-72684.27", "-363.3423889377990588610162831655322396441485895091193734215119");
  setDefaultDecimalPlaces(20);
  t("-13.6896", "-3597130", "0.00000380570065580059");
  setDefaultDecimalPlaces(57);
  t("2.18617297742", "6.9855153072", "0.312958011152978552591324854924082843902239183973139086159");
  setDefaultDecimalPlaces(44);
  t("-1.6", "0.0041773417", "-383.01870301871642437103002610487909093000460077");
  setDefaultDecimalPlaces(49);
  t("1", "0.00000000000000000001248667863", "80085347723888686322.3451118802438499212019841980989623659434246206751");
  setDefaultDecimalPlaces(93);
  t("-4460.9286133", "-88960", "0.050145330635116906474820143884892086330935251798561151079136690647482014388489208633093525179");
  setDefaultDecimalPlaces(70);
  t("-7397.61", "-153862", "0.0480795128101805514032054698366068294965618541290247104548231532152188");
  setDefaultDecimalPlaces(58);
  t("-3787.328", "-16537809.955", "0.0002290102504688021733891064054134004589243086389064748446");
  setDefaultDecimalPlaces(67);
  t("-1.4", "52.316", "-0.0267604556923312179830262252465784845936233657007416469149017508983");
  setDefaultDecimalPlaces(99);
  t("-0.098", "-14", "0.007");
  setDefaultDecimalPlaces(73);
  t("215.3822132", "11.3351348180", "19.0012925878902413598094709489850551153806311966531389163756128868656213983");
  setDefaultDecimalPlaces(50);
  t("-12.90", "0.000000000000000012526836619", "-1029789115348882798.42104963914034424751205418431585277467407831289126");
  setDefaultDecimalPlaces(50);
  t("8", "-5526.3", "-0.00144762318368528671986681866710095362177225268262");
  setDefaultDecimalPlaces(92);
  t("0.0010", "1627.2", "6.14552605703048180924287118977384464110127826941986234021632251720747295968534906588e-7");
  setDefaultDecimalPlaces(60);
  t("-0.000000027831445720", "50754120", "-5.48358354356257186608693047973248280139622162e-16");
  setDefaultDecimalPlaces(22);
  t("-131.79679529", "955019", "-0.0001380043698502333461");
  setDefaultDecimalPlaces(1);
  t("-262638.3445", "921604398", "0");
  setDefaultDecimalPlaces(96);
  t("486093455701", "-1.0", "-486093455701");
  setDefaultDecimalPlaces(33);
  t("-47.7173", "84.731", "-0.563162242862706683504266443214407");
  setDefaultDecimalPlaces(3);
  t("-0.000021", "-3914134.50", "0");
  setDefaultDecimalPlaces(7);
  t("3.0", "0.000000000000000000266921159938", "11239273801660516445.0167683");
  setDefaultDecimalPlaces(70);
  t("-39997.69", "2.4", "-16665.7041666666666666666666666666666666666666666666666666666666666666666666");
  setDefaultDecimalPlaces(29);
  t("56", "9708.8", "0.00576796308503625576796308503");
  setDefaultDecimalPlaces(38);
  t("-1.5", "-4.7", "0.31914893617021276595744680851063829787");
  setDefaultDecimalPlaces(97);
  t("0", "0.000000004512331", "0");
  setDefaultDecimalPlaces(72);
  t("3663723522", "-0.6098089169", "-6007986141.994703915094554761175221509785699232368833864128102584654088058317797287");
  setDefaultDecimalPlaces(29);
  t("17419122.67", "-0.0000000000000000541527710974", "-3.216663213535222472764493088502126201074602590795099e+23");
  setDefaultDecimalPlaces(95);
  t("-193.0978", "-0.0000000000000092108613", "20964141540161939.03603781331502625058527371376225152798685612603894057117112381227584004549064266118088218308096");
  setDefaultDecimalPlaces(91);
  t("4.819", "2", "2.4095");
  setDefaultDecimalPlaces(18);
  t("-2954480.8938", "3943.4902109", "-749.204571532514565471");
  setDefaultDecimalPlaces(14);
  t("0.16343", "-3.2", "-0.051071875");
  setDefaultDecimalPlaces(93);
  t("-0.229", "0.00000000000006847080", "-3344491374425.302464700280995694515034145942503957891539167060995344000654293509057875766019967635838926958");
  setDefaultDecimalPlaces(68);
  t("1.2", "219", "0.00547945205479452054794520547945205479452054794520547945205479452054");
  setDefaultDecimalPlaces(38);
  t("-2.6", "-38.67", "0.06723558313938453581587794155676234807");
  setDefaultDecimalPlaces(19);
  t("177098134", "4471338.7", "39.6074075086282325246");
  setDefaultDecimalPlaces(77);
  t("28411512", "-293.5694809", "-96779.51506709224828009020742864283206217979860862301235209902910585553309128053848");
  setDefaultDecimalPlaces(98);
  t("0.0000000000000000010", "1.3", "7.6923076923076923076923076923076923076923076923076923076923076923076923076923076e-19");
  setDefaultDecimalPlaces(75);
  t("-1.51820", "-3752.715", "0.00040456043158086878433347589678406167268231133992322891559844006272791832");
  setDefaultDecimalPlaces(6);
  t("6625", "-3", "-2208.333333");
  setDefaultDecimalPlaces(66);
  t("-60014529.9", "1583677422", "-0.03789567816418614067985367792911554181391871860631981656173412315");
  setDefaultDecimalPlaces(43);
  t("-0.0000000000000006506", "-15.452", "4.2104581931141599792907067e-17");
  setDefaultDecimalPlaces(15);
  t("-9.86177268", "-29664.65", "0.000332441902398");
  setDefaultDecimalPlaces(68);
  t("16534.1358230", "-1.3", "-12718.56601769230769230769230769230769230769230769230769230769230769230769");
  setDefaultDecimalPlaces(63);
  t("-7829.31836", "-2.3", "3404.051460869565217391304347826086956521739130434782608695652173913");
  setDefaultDecimalPlaces(93);
  t("-39.6", "0.0000000000000000000476028", "-831883838765786886485.668910232171216819178703773727595855705966875898056416849429025183392573546093927247977009755");
  setDefaultDecimalPlaces(49);
  t("7.886351", "-1452266767.15", "-5.4303735225426693053416126296297449499893e-9");
  setDefaultDecimalPlaces(92);
  t("-176464604.5", "2", "-88232302.25");
  setDefaultDecimalPlaces(68);
  t("-8405636776", "-13041201059", "0.6445446809670262595404710568537520160626794305449255477198298442398");
  setDefaultDecimalPlaces(94);
  t("322947.69323", "0.022998545", "14042092.3684520042463555846685083773777862903935879421937344297215323838964595368967906447994862283679");
  setDefaultDecimalPlaces(87);
  t("-421544.12", "-1.1", "383221.927272727272727272727272727272727272727272727272727272727272727272727272727272727272727");
  setDefaultDecimalPlaces(65);
  t("6584.50", "-0.0000000910", "-72357142857.14285714285714285714285714285714285714285714285714285714285714285");
  setDefaultDecimalPlaces(72);
  t("6.1", "-53.0", "-0.115094339622641509433962264150943396226415094339622641509433962264150943");
  setDefaultDecimalPlaces(0);
  t("-24", "-566.48", "0");
  setDefaultDecimalPlaces(82);
  t("-2.626", "-0.000000000000000081", "32419753086419753.086419753086419753086419753086419753086419753086419753086419753086419753086419753");
  setDefaultDecimalPlaces(27);
  t("6.5123", "359.87208", "0.018096152388370890011806417");
  setDefaultDecimalPlaces(76);
  t("499084087", "10952", "45570.1321219868517165814463111760409057706355003652300949598246895544192841490138");
  setDefaultDecimalPlaces(57);
  t("36.1", "-0.0000000000000000000548664617516", "-657961145069597314936.909418914751595581728895559211703078434090477403629098356");
  setDefaultDecimalPlaces(46);
  t("7867324.358", "-1735326670", "-0.0045336272956607069261489538450993783205095326");
  setDefaultDecimalPlaces(64);
  t("6.2", "5", "1.24");
  setDefaultDecimalPlaces(30);
  t("-65.527", "11", "-5.957");
  setDefaultDecimalPlaces(18);
  t("6", "-16.28637452", "-0.368406117189057494");
  setDefaultDecimalPlaces(77);
  t("0.0000000032633043478", "3749015794", "8.7044294479171244590387553859422337765696806771041306528035e-19");
  setDefaultDecimalPlaces(67);
  t("1", "-12622677310", "-7.92224957860385959593226739945869692837770880162031172133e-11");
  setDefaultDecimalPlaces(66);
  t("-1325.0", "4617.79313", "-0.286933598517437267701942291208701243834194885209160506503677006423");
  setDefaultDecimalPlaces(70);
  t("-226784.21", "-0.00000552", "41084096014.4927536231884057971014492753623188405797101449275362318840579710144927");
  setDefaultDecimalPlaces(63);
  t("-51516038383", "-4185508.20480", "12308.191947615985712665254981272471545962360455865471679602906031316");
  setDefaultDecimalPlaces(17);
  t("-324.183", "-0.32054554106", "1011.34771342621526965");
  setDefaultDecimalPlaces(68);
  t("-108931270", "10.09314504", "-10792599.29073604197408818767950648611703691518535831919443020309554572694419");
  setDefaultDecimalPlaces(60);
  t("-1551.1", "-72.95", "21.262508567511994516792323509252912954078135709389993145990404");
  setDefaultDecimalPlaces(47);
  t("0", "200.0", "0");
  setDefaultDecimalPlaces(82);
  t("2", "8.5", "0.2352941176470588235294117647058823529411764705882352941176470588235294117647058823");
  setDefaultDecimalPlaces(36);
  t("-1", "53.65100760", "-0.018638978925719188170475292247819778");
  setDefaultDecimalPlaces(91);
  t("971.30", "-0.00000000000924083538", "-105109544760659.9393830993664990491368324754206367000555744127972984191392445300762407911220684465866980956");
  setDefaultDecimalPlaces(37);
  t("-99.28642637", "-0.0000000015316882918", "64821561215.5141499528435580615959370487367983418");
  setDefaultDecimalPlaces(73);
  t("522.269", "-92.4", "-5.6522619047619047619047619047619047619047619047619047619047619047619047619");
  setDefaultDecimalPlaces(23);
  t("14.48", "7.8", "1.85641025641025641025641");
  setDefaultDecimalPlaces(7);
  t("1.2", "0.0001407739391", "8524.3050501");
  setDefaultDecimalPlaces(31);
  t("1.4001", "132496.22", "0.0000105670939140754355105375836");
  setDefaultDecimalPlaces(75);
  t("0.0000000000000000163669217568", "-699018", "-2.3414163521969391346145592817352342858123825137550106e-23");
  setDefaultDecimalPlaces(41);
  t("-0.00000000175757", "0.000000000000000000334921792", "-5247702723.38683772479038927392338806069686859910268");
  setDefaultDecimalPlaces(99);
  t("-0.0000000562", "629.84", "-8.9229010542359964435412168169693890511876032008129048647275498539311571192683856217452051e-11");
  setDefaultDecimalPlaces(21);
  t("2", "-1.5", "-1.333333333333333333333");
  setDefaultDecimalPlaces(14);
  t("-65129914", "-76440", "852.03969126111983");
  setDefaultDecimalPlaces(23);
  t("-4.7", "1.29874", "-3.61889215701372099111446");
  setDefaultDecimalPlaces(95);
  t("-0.000000000000031791", "-57.6", "5.5192708333333333333333333333333333333333333333333333333333333333333333333333333e-16");
  setDefaultDecimalPlaces(58);
  t("38757", "-0.00000000001952476", "-1985017997660406.5811820478203061138779682823245970757130945527627484281496");
  setDefaultDecimalPlaces(42);
  t("-2.828", "49.46", "-0.057177517185604528912252325111200970481196");
  setDefaultDecimalPlaces(2);
  t("-3177801", "-0.00000000000024415030355", "13015756907913129645.58");
  setDefaultDecimalPlaces(53);
  t("-2630.905", "0.0000571000275", "-46075371.85511863369943210622796985518089286384319166921592113");
  setDefaultDecimalPlaces(80);
  t("89.432202", "-3", "-29.810734");
  setDefaultDecimalPlaces(71);
  t("0", "190.1199", "0");
  setDefaultDecimalPlaces(58);
  t("-7062134", "-110.2", "64084.7005444646098003629764065335753176043557168784029038112522");
  setDefaultDecimalPlaces(30);
  t("-0.000000000000000004113884", "-75", "5.4851786666e-20");
  setDefaultDecimalPlaces(70);
  t("100006936.4912", "-0.0000000000000000083", "-1.20490284929156626506024096385542168674698795180722891566265060240963855421686746987951807228915e+25");
  setDefaultDecimalPlaces(63);
  t("163215.85675", "9519293704", "0.000017145794827342791271439480317141814705373859951238247874949");
  setDefaultDecimalPlaces(66);
  t("25.54", "-236.1", "-0.108174502329521389241846675137653536637018212621770436255823803473");
  setDefaultDecimalPlaces(75);
  t("5.05", "-30.465", "-0.165763991465616280978171672410963400623666502543902839323814213031347447891");
  setDefaultDecimalPlaces(2);
  t("-2734785", "0.00000228480", "-1196947216386.55");
  setDefaultDecimalPlaces(43);
  t("-8568", "52.1792964931", "-164.2030570713616480780340795077303341681377269");
  setDefaultDecimalPlaces(24);
  t("-3", "-89843", "0.000033391583094954531794");
  setDefaultDecimalPlaces(15);
  t("2347.542", "169786", "0.013826475681151");
  setDefaultDecimalPlaces(16);
  t("119539644", "-27.812", "-4298131.8855170430030202");
  setDefaultDecimalPlaces(0);
  t("-3740", "-346.1663", "10");
  setDefaultDecimalPlaces(97);
  t("-860832509", "-255", "3375813.7607843137254901960784313725490196078431372549019607843137254901960784313725490196078431372549019");
  setDefaultDecimalPlaces(45);
  t("3.1", "902292481", "3.435693043307095894995050945126960445e-9");
  setDefaultDecimalPlaces(71);
  t("59.57", "277433074.5", "2.1471845095383535462351659877524804635360806629420098215434656115e-7");
  setDefaultDecimalPlaces(40);
  t("11", "0.16622894731", "66.1737933013924709308802516292611899594661");
  setDefaultDecimalPlaces(61);
  t("1.24790", "-1", "-1.2479");
  setDefaultDecimalPlaces(75);
  t("-160.85389", "1.611575464", "-99.811577920622896750679247124601296362253378163866113563516005478226863846073");
  setDefaultDecimalPlaces(51);
  t("204.79", "96", "2.133229166666666666666666666666666666666666666666666");
  setDefaultDecimalPlaces(38);
  t("3.25746", "-1", "-3.25746");
  setDefaultDecimalPlaces(74);
  t("0", "-2", "0");
  setDefaultDecimalPlaces(21);
  t("-7158.23308", "18.7", "-382.793212834224598930481");
  setDefaultDecimalPlaces(95);
  t("-0.000000194620813", "-8.3", "2.344829072289156626506024096385542168674698795180722891566265060240963855421686746987951e-8");
  setDefaultDecimalPlaces(46);
  t("179.1", "50563794", "0.0000035420601547423438992730648337029456294359");
  setDefaultDecimalPlaces(46);
  t("-1238.682", "3.05", "-406.1252459016393442622950819672131147540983606557");
  setDefaultDecimalPlaces(56);
  t("-34.72599", "-1.7", "20.42705294117647058823529411764705882352941176470588235294");
  setDefaultDecimalPlaces(88);
  t("51550596495", "207344.2", "248623.2867618192358406938800313681308664529801171192635241304073130572256180785380058858651459");
  setDefaultDecimalPlaces(12);
  t("0.000000000000000065153923", "-0.00000000000000000001379162342", "-4724.166330231774");
  setDefaultDecimalPlaces(9);
  t("-1011273066.19", "17.06238398", "-59269154.144894586");
  setDefaultDecimalPlaces(50);
  t("0.000000000000161650174128", "326.50953", "4.9508562316083086456925162337528096e-16");
  setDefaultDecimalPlaces(50);
  t("-2.5", "17.2", "-0.14534883720930232558139534883720930232558139534883");
  setDefaultDecimalPlaces(13);
  t("-75.876", "11309.846", "-0.006708844665");
  setDefaultDecimalPlaces(34);
  t("-16.07", "0.0000046", "-3493478.2608695652173913043478260869565217");
  setDefaultDecimalPlaces(28);
  t("-0.0000000000000000000188148736", "-358.660033539", "5.24587e-23");
  setDefaultDecimalPlaces(95);
  t("-24761005440", "-2237082936", "11.0684342728364541957241052416663733382480192500113907265528397915418188143561969398527475961222");
  setDefaultDecimalPlaces(88);
  t("-0.000035168716068", "105.4482507", "-3.335163536098375503919099152964895983807913467833373930023857664620319775489646885e-7");
  setDefaultDecimalPlaces(31);
  t("-4.6", "-6146", "0.000748454279205987634233647901");
  setDefaultDecimalPlaces(88);
  t("9.841960", "9.8", "1.004281632653061224489795918367346938775510204081632653061224489795918367346938775510204");
  setDefaultDecimalPlaces(97);
  t("0.000000000000000080", "132.86416", "6.021187354061471505935084374898392463400212668337345451173589627180121411221807e-19");
  setDefaultDecimalPlaces(43);
  t("-7.8", "0.00029", "-26896.5517241379310344827586206896551724137931034");
  setDefaultDecimalPlaces(46);
  t("1.404", "-667016041", "-2.1048969045708452459841216922097979949e-9");
  setDefaultDecimalPlaces(88);
  t("5.8", "0.0671177", "86.4153569028736086010098677398063402053407670405869092653651719293122380534493881643739281");
  setDefaultDecimalPlaces(71);
  t("-73475045.42", "-62", "1185081.37774193548387096774193548387096774193548387096774193548387096774193548");
  setDefaultDecimalPlaces(8);
  t("154.753", "0.000000000000000000804688916", "192314069353976288645.685782");
  setDefaultDecimalPlaces(34);
  t("5.10", "1", "5.1");
  setDefaultDecimalPlaces(80);
  t("11.72958", "196.102507685", "0.059813513546911173452595617173685608394722655175514819934312967987684200939034");
  setDefaultDecimalPlaces(63);
  t("-23377.02203", "-0.427124941", "54731.109766778990318900623506319664905730709834619561586313452952867");
  setDefaultDecimalPlaces(34);
  t("-0.000000000000482175689", "-7", "6.88822412857142857142e-14");
  setDefaultDecimalPlaces(9);
  t("37.1", "2145207.3508", "0.000017294");
  setDefaultDecimalPlaces(39);
  t("9", "3", "3");
  setDefaultDecimalPlaces(29);
  t("7", "2", "3.5");
  setDefaultDecimalPlaces(50);
  t("-35300", "-0.00000000000000000035", "1.0085714285714285714285714285714285714285714285714285714285714285714285714e+23");
  setDefaultDecimalPlaces(97);
  t("57.0", "-22.17711", "-2.570217670381758488820229506910503667971164863230601282132793677805629317796592973565987633194767");
  setDefaultDecimalPlaces(54);
  t("-0.00000131", "9162", "-1.42981881685221567343374808993669504475005457e-10");
  setDefaultDecimalPlaces(70);
  t("0", "-105909.4098", "0");
  setDefaultDecimalPlaces(45);
  t("-2.6848", "-0.00130931888274", "2050.531795876603321643163733114221473127335614095");
  setDefaultDecimalPlaces(94);
  t("60.3", "-0.00000062457710", "-96545326.4296753755461095195453051352667268780747805194907081927915704882551729802453532157999388706374");
  setDefaultDecimalPlaces(44);
  t("-15883748", "-6.034935", "2631966.70718077328090526244276036113065012299221118");
  setDefaultDecimalPlaces(78);
  t("940460", "-0.00000001911", "-49212977498691.784406070120355834641548927263212977498691784406070120355834641548927263212977");
  setDefaultDecimalPlaces(87);
  t("16646027174", "0.00000000000000038611472075", "4.3111609787024676654988684473771128551306341251429741040247557046813268903319843186786863784705882649256645830693e+25");
  setDefaultDecimalPlaces(6);
  t("-10366683.73", "1.06", "-9779890.31132");
  setDefaultDecimalPlaces(42);
  t("9286692172.75", "-0.00000000184337078", "-5037886177597976246.536792776980006160236520620121796657751079");
  setDefaultDecimalPlaces(29);
  t("0", "1.69", "0");
  setDefaultDecimalPlaces(72);
  t("-0.00000000000409", "-0.00001809241726", "2.26061556132826001383078868920581151796849505116929853518092031888e-7");
  setDefaultDecimalPlaces(27);
  t("1.6", "2637790338.1", "6.06568299568676018e-10");
  setDefaultDecimalPlaces(91);
  t("-37.02", "2166.9352", "-0.0170840364769560252655455502314974624068130879040591522995242312737362889300981404520079788");
  setDefaultDecimalPlaces(61);
  t("50894.5324", "227.96", "223.2608018950693104053342691700298297947008247060887875065801017");
  setDefaultDecimalPlaces(50);
  t("0.00000057876497951", "-117510181283", "-4.92523263253384968399393869906229e-18");
  setDefaultDecimalPlaces(15);
  t("0.000000000000000140970829485", "1.748925", "0");
  setDefaultDecimalPlaces(25);
  t("-2", "-0.000000032812753867", "60951909.3736113691246492779477868");
  setDefaultDecimalPlaces(43);
  t("-7.772538", "-52.9369897549", "0.1468262180374650323145059705941991298076865");
  setDefaultDecimalPlaces(72);
  t("-16194.72", "6288518341.1", "-0.000002575283893847590769174356920760480343476818360074226928933207242291");
  setDefaultDecimalPlaces(39);
  t("69.95768", "-311.1", "-0.224872002571520411443265830922532947605");
  setDefaultDecimalPlaces(32);
  t("-32071985.6", "-1.2", "26726654.66666666666666666666666666666666");
  setDefaultDecimalPlaces(85);
  t("-7", "0.0000000014073100534", "-4974028276.9161663120966375098873432093965598327473725982834650870547102992790998561056680361521");
  setDefaultDecimalPlaces(77);
  t("79370.24", "0.655752", "121036.9773938928131366736205150727714135831838865912723102636362527296904927472581");
  setDefaultDecimalPlaces(77);
  t("261145.782", "3", "87048.594");
  setDefaultDecimalPlaces(52);
  t("11345195.3106", "12.8", "886343.383640625");
  setDefaultDecimalPlaces(42);
  t("-0.000000429", "-94322", "4.548249613027713576896164203473e-12");
  setDefaultDecimalPlaces(12);
  t("1699.515", "-142366", "-0.011937646629");
  setDefaultDecimalPlaces(72);
  t("-105071255", "168903.02", "-622.080380800769577713885755269503174069948542068697173087846505053610053864");
  setDefaultDecimalPlaces(38);
  t("7.3", "528.1050", "0.01382300868198558998683973830961645884");
  setDefaultDecimalPlaces(90);
  t("-0.0012522", "-284", "0.000004409154929577464788732394366197183098591549295774647887323943661971830985915492957746");
  setDefaultDecimalPlaces(48);
  t("0.0000428", "989", "4.3276036400404448938321536905965621840242e-8");
  setDefaultDecimalPlaces(28);
  t("-0.000004464142023", "7849.613794", "-5.68708491927622089e-10");
  setDefaultDecimalPlaces(68);
  t("-0.0000000000000000018", "356494682122", "-5.04916367696055009149004048491869245005e-30");
  setDefaultDecimalPlaces(72);
  t("0.041600", "-490894.6579", "-8.4743232240417501597749613644756674790451004417010992288494406938e-8");
  setDefaultDecimalPlaces(85);
  t("-0.00000000007846", "-1.44", "5.44861111111111111111111111111111111111111111111111111111111111111111111111e-11");
  setDefaultDecimalPlaces(47);
  t("15.82709222", "-58", "-0.27288090034482758620689655172413793103448275862");
  setDefaultDecimalPlaces(97);
  t("3.06", "1.8", "1.7");
  setDefaultDecimalPlaces(38);
  t("-8.16580345", "-0.0000000000187826963471", "434751395598.25653291972342115125541713496532725938");
  setDefaultDecimalPlaces(80);
  t("10.54915430", "-6.9", "-1.52886294202898550724637681159420289855072463768115942028985507246376811594202898");
  setDefaultDecimalPlaces(63);
  t("0.000000000000000000021046831", "1.7", "1.2380488823529411764705882352941176470588235e-20");
  setDefaultDecimalPlaces(0);
  t("0.000000000000062197818", "-12.8379", "0");
  setDefaultDecimalPlaces(32);
  t("-53817883649", "-679", "79260506.11045655375552282768777614138438");
  setDefaultDecimalPlaces(85);
  t("-0.00000000000062524", "16.4", "-3.81243902439024390243902439024390243902439024390243902439024390243902439e-14");
  setDefaultDecimalPlaces(73);
  t("0.00000000000000000021122725288", "-4944", "-4.27239589158576051779935275080906148867313915857605e-23");
  setDefaultDecimalPlaces(0);
  t("9077553554.80", "-4", "-2269388388");
  setDefaultDecimalPlaces(100);
  t("-1", "-0.000000003868573", "258493248.0271149077450522453628250003295788912345715073749416128376018754202130863240786719030505563679423911");
  setDefaultDecimalPlaces(51);
  t("-1010541.20796", "-0.000000000000000389", "2.59779230838046272493573264781491002570694087403598971722365038560411311e+21");
  setDefaultDecimalPlaces(23);
  t("-131788273", "0.000000000000000007246944", "-1.818535826963751893211814524853510666013149818737e+25");
  setDefaultDecimalPlaces(68);
  t("-4.51", "-0.01044596", "431.74586155796116393323351802993693255574403884372522965816449613056148");
  setDefaultDecimalPlaces(33);
  t("0.00000000000047384675", "-17", "-2.7873338235294117647e-14");
  setDefaultDecimalPlaces(19);
  t("46", "5", "9.2");
  setDefaultDecimalPlaces(89);
  t("-3.5", "368.8212", "-0.00948969310874754488082572259946011780233891110380856631885585752662807886314561093559697");
  setDefaultDecimalPlaces(52);
  t("27823.5", "-1.65920443", "-16769.1813600087844509913706052484442800095465029586498874");
  setDefaultDecimalPlaces(43);
  t("-0.0000000000000000082", "0.000000425", "-1.92941176470588235294117647058823e-11");
  setDefaultDecimalPlaces(73);
  t("-1195861315", "-1426168", "838.513635840938795429430473829170195937645494780418576212620112076557600507");
  setDefaultDecimalPlaces(1);
  t("63859320.7179", "1.83834", "34737491.8");
  setDefaultDecimalPlaces(20);
  t("0", "-39.9", "0");
  setDefaultDecimalPlaces(93);
  t("0.013463", "-27342465", "-4.92384282104777312506388871669032034968317596822378669955324071915242462594356434213e-10");
  setDefaultDecimalPlaces(73);
  t("9", "-0.647341", "-13.9030279250039778107674316936514140151790169323432317742889759802020882347");
  setDefaultDecimalPlaces(7);
  t("-47312236", "-13771012.0764", "3.4356397");
  setDefaultDecimalPlaces(12);
  t("0", "-4.537", "0");
  setDefaultDecimalPlaces(82);
  t("3042855105", "6.824", "445904909.87690504103165298944900351699882766705744431418522860492379835873388042203985932");
  setDefaultDecimalPlaces(9);
  t("-0.00016784780142", "-0.0370", "0.004536427");
  setDefaultDecimalPlaces(26);
  t("-788669.13120", "46.7", "-16887.98996145610278372591006423");
  setDefaultDecimalPlaces(54);
  t("-2.899", "15855174323.7", "-1.82842518209757701523895733765832590673554916e-10");
  setDefaultDecimalPlaces(84);
  t("6.202216369", "-3.4", "-1.824181285");
  setDefaultDecimalPlaces(54);
  t("942.52074", "-7.74", "-121.772705426356589147286821705426356589147286821705426356");
  setDefaultDecimalPlaces(20);
  t("23547.15", "0.00000001020398", "2307643684131.09394569569912916332");
  setDefaultDecimalPlaces(85);
  t("-669.61", "-146.4", "4.573838797814207650273224043715846994535519125683060109289617486338797814207650273224");
  setDefaultDecimalPlaces(77);
  t("-5", "-92.0286", "0.05433093625242587630367081537695890190658121497012885124841625320824178570574");
  setDefaultDecimalPlaces(60);
  t("0.16336", "0.00000430175", "37975.242633811820770616609519381647004126227698029871563898413436");
  setDefaultDecimalPlaces(42);
  t("-229.774998", "0.00000000000105119913", "-218583702594959.339435526359311199201620343806791392607031");
  setDefaultDecimalPlaces(6);
  t("-4", "36399.26329", "-0.000109");
  setDefaultDecimalPlaces(91);
  t("-413128", "423880.06", "-0.9746341925119100907931361527126329084694382651545345162025314425028627201760799977238844403");
  setDefaultDecimalPlaces(53);
  t("0", "356865.6229", "0");
  setDefaultDecimalPlaces(92);
  t("0", "0.0000000000000342030061944", "0");
  setDefaultDecimalPlaces(66);
  t("105.254", "-0.000000000000000000019", "-5.539684210526315789473684210526315789473684210526315789473684210526315789473684210526315e+21");
  setDefaultDecimalPlaces(48);
  t("-196.83678", "995", "-0.197825909547738693467336683417085427135678391959");
  setDefaultDecimalPlaces(89);
  t("11.4486966", "1206.1", "0.00949232783351297570682364646380897106375922394494652184727634524500456015255783102561976");
  setDefaultDecimalPlaces(66);
  t("-6908607.8816", "21", "-328981.327695238095238095238095238095238095238095238095238095238095238095");
  setDefaultDecimalPlaces(95);
  t("3626897.19", "36076", "100.5349038141700853753187714824259895775584876372103337398824703403925047122740880363676682559042");
  setDefaultDecimalPlaces(85);
  t("-57", "477999.9639", "-0.0001192468709305691225806387555670691965924644288451169065035990058157408157913042888");
  setDefaultDecimalPlaces(5);
  t("-0.123044", "0.000000000000000000021606", "-5694899564935666018.6985");
  setDefaultDecimalPlaces(6);
  t("-0.00000000252", "68.9", "0");
  setDefaultDecimalPlaces(71);
  t("-9.4", "59882.5", "-0.00015697407422869786665553375360080156974074228697866655533753600801569");
  setDefaultDecimalPlaces(61);
  t("-0.0000000000000000000228023817404", "-7.7", "2.9613482779740259740259740259740259740259e-21");
  setDefaultDecimalPlaces(99);
  t("30649.79601", "-0.000089370246", "-342953022.75435159930073371399246232353438973414037598150955072899765767680666337205785469137010096178990041");
  setDefaultDecimalPlaces(56);
  t("6", "-1.0", "-6");
  setDefaultDecimalPlaces(2);
  t("1.692", "3.6", "0.47");
  setDefaultDecimalPlaces(100);
  t("0.12646", "-1373", "-0.0000921048798252002913328477785870356882738528769118718135469774217042971595047341587764020393299344");
  setDefaultDecimalPlaces(16);
  t("-52040.6", "0.00000182457397938", "-28522055333.5325292245974965");
  setDefaultDecimalPlaces(94);
  t("0.000000000023", "78.79", "2.919152176672166518593730168803147607564411727376570630790709480898591191775606041e-13");
  setDefaultDecimalPlaces(94);
  t("-3", "-4", "0.75");
  setDefaultDecimalPlaces(41);
  t("-14.287", "32.5260", "-0.43924860111910471622701838529176658673061");
  setDefaultDecimalPlaces(53);
  t("301214260.277", "-0.00000000000000535081067385", "-5.629320090674618777139935266670769575802901120618201706176220103714032662774e+22");
  setDefaultDecimalPlaces(92);
  t("0", "1610.51098306", "0");
  setDefaultDecimalPlaces(20);
  t("-1", "-0.1735905", "5.76068390839360448872");
  setDefaultDecimalPlaces(43);
  t("-479964", "-41940.62", "11.4438937717182054056425489179702159863158913");
  setDefaultDecimalPlaces(18);
  t("-354.71832585", "172689359.7", "-0.000002054083276851");
  setDefaultDecimalPlaces(53);
  t("0", "-1.65074", "0");
  setDefaultDecimalPlaces(14);
  t("-2800.0", "14.8", "-189.18918918918918");
  setDefaultDecimalPlaces(20);
  t("-1221.098", "3190.1755", "-0.38276828343769802006");
  setDefaultDecimalPlaces(88);
  t("0.00000000000000000004336", "-92.7", "-4.67745415318230852211434735706580366774541531823085221143473570658e-22");
  setDefaultDecimalPlaces(64);
  t("4957622.0", "0.000000000234094", "21177911437285876.6136680137038967252471229506095841841311609866122156056968568182");
  setDefaultDecimalPlaces(43);
  t("-22.9", "-1", "22.9");
  setDefaultDecimalPlaces(76);
  t("-230.95701199", "-1.65", "139.9739466606060606060606060606060606060606060606060606060606060606060606060606");
  setDefaultDecimalPlaces(50);
  t("1.2654287675", "2.35", "0.5384803265957446808510638297872340425531914893617");
  setDefaultDecimalPlaces(58);
  t("-34682.3", "46.7768", "-741.4423389372509449128627866805766961399668211592071283200218");
  setDefaultDecimalPlaces(91);
  t("-0.0000000016328396", "0.000000001433207749", "-1.1392902397710940648842389143403940666246007019042429137745333248264484509147040622091975585");
  setDefaultDecimalPlaces(96);
  t("-47676.0", "-17610.5", "2.707248516510036625876607705630163822719400357741120354334062065245166236052355129042332699241929");
  setDefaultDecimalPlaces(79);
  t("-5", "-1", "5");
  setDefaultDecimalPlaces(89);
  t("1.12", "-0.00000000000000050141695", "-2233670002579689.41815788237713144719180314905589051187838783670954880962839409397707835764227754965204108");
  setDefaultDecimalPlaces(43);
  t("-57", "1849060229", "-3.08264701744336744371132109834589925e-8");
  setDefaultDecimalPlaces(79);
  t("-50.3010", "1", "-50.301");
  setDefaultDecimalPlaces(71);
  t("-0.00000000000000000028696761", "-0.00154186194033", "1.8611757803593050571579899891282505511405757367119458223e-16");
  setDefaultDecimalPlaces(18);
  t("1.155700", "-40.84", "-0.028298237022526934");
  setDefaultDecimalPlaces(43);
  t("11.1070914417", "-2659.1200761", "-0.0041769800249074205393307925016271137166343");
  setDefaultDecimalPlaces(43);
  t("-149.3", "0.0000000003970039", "-376066834607.9219876681312198696284847579582971351163049");
  setDefaultDecimalPlaces(6);
  t("-384065.6392", "128.0510", "-2999.317765");
  setDefaultDecimalPlaces(79);
  t("0.0090336785637", "233415", "3.87022194961763382816014394961763382816014394961763382816014394961763382e-8");
  setDefaultDecimalPlaces(34);
  t("-773.2", "0.000000000000004526", "-170835174547061422.8899690676093680954485196641626159");
  setDefaultDecimalPlaces(28);
  t("-0.00102997", "-230883.134", "4.4610014692541378964e-9");
  setDefaultDecimalPlaces(39);
  t("3.0113544", "-85476", "-0.000035230408535729327530534886985820581");
  setDefaultDecimalPlaces(71);
  t("772.349786", "0.0000000866399397", "8914477418.5478801758676662606218318963119038274215234708894886269178693807424245");
  setDefaultDecimalPlaces(1);
  t("-3.13", "0.11", "-28.4");
  setDefaultDecimalPlaces(86);
  t("1", "89722.0", "0.00001114553844096208287822384699404828247252624774302846570517821715967098370522279931");
  setDefaultDecimalPlaces(18);
  t("-68.67249", "1", "-68.67249");
  setDefaultDecimalPlaces(21);
  t("-0.00844666", "-3.9", "0.00216581025641025641");
  setDefaultDecimalPlaces(36);
  t("9.65", "-442.888", "-0.021788804392984230776178175972254836");
  setDefaultDecimalPlaces(14);
  t("-0.56552", "-287.0", "0.00197045296167");
  setDefaultDecimalPlaces(36);
  t("0.0000261857", "-3.02", "-0.000008670761589403973509933774834437");
  setDefaultDecimalPlaces(56);
  t("1986019865", "62965", "31541.64797903597236559993647264353212101961407130945763519415");
  setDefaultDecimalPlaces(48);
  t("-176352914.2", "-8484551.34518", "20.785178499766467954593070562433286482605640762155");
  setDefaultDecimalPlaces(31);
  t("5.6755", "6.0", "0.9459166666666666666666666666666");
  setDefaultDecimalPlaces(16);
  t("7", "65", "0.1076923076923076");
  setDefaultDecimalPlaces(61);
  t("184.823808", "0.0000000042868", "43114632826.3506578333488849491462162918727255761873658673136138844825977");
  setDefaultDecimalPlaces(96);
  t("-0.000000000000424303", "-2", "2.121515e-13");
  setDefaultDecimalPlaces(16);
  t("-216", "0.000000003746", "-57661505605.9797116924719701");
  setDefaultDecimalPlaces(64);
  t("-99674.97", "-1.2", "83062.475");
  setDefaultDecimalPlaces(94);
  t("0.06649230", "-0.0000000000000000001259386", "-527973949210170670.4695780324697908345812959648590662433916209962632584449882720627353329320796006943065906719623");
  setDefaultDecimalPlaces(64);
  t("7", "-0.0000031529200", "-2220164.165281707115943316037197264757748372936833157834642172969818454");
  setDefaultDecimalPlaces(23);
  t("-1023.78905", "250.82", "-4.0817680009568614942987");
  setDefaultDecimalPlaces(72);
  t("-0.000000000000000000074349953", "-1", "7.4349953e-20");
  setDefaultDecimalPlaces(40);
  t("0.000000000000000402419997544", "-6", "-6.70699995906666666666666e-17");
  setDefaultDecimalPlaces(85);
  t("0.000000000000000169", "-17819044687", "-9.4842345910549879076129621471216415946575037622834825095693e-27");
  setDefaultDecimalPlaces(55);
  t("-96.4", "-5.8", "16.6206896551724137931034482758620689655172413793103448275");
  setDefaultDecimalPlaces(9);
  t("222530", "-1541023.59746", "-0.144404018");
  setDefaultDecimalPlaces(51);
  t("-11332015.8088", "0.00157368738", "-7200931997.561040363683923041944963681414284455912711201890683");
  setDefaultDecimalPlaces(44);
  t("61.22", "-92510862009", "-6.6176012924886765012264388098444272e-10");
  setDefaultDecimalPlaces(11);
  t("0.001091405", "-12", "-0.00009095041");
  setDefaultDecimalPlaces(77);
  t("-3343.67", "-38.89373939", "85.96936299880935670557029461290890806269682263122707677504186619171975687987454");
  setDefaultDecimalPlaces(91);
  t("226.178", "22.5", "10.0523555555555555555555555555555555555555555555555555555555555555555555555555555555555555555");
  setDefaultDecimalPlaces(19);
  t("-1.032437", "0.00021212", "-4867.2308127475014142937");
  setDefaultDecimalPlaces(42);
  t("-29.851", "-52", "0.574057692307692307692307692307692307692307");
  setDefaultDecimalPlaces(20);
  t("4532336.915", "6", "755389.48583333333333333333");
  setDefaultDecimalPlaces(59);
  t("191384559.1", "-0.00000000000007924567", "-2.41507907119720232032866906166608219729860319182107994039295774772299861935674214e+21");
  setDefaultDecimalPlaces(73);
  t("-0.000005968", "19.2012", "-3.108139074641168260317063516863529362748161573235006145449242755661e-7");
  setDefaultDecimalPlaces(77);
  t("371", "0.000000000010896947124", "34046232929119.24016783914055817162098583383013210994452100821261175094603496582039577124408");
  setDefaultDecimalPlaces(78);
  t("55", "1", "55");
  setDefaultDecimalPlaces(34);
  t("69048.19920", "1.2", "57540.166");
  setDefaultDecimalPlaces(39);
  t("62.34815", "-12559", "-0.004964419937893144358627279241977864479");
  setDefaultDecimalPlaces(90);
  t("8.685839", "102.89914072", "0.084411190795413281659131817869664325025862081853932900364068268577082827169404568765382397");
  setDefaultDecimalPlaces(88);
  t("-1.6", "-5.8", "0.2758620689655172413793103448275862068965517241379310344827586206896551724137931034482758");
  setDefaultDecimalPlaces(94);
  t("0", "-23555.173", "0");
  setDefaultDecimalPlaces(0);
  t("186", "-583383.38", "0");
  setDefaultDecimalPlaces(64);
  t("0.0000000008894", "-6.96202120", "-1.277502573534248933341369313842365202794843543423855129e-10");
  setDefaultDecimalPlaces(56);
  t("-0.000000762404", "1.3690014", "-5.5690520111958979735155858861795174205081163540081e-7");
  setDefaultDecimalPlaces(7);
  t("10233.154", "4", "2558.2885");
  setDefaultDecimalPlaces(18);
  t("-2", "-0.003966567550", "504.214279673618567267");
  setDefaultDecimalPlaces(50);
  t("-0.000000000004018978156", "-274.914", "1.461903779363728293211695293800970485e-14");
  setDefaultDecimalPlaces(57);
  t("24673.9561", "0.000000000000000005751493", "4.290008889865640104230327673179816092969251636053456033068283313567451094872235e+21");
  setDefaultDecimalPlaces(55);
  t("0.000002824319345", "-209030.3108", "-1.35115301421634780442569193175595661028888447e-11");
  setDefaultDecimalPlaces(88);
  t("0.000000000000008006", "-0.014002897", "-5.717388337570432746880877578403954553118543969865664226481134582365349113115e-13");
  setDefaultDecimalPlaces(17);
  t("-506.5040667", "17.1", "-29.6201208596491228");
  setDefaultDecimalPlaces(86);
  t("-0.00000000000003525", "4.6", "-7.66304347826086956521739130434782608695652173913043478260869565217391304e-15");
  setDefaultDecimalPlaces(9);
  t("0.0000005107198", "3", "1.7e-7");
  setDefaultDecimalPlaces(65);
  t("-1.453", "-5.7", "0.2549122807017543859649122807017543859649122807017543859649122807");
  setDefaultDecimalPlaces(13);
  t("0.003721", "354884.883787", "1.0485e-8");
  setDefaultDecimalPlaces(8);
  t("-34.713", "0.00000000000000110381836454", "-31448108778717529.34479402");
  setDefaultDecimalPlaces(92);
  t("-2.10", "-228344.303", "0.00000919663846397779409456079138527927276556577809607100204291061292648058751875232902132005");
  setDefaultDecimalPlaces(60);
  t("1.83195", "-0.00000000000000000002223560", "-82388152332295957833.384302649804817499865081221104894853298314414722337153033873");
  setDefaultDecimalPlaces(79);
  t("6", "-0.00000000956", "-627615062.7615062761506276150627615062761506276150627615062761506276150627615062761506276");

  setDefaultDecimalPlaces(97);
  t("-0.0000009540804798054670677891566686456518623777", "35093265715870727576901100425753630989972543539192917947974", "-2.71869961470695974101023959031215e-65");
  setDefaultDecimalPlaces(9);
  t("1314448298322936403882696918375.291013828973345085008", "48448528454851739950804513.0589968897959480", "27130.819866858");
  setDefaultDecimalPlaces(22);
  t("89317.6616656133722", "0.00000000905633711541666613543030527419723296", "9862448860651.1004142709067699772992");
  setDefaultDecimalPlaces(7);
  t("-495690.832", "-166.13", "2983.7526756");
  setDefaultDecimalPlaces(64);
  t("0.03392389132188002293377001570", "0.0000093202598745830561999619153", "3639.8010118143422904308613174444980416167513276104573121416864442043");
  setDefaultDecimalPlaces(35);
  t("-25669207373381365", "-56935947.364221653218502238724694", "450843598.14326728141153293602853579729359295");
  setDefaultDecimalPlaces(45);
  t("-0.0000370848502442252033260674836", "755631885781108", "-4.9077931916398734395271185e-20");
  setDefaultDecimalPlaces(94);
  t(
    "-0.00000000001049823589500084695550823768",
    "1994.789728651346959366696933773466799175752801624419705",
    "-5.2628283293290147348958428216942948698860256530824752036658793522266228314770857e-15",
  );
  setDefaultDecimalPlaces(40);
  t("-1.3662169382044714055250125073285075303335", "-1430630429514.87080942391", "9.549754499963752851264259486e-13");
  setDefaultDecimalPlaces(42);
  t(
    "-535885580362176.48156957499642800394925333195051516095278834",
    "1054737.71304383744973573443015238371527663129973448822376816",
    "-508074731.504270940073287919640585560372950577663032",
  );
  setDefaultDecimalPlaces(91);
  t("1490843.19904031095", "-520962656150266305.8995734124389795937", "-2.8617083805145000702281341683345591774328931527357888013277847841516424834201859e-12");
  setDefaultDecimalPlaces(76);
  t("96306.465628", "3.0272265", "31813.4324035548711006592998574768026112350694604450641536072705494616937318697494");
  setDefaultDecimalPlaces(41);
  t("0.000000000000000000154675274358998456755457116", "1758537624.77289387890113360496766038", "8.795676144772e-29");
  setDefaultDecimalPlaces(85);
  t(
    "0.00001143066648035357917309231",
    "-19.88227734279798715424286555714077138354331254794",
    "-5.749173640057959162264116882565158228280701132757516025876347863860036675163842e-7",
  );
  setDefaultDecimalPlaces(0);
  t(
    "17594816987440961242451660194236703147.0521538",
    "0.0000000000000000015830613990411975231982514601856635993014261740281",
    "1.1114424872021703856826416770644628716594475804286871746e+55",
  );
  setDefaultDecimalPlaces(32);
  t("0", "725567497696053347366.45678696944517803686367", "0");
  setDefaultDecimalPlaces(95);
  t(
    "-31656471429743517181867388677488617836337",
    "-15652814404295787864746516481",
    "2022414028052.08343508296678543618971650673861958811990810663695680803528852193761628853392614630444203664667",
  );
  setDefaultDecimalPlaces(75);
  t("-2780439.41245734601926", "-3333.2929199592152222725513216347874097234053052753126772", "834.141936884252678504164515448553267487073857152987571122619272223543230951245");
  setDefaultDecimalPlaces(94);
  t(
    "-6633612111553495187741588.82742013890511309976377",
    "2.4",
    "-2.7640050464806229948923286780917245437971249015708333333333333333333333333333333333333333333333333333333333333333333333e+24",
  );
  setDefaultDecimalPlaces(35);
  t("42973366167027270.324737029937381266201715063720901", "-0.000000000000024541524156749801", "-1.75104715960390139239968340414018217205007040916875012842763318e+30");
  setDefaultDecimalPlaces(45);
  t("0.00000000000000002114617652620523054290640880322375285855988", "289543554425588002707370200.5927739756859794193508568", "7.3e-44");
  setDefaultDecimalPlaces(2);
  t("-50339180456025496179206692415281323163316896529", "163822393688144885743044801.69756601714114766104944429", "-307278994786585905997.31");
  setDefaultDecimalPlaces(100);
  t("0.0000000000058530844670427", "-1", "-5.8530844670427e-12");
  setDefaultDecimalPlaces(44);
  t("14052478337998411529.889140", "-318736232621822222624.787772576865450", "-0.04408811079433054377210126437352089808951128");
  setDefaultDecimalPlaces(77);
  t(
    "-5196256.1022914068430075019193223833379972817223189035832291",
    "0.0000000000058818222700785431586283809906991956810729650559",
    "-883443236414217327.37100363935475990588038921913315802055020243137686295367100549214817609942536",
  );
  setDefaultDecimalPlaces(68);
  t("-1787289170.3", "1641726.8", "-1088.66418596565518696533430531803464498478065899880540416346982945030805");
  setDefaultDecimalPlaces(7);
  t("4.052704651007031236416089562592682644901896403427832", "35922710658186982213684269065277913", "0");
  setDefaultDecimalPlaces(78);
  t("-0.00000000000000000008134293575040206800338633864492131515963478", "-10690253929.79129895032633202", "7.60907423571276101422077770993772408528442348564e-30");
  setDefaultDecimalPlaces(94);
  t(
    "-5498864002412818653972816937154119267913994.59295141715507",
    "-4951067271911378682642829405362963051533484950290397317905",
    "1.1106421505539271178917859299097011470907642166775968949191224653840300517009935e-15",
  );
  setDefaultDecimalPlaces(71);
  t("-14351424282422311.0680666178", "19785525186292803639979288811", "-7.2534967595223711857905722006679292178036139065078506555084e-13");
  setDefaultDecimalPlaces(88);
  t("0.0000000000000000409646053811939884316832816129325", "1.57", "2.60921053383401200201804341483646496815286624203821656050955414012738853e-17");
  setDefaultDecimalPlaces(67);
  t("6.8085839894078191972880519774368", "4453707.2", "0.000001528745308943484025462664446696630618196005341347989827440834");
  setDefaultDecimalPlaces(22);
  t("728028555.573326769672679050772504", "1.74", "418407215.8467395228003902590646");
  setDefaultDecimalPlaces(83);
  t(
    "-152411177924556663131099293358061017643576544443418",
    "14925215.28184670860255967168727880172140726017784033",
    "-1.021165692061620356402720804420553668088839147458666902436796433107503747812832627495955696726694040025625362863897366760380163e+43",
  );
  setDefaultDecimalPlaces(53);
  t("-0.000236472164642391063", "-22424366803628653912935870074707.79677997442749130834", "1.054532182394223678e-35");
  setDefaultDecimalPlaces(66);
  t("0.00000000000000000005223186121166984239484018271825950786846937492", "-83008309132726157728920.10254", "-6.2923653978005616482553e-43");
  setDefaultDecimalPlaces(25);
  t("-1536701033666721966958006643.6", "72705744086230112.190166504829835005094492231371138657794958", "-21135895835.7426518845917418970913555");
  setDefaultDecimalPlaces(7);
  t("-0.00000063635975621776906954669861908061218574115312", "-0.0353353888627772889143898742964025165767653790195728344797194", "0.000018");
  setDefaultDecimalPlaces(58);
  t("-0.0000039", "5284.58257158094", "-7.379958487115232722984976272009338972733574989717e-10");
  setDefaultDecimalPlaces(73);
  t("-2734361589366540386922.016391801903794571624534", "-46.9083", "58291636860993478487.21902929336394187322125368005235747191861568208611269221012059699456173");
  setDefaultDecimalPlaces(1);
  t("0.000000000000000000012838234653080594", "0.00000000000000000015946202084393", "0");
  setDefaultDecimalPlaces(84);
  t("143.1502352", "-0.00000000001283430534755408492253889348594", "-11153718983885.719177816682775236780354892910755872912079246079468864331074005298278043457166519491");
  setDefaultDecimalPlaces(11);
  t("-3678278.591195", "-689209122740716659", "0");
  setDefaultDecimalPlaces(91);
  t("25386491.6", "3476024309747031444.155747285160852255", "7.3033124448567243771821504052190781788631627626621470062947515931362817153562608e-12");
  setDefaultDecimalPlaces(71);
  t("0.000000000000000004164191852492806998829830427636970775948556531355", "-134583225918701860690393523772085947191522944711793809473843", "0");
  setDefaultDecimalPlaces(51);
  t("340329.07254141686080129738", "0.7498012561105444299666", "453892.374503093106309315684361177708847376003734547222666");
  setDefaultDecimalPlaces(48);
  t("-1", "-142013867643234700.3920005184225568252281121729859630", "7.04156584561295343789637188933e-18");
  setDefaultDecimalPlaces(13);
  t("26060902516998036609896049399415880942", "-57.1", "-4.564081001225575588423125989389821530998248686514e+35");
  setDefaultDecimalPlaces(35);
  t("51284272997140084434881024", "98.1164178723026162757", "5.2268798748733339349111943053608787395323086600195589169998e+23");
  setDefaultDecimalPlaces(65);
  t("-0.0026", "-473426.803863", "5.49187325006715639036610277241538710981161099202188540619e-9");
  setDefaultDecimalPlaces(61);
  t("1", "0.0000000000000000000378839573603823063599014", "26396397569747145585.1781110612916589705289545471935639853373315922160006569023642");
  setDefaultDecimalPlaces(91);
  t("-0.0000000397346893920391582518", "9395.886040209540089972", "-4.2289454365448034578907816411345607275551054181356807336390283399573683031467115e-12");
  setDefaultDecimalPlaces(79);
  t(
    "0.05147046613689803609820108910196861299343727354658",
    "0.00000000000165599688394528217686540429858482",
    "31081257842.8732930319017408620576493574673751592348539413237358228101057048411031170379378",
  );
  setDefaultDecimalPlaces(37);
  t("0.0000001112454853971521526059503816408235391", "-59673.336", "-1.8642410975171918091851003e-12");
  setDefaultDecimalPlaces(12);
  t("2.35", "73324895121753529942016756205795097325700467024971", "0");
  setDefaultDecimalPlaces(63);
  t("3993.2441137", "-105838", "-0.037729776769213326026568907197792853228519057427389028515278066");
  setDefaultDecimalPlaces(63);
  t("0.00000000000057752065545313881990509881090155439044310903", "-48259433554.449936", "-1.1967000292316660117373225605245237040006e-23");
  setDefaultDecimalPlaces(55);
  t("0.0000000000012370525077762511", "-22858618205.73", "-5.41175541164670012692475034526457e-23");
  setDefaultDecimalPlaces(2);
  t("8043672.949847", "-0.000007596662171126781168930338144159833263017557251", "-1058843050888.74");
  setDefaultDecimalPlaces(89);
  t("3078081877288.1", "11408266211570431.8870528950", "0.00026981154017656635256689604443759054549464382280004323295531646758279788479134735448067");
  setDefaultDecimalPlaces(29);
  t("0.0000000000000000000618164293160673728060824230195863962503494599", "7025.54141448816686426802474529123986047136518", "8.79881e-24");
  setDefaultDecimalPlaces(3);
  t("-23061282017054654739507853525233", "0.0000000002958433385961098987699", "-7.7950993003558174398179644100109776684066319e+40");
  setDefaultDecimalPlaces(53);
  t(
    "-2069474652658825757910014429719961.81904443070982392891035",
    "580384419371.0457282770067935854406501300458687361073595671",
    "-3.56569643082680572256912796839287698626930842791520890626454298306330468601e+21",
  );
  setDefaultDecimalPlaces(65);
  t(
    "-2887063635686417532897.90280426563575497853678141",
    "5275081719811064222776854991.6420289264186605414822",
    "-5.4730216308190624437486273121528057404523696713690046584322e-7",
  );
  setDefaultDecimalPlaces(15);
  t("-840047956825.1", "21255937362454200887832660710660525630656019619821475292", "0");
  setDefaultDecimalPlaces(28);
  t(
    "361997632070260608122165536002847778459609.37988",
    "-0.00002762748756305375044084610322618952562327179152671070220062",
    "-1.31028068058696795251554781791262106605172531325973138600322033014017951006e+46",
  );
  setDefaultDecimalPlaces(1);
  t("201653598715277485188776141381739696471856.730099485683", "3447119605883219.171030100607", "5.84991592317000286580413518e+25");
  setDefaultDecimalPlaces(99);
  t(
    "-37222.4068437675262850335642612913322636743",
    "1458807843843948.967076465853",
    "-2.5515633879296077672856576568814201878717152493080617968073830959659822264313520061957061e-11",
  );
  setDefaultDecimalPlaces(55);
  t("-7565.842075976661288737185", "328.458832634132398090766770212853175193470678164", "-23.034369376829000589334403734704084466672716987398202948");
  setDefaultDecimalPlaces(31);
  t("-7312377618509936538.891730754415549012", "-7345.052796259259238468109949", "995551403283858.7972241580751095708938405490401");
  setDefaultDecimalPlaces(31);
  t("306.29976138091109", "-593282126972418853506.240332275891659682101864", "-5.162801093368e-19");
  setDefaultDecimalPlaces(27);
  t("34.2029576551403962010505", "578312351823570510586204088957222883981451995025158105670", "0");
  setDefaultDecimalPlaces(16);
  t("-373647333.56863046134654720340919661512519807399195537631", "-3", "124549111.1895434871155157");
  setDefaultDecimalPlaces(1);
  t("-1613022.9904810745", "-2.854295359540386708773", "565121.2");
  setDefaultDecimalPlaces(18);
  t("0.00001737110011647171766391683744850656010122280124", "0.00050431508033140550", "0.034444934910644505");
  setDefaultDecimalPlaces(68);
  t("1", "-147882993668292947799326065974911396281836916423207", "-6.76210276242471243e-51");
  setDefaultDecimalPlaces(74);
  t(
    "18929248915073221629077512328870296978255043405.0661303976",
    "0.000000000000000387673180615223055385064293874181441",
    "4.882785258715395522722809883514961144269070451082596736132598302245251765788780913567252671175492794840240491214349689058614827265259464e+61",
  );
  setDefaultDecimalPlaces(13);
  t("-521739313985208468480792807863796481134586.665", "-94.70145350817", "5.5093062952850817231470865458858536321694285381287814e+39");
  setDefaultDecimalPlaces(70);
  t(
    "-14457110376256071356268972017.0524759906031902975911814",
    "151890219366.6397323887767141125778820660",
    "-95181312111735256.338064308213217681262815723580411314939795776685197932530259051626875",
  );
  setDefaultDecimalPlaces(20);
  t("1177278.252638234", "-4.8", "-245266.30263296541666666666");
  setDefaultDecimalPlaces(32);
  t("-1962.921930935176731102241895", "-6142951840641400.4327608", "3.1954050460702021605e-13");
  setDefaultDecimalPlaces(31);
  t("-293379802.712811243656353729607519776688", "69361222488.908739571642", "-0.0042297380609132771561758569104");
  setDefaultDecimalPlaces(28);
  t("-4735057394901037900816", "17377901.64404070421729825499753", "-272475785160448.3961509246336965720055212255");
  setDefaultDecimalPlaces(87);
  t(
    "244338133217.62019367101571365364617866410030718269",
    "-0.000000000000000189999839",
    "-1.285991264537967285703940589410953020144929213243649116986883341516936759088516911848541092711136455226154165320108e+27",
  );
  setDefaultDecimalPlaces(85);
  t("-0.0000430", "2316.30700499283517", "-1.85640331386611716185492750440685777757314142682502027441269975782537528681603e-8");
  setDefaultDecimalPlaces(46);
  t("-3783533721436978812.845985445091011388770090", "-19894857264737821186775.7175293379207082036", "0.0001901764697826214363642873187414141457948989");
  setDefaultDecimalPlaces(7);
  t("-0.00010597581507", "-3661109591354258826641565756449028472157745902752", "0");
  setDefaultDecimalPlaces(5);
  t("-0.00000000000000000006539467301074038243563152741332589739633928263", "-4.4982844", "0");
  setDefaultDecimalPlaces(28);
  t("1.08860023154095527543132701708029339670615", "-24824748076222132.512487261985161855", "-4.38514110273e-17");
  setDefaultDecimalPlaces(19);
  t("2054045169530786611490266680785320642651351555307.938285", "3", "6.846817231769288704967555602617735475504505184359794283333333333333e+47");
  setDefaultDecimalPlaces(63);
  t("2.199806093", "-12500005582816933560501482.7240822159418675", "-1.75984408840900982430685617438940205594e-25");
  setDefaultDecimalPlaces(89);
  t("14017071896652397466395458.7", "-6.81", "-2.05830718012516849726805560939794419970631424375917767988252569750367107195301027900146842878120411160058737151248e+24");
  setDefaultDecimalPlaces(27);
  t(
    "-972208800816359097774853865998384051027279882.1676335910",
    "0.000000000000026204998508",
    "-3.7100128073640533625129938358796110755622099963968965359347312197908406765096084469504e+58",
  );
  setDefaultDecimalPlaces(48);
  t("-2346461884807.291172921213474803648912222727462987188638", "-8129289914695639.635", "0.000288642908474145940691188416839195403582266892");
  setDefaultDecimalPlaces(56);
  t("-38634943.5664726211716120645069662431501379", "47.741894899704", "-809246.12748691208788506194137217250429630649329906900536569453");
  setDefaultDecimalPlaces(12);
  t("641854313173500041179232371554968018332.090808955", "-499474370660536497455", "-1285059556358560105.498652323965");
  setDefaultDecimalPlaces(67);
  t("-0.000000000000000386639515592324447964290966216860650595615082086466473", "6.2756236087437", "-6.16097362903707922766712569866889691856443943224937e-17");
  setDefaultDecimalPlaces(17);
  t("-0.0121294", "1.81271052952336486354971", "-0.00669130553524688");
  setDefaultDecimalPlaces(37);
  t("16172227666.80710471017577891", "-34198747968.5811103183269080147060", "-0.4728894660607097860998452761359441803");
  setDefaultDecimalPlaces(79);
  t("-356727071.9364944667286695893604613176369838104590735543045", "-1.436723915532", "248292012.1813404325828295822767006560656986498565535972029904480903758615418607002582887");
  setDefaultDecimalPlaces(62);
  t("-0.000000000000008497745302168549895", "-255570662565564690842128967646.374661", "3.325008127640048902e-44");
  setDefaultDecimalPlaces(90);
  t("-3312968723.34657440026516330021765260", "5.671842661328", "-584108008.837268938720749025431621880397296871213347401817502929530551559690731535336826237184917741");
  setDefaultDecimalPlaces(17);
  t("670766173396089517514373762653810249129809", "44078341590488499216713926.9520843489", "15217590979893663.83147589713486824");
  setDefaultDecimalPlaces(41);
  t("0.000000000000812188755083323833263578949684219880694148826", "-0.00000071344453676249175802765421", "-0.00000113840489797415658007081852858306534");
  setDefaultDecimalPlaces(27);
  t("-77.8", "1607106515700545211", "-4.8409983557e-17");
  setDefaultDecimalPlaces(28);
  t("-2022977781108198833941.172", "-8081270577743798366289437898882249.9529118451796", "2.503291730733005e-13");
  setDefaultDecimalPlaces(28);
  t("6465031156106339404182739593549124470243", "195475.8", "3.30733070595252169536215715374953036142734804001313717605964523e+34");
  setDefaultDecimalPlaces(38);
  t(
    "-53659778416117782439290362205653235631192475679.1",
    "115905781.6487436818793753787683602460387496220919264257",
    "-4.6296032564394002243051280585389119539932761692388360074490886165945569668489e+38",
  );
  setDefaultDecimalPlaces(76);
  t("226001380.23477897777891865198", "249356446496594708871829974110825292225262440792859.328343228", "9.063386305429457773277352029079009e-43");
  setDefaultDecimalPlaces(53);
  t("-0.004093206824883061750141702235466987371150", "-6.02427210", "0.00067945251425198104018935370390507217812256521414429");
  setDefaultDecimalPlaces(47);
  t("2078.295121406871", "2605884179466027219.33", "7.9753932956173642893820704394996e-16");
  setDefaultDecimalPlaces(33);
  t("-0.002015428", "3.2069", "-0.000628466119928903302254513704823");
  setDefaultDecimalPlaces(8);
  t("3662.774040156248738246371", "15750.193320", "0.23255422");
  setDefaultDecimalPlaces(24);
  t("0.00000000000000098965821989161956033895499274427694306893", "-1461593008165738078956.739558847", "0");
  setDefaultDecimalPlaces(35);
  t("11695447350837335211.4524017454863442533706861455639", "727920748323.05254547009911310677925", "16066924.01306148030164161574864113669647687");
  setDefaultDecimalPlaces(92);
  t("-0.000000001230711836173203366178265", "-90256810396761906903413940279212357216191969585.11151204", "1.363566727832603451118140729406501609e-56");
  setDefaultDecimalPlaces(83);
  t("6.0526391246187121821331", "-917899623490897241204657126989081962821060704761", "-6.59400981296811248006212162797671111e-48");
  setDefaultDecimalPlaces(27);
  t("-0.00000000000099201173684238073160367613943480149348523764007646", "-11.04899089279331", "8.9783016971207e-14");
  setDefaultDecimalPlaces(17);
  t("1335126.353340954415", "578", "2309.90718571099379757");
  setDefaultDecimalPlaces(65);
  t(
    "92014623739391858156190191063101546726570.7813280",
    "7990194776744.81200246188591956278016864481732439212",
    "1.151594251584420273846003951316097761493761787705533376283267474426300062008091336508597304414e+28",
  );
  setDefaultDecimalPlaces(99);
  t(
    "-7163133024183125065056078310848844137548350388931431.2368954",
    "-0.0000001020733364121881832167372894354627432957339012505",
    "7.0176338659660026474772287023917500486208513418933090531755442972571086563913967590935924092099584068454386463772562164446419894924684195106268096106460859877e+58",
  );
  setDefaultDecimalPlaces(94);
  t("-10884674562652624.873130622176867993", "1.1", "-9895158693320568.066482383797152720909090909090909090909090909090909090909090909090909090909090909090909090909");
  setDefaultDecimalPlaces(75);
  t(
    "1206572537492890648619.4355449342971671307571575602545094",
    "-497222865321397.0135625223944253592131",
    "-2426623.193832771952432301617001168874553511099225618416612715726419023539592454899",
  );
  setDefaultDecimalPlaces(92);
  t(
    "7091748503742049.027396",
    "-0.040778558308726775942606715120140317099682621367141",
    "-173908759845106790.98165060278547492041345182388572709701875068779781603312497637586757374299927987107580430457",
  );
  setDefaultDecimalPlaces(68);
  t("-10180.5372374396262", "0.028536565913511581569754231272236952813399083405253311", "-356754.11219046906806656875326873024641704309920579362771969590464433912565");
  setDefaultDecimalPlaces(58);
  t(
    "-1988226163547976591202874802105145758818",
    "-17702.6946922512376795154925552285448489517097",
    "1.123120631130952099619898486046329145940063646490579855491940764356235661686414209733720229624e+35",
  );
  setDefaultDecimalPlaces(79);
  t("206.83089556650", "-1117484422.125821946794293738592656785116989", "-1.850861555394569067069769655990877943364012263436652506206164496326356349e-7");
  setDefaultDecimalPlaces(18);
  t("-231086.61", "-1.2234744757230975203680", "188877.344468852331848508");
  setDefaultDecimalPlaces(9);
  t("0.00000009929661766655640925652812288978493582667044860438773", "-0.00000016188196406587512", "-0.613389009");
  setDefaultDecimalPlaces(100);
  t(
    "6920407863728061161787680487753281403418059786",
    "-0.0000639730307378269505062421166822632997259343427729244",
    "-1.081769580698645362593879101363187543921685210430538259627159954495102450504769462621427087897668066066908239612026179221403530756222519814009363217495e+50",
  );
  setDefaultDecimalPlaces(35);
  t("28643750151209070845529011938030067509584.0942", "1465306035979.7552490582", "1.954796434866034668759586431895520315329749147681101186725115435e+28");
  setDefaultDecimalPlaces(23);
  t("-618508195.9125", "0.00000000003836356126677709338", "-16122283111608022332.33118438328908598170252");
  setDefaultDecimalPlaces(29);
  t("0.0000000000000000143069043958379203601444082293487290267", "1662294.6555265817047737", "8.60671e-24");
  setDefaultDecimalPlaces(73);
  t("14.15258806268613131905523160467916038109963", "9718536377567686988843641053613356846008758008109793.07438863", "1.4562468578450883464046e-51");
  setDefaultDecimalPlaces(35);
  t("0.00000000019789856734490205173", "-15145735023.89", "-1.306629008316521e-20");
  setDefaultDecimalPlaces(80);
  t(
    "407881736290979864418214656438219835215567961.13676016",
    "-24257032165.2688822612352815298282",
    "-1.681498929926733731042074465305338868078891201151929517365615074282665627336078190010101565031297221449921637134511e+34",
  );
  setDefaultDecimalPlaces(52);
  t("-60862566263071.3472442162851457050185876681570167566", "7280108393835955378317046385534885811317", "-8.3601181425545103857881427e-27");
  setDefaultDecimalPlaces(96);
  t(
    "-413728461570779959372809",
    "-0.00000013289206577387648208609025641967",
    "3.113266839231491888045087820524385001824874862971644667152541887229240384472071256822071199804011537037252463781981542015526972e+30",
  );
  setDefaultDecimalPlaces(38);
  t("-198447151.506353634791199183052", "-30", "6614905.05021178782637330610173333333333333333");
  setDefaultDecimalPlaces(53);
  t("4068749745177038227494703287909850053379218", "33.97", "1.197747937938486378420577947574286150538480423903444215484250809537827494848395643214601118634e+41");
  setDefaultDecimalPlaces(52);
  t("1918052508.426620098126718525", "-0.0000000000009908862620240003158851056346927058", "-1.935693915574906651290361484048609748001880562453945641631939336350834494e+21");
  setDefaultDecimalPlaces(70);
  t("-431417628792390973074682758.01192819221423", "-2.6", "1.659298572278426819518010607738185354670115384615384615384615384615384615384615384615384615384615e+26");
  setDefaultDecimalPlaces(18);
  t("-7.22", "7.3517", "-0.982085776079002135");
  setDefaultDecimalPlaces(25);
  t("100593484478098147659296.8081714502710209876524461370113", "-43158655801849.79963686847048501500", "-2330783538.2997879446590839296382932");
  setDefaultDecimalPlaces(99);
  t(
    "-41306913225487625153789873.64257222811621093",
    "0.0000006294866340440317657253195210",
    "-6.5620000475813535170221734310884421889345069714454886925022182991761228179077619593665392056715295884786409331197450817690208611454e+31",
  );
  setDefaultDecimalPlaces(26);
  t("-0.00000000000137161688943", "-667707.86036057415195287155486055316572763", "2.05421707e-18");
  setDefaultDecimalPlaces(98);
  t("1527590996664000812552.6469804689769441", "359605466118244286563740408450872581615142378382803416384", "4.24796378418147672300259566174929947277341546708063989746550552e-36");
  setDefaultDecimalPlaces(29);
  t("-2.6", "504076072417537246382762871809571529731.9", "0");
  setDefaultDecimalPlaces(80);
  t("1605240171731924048.48028979598514", "123948943", "12950817755.11328118772493119191133400790678787797327162362328495209515421200485751621133227");
  setDefaultDecimalPlaces(90);
  t("0.0020451744530510572505474398197", "-3950840", "-5.17655600594065376109242545813042289740915855868625406242723066487126788227313685e-10");
  setDefaultDecimalPlaces(2);
  t("-4979785089060614355", "-217253568847494674374.9", "0.02");
  setDefaultDecimalPlaces(44);
  t("18707217171979758993051292772.1503298976005272803715", "-6940973551029505554616969979528322659943991508", "-2.69518635022100749465770941e-18");
  setDefaultDecimalPlaces(0);
  t("0.00000000000870536306", "-4.0", "0");
  setDefaultDecimalPlaces(18);
  t("0.000000000000000000011262227080104679", "13002355614.286846160993486078820491", "0");
  setDefaultDecimalPlaces(30);
  t("22149.44844140405411464966962", "-0.0000000000000079345079345811296565740086018155325809515226", "-2791533970855288445.521876682559996450166577533293");
  setDefaultDecimalPlaces(41);
  t("0.00000000000000008457514723701883558372079500659426860066306082666742487074", "-4177380832679703465.27101253", "-2.024597e-35");
  setDefaultDecimalPlaces(93);
  t("95821.16071138383", "0.0014523822667442881599251303640689408826", "65975165.702194889867071534523989645459482937967128771940645486463003271416544975146704879029494721476");
  setDefaultDecimalPlaces(63);
  t(
    "-47964848479188544096368753543357.085382659913199559217292",
    "-0.00660476910819056134450203702481",
    "7.262153709462368434017504348940238811619909489973464028162322968754712065305381359219264402152437e+33",
  );
  setDefaultDecimalPlaces(38);
  t("5379026411570.202195388682", "321531.3592234622121210315027281582", "16729399.03765907224924188532431672337683871637");
  setDefaultDecimalPlaces(46);
  t("0.00000000031992712802433816069469", "32006", "9.9958485291613497686274448540898e-15");
  setDefaultDecimalPlaces(72);
  t("16679196749640511790256081594807", "144017097440959996988019133942695603.09302581781338971", "0.000115814004350963752452840168273790591114457173603644253524561726947594");
  setDefaultDecimalPlaces(64);
  t("-2.75771235905563878125573725", "27533.19", "-0.0001001595659295431724858520661790370095146984421347471905725417");
  setDefaultDecimalPlaces(27);
  t("-45482.13285076522396543435058643173621724274564261", "-61323609983441.340656703", "7.41674093600268357e-10");
  setDefaultDecimalPlaces(55);
  t("-0.0000000000000000000739997230965904917119708", "-0.00862293279719528007562350", "8.5817348733901596098585879346226429476e-18");
  setDefaultDecimalPlaces(26);
  t("-93191631493.2318561788967", "3172.540964977956772985516449136423", "-29374445.44356872118378898451381391");
  setDefaultDecimalPlaces(94);
  t("1971", "1.3492638", "1460.7966210907014625309001842338021667816182424815666143270129977547756042962095329319588949173616");
  setDefaultDecimalPlaces(87);
  t("143.95", "-28406.1", "-0.005067573514139568613783659143634641855094504349417906717219188836200675207085801993233");
  setDefaultDecimalPlaces(70);
  t("15383637405.826512947605284972254", "-987754.901795393888789860923932", "-15574.3468120121964056313308104617731712454512642614730878440963375290547421");
  setDefaultDecimalPlaces(73);
  t("137939701254.9598846320176499448405286296371688", "-5995595904361703883013732649023.4394892", "-2.30068375946769314055086589936926523046707573708493301e-20");
  setDefaultDecimalPlaces(49);
  t("-0.00000000589388289322241337246587507", "495053.9640544825", "-1.19055362065008533011063665172923903e-14");
  setDefaultDecimalPlaces(31);
  t(
    "-42130258640592935576129804261979008533959703.38427858",
    "-15822567.245465420663905175543947436296",
    "2.6626689580141945177703136924595154036339633713636562973469005155803e+36",
  );
  setDefaultDecimalPlaces(80);
  t(
    "-804937971724468275297859687922366.62784358228162038",
    "-0.0000000002053614107658768233341684670892077017413252",
    "3.91961648842654932323217682366625620010847562278136157427075809512162096637547948099681038707417202792951016678709285906126e+42",
  );
  setDefaultDecimalPlaces(68);
  t("0.0000000000000007495110618436002317130", "-19757820490222468032014494386705166072181183", "-3.793490593e-59");
  setDefaultDecimalPlaces(9);
  t("-0.000000000000000026", "-139971526910587251", "0");
  setDefaultDecimalPlaces(37);
  t("-1042293942.28951592", "1871448718412283134990551967582699926252781", "-5.569e-34");
  setDefaultDecimalPlaces(39);
  t("-1467745154150523557763460993234805.005402354224920898807", "-221.3143585727167493", "6.631947260973896148795969390926675922619207000857342620875869342085929e+30");
  setDefaultDecimalPlaces(93);
  t("-24643096.6237", "-1312071467.1271227390921", "0.01878182495474722716960369305189115995951143298963348442685998130557507969284473101117961759");
  setDefaultDecimalPlaces(73);
  t("-1041837234", "-0.000000000000094882886723127364829761874", "1.09802438561985266244850168475699183680984709973997119362440803270618057423915408183832560223067e+22");
  setDefaultDecimalPlaces(2);
  t("-3258589199615517639337.53833343130147463347091206689833", "-1925580845676036676422313.51709371443831312179", "0");
  setDefaultDecimalPlaces(87);
  t(
    "5907593934925391148891880.581541264",
    "16291822.2656025850697688723374543244297367855775077199798094",
    "362610998242859063.943805362151842604617076723850700621548992293447268445431835201153672525325125822482334",
  );
  setDefaultDecimalPlaces(42);
  t("1201.94", "0.00000000000000002290186991865104025220232", "52482177406009663720.834018933491397866011049551663771896586535");
  setDefaultDecimalPlaces(21);
  t("1.1076958309739058091191533946912227413617675400172197988", "-3602366051.091218317309224826016", "-3.07491191973e-10");
  setDefaultDecimalPlaces(12);
  t("3233497760417809134334.2762501", "0.00000000000020383285244650735944859126701", "1.5863476969525255531419506832109894367168385764e+34");
  setDefaultDecimalPlaces(24);
  t(
    "-51905178136427614619037140662167243228064756.37379771374620",
    "0.0000000000000000142838175324551646563130291277611228364902",
    "-3.6338449450569204340299093971107664302874913743298007196787082916185414588558283273e+60",
  );
  setDefaultDecimalPlaces(53);
  t("-5", "-395957434369170486801.172", "1.262761995608410623671289956955638e-20");
  setDefaultDecimalPlaces(40);
  t("0.00000107996769850044957471871893139089244314611998074388", "4638023.42195588", "2.328508505127430454453925684e-13");
  setDefaultDecimalPlaces(88);
  t("-0.0006130405747858243836081602363155217", "-7.66", "0.0000800314066300031832386632162291803785900783289817232375979112271540469973890339425587");
  setDefaultDecimalPlaces(1);
  t("2.70821821250790099689819086895485", "3358714584485882702.6415014040907556650579056728767", "0");
  setDefaultDecimalPlaces(38);
  t("2721746.711938762891659358589491281584478193550866203650167", "-1.1154784841698207", "-2439981.36276414592739719522299503242921583868");
  setDefaultDecimalPlaces(14);
  t("-1964.555683829337681707", "-18539874168127030758444966", "0");
  setDefaultDecimalPlaces(56);
  t("0.0000000000000000000354400999237078659770045819880318837324030111799458398578", "286747093783978419235", "1.2359358016861627e-40");
  setDefaultDecimalPlaces(49);
  t("-595582819579.912046145721540663341454489141758211847690", "-10338774018.7", "57.6067160867107120558231783787369777893162451903517");
  setDefaultDecimalPlaces(39);
  t("769126.00772252184535092129", "36340058982817975926176980501642180.94533440087200", "2.1164687929e-29");
  setDefaultDecimalPlaces(57);
  t("-10079268461666976725049.295648159440349928067006266", "-347496088687457779270464766143929423605", "2.9005415570971774939268034112119292368572e-17");
  setDefaultDecimalPlaces(80);
  t("-3559259157777", "7518269510692575771486265194596882294093989687294.8", "-4.7341468042811948390362657492068588676743657e-37");
  setDefaultDecimalPlaces(72);
  t("1", "863513.6724239", "0.000001158059254803667638847442924902026269404604243949235653781193410406");
  setDefaultDecimalPlaces(9);
  t("299742514224966538147.939005757923", "6190615235.4315135063869832218197077", "48418857064.385644597");
  setDefaultDecimalPlaces(66);
  t(
    "-9207335495228.974889043383157430747947137522173456769531",
    "0.00000000000000305390223584286552538736605",
    "-3.014941142242487320218744187701795423428585872361933723985917635393707357044751334929460374109e+27",
  );
  setDefaultDecimalPlaces(98);
  t("-5104232.340192968", "0.00000000995195257", "-512887526773348.3581101914355285155865649387836662489238531409118241004639353903190879053797580548557618376993531");
  setDefaultDecimalPlaces(52);
  t("4818662127112062594559105797081214134151830", "3019057258675562092460822649172410225003117214973625451", "1.5960817282498225088264190828016378884846e-12");
  setDefaultDecimalPlaces(30);
  t("-0.000104012879248219002943391", "-231.326", "4.49637650969709427143472e-7");
  setDefaultDecimalPlaces(50);
  t("-0.0114537", "-0.0000131983467699189982075218363594058341736234449", "867.81323446544770754860035867518924522183176462429093");
  setDefaultDecimalPlaces(48);
  t("-65613775893014084100149716093567.163836488539240", "4.0", "-1.640344397325352102503742902339179095912213481e+31");
  setDefaultDecimalPlaces(15);
  t("-2.3289", "-0.07394246", "31.496111976799257");
  setDefaultDecimalPlaces(80);
  t(
    "-128480376223149631327932558699.789845706849216209814",
    "151241.5",
    "-8.4950477364446683832104652955564342926279636349688412241349100610612827828340766257938462657405540146057e+23",
  );
  setDefaultDecimalPlaces(38);
  t("346490054729176217.508988244337198511245", "-50617668097135865.7835", "-6.84523937499961405418946420457675806774");
  setDefaultDecimalPlaces(64);
  t("544564440.6906107678191887890797074853350", "80175931261.6290251", "0.0067921186835185659183269222045921562901965105548827896504769704");
  setDefaultDecimalPlaces(24);
  t("-115388387.87425412512883428459402484729093604297308", "-1162022.21946547", "99.299639835917046070192206");
  setDefaultDecimalPlaces(35);
  t("-9.2607", "-4775036808098900058908112346847174121548537851246758661055", "0");
  setDefaultDecimalPlaces(51);
  t("-59783336254106675641600", "-7818973490.47204", "7645931569784.295317184790869328819187241166127915172141219131073");
  setDefaultDecimalPlaces(60);
  t("162316954.436084578985758244760786072987186", "-10133506673.2851114279", "-0.01601784650361947888137817113357936285787854893117491532237");
  setDefaultDecimalPlaces(68);
  t("12612143208878586.78116388", "13138119427627133851463041910739.2077802978450", "9.5996563879283115553274019440129085254683696650487462e-16");
  setDefaultDecimalPlaces(29);
  t("45420919793874381325463986363854337926242896193524192", "0.041447652827", "1.0958622912486397652354082811294519031424547835596111933240884941076714158127881194e+54");
  setDefaultDecimalPlaces(56);
  t(
    "266033787631117975206480849912424370.4071135262867430392989",
    "-3267.8005187462778691445219896668",
    "-8.141065713925044535749282880304859797214210529494316479747496316515596876440055158733719e+31",
  );
  setDefaultDecimalPlaces(24);
  t("0", "-33400497147241999635701813746854732413021332478132873253404", "0");
  setDefaultDecimalPlaces(43);
  t("1", "545617675295937462042.58263233362588", "1.8327851997419442094121e-21");
  setDefaultDecimalPlaces(86);
  t(
    "1783442427504634178521.120560673749874192455522397114",
    "132753632499210115827585495322116",
    "1.343422695055252564752219776172310038644285883435313965579186850494897875525e-11",
  );
  setDefaultDecimalPlaces(29);
  t("0", "-97214625012443126770609858423205.1283465086656", "0");
  setDefaultDecimalPlaces(17);
  t("-0.000788175482299943599257783", "141922949915424240277557220", "0");
  setDefaultDecimalPlaces(60);
  t("-0.000000000000000030315025937183134056422408", "6083331396813517446264603493526.839738158381397596", "-4.983293521221e-48");
  setDefaultDecimalPlaces(46);
  t("-12405.93", "-203.5166516076", "60.9578130438183792370676971072881266978579272041");
  setDefaultDecimalPlaces(37);
  t("-0.000000000000000030", "17007126489581038957", "-1.7e-36");
  setDefaultDecimalPlaces(41);
  t("-371519357766699204658412.32090162804134", "8085454281838486505269812413672", "-4.594910128936161667451111363598168e-8");
  setDefaultDecimalPlaces(9);
  t("75.0", "437684135", "1.71e-7");
  setDefaultDecimalPlaces(31);
  t("-1343566372830.1982726801702940200730342930", "-4.43", "303288120277.6971270158397954898584727523702");
  setDefaultDecimalPlaces(8);
  t("-0.000000000000006689806", "0.0000000053615631173983630681542266667208570480", "-0.00000124");
  setDefaultDecimalPlaces(92);
  t(
    "-1071179423152541493728751033.07376346561317032719113373248",
    "-70192248.72",
    "15260651178530037179.99064887450956515833890108758341732294910297610992395058859997725401267070276588226677915726",
  );
  setDefaultDecimalPlaces(4);
  t("-58.47339939903410650313007096194858278175668", "-620631456357916572907719620069871120052975.357", "0");
  setDefaultDecimalPlaces(64);
  t("-12276.1381502793123368383315", "0.0046591", "-2634873.2910388942793325602584190079629112918804060870125131463158120667");
  setDefaultDecimalPlaces(63);
  t("-16977881591834.262", "-65.675582689716024788349079577180297690596404", "258511320288.488068637691172924228119627377643620770285986492187189658237819");
  setDefaultDecimalPlaces(30);
  t("-0.00000000000217875092878241159164350198150", "-1489118.336687060491064722251", "1.463114700225e-18");
  setDefaultDecimalPlaces(85);
  t(
    "692231692832278617379527.71768153055259634",
    "-0.0000000000000014",
    "-4.944512091659132981282340840582361089973857142857142857142857142857142857142857142857142857142857142857142857142857142857142e+38",
  );
  setDefaultDecimalPlaces(24);
  t("0.00001037176094023722494295438418652030034602", "0.00000000000007456912649865", "139089210.605477527985684247612863");
  setDefaultDecimalPlaces(76);
  t("1174.0510501441895489323100562508545587681465940079606", "54446324085089882139704733249219501763.430", "2.15634585047350011405727804432680212440732e-35");
  setDefaultDecimalPlaces(62);
  t("13927.21269245137975111047013932853810997712885420240346230689", "-488820442629565661.6245509143", "-2.849146941877305727698055485680816208758197567399e-14");
  setDefaultDecimalPlaces(24);
  t("-125133388743880086.372306", "0.21940470384741456087758682391520143703913083643", "-570331385560923758.878997823681294141860052");
  setDefaultDecimalPlaces(7);
  t("-2398216364881373002180081661414906323048897267207947993", "-3033.80044368520848740644060551", "7.904990487667735977973718677319001674119383756886655113694e+50");
  setDefaultDecimalPlaces(78);
  t("-0.000000012789348279699910177296", "-24844762308170.526639058456188770067173", "5.14770401948823027989859754839459442030342110246996930089e-22");
  setDefaultDecimalPlaces(3);
  t("18811659700192433500323641644337832610432745555586909", "39.5", "4.76244549371960341780345358084502091403360646976883772e+50");
  setDefaultDecimalPlaces(49);
  t("-48266479922450988423241803.06876970417253678976", "1310036505.14417858883759952275792", "-36843614458773366.8405669969771913801641596172843189395675300154543");
  setDefaultDecimalPlaces(62);
  t("-20205220331485557.27673150", "27671873862.031605675", "-730171.74161121794817076822179596374509816666833289443032026920659667");
  setDefaultDecimalPlaces(67);
  t("31106078426980032116927471479", "206.01", "1.509930509537402656032594120625212368331634386680258239891267414203194019707781175671083927964e+26");
  setDefaultDecimalPlaces(2);
  t("2077032359552718801073206815954534602", "4235708235081101.0940", "490362471699599929635.33");
  setDefaultDecimalPlaces(44);
  t("-5958101821302541579596.157894890861274246592765", "75129781431.801731910413455972716012089954", "-79304128239.890405882667911951988591454217246633931825");
  setDefaultDecimalPlaces(14);
  t("1569350757726602183644034", "-1106988911.61296972303107762599330323180317458", "-1417675228056200.6386298885749");
  setDefaultDecimalPlaces(25);
  t("1.7494249879191", "-193253729035.4125278099202117512055891856222361603965967526", "-9.0524772621517e-12");
  setDefaultDecimalPlaces(40);
  t("14642959356313010261913113714273004866064271552282", "42046205787969.245980", "3.482587568104141682246678806511213012797608807109324085611498988630583300234e+35");
  setDefaultDecimalPlaces(11);
  t("0.00000000000000004492018811417055308", "0.00000000000000000001774455658515306346530808766468732526800796905268814590", "2531.49115891435");
  setDefaultDecimalPlaces(99);
  t(
    "-46232296903494735394562630722776",
    "-1419.57",
    "3.2567817651468216005242876873120733743316638136900610748325197066717386250766077051501511020942961601048204738054481286586783321e+28",
  );
  setDefaultDecimalPlaces(13);
  t("312531517.302122378657757487007", "-1.350150594901397872857355", "-231479005.7363539516954");
  setDefaultDecimalPlaces(73);
  t("14563920738643562414", "-650090115548916.1355040605", "-22402.9259794947579865173278670656433817942543246333268966354551871712191201534");
  setDefaultDecimalPlaces(24);
  t("-1322878785181203399315021", "-0.0000000002763097470036655018204904028191557999519801629767675108", "4.787666014415532727563464612922977220465908324131352640858e+33");
  setDefaultDecimalPlaces(21);
  t("416933908825589610191151439393970797474.092880", "6381798.5570875245791678801381285", "6.5331725076553756607005110463258574903026054701619035e+31");
  setDefaultDecimalPlaces(74);
  t("1328.7297055995508920156897461352892793235890", "23327777323129549368991331781899738.85678604490041811", "5.695912161687654985302702700356648848908062e-32");
  setDefaultDecimalPlaces(11);
  t("-0.000000021164356577016963066530326282711474627258", "2943472515836363976388759.1719954438151933806", "0");
  setDefaultDecimalPlaces(62);
  t("41501632248123433415615340.52604729235", "2548837457053905697992370577310418", "1.628257311319232937137305324675793717230393784773423046e-8");
  setDefaultDecimalPlaces(53);
  t("82795966477885261946067.7506", "646935071332125597.55042027855024359536886520927603760996", "127981.87970764565903792210509098459929004705908020018034091");
  setDefaultDecimalPlaces(5);
  t("20.744676190772432024", "7286157998266497618539986733764251", "0");
  setDefaultDecimalPlaces(22);
  t("0.60283462889526641649243215572821", "0.185065097", "3.2574193549595492687226");
  setDefaultDecimalPlaces(67);
  t("151155592658.60", "-1374.353183919605938290396969128629853889392346348268374992", "-109983077.4412074169683158227326845684514135306685696507383693628279528940611");
  setDefaultDecimalPlaces(44);
  t("-0.0000000003081766583820021617022306906897", "-14536.55499836364019978", "2.120011642488149220911629405441e-14");
  setDefaultDecimalPlaces(4);
  t("0.00000015924059618822097287784078179174", "-0.000000000313744609097983004", "-507.5484");
  setDefaultDecimalPlaces(43);
  t("-27611272389.442874780145296623771431175991", "-6271597824178402.458120361015", "0.0000044025897647638194511906076698541872567");
  setDefaultDecimalPlaces(58);
  t("-384431613994112083655461.41444318448", "-124102517577783922752349506006147712097.65514745558849578913", "3.0976939186842950158049725206295228842988484e-15");
  setDefaultDecimalPlaces(62);
  t("-340295866090.9046392887712582235549014930700626815315246389", "-252912044307451896.75", "0.00000134551071706662106304904173039551126799270973291875080524");
  setDefaultDecimalPlaces(20);
  t("2.751", "-37613440.6512495", "-7.313874913776e-8");
  setDefaultDecimalPlaces(89);
  t(
    "-8248231568150773026068919439946452153726550239485.2",
    "1182513812039071280139041796975195094621894776504210.04187",
    "-0.00697516721088264490728490940487193808543420152291309210441916649095503178970448569131361",
  );
  setDefaultDecimalPlaces(64);
  t("0.1104480492195527468779720854959452454563572842568", "10819680803890951425171611778982670.818070", "1.02080690938529023785059214823e-35");
  setDefaultDecimalPlaces(100);
  t(
    "-3815613513432044925.448306183",
    "-0.0000000000029970748149115539464489184598695391724",
    "1.2731125344112061162688702714870874643014738484588629308728483993778806721434360602000537262783607305597803823291641740785150076482e+30",
  );
  setDefaultDecimalPlaces(46);
  t("1469053811976283594188373775.24959818", "-245470749100706727573", "-5984638.9737197982291536322665870690318600589291554416");
  setDefaultDecimalPlaces(78);
  t("26", "-36523692374504939617961471534.0719797003317842769", "-7.1186669007619515072508119907573828771855286799625e-28");
  setDefaultDecimalPlaces(78);
  t("297770.75724694356541561200068376699", "14714360102.6562211121411023585", "0.000020236745272612316683854809101114270893958189761255513551670212373146133221");
  setDefaultDecimalPlaces(29);
  t("0.00000000018720671082330276399604918", "60646801849328340163869501310404358623", "0");
  setDefaultDecimalPlaces(84);
  t(
    "777436734241.6262905518599635179716217873630184301831",
    "1891639381128988130324478.90284329440945",
    "4.10985699492906683985012571077627423249010907652493097908094315343461223e-13",
  );
  setDefaultDecimalPlaces(87);
  t("-154331268655", "-11522868615222107493794215237913603108285832790755", "1.3393476382358735114981807755815938100645126171758e-38");
  setDefaultDecimalPlaces(17);
  t("0.000009338145618514923457093977340064684680933", "0.0008303890430550329122199909", "0.01124550678578263");
  setDefaultDecimalPlaces(14);
  t("-111266802409997820441866721932475410288", "112984119097368644092917756006123608351.7826548368182624784834", "-0.98480037105134");
  setDefaultDecimalPlaces(79);
  t(
    "-14294829640384146463005074306576632038854667957895135308843",
    "2377138996107157.91928752",
    "-6.0134597361759642892826360466527290543032390187719462925921934676085493127468623981255641953368288285897665284129089645051e+42",
  );
  setDefaultDecimalPlaces(67);
  t("-25291064897852200.239035646365981471441698834122", "2.7", "-9367061073278592.6811243134688820264598884570822222222222222222222222222222222222222");
  setDefaultDecimalPlaces(60);
  t("1856860.704", "27507860106993490383146434522278291.591854910455588", "6.7502913595518795841751957742442e-29");
  setDefaultDecimalPlaces(39);
  t("-0.000000000000003204546578440418702327692071520238254359125966143", "-3.1", "1.033724702722715710428287e-15");
  setDefaultDecimalPlaces(33);
  t("-1203067135559340943677051230591105285", "-3.320430219493452803073", "3.62322667856840092083924601119878331228563187147211041407496004156555e+35");
  setDefaultDecimalPlaces(39);
  t("0.658412541245373397663578", "0.000000000000000001096210201898023896401140", "600626175623407411.759462602562405391835446255348834018004");
  setDefaultDecimalPlaces(59);
  t(
    "7.4211668350692434034466549823345618469",
    "-0.0110050986854070861795461801857825141762614051471599453488039",
    "-674.33896298538547192371691100771608961061294842556270675235684",
  );
  setDefaultDecimalPlaces(0);
  t("-14467019887534629537514117353433624143272", "-69568577226520984242715205392874255860503189408521.72179999", "0");
  setDefaultDecimalPlaces(49);
  t("-0.0000000000000023974572091", "-0.000000000062536635807885586673170342149984243908934", "0.0000383368433259675202927582354347371877782179949");
  setDefaultDecimalPlaces(64);
  t("1342.6", "-29282082881.101233188372566701", "-4.58505634811422211844030878143781286459716164177630520298e-8");
  setDefaultDecimalPlaces(89);
  t("-43126462.86769", "-409968.676", "105.19453166146283819986285976638859111275125809855775420266498604395814864645902849416719827");
  setDefaultDecimalPlaces(0);
  t("72665026.80650861479092112822206246120449356599366", "-17205378414026103", "0");
  setDefaultDecimalPlaces(26);
  t("605375307233919278.53095511019303151", "63572816061513228506455319594486421126586560595.5", "0");
  setDefaultDecimalPlaces(5);
  t("-116956855303928269573706094", "14222174336.6204369511443522197459350989336455971507021", "-8223556576913702.59993");
  setDefaultDecimalPlaces(42);
  t("26167500095546709001234861333090.65893682410914", "-69441.29034255239", "-3.76829116602859688916156281949900627441854679647988875982820190101182e+26");
  setDefaultDecimalPlaces(43);
  t("-1361925891569261421559259501632.097772827870430", "-771314810.76268983396692833298925095840957", "1.7657198754196938380365182249299014473085769809174624837619374416e+21");
  setDefaultDecimalPlaces(79);
  t("-542480.961602280682136831711169463913223", "58389.132774084544", "-9.2907864157053493471038741157492082208016200007858768517124877897137308051415938");
  setDefaultDecimalPlaces(39);
  t("14383896984464707762827100904051", "19784.1413", "7.27041763721365443484125384003954723069027009021614701063624126056e+26");
  setDefaultDecimalPlaces(84);
  t(
    "0.000000000000002225340865960379530291",
    "-0.000304951571211501271106037973299062674699764",
    "-7.297358256327785841646090165372084229194411842895733003081151339949289119e-12",
  );
  setDefaultDecimalPlaces(10);
  t("3386406433.977940488436602865224732141595", "3.6361928", "931305522.0773608287");
  setDefaultDecimalPlaces(70);
  t(
    "-5589823667250991428350462218364347406088786537725493828959",
    "-4.95810184233",
    "1.1274120308557682624075592136192858915451100154137591278369024449364713539845364985919752625090689218989236033876036729626520624e+57",
  );
  setDefaultDecimalPlaces(43);
  t("-202918377531610444568717359574451243999984269173293044", "-1374013864111950121298009929239897056307834312190704843559", "0.0001476829185146252089981538578281570304633");
  setDefaultDecimalPlaces(68);
  t("941341396460298.26053", "200.8716961198", "4686281913500.05670929712868171434159609336835981120242293676830274871158219674887");
  setDefaultDecimalPlaces(59);
  t("-1083482665.0585441837387490696950718711830", "1677166891342150455108047318786040738861645034930935254", "-6.4601958854046e-46");
  setDefaultDecimalPlaces(1);
  t("2750017557074231.360389838404571714250853771199501", "14245.8", "193040584387.9");
  setDefaultDecimalPlaces(44);
  t("686023164454894059557.574765240184997505259", "46624481449572.596544043115", "14713797.19679826674683016922253513087822761759150325");
  setDefaultDecimalPlaces(61);
  t(
    "4625476501745032349151836876644861946690537272928485.691",
    "716384703591011721220778899494426944.78198059049941229784558",
    "6456693559422709.7492927675241130388505619670006666949774652752430338212280994",
  );
  setDefaultDecimalPlaces(98);
  t("3.9548854856238", "-451023.492481522147243", "-0.00000876869065924725988607622723472797621804894524758198961466286573616748710992823336426971011702");
  setDefaultDecimalPlaces(57);
  t("-5105.89079589690180034859917577057333938896038150026719011", "-9024.59406723086434835", "0.565775120505072186294554245972376906051349154271509605837");
  setDefaultDecimalPlaces(99);
  t(
    "47179432971",
    "0.0000000000533406617981565224455209952457932836130959141979114265",
    "884492831182505926114.7475531220855322253189080224744854892193840363839658607436986479895186337585533556047644774102506",
  );
  setDefaultDecimalPlaces(5);
  t("-3745933198108974405.2538270", "33.047", "-113351686934032571.95067");
  setDefaultDecimalPlaces(76);
  t("0", "-0.000000007007334761433488237161990661874846373429992", "0");
  setDefaultDecimalPlaces(74);
  t(
    "-27083481111925612642625622.929599884763844468053626",
    "300.01612857015763442641082713885424357556353413495",
    "-9.027341710261501240296638249283404921505447978081448112658100611046581823453681100920257479227283e+22",
  );
  setDefaultDecimalPlaces(80);
  t("-0.029015676959", "9135168711668098432932125790346394180034611425420172662231.44", "-3.17626065536579286428e-60");
  setDefaultDecimalPlaces(22);
  t(
    "2742967810577954081002357.749054758340391062299927",
    "-0.0000000000000001510146624771331822320888315954610229",
    "-1.81635860093604983045284434263300639320557932144826162581917223e+40",
  );
  setDefaultDecimalPlaces(44);
  t("-0.0000000000015291563372689058122700107951593861703773768143263", "-0.00056776893955069141104821753000811854045436375669208629", "2.69327226402877229050914795057212682e-9");
  setDefaultDecimalPlaces(28);
  t("-139044400485942391300670313593521978.679420306", "-0.122", "1.1397082007044458303333632261764096613067238196721311475409836065e+36");
  setDefaultDecimalPlaces(93);
  t("257168625926396548.365712551", "-29462813568.4522147037", "-8728583.416818142037199595441633256801443639577506800683707471537026638811110007392727326093054040082");
  setDefaultDecimalPlaces(7);
  t("0.017765735740897007523815255789376130", "14179488815096558851050698688.118805302806776505187494", "0");
  setDefaultDecimalPlaces(71);
  t("1.5617274484789020808292543438885", "-579195768645287192.17540626451178828564897982", "-2.69637233733891430333860619874721899738364429118711851e-18");
  setDefaultDecimalPlaces(39);
  t(
    "157615723944491916037889.124952763893066991548181565761733560",
    "0.000000000000026542124831177984090080911",
    "5.938323512040262882711801945203539479028500683017657847765588662085455680243e+36",
  );
  setDefaultDecimalPlaces(93);
  t(
    "1.0561797976652938443410217573581",
    "0.0000000000006358719980504849311971804926372770447992369027487",
    "1660994352485.134372495051095717860588911442364651285190672631367123215029636240514117415191652860946362841",
  );
  setDefaultDecimalPlaces(43);
  t("-119", "76632379774554118092279013891297747.1364064518177436317387", "-1.5528683873e-33");
  setDefaultDecimalPlaces(72);
  t("0.0000000000000001478987497815364", "-0.0026085231473998039254517", "-5.6698270026456548471295665872146780687295513820739101573755e-14");
  setDefaultDecimalPlaces(90);
  t("2286961633.0540535237199828188353125535738810", "2446401", "934.826969517284175292596274623543954394181902312826065718580069252751286481652026793645032028");
  setDefaultDecimalPlaces(25);
  t("-19753116016604656818524.476407267722079193962722", "-17571614579312969923103496156047589564457755056361861437", "0");
  setDefaultDecimalPlaces(18);
  t("-0.00000000000027896119629440992771659024077016174707751795759970", "10527030274924546.913888536203523", "0");
  setDefaultDecimalPlaces(83);
  t(
    "-53218929481180137512057783225.2694742235252734",
    "-207766988759089381592567891767103150346298219283269165070",
    "2.5614718584042585540958199755235826656112370896776211194e-28",
  );
  setDefaultDecimalPlaces(55);
  t("-2905529767401.2", "0.000000000001504271", "-1.9315201631894784915749888151802434534734765211853449278753628834166184151658843e+24");
  setDefaultDecimalPlaces(79);
  t(
    "-0.009568453149828772479981875787",
    "-0.000005381914352869397314420708106785170267059",
    "1777.8902677496714380759803227982476169803792623043615563668354539066016305918175591",
  );
  setDefaultDecimalPlaces(33);
  t("23032599241.4475379642991", "-503890821686978228.087", "-4.5709503428414514207454168e-8");
  setDefaultDecimalPlaces(56);
  t("510856.8426218800721207488306016304110520469763902", "-270191539475565530699962373717155730986.06", "-1.89072109220532731967047e-33");
  setDefaultDecimalPlaces(88);
  t("0.000000000000000409679005525247056783021930758796", "41268385852398007353268.849779707629401707", "9.927187532619272243295701045419082886948043877726e-39");
  setDefaultDecimalPlaces(1);
  t("-3.8246785650200503", "97945774312385492727053315605920.63009748860493275205217", "0");
  setDefaultDecimalPlaces(90);
  t(
    "-2030845790509738659610110.065",
    "46335787.971571809963998709",
    "-43828882153805487.251970291737899168388706382979979591571582760878892267402885533580317070971011225446789819",
  );
  setDefaultDecimalPlaces(3);
  t("-0.0000000223379497550808251188191692078898", "-797441519041096747017654197171274394", "0");
  setDefaultDecimalPlaces(37);
  t("6254651896454184317571055135.49756003702211350287591663", "3229633745935335981566576505302363268356436165007266334980", "1.9366443e-30");
  setDefaultDecimalPlaces(86);
  t(
    "0.000000000000000008052098917117768423586454199164572649267113699082358452846",
    "-0.00000000000000006988740504550937042051340",
    "-0.11521530827871477387115431477625162102138359027193277987669915997031748013564516013689",
  );
  setDefaultDecimalPlaces(73);
  t(
    "1111.5960602191944376190487552067164955",
    "0.00000000000000000019403841165224778908500257634805551259137973697240674566653",
    "5.7287423183579612298122590594673056774570835726217614513717073687279203182428431273281842233157e+21",
  );
  setDefaultDecimalPlaces(62);
  t("-129133083443716280745781.02565", "14094213226135146478146.50066772851504", "-9.16213493948442202150111731192247099313506280002180929776050654");
  setDefaultDecimalPlaces(85);
  t("12526764732203.0", "6904600250943652840043.338828270658445832121090", "1.8142635745626207723288257119379546769217513427782132726659402425282624621827e-9");
  setDefaultDecimalPlaces(79);
  t(
    "-9006685556990860253955499770279971.7219053923874612580523",
    "-0.00000000000000000001425500105208368506005",
    "6.318263691516412121210323434978283397163360935967684463374932630683541863069133874283657306771069538013615418013692394641986610793563e+53",
  );
  setDefaultDecimalPlaces(93);
  t("114.8252", "-0.00017191437424459122671206983228014264", "-667920.879243247064374558580218437412159285165295445820376558369508015800599272353416072415421860816");
  setDefaultDecimalPlaces(40);
  t("-0.000120327477029274370553531927", "-249.0772586987390052274333658457060797", "4.830929875248524576983565627931027e-7");
  setDefaultDecimalPlaces(88);
  t(
    "-0.00000000000000000022224436603904075635973178088411716866271080093",
    "-0.0000000002571119297851423774473883438764771824117979477915545536",
    "8.643876082481315543462474896468884151893725733033273980467290211564108059845225e-10",
  );
  setDefaultDecimalPlaces(10);
  t("-0.000002386540465263", "4383529113259635487898746478302557665311012201255011.4496175", "0");
  setDefaultDecimalPlaces(58);
  t("-740653479.12394158309642", "-49701643.696176618433", "14.9019916454175052416847390815805818395845066554730936129044");
  setDefaultDecimalPlaces(10);
  t("141979324910650698", "0.000000000000000000347337369033516979004987086525883497759388451", "4.087648999752460652442900009024189873766787185e+35");
  setDefaultDecimalPlaces(54);
  t("440113721554.1523", "-32535052057142443238609083", "-1.3527371057564784810410045194260168053682e-14");
  setDefaultDecimalPlaces(26);
  t("-193785060055202527762982516737.2804", "-0.000000000001683587484780459898", "1.151024593654972039855324941317076910238433543128642670077037078302e+41");
  setDefaultDecimalPlaces(46);
  t("-2957084757257831963704914962777584096172288194985", "223788992.76991598614", "-1.32137185151822786820183465925756048527048755923962348509717410903350242587533124723182e+40");
  setDefaultDecimalPlaces(79);
  t("-0.0002855", "1146.3500022636", "-2.490513363599663235622455881576315144993983545855645174336949084809074062e-7");
  setDefaultDecimalPlaces(0);
  t("1", "0.0000427347326204296352", "23400");
  setDefaultDecimalPlaces(21);
  t("0.43785020882513818848170381727189046646847718461117290302", "758178", "5.77503183718253e-7");
  setDefaultDecimalPlaces(78);
  t(
    "-65680817008890378141.11380979294343982966127405721998354",
    "-1595058960057014155.9130150481347879987509439231484105195378",
    "41.17767346138895570747488722267715558923885157370484185858241846235964762481189",
  );
  setDefaultDecimalPlaces(64);
  t(
    "-949058830715008384486140879796314688435641232260083.52083",
    "155562965437047594",
    "-6.1008018717608500516968471339398296449379384429326301734232674120961774798054224272085360422056058e+33",
  );
  setDefaultDecimalPlaces(13);
  t("-51846.48", "495694198455290052", "-1e-13");
  setDefaultDecimalPlaces(28);
  t(
    "156194306361459577754300093218.4808446099161997081740",
    "-0.00126552354451764204202177034929673132044761397884",
    "-1.23422679126047780664359563910334641391032224561329708141356e+32",
  );
  setDefaultDecimalPlaces(9);
  t("-0.000000072026529934400104294460066536445735876535355102372486051630", "83465760.52118595757803930143", "0");
  setDefaultDecimalPlaces(8);
  t("-30359672427436802155539508802833.6853", "1094.906375", "-2.772809906001031563592778314295017717e+28");
  setDefaultDecimalPlaces(44);
  t(
    "-135688838291898830335865761436567.5354755928",
    "26207721761.9941031629850299731859564603563756616",
    "-5.17743737987450634780018674014495328238096643509588661617118959098e+21",
  );
  setDefaultDecimalPlaces(3);
  t("-12980414.1265", "234135056.45317834300", "-0.055");
  setDefaultDecimalPlaces(56);
  t("862144297432141951.733389484", "736753955468743232717679628985803071", "1.17019296745223704603843413461810893919e-18");
  setDefaultDecimalPlaces(95);
  t("-232683554", "-537490.9044", "432.90696102056680682315933158700722378214815424511953843585822733412565632245515632208342910146555");
  setDefaultDecimalPlaces(52);
  t("2018413012.56768", "3.0687717036815229942415342297069304482139567", "657726676.1637055365758433098056869207529305650135880777450426");
  setDefaultDecimalPlaces(70);
  t(
    "6260137861858082.8707555861442695885115870457096925835665",
    "0.00000018138359257789019237930445480738754878511",
    "3.45132532269689108581931268155320573401978083378116752993892979712512927364775654569382407281e+22",
  );
  setDefaultDecimalPlaces(87);
  t(
    "237751385659518310899887982452.99823720125211550423439730",
    "-7266385.3598116653083325607213782923107",
    "-3.2719347225162924619662468162139225749257853222342276760633467609810698076338544595628833343418586112306179471e+22",
  );
  setDefaultDecimalPlaces(63);
  t("0.0000000000000000000656661416312235644133753603411953410065446814155", "-91.1954840611391853882468810384228", "-7.20059137875727873677275646887479144611597e-22");
  setDefaultDecimalPlaces(67);
  t("-70503045891843639.0", "2698669085295471292491908614153622.0773657462239602305256", "-2.61251171090228044322427760590889235001501656722735e-17");
  setDefaultDecimalPlaces(31);
  t("-0.00000000000000000144991415748", "4132940886966.1050", "-3e-31");
  setDefaultDecimalPlaces(46);
  t("-79831839313077282156840291035720985897545", "754099312790195185044.778368834", "-105863827163157782674.2539081806753022167163968499292678107922479669");
  setDefaultDecimalPlaces(71);
  t("-158.388941542667829422105478905171", "-604082858247784311012146.19982198371948066590100409322227220", "2.6219737802541556767513280476801320782880234994766e-22");
  setDefaultDecimalPlaces(51);
  t("-0.00000000000000000124249953422", "93882842586214358138697914427095493847059654.10678971", "0");
  setDefaultDecimalPlaces(64);
  t("315221969281675067438372572472270423410", "-133117883484147829155059.504918735", "-2367991144624928.3825360184119626180478375695650163130501952167137952687697433296");
  setDefaultDecimalPlaces(69);
  t("-0.000000000000004773852407934", "0.000000006714532916405379150146", "-7.10973118661793499111685781261565448859405747324184697333775643e-7");
  setDefaultDecimalPlaces(71);
  t("-3451502070603398697.3620496494359", "0.00000000941188", "-3.6671760271097790211541686139601227384964534184456240411054964576683935621788633089244656752954776e+26");
  setDefaultDecimalPlaces(27);
  t(
    "-458815269233897256533181136044875087949349226759491036696.3",
    "-0.000000331363998035997528075517658694330585157",
    "1.384626187374930623812231697478265490840581782305676013954940439929135498250634312787346765e+63",
  );
  setDefaultDecimalPlaces(24);
  t("-4.86418458", "8508291.430", "-5.71699338230119839e-7");
  setDefaultDecimalPlaces(48);
  t("-686.5551167348369400095514523653941551", "3757637427536326.8082", "-1.82709250153752279795454073991270399e-13");
  setDefaultDecimalPlaces(81);
  t("317227840.465872549", "-679.8417141713295854175617647823639", "-466620.146797768741653967515424585298516205618783550921533131909277910310958861929225734");
  setDefaultDecimalPlaces(3);
  t("294694469293907688954762104551705953044184556.585144471", "598.87273", "4.92081964216182775520204609336120469275975475e+41");
  setDefaultDecimalPlaces(11);
  t("6822264933929425070428640.5820820489669", "3991678815592284001253682", "1.70912171271");
  setDefaultDecimalPlaces(72);
  t(
    "5826857626069206010.2452223608767038427486197683493095778765",
    "-0.000000006036815245805062588494102136260129323790993217",
    "-9.65220466224843547160563422308417424880247667869059975158150332872921280645640354503302891029709505e+26",
  );
  setDefaultDecimalPlaces(69);
  t("12932401364663487676.523903353", "-1.4", "-9237429546188205483.231359537857142857142857142857142857142857142857142857142857142857142");
  setDefaultDecimalPlaces(60);
  t("0.00000000000003681612411", "0.17942063592639181232398701627931", "2.05194480110437206353738347463644012505579836933e-13");
  setDefaultDecimalPlaces(6);
  t("1160.2150917974", "-118132030392255.3366754286566717429642525602836691434058399589", "0");
  setDefaultDecimalPlaces(2);
  t("-0.0000000000000007060127", "0.000000000000000000076399778702661075122895390108694671327125", "-9241.03");
  setDefaultDecimalPlaces(7);
  t("-0.0000000000000000000112036302286499735799641431151288284270026947456", "-0.234071600109369349541490199002711881054916", "0");
  setDefaultDecimalPlaces(86);
  t(
    "-15199601889118323217649066632413208673074679822",
    "-0.0000000000062801509097064",
    "2.42026061278659810637627047666682291318124695021222254427996039015575126849136951271590798268466936946841917957604109088574842292827255276445909e+57",
  );
  setDefaultDecimalPlaces(50);
  t("193.35346124", "-4511718974355523979643839562.26423630570746406155911837", "-4.285582997057558416490176e-26");
  setDefaultDecimalPlaces(10);
  t("-0.000000000000000645452878940987452773937679999022954165078736191", "58592621083.82357", "0");
  setDefaultDecimalPlaces(49);
  t("54466518238611930290418368419", "-13455958663569813336520567532820249861330039.47100163969", "-4.047762006439025095575842478163438e-15");
  setDefaultDecimalPlaces(65);
  t(
    "34010234927014.0541910",
    "0.000000000000006131700007871379616200629181358166815808527682763010142023",
    "5.54662408196005519734039394369503176334611080108024135355116648778338961256194605417088887624e+27",
  );
  setDefaultDecimalPlaces(64);
  t("10762821.30144228313910131129452508", "5938621776342895971184349415185.501517", "1.8123432854937953415308531515443373634404e-24");
  setDefaultDecimalPlaces(2);
  t("124.53062738124398168", "-54821683396309.835274014887596348384894696", "0");
  setDefaultDecimalPlaces(58);
  t("20225393790372221377443373.230332138220091595985882614305", "-87254187113.32418637541", "-231798546975216.6694129496556481860380002759137054449671651931679112047836");
  setDefaultDecimalPlaces(1);
  t("-8.9073959376288564643122087592946101441357715557218469", "0.000000000000039545708890775372793708791318891878464808", "-225243046274146.8");
  setDefaultDecimalPlaces(14);
  t("0", "-12537474620450", "0");
  setDefaultDecimalPlaces(76);
  t(
    "-315273899620033622.95934170105707303319409355",
    "8324018196.842122603000019718578302716",
    "-37875205.4794448765440722460166953113261263902544547527034383386712063031398456671352",
  );
  setDefaultDecimalPlaces(9);
  t("58139.611617254930104894841968584429926199", "367060851031193928055347061355.536996665322028431618598", "0");
  setDefaultDecimalPlaces(22);
  t("-1669065011642685.9965453152301688", "-11726563861864704181855908968348475580639.27672", "0");
  setDefaultDecimalPlaces(76);
  t(
    "84027925436917851712947021287706356220592129404281439",
    "-0.00000000000000000016988125883588265277740559",
    "-4.946274004132191446283815532503200329062380047845330021468436194063971469581644871796870705931233593145205595499589335756481680140925697011918511767e+71",
  );
  setDefaultDecimalPlaces(63);
  t(
    "193428857347738643201178560815230791951548462167",
    "-0.00000000000000297991886956788125742992",
    "-6.4910779727297678985529520213050466459828844467564395042089455893021625470478445741239952737381141603087559071893893724390433e+61",
  );
  setDefaultDecimalPlaces(66);
  t("98762738905970397311883223585.27772717427858696387", "9421897407866987479739080075883742903501852870323.1398438", "1.0482255816488366986902987536870433288119380128e-20");
  setDefaultDecimalPlaces(41);
  t(
    "2068120191479300393561777807812158.306787250622541289605789",
    "-0.000000000000000024869795376215806103092168170",
    "-8.315790943166119635812959926769485990611225169110871897649962914417067017826930506056739938e+49",
  );
  setDefaultDecimalPlaces(89);
  t(
    "-4536483920771347529304.979786563930968078",
    "-9411808598547062388869904.55375709",
    "0.00048199916873274093675154212099411119377917190404006941275381153047336263675865228165579",
  );
  setDefaultDecimalPlaces(29);
  t("-2.37", "-1448544173.8929192607666573685733284962759684", "1.63612545803880850341e-9");
  setDefaultDecimalPlaces(69);
  t("-0.0234155831789016272399044991786122955", "-4304531688536009667842771380766385755227.325850651886466810", "5.439751609045622104569525964e-42");
  setDefaultDecimalPlaces(79);
  t("-368910813119.7252", "0.005165582333292410665354734701486616809648941", "-71417081234399.92486875263983919306980807998765371845863563266960096021249514150528502749919");
  setDefaultDecimalPlaces(58);
  t("-47684.62479768535663279", "-110441162635968292734234308818.9343", "4.317649657027017565460560161350967e-25");
  setDefaultDecimalPlaces(67);
  t(
    "-14585318309000509648904172976517455404.0",
    "-117158083028580.8823909022705856472075229178698794952854",
    "1.244926336447686697653576027334758642737485743315910214935460546629086420015913805128506762e+23",
  );
  setDefaultDecimalPlaces(94);
  t("-30994656603.60", "42.31055139922678449885", "-732551469.5175166200178888607452793928236577831084213255217060584088396738586484632770022804712113652473");
  setDefaultDecimalPlaces(87);
  t(
    "-27512750279797366722349323332.2262987081011585261072822",
    "-3333303724452.71757968035913291770170799107823640404302975",
    "8253898400546916.922811482650247100322932925063584850385857315049618391992294506044525628705197684777557",
  );
  setDefaultDecimalPlaces(42);
  t("0.00000000000000000639371638165368938367952", "0.000000000000000028094670893249130227955119108543084423661", "0.227577550416866986314645430503852873288905");
  setDefaultDecimalPlaces(85);
  t("-871481413.9752141994800627673712", "2466354255540031940.05217", "-3.533480285801015142864547390671273359061961238112621481959401880335091496663e-10");
  setDefaultDecimalPlaces(37);
  t("0.000002834299844981719173646732205019107016656640365250898", "-459856884025364643121.3", "-6.1634389816e-27");
  setDefaultDecimalPlaces(25);
  t("-17443389916.0636272325067427168604381227466540775256550", "-0.0000017346032241924209678258557768019", "10056126768808898.2746368046000917263783396");
  setDefaultDecimalPlaces(34);
  t("0.0000001348266447924618536389573093685649599684220132219624121", "22223924869485946.88142", "6.0667341877e-24");
  setDefaultDecimalPlaces(88);
  t("81874784369353592740718689", "-629627361876507009943200016501770661491406076", "-1.300368905908702188477542884598875076108849236796919055907968856779945e-19");
  setDefaultDecimalPlaces(21);
  t("-99662386829363632912077.309235059", "-276951797", "359854631415746.44815204903413231509");
  setDefaultDecimalPlaces(65);
  t(
    "-545106421456070553.05377055406634427543",
    "-0.03777927563509459144809775359315117886126",
    "14428715540265697313.88197540447832474709346723836623641966884452610699277066743198088",
  );
  setDefaultDecimalPlaces(47);
  t("86753138.86201226", "328065766546214800156.22025805", "2.6443825509538892680259891541079116e-13");
  setDefaultDecimalPlaces(97);
  t("25612851416965432254113609371619668176086696813380584", "1.2", "2.134404284747119354509467447634972348007224734448382e+52");
  setDefaultDecimalPlaces(67);
  t("537740.78112", "0.000000000000197801389172895194279", "2718589507225194151.6115904674138536266208795860847786952901886978816042732500224932001");
  setDefaultDecimalPlaces(48);
  t("0.0000000000000000054711199148498021943923959", "1272081315518854327.889613539682731", "4.300919955434e-36");
  setDefaultDecimalPlaces(91);
  t(
    "-0.000000000191705",
    "-0.000000000000000000138953658025803317564740584213139893039084662413625",
    "1379632625.1763800363564171176249791799544198934289568674498031661718218187213568304609342380862697616",
  );
  setDefaultDecimalPlaces(36);
  t(
    "713305496477366231057365808229881839.562965678209357982",
    "-2958942.0750682150345522767170495605877",
    "-2.41067745964889085041291804659452425199275696759531037645376950241e+29",
  );
  setDefaultDecimalPlaces(96);
  t("0.0000000000000000565", "0.00000000000000000029426011303601929", "192.006994821904538490683316212102166001664624430963572048516266691396936017370567843419826591934961");
  setDefaultDecimalPlaces(88);
  t("33534419816520131644380.17827228666985981", "22141816891978.429359", "1514528820.2915737942074406585661022113462400936185221828253592412083913547110611981344884820590263");
  setDefaultDecimalPlaces(95);
  t(
    "-4365155919371.8000323429844683",
    "-21443942743.16106314645312845928523751",
    "203.56125604578675758070686128005377836903152854593709208069199255513432156260534950611653737482078",
  );
  setDefaultDecimalPlaces(24);
  t("2.03309302352", "-8760969962335663782180962120.8998131658", "0");
  setDefaultDecimalPlaces(11);
  t("-143050270300888913955332963590854242", "0.00001892761846367667454318057766975281039989943312474835863", "-7.55775326808344354754764804288489439298455442427282e+39");
  setDefaultDecimalPlaces(12);
  t("0.0000000000000004708220653956957204567328790500576531606", "15.583670", "0");
  setDefaultDecimalPlaces(82);
  t("6625.0109588271725641662411481102197551835777794178930377355", "-418883331819705142299051337696381580217353087.36406", "-1.58158858459393066806829079168062450368101e-41");
  setDefaultDecimalPlaces(44);
  t("-18972.534697602182875095661371800", "4.2167568962962810381", "-4499.31906538562756918773195949048118928068579037");
  setDefaultDecimalPlaces(55);
  t("-21.235019", "-411868999350728670677837035952110341002.72403510380335225", "5.15577016805706122e-38");
  setDefaultDecimalPlaces(58);
  t(
    "103180017564060767069564040150720326",
    "0.00000000000000000001929835026513556854390887356719149941786220",
    "5.3465719165884328040476713201964757630249378427291165540854577763911079814921306354319871580110116389316393471283e+54",
  );
  setDefaultDecimalPlaces(41);
  t("-4272.9", "626357925372465981444177198145320346612573", "-6.82e-39");
  setDefaultDecimalPlaces(49);
  t("-6525567119220", "-0.00000000000000014492491583512794131090440761408360249583845", "4.50272272480995031486228738398256956874161657397324552542873164487835670072305e+28");
  setDefaultDecimalPlaces(49);
  t("1260843572820395222542850.97", "6310503014852242.32949871327", "199800803.4942547799149490472276722653301062244164340474483");
  setDefaultDecimalPlaces(68);
  t("22.23150547638918486024393014371997408339464985616", "1137177.99431748663", "0.00001954971480936203535781618817363965657314675441775589657116515414");
  setDefaultDecimalPlaces(62);
  t("136452350142.0089009481", "72167648828485897317115791562922462.48680224882959859", "1.89076895751865828520428990175640774054e-24");
  setDefaultDecimalPlaces(81);
  t(
    "0.34777593846902765241295951172836827",
    "0.0000000031597479730226053186234507098337730752971528831280876595602",
    "110064454.962319746486761915320526116146409549643205898752430496593168798159302644309796873",
  );
  setDefaultDecimalPlaces(9);
  t("-20908699867003566939130460.11469149202807362976952292954", "-0.00000000000001955", "1.069498714424734881796954481569897290438548837315e+39");
  setDefaultDecimalPlaces(16);
  t("0.000000000000044187954792178272519097156", "-1069766220820659336037874.9018301269433484392", "0");
  setDefaultDecimalPlaces(89);
  t(
    "-2296636051943246803189622493240.406899309039",
    "128347102628008843826730914882238.2576612763352546219632",
    "-0.01789394544105632252805551308220484161053062707635450908275188382854036410391027579675353",
  );
  setDefaultDecimalPlaces(77);
  t("-0.00000000002723794804653801237032570504473910068017526989202400319", "42578936724", "-6.3970474939514162139333803822534130502998395850745582817e-22");
  setDefaultDecimalPlaces(79);
  t("-1328.6", "-247.10", "5.3767705382436260623229461756373937677053824362606232294617563739376770538243626");
  setDefaultDecimalPlaces(7);
  t("55341409442143666634086430669.99791980875200407497146", "-11684904734701505", "-4736145539791.3761765");
  setDefaultDecimalPlaces(43);
  t("666.78782483962050887556582162054758323332012594128434073313", "-18507.8", "-0.0360273951976799246196504080236736718158462");
  setDefaultDecimalPlaces(54);
  t("-702.62", "8480122077942.102", "-8.2854939297112927160790366661600722376885263e-11");
  setDefaultDecimalPlaces(79);
  t(
    "10322339166555.19875077971916843826190564715731496",
    "-730666.55560868351700035205164329",
    "-14127291.1526053761778160511908905690734339942645187493457861002621110735006824150147737",
  );
  setDefaultDecimalPlaces(1);
  t("6681465175046166141212378472930.57342", "-6865907754178426151.183448321381047922507480167388", "-973136461231.9");
  setDefaultDecimalPlaces(69);
  t("-8353641.233", "-40833069.28", "0.204580291912849319858916077052731412993600955191287055754727238079419");
  setDefaultDecimalPlaces(21);
  t("-2165120324646537765986123929082968307546801467296489.338124", "-6415158825319060163209355086.9", "3.37500657988596993304373479899923614704073797e+23");
  setDefaultDecimalPlaces(52);
  t("50594198683187", "34017.286351643404813732434331", "1487308486.6377870283457915746870381598336266064545568146630988");
  setDefaultDecimalPlaces(60);
  t(
    "-42779837189585635063402304966383967247171317209704531",
    "-9584.7108571604785098066492259",
    "4.463341443172067582783607846730632224238457628514453926402547657561600388653147364757818187532434367914620291e+48",
  );
  setDefaultDecimalPlaces(1);
  t("-0.000000000000004611930384523052872", "-0.00000000000000008689496869314964354627613406929162", "53");
  setDefaultDecimalPlaces(16);
  t("-225565249420551893478380900295016081504494.4563", "-212379373046899.5593117109987680414", "1.0620864266829740952102705453504674851834071e+27");
  setDefaultDecimalPlaces(93);
  t(
    "-232469882971015.2838685606",
    "696.49940429216866641731284449454074",
    "-333768961665.182489441660769341856118024798470225190583916775609736544495664167397093611360677124149163842",
  );
  setDefaultDecimalPlaces(98);
  t(
    "0.0000609426802648419496917807240804459562974969541265015091949721",
    "2784643464619.27759130496614069734885944450",
    "2.188527222215651340023404684934122429476482731586284153376995135708958452942431294e-17",
  );
  setDefaultDecimalPlaces(72);
  t(
    "176439137757293416778832575.394883",
    "-0.000039355389362737964440211212111257098625694146",
    "-4.483226836636193328788910679405950623863891688954379212704471042193249704876597612917417881652078585041e+30",
  );
  setDefaultDecimalPlaces(92);
  t("54478250364106", "8833324406002197006135832100457614041", "6.16735533080708756690219987998038443955012427042244695564939281167788e-24");
  setDefaultDecimalPlaces(23);
  t("-18319151642239593125635486379389258020808798", "134292.67830514427351934", "-1.3641214006182980242042664046333070279355808273668116567930174e+38");
  setDefaultDecimalPlaces(67);
  t(
    "-1679864700985868085760834151713.4580809",
    "-0.000000305776743",
    "5.4937621628923821906260351256127353050522877732398372756557224497613279895521681320282752831859419733566e+36",
  );
  setDefaultDecimalPlaces(99);
  t("-1232965904161441371.88361", "-9704526806962028310150780431875037207", "1.27050594911738667493461577335030018952905628734019106315074844381387061812588534e-19");
  setDefaultDecimalPlaces(73);
  t("-0.000000000000001121676485752320812134776355540586808252168", "-500349827947032402.370133731936353718598478532", "2.241784493770352112869473814823091718918e-33");
  setDefaultDecimalPlaces(8);
  t("-322165.97500857808503", "102471418923032105227838515700.90220564", "0");
  setDefaultDecimalPlaces(70);
  t("-3932328266322", "251612300303206011471197627510", "-1.56285215849278366162644300156069590621700151255033928e-17");
  setDefaultDecimalPlaces(26);
  t("-100845414.3907256509938709732630877718858058727586", "0.00000002328153546142967172743100605110", "-4331562003622803.11823028920783175101048229");
  setDefaultDecimalPlaces(62);
  t(
    "-61309974929637669768252263879425811899499.75019704685799",
    "-1148365795196658992975790272413285.959067848665495886460625018",
    "53388889.83465261124158968469353297913427362982874645738983305616851747",
  );
  setDefaultDecimalPlaces(73);
  t(
    "1062963850102241297505128966121046376364584714.3828",
    "0.000000000001511178692261684438",
    "7.034005015723000497165979833995610452974394194260165115459797567059460471846222785307580533304655099651465339390764978298839330288e+56",
  );
  setDefaultDecimalPlaces(84);
  t("53328511978230801816095708.516938016771918303925621659", "5", "1.06657023956461603632191417033876033543836607851243318e+25");
  setDefaultDecimalPlaces(86);
  t(
    "-0.00002406636805848055800244458126844864968017025645653240556",
    "5006427427464708.602847575915525921197",
    "-4.80709416188779999481194173649660737591792426514301441186387429901e-21",
  );
  setDefaultDecimalPlaces(37);
  t("3292760906406994888879199074461083261779.5", "-38498.05", "-8.55305893780852507822915465708284773327350346316241991477490418345864271e+34");
  setDefaultDecimalPlaces(56);
  t("1.91", "-4632930.23350211", "-4.1226608296153832392152536698382069030905559790002e-7");
  setDefaultDecimalPlaces(39);
  t("12343508.324", "-27380868073646500775521883647272816807262732799567", "0");
  setDefaultDecimalPlaces(96);
  t(
    "0.0060417151010713339554720986778388494762606291733212",
    "-19226287666903225.01917951657143718834",
    "-3.14242416723627021934307254110184064887149233045451205210575092131051081578796e-19",
  );
  setDefaultDecimalPlaces(85);
  t("-47371843299.0319", "413.8312082563478380536845598519868541294526541", "-114471413.3538411164674490990938687626176444165014435613892645166439805009291637822286195720364");
  setDefaultDecimalPlaces(56);
  t("13994193.34348442012968936161", "-806.03866508501111866575", "-17361.68989115240948164025348155878473314589266231561617652259");
  setDefaultDecimalPlaces(87);
  t("-4.53939981160", "248942903592234977275752500497695602154643399", "-1.8234702600864148031354467946033669921771238e-44");
  setDefaultDecimalPlaces(93);
  t("-154120077.68176900950501311761", "34168352691380530.66344597633935", "-4.510608956592983925021128737949162653519085158907226355248856817210723550160365725988e-9");
  setDefaultDecimalPlaces(55);
  t(
    "2911942999956910702486.684198174651",
    "-0.0000000000000000004805997948010690307466357609414853129845047",
    "-6.0589767857937368183194205074093831922089640786726951386721098070641180737880637629368677507208e+39",
  );
  setDefaultDecimalPlaces(18);
  t("1324262547.56726955323540845996936870057181", "-0.00000000027305938456", "-4849723622211878734.761799537725321168");
  setDefaultDecimalPlaces(6);
  t("-3440649.9922969823501180635166784708468414256409", "8226.701298055400984676882512566", "-418.229599");
  setDefaultDecimalPlaces(51);
  t("0.0000000000000000079810460488663", "-317332264553332709921126698183006034211688", "0");
  setDefaultDecimalPlaces(62);
  t("-48.9110054054846177820866299", "-1865251714607899524654954632878938724391177.13711930112063316", "2.622220101578427191794e-41");
  setDefaultDecimalPlaces(29);
  t("-280594.97", "7480768716255.0781791584003074572722003546450950", "-3.750884175717006794068e-8");
  setDefaultDecimalPlaces(20);
  t("0.000056563324516065944444359317985550", "2606980798154.4227385", "2.169e-17");
  setDefaultDecimalPlaces(17);
  t("1582709305682575767461072931251439.798", "3974879105.313", "3.9817797315321016835406825500334718587219e+23");
  setDefaultDecimalPlaces(36);
  t("0", "5043423838480370912318032760621600330073.52158500", "0");
  setDefaultDecimalPlaces(72);
  t("0.00000000007140242694520983749258937701050247834986", "4323431388563568576410763764689794271826841064.6030730", "1.6515221482196996e-56");
  setDefaultDecimalPlaces(100);
  t("-5.3877245018298675", "-721660028420818120381.717008519267682870884189690531880498", "7.4657377291903297456004550135626674690448252258390397816666332062557099824723957e-21");

  setDefaultDecimalPlaces(25);
  t(
    "-1.3610648658292548756450768268527629924170041602498478451e+21",
    "-1.667158208835446156735700666658479624046088941290632404329048991850808122943986477720927798915974845240636202535506915808953688602018e+58",
    "0",
  );
  setDefaultDecimalPlaces(99);
  t(
    "-3.476801173867346341451501060203236095888083941756081243868335598345098946550348479526304620746445310172803199e+11",
    "2.288993095189e+3",
    "-151892165.213380433950073232529240010066863933581665453184732647340115905551804620801330721682755021425365907",
  );
  setDefaultDecimalPlaces(16);
  t(
    "-1.774409539764870268160632777601783286404761863208261177847835398238088784752527790944281397612917058e-16",
    "-3.614878884830653702567394012638538949460064837669960031758096713666697923208205373788340681676346880037700536143738431727190292e+77",
    "0",
  );
  setDefaultDecimalPlaces(12);
  t("-2.4702858794639749905318776268923785675115272061578422e+9", "1.6183684947345218378827711045e-17", "-1.52640507245489983652556214900659608691e+26");
  setDefaultDecimalPlaces(30);
  t(
    "-4.93845209541963291322162454885283788961119037749678545516414554338707019334105989027844e-17",
    "-2.49000797871223990638637095492708512021973658828916662667022331865822913033104234609461660400615495423239658486401174145e-8",
    "1.983307739428874229315e-9",
  );
  setDefaultDecimalPlaces(77);
  t(
    "4.897060785121433597287678293300483924942310999916e+34",
    "-2.1803640971285911003573483178084718630901235840192137579386e+49",
    "-2.24598304089237631886918030615227944842563374233438918172323393e-15",
  );
  setDefaultDecimalPlaces(67);
  t(
    "1.120030562364852030609354325697887646492258860676559168287264268905735565261920690088615505531782996173704e-17",
    "-3.649625025128150735089233640419e+29",
    "-3.06889215920346214745e-47",
  );
  setDefaultDecimalPlaces(51);
  t(
    "3.8556383492953605166771314015736648671838519816053690840959960329936056743588493226835043581069209649649279364933984871e+118",
    "2.07879699676777490032866947979631860338977950753920727556380868796281163833071693298654722893313893721001404500719e+76",
    "1.854745006506317779079398786532355727875079937488722921439666786858737917684585263933815861855e+42",
  );
  setDefaultDecimalPlaces(61);
  t(
    "-4.0145526225703291075627689313244351633701240607465989842685703245653e-11",
    "1.26906324780709501078512652011274592338375306038376327662906811384067378450564694146933360506425829357363e-14",
    "-3163.3983802677771959169309476331804695634962727622806877520601436",
  );
  setDefaultDecimalPlaces(80);
  t(
    "5.23788388033202656123718069695368608244064753181665125519956372242815160003194582848384346450778799656747e+67",
    "1.2103122800180242270089251037972467673906688576675855563649796281470502000565871248e-20",
    "4.3277127455519354759268691268566723501642179174571576765721840786140861656197769337347962434612584015267789062002956632348830733893743966241671981870732150170399712438e+87",
  );
  setDefaultDecimalPlaces(98);
  t(
    "1.511194029068316e-11",
    "2.901076320052404239113324893023751731125064092240480904009494618441188067460842067169802e+9",
    "5.2090805699348792369076859983100955146230796575058132833346187481143918178623e-21",
  );
  setDefaultDecimalPlaces(3);
  t("-2.9440332828371515323973741951364829345365e-13", "-2.834959098500866162567953784385255006040655279563659250032039e+38", "0");
  setDefaultDecimalPlaces(70);
  t("3.997e+2", "-1.31402571852231589873e+8", "-0.0000030417973892435040323028986229882393779372119648972874966547375209");
  setDefaultDecimalPlaces(10);
  t(
    "2.5951622863019098078860025183801567415044907929901674281800088928406848002363180639615092824014377609e+92",
    "-5.46965799048494022608732549686249755485376522976909995164351414162446865902215394328744218872318848924957083272692514817266195608844939e+116",
    "0",
  );
  setDefaultDecimalPlaces(42);
  t(
    "1.41562549217323678793744884330268673210016856448653769127261294940560666502e+24",
    "9.799551548105319389795065384742422660507216063610053691999585162142011149573786064817032440891399131103254330241138648319460518635068302927e+9",
    "144458191298247.614399815449630374742373543424358884405054",
  );
  setDefaultDecimalPlaces(2);
  t(
    "-6.88378655584409014712342634340923793056222384629278017782972677438181537515808040407490642101095307e+98",
    "3.72888896717941717439063231664540051501026871989835639704491484248144433515610138733266848239985913451404696202942155e+116",
    "0",
  );
  setDefaultDecimalPlaces(83);
  t(
    "-8.17055911850086546834530572470836665818402191457082674030398422885495836016358053460112135563466858441170123976967533548e-13",
    "7.38154928897931731071419127768669952562546653059777428482285584e+62",
    "-1.10688946e-75",
  );
  setDefaultDecimalPlaces(38);
  t(
    "-1.265253989199447023045569340083947e+20",
    "8.8309828037327019953912161294767456477437944760658416183802560432046224370291988646398616774249951981794e-5",
    "-1.43274425657883320586227142871983798269859447846742682848749169e+24",
  );
  setDefaultDecimalPlaces(81);
  t(
    "-3.563499045412141844123357164338264096559340090397219345529358941212933405e+66",
    "4.095537460112282914264418398621545411105192738371562626693370965250908585297661538491318e-8",
    "-8.700931392077769570130196493482630102394072534869148726199851379334724100444025557531167310560563480353252465080862329825065218123541916074474114571581331e+73",
  );
  setDefaultDecimalPlaces(89);
  t(
    "-4.681899670753831172415833378559322258e+27",
    "-1.443540442579760330016832043499486763208939016621263954e+37",
    "3.2433449958539287029279633565675177755587272555163669200281354972762860028683241e-10",
  );
  setDefaultDecimalPlaces(71);
  t(
    "-2.862324209223902796720662598773905532e+7",
    "3.128688865030087128143475039414926115869421499833348855525156e-7",
    "-91486380803684.58664535281195358719266165444309101220890189282078625521343581374770724",
  );
  setDefaultDecimalPlaces(1);
  t("5.16e+0", "5.716977490513913902777078066770105723896943594626640602532122327313826623363798153744276997076657408479854388378624186201637044823483248756183814793e+147", "0");
  setDefaultDecimalPlaces(98);
  t(
    "-6.30954683654682009021725907272091523630849105307398472383152274108280806036291354159868544940178290339409688420084547613962260385e+128",
    "-4.43355085729898951687123239938511e+18",
    "1.4231362263859821733512519047573577862552214521057723938345315349982317964821688817824680441140528373682382886625628358858103148166712851944800504504388195655064300974758947190565746722549459787398132217981782e+110",
  );
  setDefaultDecimalPlaces(77);
  t(
    "9.4626651251728408028586900492247984382500562065086018131506524081953748791815878945472627783751778558101585901176261185474876064792220522842116584658e+32",
    "-3.8907038996068497e-19",
    "-2.43212163385885781563762540683192970768956522768686321497899415764415557965170131654943030912400744417259685425979494959222732648e+51",
  );
  setDefaultDecimalPlaces(34);
  t(
    "7.70834009659439931252879447107924631664869327154694701528682348940939557048597551676294e+53",
    "2.2704423671547334745186367135670593332905642332053508395644232600634103680007577807715548104895672052501600257605816601479983126e-20",
    "3.39508291780791383390244181965060356221345319121061104482945289438167656971639438836700197011169216591478303e+73",
  );
  setDefaultDecimalPlaces(90);
  t(
    "-6.37954443740207280203510550362443558215397221748192974894336354558e-20",
    "-8.09e-11",
    "7.88571623906313078125476576467791790130280867426690945481256309713226205191594561e-10",
  );
  setDefaultDecimalPlaces(25);
  t(
    "5.50702611719109021606945135477645339662608543561183553186985830466851094928472523229996079429823621719366e+102",
    "8.44245547539016708608340624720548679835146360290152493460004652502923086239914335328275225478835676e+23",
    "6.5230147002185802493238504585915199627298671053697010324336279108294787797103260129493027191466396088194e+78",
  );
  setDefaultDecimalPlaces(75);
  t(
    "2.37233062121422405583302189992267767047678205344503015909631487651598881525258463501204108812647858e+98",
    "6.1375920850047642874896972817355880595644639898639402878442038583997125465950692641037522641989521399338928774009249142183e+83",
    "386524648161328.978461644903669003315597441068669913220308005439445001567283832455364871911",
  );
  setDefaultDecimalPlaces(81);
  t(
    "3.627546238768260546957513433535183287541832290849719307885754462950460585430807184743571e+87",
    "-6.8690108589754406762032701e+4",
    "-5.2810314516074786759884894998834835672372186424845164192652058633248650664327748158390096361297561590300807697287054371722134218657293734437244675048391022861441072e+82",
  );
  setDefaultDecimalPlaces(16);
  t("7.1150123290964612646022346e+15", "2.6700753672726107806179142414e+22", "2.664723406e-7");
  setDefaultDecimalPlaces(53);
  t(
    "3.75073122884224965e+16",
    "2.34066649824454516172435772327165601567779754531556392908994737416352494140821206647835672828031386987866726e+36",
    "1.602420178891450749598679453739696e-20",
  );
  setDefaultDecimalPlaces(22);
  t(
    "8.25709001426485701570004174423590422851196624507728469151991977314000550415648255086363703511855286534625943787115824259237580990390861911831458e+143",
    "-2.49286989605005448702558058578484709176687830115095693992595603457922376212502962878180956669438213e+98",
    "-3.3122827739017561631177571159736494399445691067596943042647065371279e+45",
  );
  setDefaultDecimalPlaces(38);
  t(
    "1.1359204034758427029347271569628302275162702732292384480802855323697133902228693922e+10",
    "-8.87737345124494260715210797854261198e-9",
    "-1279568117432914592.68299952045555654172712103119427040833",
  );
  setDefaultDecimalPlaces(77);
  t("-3.6111310629547209120790780912820275269e+22", "-4.0579520768650877474053088273475574838758382720699389240889934101760634696495812432258143004502171108343745476e+102", "0");
  setDefaultDecimalPlaces(34);
  t("-1.98581295294110943024401388992331790610271201830491505450383424333211657105e-20", "5.3268847576e-10", "-3.72790672842677949178393e-11");
  setDefaultDecimalPlaces(45);
  t(
    "-2.28925382790591388769959148886800731854441317036622534029075693861099644688714771101508959643449974764141721060909779317838515891424648174e+130",
    "2.955628568664560092742627481273954702034451573007876964689645442389088481888721485483459101745096679993295298360850027517498254433e+129",
    "-7.74540431831143819993342212597126592920072744",
  );
  setDefaultDecimalPlaces(19);
  t(
    "2.69506729686154335366331256164103057526108253788892937612898585096639840438758965556720122169940463530850535254525967078484522315347405919700249046242e+76",
    "3.264518070650228646412784106526670442199830307437460471397273844722106190774934349063500528513947546e+30",
    "8.2556360189629406777173167975335595226363343315241918374029515186e+45",
  );
  setDefaultDecimalPlaces(64);
  t(
    "2.1394676047557577e+16",
    "1.053014757975064558320298341576887647784210075955433714339508263988759066397688227043965177756027900053435381267979118688515572276866868048872e+141",
    "0",
  );
  setDefaultDecimalPlaces(87);
  t("1.66241e-4", "1.69729401540368062667036615064e-2", "0.009794472760246056189762762535547448401854201012232666963376444105054758863164741958912");
  setDefaultDecimalPlaces(4);
  t(
    "-1.27586972517061102043296661077912244559500102530832347905906026627526571266778891201093564523515468337257e-7",
    "2.7792264614981285364546867496913151294447386651982086350378091058436556358339138545697026764771e-3",
    "0",
  );
  setDefaultDecimalPlaces(39);
  t(
    "-3.136837045053281678127283900391835474449784150370327170070145473832595208908433966033134e-1",
    "1.15645390924587093091965067452217105685946483101164913257272150674336399740681953067035856677118e+34",
    "-2.7124e-35",
  );
  setDefaultDecimalPlaces(53);
  t(
    "-1.2580060241614839135423630284486478474417782310146078789033308407594740992641074982239959506174931479661254799092749645561187850795306e-11",
    "3.04802383933315473653512e+21",
    "-4.12728407149436828862e-33",
  );
  setDefaultDecimalPlaces(35);
  t("-6.094e+2", "-1.2715299745626091763648898962549422925854022769264081664929200496915209213413236745686674620585015083397242111495153e+76", "0");
  setDefaultDecimalPlaces(84);
  t(
    "1.5555990435765501086488447619526674327521608868e+5",
    "2.5218661969194136925385041396747063555179650761137754355322787644892134321918951714115041733126434333489166103785715646938702879283e+79",
    "6.168444009e-75",
  );
  setDefaultDecimalPlaces(9);
  t(
    "-2.0917292597758786906211704328311806356653616241863099612312783656020661391581e+30",
    "-2.733217828522502985282185385617118391114610772260301808003452080425873271032196541820322717894087230184e+97",
    "0",
  );
  setDefaultDecimalPlaces(40);
  t(
    "-5.443907732736233381109557627889336796347867270233802422452981798348113624199821573748106724714235726015978612506966152e+117",
    "9.20818133522088759785191230936114959511169391e+18",
    "-5.912033586820805035078395705716215449246294344700965385297823912123032027695597828873266560572777471514985884492459116435477994385528613977e+98",
  );
  setDefaultDecimalPlaces(80);
  t(
    "2.1505331848270423688933518581786341910603268869801278091396889624099095937912888273155783876593545991e+37",
    "1.1931889060571707175857872896939262071434072539517008928504322529085895818552193889539491751325485051776734521e+83",
    "1.8023409150973125503087890553560482e-46",
  );
  setDefaultDecimalPlaces(67);
  t(
    "2.374075331189596993820804435472971211134238536255346288000410898281464356214475122364751800324511937561178142148e+19",
    "3.54540693899566179694210143447850754190472830505850054419744519342e+36",
    "6.6961998214572286120156967212314952524007067708826e-18",
  );
  setDefaultDecimalPlaces(50);
  t("-1.53196349444282567924882014848555172294495537262419404581490455992438591250004451e-3", "1.118710521e+1", "-0.00013694011682963565149565802183830107404031068128");
  setDefaultDecimalPlaces(70);
  t(
    "9.6774529641130704406621567234626230377051e+27",
    "-8.551063789683091840625347521613119533472493123685534718333572816278334587455817972058757374637844750205080820913378770604e+117",
    "0",
  );
  setDefaultDecimalPlaces(42);
  t(
    "-2.85577087862579697779102394614701159943809600907159445607701112796309344367058331166309534101261115208144774749407489776401193875133810986773189e+19",
    "3.8612479557444504358073852821665905713318936923002754030531988585817e+25",
    "-7.39597899787091761366124599994424623e-7",
  );
  setDefaultDecimalPlaces(93);
  t(
    "6.158418537873912208661830750996827391464126515225447547672630645124253634797807551708177067542538289449849803542351616343870325725508e+132",
    "8.8321282082962951212e+10",
    "6.9727458576621617252258867292179222302374179149635488886052106140023471645409252925645076724530306585955638807827898937582795757814745967272697225828101899086739205704716875836923899628950368348668282327695427791407e+121",
  );
  setDefaultDecimalPlaces(57);
  t("-9.4637613261188642427526998998174557099008563397761729624323809600714411722737909702949705e-11", "9.81171235862817e+3", "-9.645371755926653842862945539857757476998809e-15");
  setDefaultDecimalPlaces(18);
  t(
    "1.3749550264195072497976996080216897068541691617107364699702322933333982074696204716213808e+89",
    "2.98802e+4",
    "4.601558980259527211322881399795482315560702946134016740082838445972243182674883272606544802243626214014e+84",
  );
  setDefaultDecimalPlaces(73);
  t(
    "5.40295149012527926219044196811038364771445e+41",
    "1.948203401218e+5",
    "2.7732994854374037582152275222413822528101770154375073953762302193044892503971259330603265621713432217987628785e+36",
  );
  setDefaultDecimalPlaces(57);
  t("-1.03625388599292582624181999443677104947065859724595673e+34", "3.8420120712277546758e+17", "-26971645762210741.421644338227773586709039191857311388163268486755680166714");
  setDefaultDecimalPlaces(29);
  t(
    "-3.53895292711797657608961692900106968293530666489233874364492793649815910197843984657855141616418794258397110747722118058455286813344881e-13",
    "-1.16813053571293039e+17",
    "0",
  );
  setDefaultDecimalPlaces(3);
  t("4.883199134093751597914280909367376156237190750045849542976796e+60", "2.857973612534197158351227156066350055738e+34", "1.70862289024556959599081034152e+26");
  setDefaultDecimalPlaces(76);
  t(
    "8.07293442943077394635717011603360504e+17",
    "-1.92439492861681141289323134832926789305438425466076691624568286463932905926820001593525585888015330712574636957422019745319719389354146548653258e-15",
    "-4.195050771222578670712715338845110987903982657455851664564305749655496870809880697174847661401150997489641197e+32",
  );
  setDefaultDecimalPlaces(44);
  t(
    "3.2155067046283732088890799666538067393563768505031863056873480091633463597495844528749076833457337989675435403003410212468448223368619243e-11",
    "-1.5303968888853350394063e+14",
    "-2.1010933359714213281e-25",
  );
  setDefaultDecimalPlaces(98);
  t(
    "-2.03181908038095236871576648084467359804374733917999815028378556800688369552458e+39",
    "1.11e-14",
    "-1.8304676399828399718160058385988050432826552605225208561115185297359312572293513513513513513513513513513513513513513513513513513513513513513513513513513e+53",
  );
  setDefaultDecimalPlaces(68);
  t(
    "8.205027438213150827312516914e-2",
    "1.13369516655198431986246917672714320792061000902241977532657586575393442561289824287915031658703981986390888649714686256307943353357612607732626e+23",
    "7.2374194406842948290272451882079998265094712e-25",
  );
  setDefaultDecimalPlaces(87);
  t(
    "4.14457875902153842402729154542307594155944301222006838229138742486622404833238349136173511446107e+15",
    "4.786642226771287907211859582080034213045712547305247618055160062841987175076669814990749750106478271625987693440310457787e+120",
    "0",
  );
  setDefaultDecimalPlaces(86);
  t(
    "-2.8600473975217764519552316374877799389173154511663625790931342647261754250227332432698312566220948606533164143943384e+115",
    "-2.616326184297866292193257429323556233789969494373825352216497696856657971160542771741865652983196979865756973115268562136990612602979e+41",
    "1.0931539861836136893909705516457913919476422339741591251538161379449100009650964404272914775191391499606718934882427985260684980903680568572143406050268652459138e+74",
  );
  setDefaultDecimalPlaces(48);
  t(
    "-3.069337621789345743685069652642795040586339824107439658624676708347075198e+72",
    "-1.2116223324489128779336559355661354641659e+40",
    "2.53324616061313973801024385108726154740467797380006372942254820065644306813274518e+32",
  );
  setDefaultDecimalPlaces(56);
  t(
    "2.076779707437436840315178827006855373508102388591949671261874701543833806537926291218470637957853005827378351e+6",
    "1.83833052240102409212828404673445110398948796774234372518621361051025273326981929925569159010324543843683711429246605e+117",
    "0",
  );
  setDefaultDecimalPlaces(6);
  t(
    "1.33180998908108004014434409645810692866241271306678951525910263767458466854256926019854761965169549749059917158709144099161e+11",
    "2.57324695067300031497766622604372459099014671903171385614092e+16",
    "0.000005",
  );
  setDefaultDecimalPlaces(77);
  t("-3.52e+0", "5.830365719167609804290156450178658209131977623067967175972602279581863244197e+75", "-6e-76");
  setDefaultDecimalPlaces(50);
  t("8.978668417628758390466803271282723898424744480248157590319849162918365071238741470207025836e+8", "-8.5889e+2", "-1045380.48150854689080869532434685744372675714937281346741");
  setDefaultDecimalPlaces(70);
  t("-7.3098298979701869872e+13", "4.3653448570832368783662e+23", "-1.674513729679159158252079400881450427390737102928828747726803e-10");
  setDefaultDecimalPlaces(98);
  t(
    "1.90789650417793329951595210568783696639035013970811514059694929974228113371317536575095299846671514931645445233845931540779355488095899400374555e-1",
    "-5.504180811802570629820378108369737425592059602133354295e+3",
    "-0.0000346626785967286208321758893081881679526277455683857313393371412869856838050290471088893379976",
  );
  setDefaultDecimalPlaces(62);
  t("-4.1164108161436997126348045561392843107651916760711368190517747487e+21", "-3.2853853366596830198e+19", "125.29461217870220722771385934773794403144281349815098235579055774");
  setDefaultDecimalPlaces(68);
  t(
    "-1.80516377635507002112438607142957146878036363714956628911909096014330803241946418776646038768282894960905618121086240565207919222e+23",
    "5.38568163977648906934643125e+20",
    "-335.17832970720973427834349837600238007792204574261226171829146243831981",
  );
  setDefaultDecimalPlaces(38);
  t(
    "-1.76679481497409383559527169257980042518160824969197546709954768997689134012926415591059373090796371722726594187110196370808060264965825e+24",
    "-2.10455895397512907639935922966654229028034930410984183032422816193313930880127295429889418166964282554776705565814795426990791674e-20",
    "8.395083500212430654630880058888321021601607783420668249635824246183312796754692237e+43",
  );
  setDefaultDecimalPlaces(12);
  t("-4.356295e+1", "-1.3953318938991e+8", "3.12204e-7");
  setDefaultDecimalPlaces(43);
  t(
    "4.521861040612794570570348848099197379738714115252e+3",
    "5.3894645308621183937233255999354970776010929802947767543674424389331813418460351813092137416481717097623438794603894008149279508556964985061e-14",
    "83901861023834610.7828951406983691269367950938301980202197765",
  );
  setDefaultDecimalPlaces(1);
  t(
    "2.97469861802816200200601212522320798199739584350148034835587132110008335060062651955271454536989342656755769647217916e+116",
    "-3.3371650914175350683920438017017623598614064768051759206569644283734799703e+63",
    "-8.91384914003338272656644003248997891291950071147389288e+52",
  );
  setDefaultDecimalPlaces(36);
  t(
    "-9.34339049160143895499787305157954405798401593097507359379000183729848910036e+57",
    "-4.9360351435215210598370008462317167073514912515021663823916151781683525296583167978739944576541700276306760324213979213932224629e+63",
    "0.000001892893834814873998579692679737",
  );
  setDefaultDecimalPlaces(26);
  t(
    "-4.0863094537236238666175824982496542066163902128723056795120515623471686473736853105905030090636864535870279611456297662185131631518810407e-11",
    "4.2391822643232487414156943e-6",
    "-0.00000963938136869887620635",
  );
  setDefaultDecimalPlaces(23);
  t(
    "-5.2745749158239185531123280731949055909182442817632863e+20",
    "-1.746090437918841025409663244237039846466276650047444203969014336850281352321040249651735446987089230435293682067096294e-4",
    "3.02079136411208208144085217747187676342756872309e+24",
  );
  setDefaultDecimalPlaces(100);
  t("-2.541146724436220420948626913617471777035946e-11", "1.2137611437048866857687601365542151945327359439666641896e+45", "-2.09361350675604889988692272342149978980609444e-56");
  setDefaultDecimalPlaces(89);
  t(
    "-5.2328401099310919325429759816900751368192272861476e-15",
    "1.7731156659985470844724035131006232394783377497513015300753074980099237e+3",
    "-2.95121193178571791727877919236856268307052783812814587678009756094964019e-18",
  );
  setDefaultDecimalPlaces(24);
  t(
    "7.27582070759248973370536e+21",
    "-2.54575462948430208067405895090287959514330142797654934981167038469987e-12",
    "-2.858021202564351349626032059379039411364169069948572306906e+33",
  );
  setDefaultDecimalPlaces(26);
  t("7.9530716492322581276137492573888e-10", "1.76699677270971779883691785497554399238861497e+6", "4.5008976654e-16");
  setDefaultDecimalPlaces(40);
  t(
    "-5.0859059710994553617952427320436073648902207422182680757444426828285215400429e-11",
    "1.259147153499196700161329308318898163070818328482234179006548735408701674303845816885316528984519625056141898778565e+114",
    "0",
  );
  setDefaultDecimalPlaces(47);
  t(
    "-1.281338238149945040098463006474135998665552622573527832544025146648403681095084402152861816713607396412808449359700460673e+100",
    "1.586144938272e+3",
    "-8.07831748053162342613107938615992127802637645092185385821879237182833368901974660408697599791754749003556166587049425972018299966740506288490631e+96",
  );
  setDefaultDecimalPlaces(90);
  t(
    "1.90960817328199568214895131687196445001237700651345672879567e+56",
    "-4.431758346342640564716879590333989163306502158664243498940185562744827597234651135543556106624540097300744923664e-10",
    "-4.30891764407218128734271347390134255387931430508098898131514407012663837295862321181666731550070301125174333382140428815935929335598665900507708239334279227e+65",
  );
  setDefaultDecimalPlaces(74);
  t(
    "5.206911742949203966096962780537006648103147068408986849924172845524509043463412853315657914448105742325416867223769703966469920698471292856e-12",
    "-3.4952645974803674787733895914510613498010571170299913012247327045559417598797e+16",
    "-1.4897045982449260404650625085603119472800114941e-28",
  );
  setDefaultDecimalPlaces(85);
  t(
    "1.539738636519016509138063560067257801926115601912087118827174454752137274667858839075068300512606921784337956428398788838361e+13",
    "4.46191923410634013526638298964255333381591492619451446045736227010006752760036765506925688705329570842086958783264116e+19",
    "3.450843808981236681423626725574459265306591533452446800980987278901888853704951e-7",
  );
  setDefaultDecimalPlaces(82);
  t("-2.154243295106001908e+5", "1.079056753205135869996407403995974971339491585253873700823216570470887433941255785514929e+87", "-1e-82");
  setDefaultDecimalPlaces(100);
  t(
    "-6.218753349402714215991909870653243959981085510242516457e-11",
    "5.354044439359571177996788075906852718187948397104488357016993695202918910134252891933511237338832097471347455908415429632487635973988712e+52",
    "-1.1615057401627723450338643285726289034e-63",
  );
  setDefaultDecimalPlaces(88);
  t(
    "-4.4916986293229712741917465633927400887690682982e-15",
    "9.44353464000486772174363526102650071438560425679478829126714374271970481584805464978944075860843744763591069878271271067120845628926008054287285e+7",
    "-4.75637438792796761900674076523051383732745070725704767393238818824e-23",
  );
  setDefaultDecimalPlaces(85);
  t(
    "-2.034520327777730980910944380399864097205674062423744916379126359414984789861233452922426687562984335997368455929147e+114",
    "1.0250211234543347160770415861e+2",
    "-1.98485697633368824743218767759171912597086625940630659612980335083083744491470775935983791813403982764250721402209694235459183646687019326522509491198001783532614509210478059256927707092553536324704e+112",
  );
  setDefaultDecimalPlaces(72);
  t("-8.54659727393539906205455939643468392175847e-1", "-1.544431398257064913908213442467354557277235279145822709962926271483674682286006150848783991423187087267e+94", "0");
  setDefaultDecimalPlaces(76);
  t(
    "-2.98585558380553381843857911438935665929588217608656675762676819817547736396421711028225967834346660903426523325103445879586784957364e+53",
    "-7.09730287693969322603022538319570233623673043665673431279988748253215094909815628335039851802189e+1",
    "4.2070285509542938031067178555946626910210308825077284930275581089191953818561730564766857544094598437862767549166234553927430864e+51",
  );
  setDefaultDecimalPlaces(27);
  t("1.914445932274226159006516751447606854825685968073e+4", "-7.11162504775424221360196417743737370918729299167341520117726182494080688066793218e+22", "-2.69199503e-19");
  setDefaultDecimalPlaces(16);
  t("-3.4832057026185898235838382981504325927354147008635042718703288814640035560518049172222238353137316570587e-5", "-1.3294e+0", "0.0000262013367129");
  setDefaultDecimalPlaces(93);
  t(
    "-1.3995157e-17",
    "2.4055638472586803316565742295774239156659540524458558686145340387853299532624489170731246162958162664e+10",
    "-5.81782812206316064238047105347329259100072148556461454588620125207e-28",
  );
  setDefaultDecimalPlaces(54);
  t(
    "-1.2372711492536712833947434910726335618696221546e+16",
    "1.30700408881063740669220777077374723046142e-3",
    "-9466467319008753028.421776921388084967191294090936663287355862892224688246",
  );
  setDefaultDecimalPlaces(65);
  t(
    "1.9053e+4",
    "-3.100719368990720665331436134819722806538567014749754128482407488386245076897925901734067820957182e-10",
    "-61447031261657.58716472436331244225910755891288298181996354572579615910650055352",
  );
  setDefaultDecimalPlaces(73);
  t(
    "-1.262283249992572058195745997660957374432422129666392875355323757363776509394881439307384358124e+93",
    "-5.4710701131780853934828685624453562193575823335229e-19",
    "2.3071962593791827409293001215695867944214618817531862033601288373608498683496675238351748724337761625447802342545155327546076141466106487921608171864775109768777255020593473270205244521e+111",
  );
  setDefaultDecimalPlaces(34);
  t(
    "1.988514890280826905800210076794420601707188735728969627860115927e+54",
    "-3.03093864259879472494171943732528684441389e-19",
    "-6.5607230127754406471909113386773714263534230710543909769257733192435996698791161928825268684640914869567294e+72",
  );
  setDefaultDecimalPlaces(93);
  t(
    "2.051904936689698040132866365529549583038349047086807029275262988770002206449019882785207449324764423649029019611840094835343e+1",
    "1.07768997780373071874126732554540622687801944759073237655623062557936269361759479219180171885445602236680877246e+110",
    "0",
  );
  setDefaultDecimalPlaces(9);
  t(
    "-5.606949892218465954041565591594698564e+4",
    "-1.8991880610743917181349224606764424344250373743326869249426376255153515402839668551965678657384509380840420151393881823850514028817150880338063e+117",
    "0",
  );
  setDefaultDecimalPlaces(77);
  t(
    "2.847338118642617314458752128555107498581338282794264459461504618550471255741481538e+39",
    "3.56335652650331192445278398670962800885486850419010390115213866967721e+50",
    "7.99060688276590525392657614468169600556291394698804828457497173914e-12",
  );
  setDefaultDecimalPlaces(55);
  t(
    "3.01020352681490924772780202395111243295120881912601201913422751114894776705e+70",
    "-2.3291946902402670381462496296363616671878232402351927124679155705913643500331759229347897025530745586104185850568626798025e+47",
    "-1.292379524746552228811791680831285346449447825365849701558587761799928989663661e+23",
  );
  setDefaultDecimalPlaces(56);
  t(
    "1.854778504321565457190040531892657627295005481194658697442841023576712143398732737102855373144920281e-2",
    "-3.1737090892897733114272683565588771250822398216724614910243190537567535660096200495257962715108996008968284439640142939992920208e+60",
    "0",
  );
  setDefaultDecimalPlaces(18);
  t("-4.5565810638254956193062818053208502787609526680226236954e-12", "9.5401867578399765824884490773369292736958784895866521545651031e+24", "0");
  setDefaultDecimalPlaces(63);
  t(
    "3.0467141142799304443e+19",
    "-2.3946454113448894864467724235709606444941158963175915885294458113937321816515e-16",
    "-1.2723028218899531165090707894502305622115202270248745641082323263566050301088100800735089639560369e+35",
  );
  setDefaultDecimalPlaces(46);
  t("1.23049116173315512e-16", "3.24972219341477251406437984849859393123921828460008907750744164271873711750104871605844416893709805494463585548e+110", "0");
  setDefaultDecimalPlaces(99);
  t(
    "-2.8918066956416990896336453038985752156731761946130953469721774272555691597138271175980795706561338282603552896172914112781e+59",
    "2.01704098948e-20",
    "-1.4336876199958716020101795437205609680782282456311282175283726387584830052800455385607722581323126222086135459080434727061657808982881433991630653810187536139906367888315106229905e+79",
  );
  setDefaultDecimalPlaces(38);
  t("9.5e+1", "1.2725909182162781369673333491324699129221814414155308974278e+58", "0");
  setDefaultDecimalPlaces(97);
  t(
    "2.70453705973213600667368910266448186917879119752453792158186328350234077249034980978296523458622107913258215012699654e+95",
    "2.751112984151174252948247437612363480882131155521760222554344746898994462641868173054458451923171624693e-2",
    "9.8307015208486294245069069620926622922689730299800783321513894454108992634026144338111809366017500961564355757655523493991724169596148576313566119311954634665167357522566288513077446437755699979e+96",
  );
  setDefaultDecimalPlaces(89);
  t(
    "-1.0893600339430157817619616679335696890899927646492415638931536806574151296822481178331510514523905466033145601695318e+84",
    "-1.1420505411970161581985179229725699327417287354265105802141611116454990455345887902620680445117642710392204007369287362927675909e+1",
    "9.538632439167062309536757921068166067417913549982436498396415521708503258370753606845934239843042597711337440362401767891667749281585546340635408636212562165030878808784248e+82",
  );
  setDefaultDecimalPlaces(22);
  t(
    "3.681030785879263614408012330908814411725384473876398855714476784998412340520507e+78",
    "-7.59597163362409679005101946838537853957106425853920978443104376536503614170224034750456771991563447624712801704392e+109",
    "0",
  );
  setDefaultDecimalPlaces(41);
  t(
    "1.7594605388810666579512188914835816604821863095468536347263377702041227521707095921185e+1",
    "-1.42695650846529913720193969787885873203268958170610070716019991532957e+6",
    "-0.00001233016233110971079805817247251251765",
  );
  setDefaultDecimalPlaces(40);
  t(
    "-3.96162371248215904360396266096640830831011117885369285712104260455593267020664023284935626277391109970814358538482415369345182255e-1",
    "-6.195024628573003828218406327513166024401807588908618392887952496927242674019e+27",
    "6.39484739771e-29",
  );
  setDefaultDecimalPlaces(55);
  t("-3.74957183765223206258609150548104540491366508e+19", "1.153183290552953260063e+19", "-3.2514968508209187447037031795702720569091704812443488657");
  setDefaultDecimalPlaces(33);
  t(
    "-1.812897884047251815943483966295291634493184699658852490231178841029752263e+42",
    "1.5580364898638507006910021116196108005484928550390625483791001829979031288680434519690267052028626141895653344e-19",
    "-1.1635785784488733149569930157231743288555136086053158278012030337259812384152680053567363696633e+61",
  );
  setDefaultDecimalPlaces(18);
  t(
    "5.7495671206504513195443358924299622753e-7",
    "4.535213675620368828018162131419762185972179707312269259423452035745416780654618195114362107957584074073181478919064414896700117862743558e+135",
    "0",
  );
  setDefaultDecimalPlaces(11);
  t("1.8452387954106876252830879726e+0", "-1.89678054693601625419473538500743223814864837247166374758481017656e+46", "0");
  setDefaultDecimalPlaces(54);
  t(
    "5.37319690222939735748420540242094467610671829572980323070442551260063197731496318e+63",
    "1.727800125028738562e+11",
    "3.1098486592249926935156640748297189561327597299869431569656197863127830143070434804782701030882142371587413e+52",
  );
  setDefaultDecimalPlaces(42);
  t(
    "-1.39375153375177578835808058139293623710305222476587121868677998035149954675866490798231708978e-1",
    "1.01430935151434166347e+4",
    "-0.000013740892082587380772615059688740105826",
  );
  setDefaultDecimalPlaces(58);
  t(
    "-2.133876958274169500154638394938226276482064e+27",
    "3.48185557004965252717387620488811095744095182356465497184347781875782196535950735824642438786378213375436727714672529384485e+49",
    "-6.12856253036291117151959866860324794e-23",
  );
  setDefaultDecimalPlaces(64);
  t(
    "-2.120379039902172854724961766023538961916712419547e+21",
    "-5.443901327634468786085977539620107758695845468077048910174697694233840613724863696141e-19",
    "3.8949622931970707538201154551199783678069813044580242360956910513661481755986497428423302140352378019776e+39",
  );
  setDefaultDecimalPlaces(27);
  t("-9.069863863692870352898e+4", "-4.6652561769079675542470392148242420992023059326157863750058e+58", "0");
  setDefaultDecimalPlaces(4);
  t(
    "2.291876016567950423267784598028879762858319781953184499007474917976575815372136368531270139206266129359997884761541676365044602e-13",
    "3.3837686104912905310648348593131550273649885639414558698667363312846035659310580840743953208556432139272825191072659e-19",
    "677314.6395",
  );
  setDefaultDecimalPlaces(53);
  t(
    "-3.4362985578107715394961003302224229293772846543575487716745942808901219999174635255878387146609725857625678502435865819818847106330623360218912e+11",
    "9.3898194911758183208477350903233839529996043850846126405106221562830416e-6",
    "-36596002309097307.68048954268724377876636573862903818772741592147029332",
  );
  setDefaultDecimalPlaces(46);
  t("-4.82766705273201957352275070236e+11", "2.7466444112785903748021707301925e-18", "-1.75766001339965678273413452477940680339515080126882129847773330624648550877e+29");
  setDefaultDecimalPlaces(64);
  t(
    "2.00587083616120298184738299020312727945217716173925186557850413217233800004873974133873869216412900734441e+41",
    "3.6441736455252113964732074343781747529791427446074063481929125759761803624820654566826187546442604253653906694995774716515265231352427315862321e-3",
    "5.50432287611835157599036115727946168025840410691494165560527950331858758490084181886069833122072100762591922e+43",
  );
  setDefaultDecimalPlaces(85);
  t(
    "-1.69212254941151166961519635903633233980957730441841549440639584172323746237918908634414374089949325957501e+77",
    "-2.1906515350683700211e-17",
    "7.7242889721331270042201049493140017057377225981481490432309320460776665639927505075436329295280359152089487255834170653357900052474078031566374237506815764439305311417989655844104e+93",
  );
  setDefaultDecimalPlaces(99);
  t(
    "1.3756115002714324944757215710415731046862072779322730602233479893068520422461799522910413266894607868329323161669287463763900535539679e-11",
    "-1.10997093870834489444932069284993788156628178742049972873436202443810953355398769465e+62",
    "-1.23932208700185357607054912e-73",
  );
  setDefaultDecimalPlaces(4);
  t(
    "-3.096005163974196483433013640899654931926462212143026364358081797222099711973937141710906e+87",
    "-7.42390396983455658709719012535912072293436566964570096702469e-20",
    "4.17031951996436138284372879861034773300447939187291250888656760291879188558024808360827594365182344099941208504e+106",
  );
  setDefaultDecimalPlaces(44);
  t(
    "5.608220073549464304009302685850876608691958774563357553446918908989281708819289220991301554234492433151798e+74",
    "3.836976148142292520041e-19",
    "1.46162495074793099975574231172647036212323838538772801570783054520012566629219723345142373849118880820380783180379175212963721684576473731e+93",
  );
  setDefaultDecimalPlaces(90);
  t(
    "-2.3698219769063301554377917725159559623612817429230482234294910003112634905823749433774259524056783181384352633336803252e+111",
    "6.63104179674382059796019160174074127036416208001776547237611625499154177337943094629131774438792747142544660780284884431528949029547884913344372410082e+46",
    "-3.5738305526441312715414164751136922464906640399517249112842573266846224815982342360344837327885990395560392179023670872797387337619996174609825142412224578e+64",
  );
  setDefaultDecimalPlaces(32);
  t(
    "2.25104645101297680365591177986261564015232825019593842236477350989880372752804020196127173424644777989285024337416562099932972283432096819893927668093e+78",
    "-1.804244709455245980773334483901476883117988e-17",
    "-1.2476392139138561087870848745559693060747821259255723633380823888765920591835755218158038704801695738597839710602382059609695339e+95",
  );
  setDefaultDecimalPlaces(67);
  t(
    "-1.6928360045792581780277832601711336764890109522336953128287760345551127926072639998581999710288303077772123e+22",
    "1.641219119817388367804359744704437950333962095682111514183058298079355006183833647746380873090818038499e+64",
    "-1.0314503311219119885239267e-42",
  );
  setDefaultDecimalPlaces(30);
  t(
    "4e+0",
    "-4.07478540248564741763544295889943267200168816977259322906395365347853093523686524335712607526878401328129222917328597315727797005534114907714812e-7",
    "-9816467.874749851115307016576095093069",
  );
  setDefaultDecimalPlaces(47);
  t(
    "3.45234297556494489912782793707176215230082033971850320499773409506483203365884428924625628073054901801268251061007260424726999233448e-20",
    "-1.121445667171010145106579478272763785880925690553286304e+31",
    "0",
  );
  setDefaultDecimalPlaces(9);
  t(
    "2.16929940967608358060924351578642652677903634065643663575421702635715203990671630398326208e+47",
    "4.0557878070934270647641599731418605444280091569619928535107918951765126452337741746e+68",
    "0",
  );
  setDefaultDecimalPlaces(65);
  t(
    "3.022218852258680121768791672989166329643609234159956867346597744832633513529664899267622171389219462954090359162719259484109e+88",
    "-6.25006395563413117197401580395e-18",
    "-4.83550068241189053606554837169700740913609486559123484050215932168175530635271252636397555387228395260778661342393402376479992687996816401502909184543474546981397937945907e+105",
  );
  setDefaultDecimalPlaces(71);
  t(
    "4.68551811712438580322905618436984689972309976919698501928219295636863e+56",
    "-1.03195355103037731680667111307744281238120185453036488161480022183063759389046973e+23",
    "-4.54043509268999992808618663926499833709642252525272578598094691911367975411056640991554643998794756310931e+33",
  );
  setDefaultDecimalPlaces(0);
  t(
    "-1.484014635163584742203281076737767317953833451135631586496778567090979703188e+16",
    "6.9730388217365868139319815588203003884859361165756949200667634061462858048056875185592469187462468840164672601267240037577236291e+42",
    "0",
  );
  setDefaultDecimalPlaces(25);
  t(
    "8.72298791241670405855798625795499496542925757616083017379560562969890567515883893337617073029934831877466266571672e+30",
    "-3e+0",
    "-2.9076626374722346861859954193183316551430858587202767245e+30",
  );
  setDefaultDecimalPlaces(2);
  t(
    "1.5974330916715656734145091328424548240125411119565079907729698030874e+67",
    "-8.597781258450038611287776086598264379574180970625938875283927509469866438775e+44",
    "-1.857959680122802112334682e+22",
  );
  setDefaultDecimalPlaces(56);
  t(
    "1.601797945305519475099342355853986394909002988864051235087868082663434824484000400685228187e+85",
    "5.4154409956919460231004934727251403605322249390246e+16",
    "2.9578347295811562568546126218378474671155878516589337078868246249136727156735359424155537099385594405533557916184906284496978e+68",
  );
  setDefaultDecimalPlaces(45);
  t(
    "-1.46500286482905083024734050639199143464272549576445519085720335452e+53",
    "1.9551263639e+2",
    "-7.49313646360293362032209720944263430093642703686552845862938114984313009600657863646948288179645e+50",
  );
  setDefaultDecimalPlaces(43);
  t(
    "3.724605321560383951537343456883559340678476902514931033439534214e+63",
    "-2.0270580969583909977522372379510526947880568500177673747234469073997020563077293149549444963454040993566796589027608602921848822613472815347e+112",
    "0",
  );
  setDefaultDecimalPlaces(4);
  t(
    "8.5608266167420876334268041879012862133797075797393989864607008272689049246278902346e+63",
    "4.058246545201674612565241261344259733469809008486614999972533023163180546073388974626666926303249263747883496226764399883002485073513e-8",
    "2.109489041976540941815934776697931969077386887415271167329479057016557593974e+71",
  );
  setDefaultDecimalPlaces(32);
  t(
    "-7.522776889604655788884641207393023992632775054708398717130408189114360990589156415244297686378003426148434080171956586220663256426436e-6",
    "2.5364904381873796409e+14",
    "-2.96582111107e-20",
  );
  setDefaultDecimalPlaces(11);
  t("-1.443637488781137186662284e+0", "-5.882374435850316128806144915408614592229392076972407020125227454234373495999006157002008801858706260266991527622852991e+117", "0");
  setDefaultDecimalPlaces(68);
  t(
    "-9.90576341826097330566799244304986906378769801551390678969729935325055718458647537835304297458318666195637240730868318116312528152766625e+96",
    "-7.2e+1",
    "1.3758004747584685146761100615347040366371802799324870541246249101736884978592326914379226353587759252717183899039837751615451779899536458333333333333333333333333333e+95",
  );
  setDefaultDecimalPlaces(66);
  t(
    "1.81056084792898555186879568646022888198014532834893368691077976888863118871603984906902457723350719433316056577034994329743458426914277179763261e-14",
    "1.718578408074827220673577978000815434468925016e-9",
    "0.000010535223993400441923909129302527796765661187994993143213525261",
  );
  setDefaultDecimalPlaces(98);
  t(
    "1.91792756061282371286956583360441582906745295472893276999732697019978310265577575274215162282670675735596900568722032913216e+6",
    "-3.49717867235852718205373898157754200880415049519418064095356622926032e+13",
    "-5.484213820048710797471494726549914063434073356863525403375253404217811798565367173305697076e-8",
  );
  setDefaultDecimalPlaces(36);
  t(
    "7.23334409650744004927159257732831968056814080079780918622974998042796005234593133895176027226701209224791611246665546718072817539025835835204096e-19",
    "-1.507227117952751984448643705626e+25",
    "0",
  );
  setDefaultDecimalPlaces(17);
  t(
    "-2.45317203712324292940842732642435914866527867995185965502495981367757126062927481613738145189356259364355290697e+32",
    "8.996859315563838307219515357742452023272453923380969811437986111916029637308336415954306246062e+40",
    "-2.72669822e-9",
  );
  setDefaultDecimalPlaces(79);
  t(
    "5.381879869810126386385394232528403420566504915132883e-17",
    "3.07883225086914856499902265170266896032114571604e-7",
    "1.748026339626276099231688298430064672766389613286503456974790469932899e-10",
  );
  setDefaultDecimalPlaces(34);
  t(
    "5.337750338508089450629862251859607001271023243282669598886986180278046682701703046931368870677434288310432150603e+34",
    "-2.25232254507010724234e-17",
    "-2.3698871860921425866897939051463480163132111478895759273227459085711903256268560432273e+51",
  );
  setDefaultDecimalPlaces(41);
  t("5e+0", "-2.2256710161555233559335033470341402904299219775307233637019451791382491766852406485395e-4", "-22465.13507030643148851002699903253639888883231");
  setDefaultDecimalPlaces(29);
  t(
    "-5.70954268189585128177469631158342047301144552851467584891122595606179337155264365611020954330172754066720184325166877317822125385e-13",
    "-6.3942599572657178558592066997657426716676063313429969939726111711105141799225986490384737530821826870360491225395856187690570451762e+130",
    "0",
  );
  setDefaultDecimalPlaces(19);
  t(
    "4.70618794232665823596876301393733427479969102530496342346549935878321505056935263964820593061151992637999877886955693625507e+98",
    "-1.44101916901e+11",
    "-3.2658746278579167809045181730877371091160090280615853023290931015782511908788981055805906143055020111512088e+87",
  );
  setDefaultDecimalPlaces(4);
  t("-1.754999160802652572869373e+13", "1.972801162657506425930468014665798143121337773977899748115173662098154e+5", "-88959759.0483");
  setDefaultDecimalPlaces(18);
  t("-1.56609892220583134863219571485471662926309110314e+24", "-1.630090143121515631671676362549536694107623826659264100686543853108090980466877241794949686601e+46", "0");
  setDefaultDecimalPlaces(77);
  t(
    "5.7047904074728494401239174330428824724090532997127034920957082335242887519325900714113177948201501060957611e+3",
    "4.224144135807694844181070221072892923121364433163142627179841986817149e-10",
    "13505198269902.41074929510840393908776736697249735199925249655520402520003540404799143150034",
  );
  setDefaultDecimalPlaces(18);
  t(
    "-5.3634673959877624427892370050939904905358724838843995374045930990563921422119319258823643039524353476203302148691485686e+48",
    "4.758130112111224944030106308167017306481072420335259415548347602345996285278809112007335545846495392906861275318014179253288769833576024428466e+24",
    "-1.127221675240810916910683913054513307025893e+24",
  );
  setDefaultDecimalPlaces(44);
  t(
    "4.34016311983396212325351403225348112868330671049112047365312861030389129346887796000456210661230596630229421735815710610494663559687e-4",
    "1.864937958778801802023602336430513281e+5",
    "2.32724262992426119589033102079662395e-9",
  );
  setDefaultDecimalPlaces(47);
  t("-2.1024513916094e+12", "-2.275593328722595924166774561018107549409833623586049196286975438672681890067089189412931311582e+37", "9.23913497667709751829e-26");
  setDefaultDecimalPlaces(29);
  t(
    "-2.4972558786118165597693671428677396537087373474225503136062040167992669043076314e+25",
    "-1.2198310338285107502552267238020474e+6",
    "20472145808375062642.51800953612764339026731277918",
  );
  setDefaultDecimalPlaces(44);
  t(
    "1.85146968713457905193464801963e+25",
    "5.7674105828350134821015958476318874832114030502015226351415419237465140679289761971314446698224977378725569062375037163632919e+104",
    "0",
  );
  setDefaultDecimalPlaces(84);
  t(
    "1.07923489633298938624099415286971064736351784457776375954040075033360148585202094141776372153470935053718082173876664463847538e+76",
    "2.62913283060838768554260833245316726337612902330013692954599047519033241286374810100092562188443340958860836145768324279282987e-7",
    "4.1049082182859959388670721472573528162892462262449093777711574048104366044738003164458352043201664568303771125196546012263414172849982715397356885221001873259391076167e+82",
  );
  setDefaultDecimalPlaces(25);
  t("-3.2558391453528327436350739828563858139346588192464577029928961878958803e+3", "1.833891231387405635049978017265e-10", "-17753720011462.5752637183409131732247387");
  setDefaultDecimalPlaces(16);
  t(
    "1.083492420768684462602534700578667821299927675897795391154111098402734223606715987580393658821937390406491554063733e-13",
    "-3.18311555551327181584918952866420821313772589616801087482257796089037088789316836819750012656824029885e+2",
    "-3e-16",
  );
  setDefaultDecimalPlaces(46);
  t(
    "5.7943952109614593164235703295997165993972349467297370209218484943173881135815199e+79",
    "-6.530652301314645811750674581306690206943870680218634270715766978686569325083873872706072136716609685338723387014214100590564668993959530074904329722e+147",
    "0",
  );
  setDefaultDecimalPlaces(18);
  t("-9.411978051737582990018185038982096699989352286876449e-2", "2.91407203529280037256741524066970621637628758304357162037e+56", "0");
  setDefaultDecimalPlaces(26);
  t(
    "-1.304297842929292699813583241167990998206589112924388873056568413686426965508139280384994782908969264750574554912282918761333808733257699159928e+76",
    "7.5368218725744927429846e+18",
    "-1.73056742613947352298167291822773266954535024894996947677121401075107293772953509407e+57",
  );
  setDefaultDecimalPlaces(97);
  t(
    "2.05959369080608835523967897901599906625287690491633539869603611706847555091018405083823912393145148751741665707742664765768156747451e+86",
    "3.6189272973464355805480198216334281121585649289e+12",
    "5.69117177987045346073965684780537189891536106370642943872812772320158222257540266795625209443044515397993472607828586323956380637449866453426100431551304598700236290389738e+73",
  );
  setDefaultDecimalPlaces(45);
  t(
    "-3.08364885214740069211553800968311913816860869081712969442897725664855137502268569979803834787698306114945825770020601335451e+122",
    "2.84946656899355883041155811733709998011050166718788752534840445717869406295e-6",
    "-1.08218460455093383714636291622579650883286503328128920498730580431217484728388583992088559766906864530068255524680592158188056555108836162476573624553502664700551844912225039e+128",
  );
  setDefaultDecimalPlaces(95);
  t(
    "2.40788317844077413667392813584295573817807501350225436295064103165928410730928354664933854615077655857e-5",
    "1.059431380267341721135622228e+25",
    "2.27280711454210273709558716153995717202248254441097065308853213052e-30",
  );
  setDefaultDecimalPlaces(81);
  t(
    "-2.72523674767053800819385521289852064862843359218614650078633555448229218420679572124815088359398030306865119506541109365e-19",
    "-7.707022043984360798805064893895844740490915487538674961782542e+45",
    "3.536043795018978e-65",
  );
  setDefaultDecimalPlaces(62);
  t(
    "-2.284911416245003908694563343189552930652935842013370784045743355183093202875697022849943440512922432664233003604e+96",
    "2.7099043065883182686571e+16",
    "-8.43170517383188840073002358448734758665124314639707888391159366314950962150866706909781820013670049847688337384099401402062270066081896910082e+79",
  );
  setDefaultDecimalPlaces(37);
  t("6.384608768186173842469649409606405017501265985025820295331806305999358700477277266806535e-16", "-3.1839014546505e+0", "-2.005278385378613622374e-16");
  setDefaultDecimalPlaces(88);
  t(
    "-3.03271223676726549559663320562365741910690615344237122240200022257122490175858312642287633039406e+48",
    "1.4227528584967834959369942670243566375430044553765653899e+7",
    "-2.131580491056958739476496134463850752858250221880543137897380422216573068435440060007751159184663335639708086710427477269724371286e+41",
  );
  setDefaultDecimalPlaces(91);
  t("-1.7126232988514774704251876657091345586e+1", "-8.9043728986e+10", "1.923350828131587555552182595010638112316128781763236835518033119404202666216492767e-10");
  setDefaultDecimalPlaces(17);
  t(
    "1.910716634835053e+1",
    "-5.054178943249455012173486610342811290130972949558419578935155373050352475822793531087276687617783039337881375374333956549839268610774111157618080439e-2",
    "-378.04689075899766935",
  );
  setDefaultDecimalPlaces(24);
  t("-1.0881e+3", "-9.21563377123478519593947710629236903137210213803452058414917860940208164373650625456628469328e+11", "1.180710982023114e-9");
  setDefaultDecimalPlaces(42);
  t(
    "1.5005147615052622627616500282224443967473921432557928387241968875115500906518438985844653651261309312931760194192387074843711412418116482546e+66",
    "1.056094058552774298226946389908457903913491945335545601275935935446578032831e+58",
    "142081545.611714065348571335227860346695238001955425",
  );
  setDefaultDecimalPlaces(51);
  t(
    "-3.195918960786796896052069861366893119130580565972214110345307e+20",
    "5.425949480073359619104405490114e+6",
    "-58900639833152.070022966962187958797814151502176945016441901634428",
  );
  setDefaultDecimalPlaces(34);
  t(
    "2.988952179637781394894791390174044257762779832109577809706088943750847076883548e+54",
    "-7.2736164057228955139121113103690646124103674333037810616315955699202169970744011678976926177700575586955425036114857e-12",
    "-4.109306860458118213650074643366924588059205551335986620668948519717017276187517014282506508801453796e+65",
  );
  setDefaultDecimalPlaces(58);
  t(
    "1.35672110413015619191578119275305041620055016412e+28",
    "-7.96805675152946481473077371983875100085668042317525653658557924526655035322751905783e+48",
    "-1.7027001017151819386258677958956189235e-21",
  );
  setDefaultDecimalPlaces(17);
  t(
    "1.9134031237732244754998193028051218171404146099310336459848218706250359222403264206332432271451324294393457907458114135680305943929201025689e-1",
    "-2.656084763922696227381588776109988869781460195533160927567814992183555745801234e+8",
    "-7.2038481e-10",
  );
  setDefaultDecimalPlaces(66);
  t(
    "5.670906262526725496624441326283345304596345850098151879436873679714e+64",
    "-2.3215326317247878554954356334807573799162550448009369341183045362609e-14",
    "-2.442742430164986747988317051480786388020868673237126454955409070441730538564147215516775694778005136676390773043573458903863045926384672880070415e+78",
  );
  setDefaultDecimalPlaces(2);
  t(
    "-3.12493468992922075319847703823296571327708656277469431337020339048581026678847610895858969032079628067241780585990456994e+109",
    "-3.340100338755846590833017202219584042757797581139884752193452977e+59",
    "9.355810823016254494606529856805886729429990451449932e+49",
  );
  setDefaultDecimalPlaces(62);
  t(
    "-1.71038037780216256033207512190143469049374420435408714158360719348978509357672462336031691786025e-18",
    "-1.5358494667793361399321365950815715891636429254069554954440023561596639939865898963749446434024627746449373027101887746010904123543973650322e+44",
    "1e-62",
  );
  setDefaultDecimalPlaces(54);
  t(
    "2.8491566844714109539497988952159541774594139498969940984e+52",
    "-6.2338071329676389681e+14",
    "-4.5704921947353444666172222506103687293746005336819256546158913416230089905082079464642017365e+37",
  );
  setDefaultDecimalPlaces(94);
  t("-3.663371524771149e+1", "1.611806398e+0", "-22.7283594935273919914046649664682619034994052679024047402993371167893825422077769913406188129549");
  setDefaultDecimalPlaces(31);
  t(
    "-1.8879273673809129229900293906557188565606717953466466348287366309e+53",
    "-6.62076878081349852792437927467475921818605035293033685472636754003909303646322599070082966733556474346498e+87",
    "0",
  );
  setDefaultDecimalPlaces(92);
  t(
    "3.5365515702755020277229409015345365951191644479482057609922095232764844508095839696031339407901169860408644505354380780125356234139128207823807e+48",
    "6.0270749884579344095976659407473887367028765238219092479110467737031524576475075558642590552259720674437e+100",
    "5.867774296898786904379345952850140591511e-53",
  );
  setDefaultDecimalPlaces(53);
  t(
    "-9.004076314945331014155342140912810290755320716423562009936000596870667456132488444131430154986601749286e+85",
    "1.89330261421041559e+17",
    "-4.7557512715421871827936654477966316943428559901865272048242512303511359263300147067892357411327525400894336936425331299871e+68",
  );
  setDefaultDecimalPlaces(27);
  t(
    "5.726889690408203424909546742782795892382573611082114651645160395609164844496148257476975402570494288640968292518629505599e+26",
    "-7.5830665385749876058179206325399147277906810870195307291922963547581243470958362008987115729374893672628753122877002724473524735330519e+132",
    "0",
  );
  setDefaultDecimalPlaces(30);
  t("2.4494482974143617509972816070907351133362365e+20", "1.030848738574013763986600115709938917e+6", "237614715501589.000224449923517854897969947396");
  setDefaultDecimalPlaces(54);
  t(
    "-2.74525662114018554813504686188073970896570353190846136975960202333156245988662104267209428521769521406213979792773869341307038846034913775488376e+22",
    "3.88995589554722281469810761797216757538032670204038734882146643e+4",
    "-705729497931491139.917280209251701775865450874918039343077656095849176646",
  );
  setDefaultDecimalPlaces(15);
  t(
    "-4.249021577391124170488378917790297744720495135032192356524313130989109963605251932609070080588463190365e+29",
    "5.5588481809125760167094189688916630155346880270178256035465371119799269078388622787029670211e+11",
    "-764370862291399664.325739795987481",
  );
  setDefaultDecimalPlaces(81);
  t("-6.5e+1", "4.6283307172537745583881365761118274297993191523684691e+34", "-1.404394023912099046914060213550640504534002231415e-33");
  setDefaultDecimalPlaces(84);
  t(
    "5.74445466692224594977280422772411385315632941917557656368185572252922539618584381409815901e+34",
    "3.390573857931037205787733944577198965715219616370681016738640570462116032705193103335903839622854898925194921e-17",
    "1.694242599519000259309227451497083209737465853525410784413292911211941528074007787175777814639818446479462526547969304778578389954504559e+51",
  );
  setDefaultDecimalPlaces(18);
  t("6.194393995593107729192502267241705573207368539692099890433567403329852265222898821299231454023668e-12", "-3.3105726352756398085558119348909213e+22", "0");
  setDefaultDecimalPlaces(26);
  t("9.09954836355707904299021716882091496e-7", "1.64000392323428804348337991108664006035651048511379696625256199645480615340459508204650979048577762532371835e+17", "5.54e-24");
  setDefaultDecimalPlaces(83);
  t(
    "-2.180211476643707370905928371492501941452128410839491153603404546278738262927959808266233345315390563599517857164425785951639043311636699277e+105",
    "9.94041e+2",
    "-2.19328123955018693485070371492976843153564934528806271934799927395221953916182512418122929065842411288821875271183561437771585207414653849992102941427969268873215491111533628894582819018e+102",
  );
  setDefaultDecimalPlaces(74);
  t(
    "-1.6751071513107361080211028396771069486848729e+26",
    "5.79367866840012127311105825986759606031704804089787703226896876449687761234653402172768e-19",
    "-2.8912669258775163532982151984633295968208483123426470019678151698871798132138431934371129697017591722952216907925341391e+44",
  );
  setDefaultDecimalPlaces(82);
  t(
    "6.485254813149179362045173918682378045934736952950450310881298740022879253150270474587812482559262568716598697166535581530764e-7",
    "-6.0503752021006708286114214503143748e+14",
    "-1.0718764698919035186228225346986249825975877219566871506660439e-21",
  );
  setDefaultDecimalPlaces(31);
  t(
    "3.30692844840278495578396079975899328463808863867144934743387945574639880499e+74",
    "-2.5908011700223075568483919798974647310913403185641343610399526044223513384604649e+79",
    "-0.0000127641151573754744496070429",
  );
  setDefaultDecimalPlaces(98);
  t(
    "2.27033784503408668103952971026999796058245839095148984617685288854319627128485277430590732041676488653620524182e+1",
    "5.3229389166300934611081093559340569050609884017794150188188e+5",
    "0.00004265196126788202771208057950672939209007087708309061784412385835123654302312853174133657582165",
  );
  setDefaultDecimalPlaces(73);
  t("5.16699260670305466843358060006659907475496588295670841819e-8", "-1.0240256935443472236411216695648732135002298062701928874878460874137e+45", "-5.04576461242794882736e-53");
  setDefaultDecimalPlaces(10);
  t("5.71749828921885538733001349e+23", "-9.291247225986476471304650469991645692887061941148787806324421215712638414666225712455244408e+20", "-615.3639172605");
  setDefaultDecimalPlaces(39);
  t(
    "2.014957622637377149795416081789022408139436049489444357463888532903432851262453139966079874220861243398116471881080129e+71",
    "2.414021809011545291424785452441949437282e+30",
    "8.346890716212831121172628774412391801994363641400345748572974284965422170861869e+40",
  );
  setDefaultDecimalPlaces(38);
  t(
    "2.58198244301950329915695461792769792428819798966517613282053617961544674790832984727953853929887732730437205592769442251876316721553e-20",
    "-3.936849958465076720262749812246548256817980316841491819e-14",
    "-6.5584984702495050061995897298793e-7",
  );
  setDefaultDecimalPlaces(31);
  t(
    "4.17406335343671142429409037718619260366305431554198156277432521886668286533721470555841713e+55",
    "1.6555196387174e-15",
    "2.52130101982392193928925703141679048407920415273476840726090037688680859668462490222472807969432258442e+70",
  );
  setDefaultDecimalPlaces(33);
  t("2.4e+0", "-4.72363359470760744697523756009781522959883067873e+47", "0");
  setDefaultDecimalPlaces(7);
  t("4.12807e+1", "2.67639135025626735482702634852293658610206471502503774537265006825261737794693211374e+76", "0");
  setDefaultDecimalPlaces(48);
  t(
    "-1.73529466454245931465430948648631085593794745569701367737079966641694587640669401572129932691784047921579027648325350285714334476303020273e+54",
    "1.130966123183185045448713774383685184511590989939145926524692345575995361304902590923604571430692019736165e+52",
    "-153.434716475710905051059017749690160338939534825125",
  );
  setDefaultDecimalPlaces(49);
  t(
    "4.42684086884462454674955988554846e+25",
    "2.57476866709818654427445256554811943519574360558922957382174606181975899939826118446363417421199719110531589811644266300062715556139e-7",
    "1.719315962405958101510878086851503710553561758974367621953934952041844602891927755e+32",
  );
  setDefaultDecimalPlaces(47);
  t("5.0049640351310778301587706717655618047e+12", "6.10466548838590041878467467384692686422903732986642089e+53", "8.19858e-42");
  setDefaultDecimalPlaces(87);
  t("-3.4621686497463754528010314095645133634372230775e+4", "-8.8091066713524570237e+19", "3.93021537700919985984463941627819969002973958663939255422452715752363061e-16");
  setDefaultDecimalPlaces(37);
  t("6.327616115213503191e+18", "2.528766431394573289706049546809936243372746e+1", "250225407797901148.5767165978063268867748397581467468");
  setDefaultDecimalPlaces(29);
  t(
    "-7.23529495745877973822647923797228487415131884796731920256185033390089849775479552607466795516675768017570699437993790674743736997e+14",
    "-1.621680855208013490481233492723027096e+36",
    "4.4616022e-22",
  );
  setDefaultDecimalPlaces(87);
  t(
    "2.7476591639997396210342421061587470342e+30",
    "3.64384306908920845997765060099997063195764796512330880186190895230914159290291151130780014740989e-17",
    "7.5405529598905773001089327974336102163780140530886438384825919589924638261582107384614659188191262820413905732940535033034016745671518e+46",
  );
  setDefaultDecimalPlaces(12);
  t("3.6e+0", "-1.246674829069212936823954784775478884675492504711854657062135662200905190433804406058975264700277278374428923529697676054837484844637e+80", "0");
  setDefaultDecimalPlaces(88);
  t(
    "2.2904034730267190028124758480806542759972895095131336927952e+27",
    "-5.319068599187035882620465117788441914746220348104056319669852670437918987577671608909406920971794341600533965e+39",
    "-4.306023564683454670015559065650628485592326055549572585899383394944230940385e-13",
  );
  setDefaultDecimalPlaces(3);
  t(
    "-1.0290362082627360745970246458934152284077578033068930427455214229192637535e-18",
    "1.2674878156062255035060499805558927695281638022733930387473868879587059784128427822892037545611511416439433766367731e+30",
    "0",
  );
  setDefaultDecimalPlaces(73);
  t("-1.2835294256957125e+14", "9.6078437055578791429400806626709290892249960609970070196845785872864843404470764303984853250378142382545669226769013556e+115", "0");
  setDefaultDecimalPlaces(24);
  t("-3.739879481315871453750261555335466508798010409940334870212611731799781980322253552683587822378e-1", "1.3343943974066320259992236115659744e+15", "-2.80267924e-16");
  setDefaultDecimalPlaces(94);
  t(
    "-1.017922480401104538435200347348796609448553244375804472499076751491680115941915218403141351700672052139942820182475212e-10",
    "2.94329361697592462298106151540923053037187539389687210955985416949271081951875460358451169466125016306278257538563914378893154e-18",
    "-34584469.4029189300495789612950215634181069766991089848496747274434352085569529125162165819958566163179",
  );
  setDefaultDecimalPlaces(77);
  t(
    "2.498269511939827580009769864829063492873613700787156911810002001925521353680394815095215155574059421036366589974359154340573788168223149214323175985809e+150",
    "-6.13378616715112723167139956901781747798916945694427650752699378270747011699371080526606928584629246388603e+19",
    "-4.072964795087017891786433451358906249794388574267871365381440370636796200054986233638492142550164104236181475548091903615641316443059702646711306808817132138402573155405191622054362405912028759187809135163487e+130",
  );
  setDefaultDecimalPlaces(84);
  t(
    "-2.5786633552294088253034448882533388059533614251200643845212927822220440762463754679169743596514562671e+100",
    "2.343573741835170514847933351977483527405131069717367865739173e-5",
    "-1.100312445560235654497083835750082295339857925896243549159335855349852128007695419629068052700706279491997983431326960262080852620803236465951779710361685463192886962840407745547008238872279e+105",
  );
  setDefaultDecimalPlaces(50);
  t(
    "-1.698058577145517193023605384085125636655759310131741892929553609172698325455011242459235042010382712855873837309393339e+60",
    "-2.1427753293851076659820576145156188676566846332077987243965378890256158607922521059947547149836444971375880517995960275447068990121701348e+134",
    "0",
  );
  setDefaultDecimalPlaces(38);
  t(
    "-1.85850106534068635803263e+24",
    "1.443049654951589273309472639210725334774171949446419268345443258e-16",
    "-1.287898208466731136987751646041694551029879065029812911110069781228281656529808e+40",
  );
  setDefaultDecimalPlaces(69);
  t(
    "-5.216950173954210318113119550979673402204054294418e+42",
    "-1.97306153393918962368976435158824699717464289323963478966817846183273078550508876131934875490601447612968447612338534596050057713091623839e+5",
    "2.6440889370229840796091553520390045212810421432355313467830188538989124782446395973276993739252002179584469e+37",
  );
  setDefaultDecimalPlaces(60);
  t(
    "4.42599e+3",
    "-6.9534908925426278059888236441440611527024784688429385996508527610375632366570893740936071811533534424504098531883e+29",
    "-6.365133813214190286755654114862457e-27",
  );
  setDefaultDecimalPlaces(0);
  t("-7.4834422607037552e+11", "8.514631e+6", "-87889");
  setDefaultDecimalPlaces(69);
  t(
    "-6.5884126236491430654860241405249958042223491016993101371579024709346876702199557005492667916163520377335e+14",
    "5.0316702120835e+13",
    "-13.093888005273365281997125332307688625793386757983206546702712829283732",
  );
  setDefaultDecimalPlaces(63);
  t(
    "-1.087476865981219732545332170180529646031688910601980719966231358975374063155910666274146994749386524558614311219689813591056715321581728094028876406e-19",
    "2.194309538595751417475949108731984677253244345012500817551097144652832962619774519918309855509718700192284465513000597536459e+8",
    "-4.95589545072638497815273596511212428e-28",
  );
  setDefaultDecimalPlaces(37);
  t(
    "1.0598736971699237761799703158288492579455972591692183918758933140753296492681037881627162361150701e+41",
    "-3.904461160356812452627756130210455885170879472901307119159024301317701331848377430816970372692865479800657635976521e-6",
    "-2.71451975993805591052407796031521390275295097733112507084415377595184385375215503601e+46",
  );
  setDefaultDecimalPlaces(7);
  t(
    "-6.0283180732770899360987032187508286567601046525127682090738781900169890005758561236882e+85",
    "-1.4327238646171593321263371129182263152361359992598479489352916089665628108046673050049795062336097358135165e+106",
    "0",
  );
  setDefaultDecimalPlaces(10);
  t("-1.028969029626971874e+6", "2.07388048676211499280036234835733692934003734672766199513079548601088418992692817583096799616973248394346443e+107", "0");
  setDefaultDecimalPlaces(19);
  t("-6.982821140853159741592349e-2", "-1.3508e+4", "0.0000051693967581086");
  setDefaultDecimalPlaces(48);
  t(
    "-3.075072053728649062758744192334769534307625676156977513424988642324928158619516862287379024618576694910818e+44",
    "-1.088919494187101711315677313283095104342916301906e+7",
    "2.8239663906689874342231401780249282280850287831725443610613663393247641702974973951179e+37",
  );
  setDefaultDecimalPlaces(94);
  t("-1.24299097e-15", "3.2400601760998933693239897983783355502541943505293013334131999399234820676008838427465564288657635644485e+103", "0");
  setDefaultDecimalPlaces(32);
  t(
    "2.26613115756258395205252646952841932536455501212337718414861291033681279869351509541689270577763188879e+40",
    "2.23125978153219357596642046082558051267626583968760247466748798809011376273494199073049964569865704285561299547967672119431066967533374184e+49",
    "1.01562855939905141738953e-9",
  );
  setDefaultDecimalPlaces(58);
  t("2.36e+1", "2.0634718876059581626494927697117715185314809066444735954092136172956872127616062462198332749379e+47", "1.143703490304e-46");
  setDefaultDecimalPlaces(66);
  t(
    "-6.151054865906584744115849450513872898956056517039359896785044053306143464621352902017427417733e+55",
    "8.84327637083387309639929065226133618157132624806397906227901453538190030993531640361482399657530095100654901766882872301552192113748568546445681e+32",
    "-6.9556288958620135985144675556752760312366675132001081245832741800276408361175003294916086e+22",
  );
  setDefaultDecimalPlaces(44);
  t(
    "6.7142660114654814161484250912904360432928082435839287355e-2",
    "-8.43280334348029450236517443533903160347292189192377663875394905508211184945965892107519652246665350546e+101",
    "0",
  );
  setDefaultDecimalPlaces(69);
  t("-7.5526651776167783e+7", "1.945891956333025822980132339698615124570034877731625284872024327811657960960360166172599541958018833758938591040581798e+74", "-3.88e-67");
  setDefaultDecimalPlaces(8);
  t("-1e+0", "4.3340211258261860324132623379106498619449428921331999470098446153448102e+24", "0");
  setDefaultDecimalPlaces(63);
  t(
    "1.36278345647241813239680669595213964255554351662061532339947448217184733172564970786427026055956538961624076757047275830432228270057911e+129",
    "1.0013126849356546145905544983214367399665507373750429815309460840705507026435637611763524300435744703253038909784766538e+30",
    "1.360996896349107973433342852255892410060214041604651951663056950729243021467916636988993640607853109393820117087966369631383334154204772697741013053179714939939596e+99",
  );
  setDefaultDecimalPlaces(3);
  t("1.796284e-10", "2.2807304476776566918614784037338171922145562526657284450814375361644257054595562320592645470077007964624332496622356598036907568805641906e-12", "78.759");
  setDefaultDecimalPlaces(23);
  t(
    "-4.0982561945298436202068556461622070220462416821739187919051555774160736909356050712633502431085157368749698974456998977144094518958838831209e+118",
    "-5.72779695845772557586012771349467620823650224254994e+48",
    "7.15503050169806590853355991845554971139806970406343667301277946118045560969951218364742681576e+69",
  );
  setDefaultDecimalPlaces(3);
  t("-5.28108575873764652394945153303e+9", "5.621650715770879028810366991284110969280534392324994952467426893530707777297207806946858600699630429009339497e+27", "0");
  setDefaultDecimalPlaces(94);
  t("4.7063863910078346245e+7", "4.3049424103647165493733643253670723674858409803696808992513981187505841734377835879440312855419983000252982e+88", "1.0932518817618e-81");
  setDefaultDecimalPlaces(75);
  t(
    "-1.63525629344001883475597728117076302576802742612636470469572611711758384341773992360512442662e+23",
    "2.60528801641833893219969745247428641460222429232854422487869450579100549578359974371099072401894200527700670401154e+30",
    "-6.2766814384235083115862385664540306810123800574304544086519328964514e-8",
  );
  setDefaultDecimalPlaces(16);
  t(
    "-1.8307309416932377162288816889088776033761557388497268942372161904484065491543360689788259981083171866129361440699e+58",
    "-7.4437365811017614790403190396621383722699686157748614155877623886979774333846999025015660087312874468629448975391310386240035290858907062387e+102",
    "0",
  );
  setDefaultDecimalPlaces(67);
  t("-1.9311479420785e+13", "5.5588515980072694169304153868526181867867862379821099017699107155371364526952586551194834e+88", "0");
  setDefaultDecimalPlaces(8);
  t("1.316e+0", "-3.5959356571904145e-2", "-36.59687284");
  setDefaultDecimalPlaces(24);
  t("-1.1408301709719e+4", "3.21125946333044408027679845081942598667339325754585815195416375452337212812036456e+49", "0");
  setDefaultDecimalPlaces(26);
  t(
    "3.4442474727619542051377e+1",
    "-2.505520077353393183918907551335020570673950171496407900111077812527466042849906385157645816423546922565588562573705286101e+0",
    "-13.74663689145188768412718788",
  );
  setDefaultDecimalPlaces(49);
  t(
    "-3.7711450899097756377242279770502186492254712495677178558e+55",
    "3.23541701313625642411363010515409e+3",
    "-1.16558238848296417407128075962864383063877114299253116165992712336995826093534052833227069481055396195e+52",
  );
  setDefaultDecimalPlaces(54);
  t(
    "-2.328356454166485523622449359435835515999243420625428468999864913096501599605219639915643107315889314e-5",
    "6.63135480198852111133176248977269402668103990300829955593475091208141375019408805279e-8",
    "-351.113237594871177485029598444167146082754073669823011347",
  );
  setDefaultDecimalPlaces(69);
  t(
    "-7.66057849307798309885002939889194749641074275778897018809187150286548598585710089923652859895770976695058162363936674018e-7",
    "-4.891109691824918866814229059957568320294396931447956834666358385796496690301878116361994040830130409861815817247965470530390259874898588913e+49",
    "1.5662250441616e-56",
  );
  setDefaultDecimalPlaces(44);
  t("1.177203260012192704292e+7", "1.310697722516977698578027562806303764745545308e-16", "8.98150076702329955419538394940631356616231429451594873869168604258e+22");
  setDefaultDecimalPlaces(14);
  t("2.1372682621081224325031720572216821414913292825555922528505768e+29", "5.895086456885975975845886965656082083823053299869396545105731440837e+45", "0");
  setDefaultDecimalPlaces(0);
  t("3.5030693238131052942920859781582122805e+21", "-2.509391762e+6", "-1395983431866030");
  setDefaultDecimalPlaces(2);
  t(
    "5.7769758675525524822807620165854749220858030389969851901196918007082853735327220226755622628307316873055482713043498852155797494261383448174680370144e+142",
    "-1.62050980400031079327292053289468315922421520405912802013226214365407578739015318779497545855823885161407399693208274767462886338343e+69",
    "-3.564912630143794262053575259698680381742726097820806561073822075297184426797e+73",
  );
  setDefaultDecimalPlaces(32);
  t(
    "-2.0120114749260872727377548279524949824568889519025081144182606292835394030047012976602300015044242093983333965001531640160864136456621688273792e-2",
    "-8.00662229842700989478418520810315500419901672153798639830538213020980485256328021083116787133834351839999370821949010834017925758238234835009682292e-1",
    "0.02512934168658573205050051308046",
  );
  setDefaultDecimalPlaces(67);
  t(
    "-1.786258797952282302336306891797084824271290617153677554046648658856475598909827281796e+54",
    "1.29864478314141948292114695832691759669226129018512914511352885621889986229271175269265870124594732078473847157015530568472995e+125",
    "0",
  );
  setDefaultDecimalPlaces(32);
  t("-1.552480829950815534869466919200978706571039477362823795906050613537880807904e-14", "-6.6156564975806499403198783683e+21", "0");
  setDefaultDecimalPlaces(9);
  t("2.678716513311616430236871321795221870383873e+17", "-3.99504257970806554608318e+23", "-6.7e-7");
  setDefaultDecimalPlaces(78);
  t(
    "-1.77341149517022266678096705558275347501953875805593562367688619796186527871163668414758727662696130196189064233242e+62",
    "2.6477205273049347017927985304040291628665527950194335348147364152048936502376e+75",
    "-6.6978802214270896725366202431012019009081516461686478641542380443e-14",
  );
  setDefaultDecimalPlaces(41);
  t("-4.41610007967366323403012983827215549e-17", "-2.793146904228414009013033832876317649299e+37", "0");
  setDefaultDecimalPlaces(22);
  t("0e+0", "-1.375e+3", "0");
  setDefaultDecimalPlaces(79);
  t(
    "-4.34731855114152783463709131661561122622399977685225623201544459966071247420549093119119531202e-3",
    "-4.440587911563150880935014697818968710446149766909189547695878825244385955183025813858e-2",
    "0.0978996168462569432945382642773753309712335094035120757965020911214940411725909",
  );
  setDefaultDecimalPlaces(65);
  t("4.331084790413951295558230318143449701046481878339537050826103e+15", "4.25246296955264587761e+14", "10.18488537448587433882538382073943094042900319308812219987596379249");
  setDefaultDecimalPlaces(36);
  t(
    "-8.5618467157863872140789911149231222010113704041741975106452224533325e+16",
    "-4.7053928677694939298826101308063954207539203795656428480590709474806730712792954000314179724744634957656e+79",
    "0",
  );
  setDefaultDecimalPlaces(21);
  t(
    "1.29805944776591797338643727392255334510404536421737346807892699277957554060085684351677e+11",
    "7.0065409550569243614327968703529616172982285157139685428989057788804029851815951748665993456933018117956432632411943031084674425219782389466246094498e+93",
    "0",
  );
  setDefaultDecimalPlaces(64);
  t(
    "-1.11920309079515022187983393231526282262414879004964232193182031455191759834780460368799237702405786904075155844832125e+100",
    "-3.23203123776045167142351311823149772908476865639537342117985956361142366139184735646020170945359732410700877241343044913684335733270445938513026e+94",
    "346284.7381297810810671284255017419386054781725861033775944570799023729",
  );
  setDefaultDecimalPlaces(96);
  t(
    "1.5402976044577387768783039378160034442035204360476642328210106034818449e+17",
    "-4.12753155413863824745897906572006830700359418476177452222612155552118571349262770654093715877646785286983369500317201072464439515e-4",
    "-373176457709522878377.613941032780158110358557383855382099870095180651764640457316653486328182347548489998976109826256",
  );
  setDefaultDecimalPlaces(22);
  t(
    "-1.5682614073507497317519517780210531948345802426536e+10",
    "-2.9374274735621199587764725848123033723494312244421486806757569704357639812759648550144642242726257e+29",
    "5.33e-20",
  );
  setDefaultDecimalPlaces(37);
  t(
    "2.670658370058326306107326426491776025771346326226571196402875895577394463111041804634876351854010229402791385046933032067511088654359349656449520215e+147",
    "-2.812264969935019507036767464463307697458197743590402e-4",
    "-9.4964677888088006939828002675009428236764158263814616978106283138494687614352586759419273216145434007221904982830110045376323009398650363782202824781426379095004402322766562062458984919234e+150",
  );
  setDefaultDecimalPlaces(99);
  t(
    "-3.43386606608680147014026372469474650120612914690951601481398624432488093377403279076853663923080208384205970129633749640983e-17",
    "2.3636115444409178456469797176813471594859014645980598405504862502302697876162995175736346623516126893141079367751070129790140481292567918695384522198e+11",
    "-1.45280474457110450295645606073950318393195409585282651077829945156850721e-28",
  );
  setDefaultDecimalPlaces(15);
  t(
    "-3.97891278366651603688980404048061309716190968144122129957150541149026346392307652707429383729946728670311744909848031888985080919413584808e+12",
    "-1.190081804049990941502144839068782036989439948988572164238780007896515741452933635459545617e+45",
    "0",
  );
  setDefaultDecimalPlaces(96);
  t(
    "-5.446284892770531860530316866997946145051442522629260568764791788100942691359862587916632485181516618529135267806115010689578303719041e+73",
    "-8.9117058081501258409736090709508090630482996048027e-6",
    "6.111383174015548928317149865207608778072560653666382654021178869055665502322484817263613093246202475037043887489055496495026548198673621829940962884386986022697579640582157337e+78",
  );
  setDefaultDecimalPlaces(19);
  t(
    "4.6671372759463566667104835843458884634626707130742053704060505006387366e+51",
    "2.761065911504848e+3",
    "1.6903389580448854501899789144832109690421840211460264744467816244996e+48",
  );
  setDefaultDecimalPlaces(89);
  t(
    "-1.83442532375714097578042865866587406565362988914232332394102922001225201017499773340371951238368277765117902982526919556932212400489020109e-16",
    "-4.625444542533056790780191e+5",
    "3.9659438285093888102581789902026736109355521751740429304762551398415e-22",
  );
  setDefaultDecimalPlaces(25);
  t("-8.7600441621644057155679458e+3", "8.73333673352057116247733950677286684521861942e-19", "-1.00305810132584550988118156223820752122039986703e+22");
  setDefaultDecimalPlaces(45);
  t(
    "-2.337807844639933733574241787496247121914787635474694444193628812245300926341687272797190043439897599817993427635136570715902263e+63",
    "4.01353873e+8",
    "-5.824804497750377342376466334725632813103033480568143026724022200342142771204022423366997241957342715e+54",
  );
  setDefaultDecimalPlaces(88);
  t("1.267816790093205236791608273521926517643884432e-14", "6.73869685561455000581695898956642889356926047637e+46", "1.881397571752890415375619595e-61");
  setDefaultDecimalPlaces(89);
  t("7.04002196582397084075e+0", "2.7824605630623512877691294281806766388095480741340191e+52", "2.5301425864867552454302421971949031647e-52");
  setDefaultDecimalPlaces(37);
  t("1.204159031138568391974465668017291303786e+28", "4.057128295997676293792479273934459389824954796183657e+24", "2968.0082641864231298078032202979359785397");
  setDefaultDecimalPlaces(45);
  t(
    "-2.0132105130800921889328004832732115628202605987736375496202936945747464890524960352643247639901888229182734695383434669062112555e-3",
    "-7.041876152342388716838033396875152684745696991721093342421784345245217206030766506226787462914779e+96",
    "0",
  );
  setDefaultDecimalPlaces(61);
  t(
    "5.2196853422435515492472907283950811169834648470749866307310051743579596039610407401148801957378289034251829379547294942870024532e+127",
    "1.692800350762702919279968253072046871236089836879961562857341398409584879110898070576897748686788697026149727906255733628574438588e+127",
    "3.083461874220303756607199880260177327711788162632403034067262",
  );
  setDefaultDecimalPlaces(13);
  t(
    "-5.7933222384276660187298468024564339804013367927464176648750683828409862737179231e+65",
    "-2.468392184489262539346816823165714450558916524964498578128862972502452779217685196979461877095758e+0",
    "2.347002342185088402037916899617271897284112059658771292112664972847322660919929e+65",
  );
  setDefaultDecimalPlaces(89);
  t(
    "4.86828452259300308950210311418887759099923730992379679543397689993150968368670736563664559237044383430282800573684029079264535e+125",
    "-2.1670124466148778176927849206011378044176711152776312530866979574668458393834233811509250265810833283233692e+60",
    "-2.2465420215734442689591670028078952352257298469569783137719890289116716364843981254965155092791717768152477221626232185670813883452316160760663582287932182e+65",
  );
  setDefaultDecimalPlaces(20);
  t(
    "3.22324954678965843334533443836432647726778327526140213048e+24",
    "-4.086990074183563697856139160644789749616029827205880279346501527230184017423250135655052238494418799762e+49",
    "0",
  );
  setDefaultDecimalPlaces(95);
  t(
    "-2.18743012298939486084e+8",
    "7.025808691194093387726623506435070466974475190069500453244970642294360544066224541638558604953308e-17",
    "-3.11342112934421973631076917185220036851634040087710982538789134803794462136918636882534562646131691308609951753054756474e+24",
  );
  setDefaultDecimalPlaces(57);
  t(
    "-2.585043608185779800952950065858338145952905482902140393702986517708947128178018e+28",
    "-8.407210693303055964209946698121822258905530616722760959876972370190494057611530825912595544322127018766494037540993734116974051693161664e-18",
    "3.074793415424870633282167619188937998894099677588512101916865794590226449985334460169807126347092327283e+45",
  );
  setDefaultDecimalPlaces(64);
  t(
    "4.5241392668172918892003234332666e+10",
    "1.982234153662186491886739303142573978600782895604224158496091449845684018843539635097450809831964247400898072533374645206248326619e+90",
    "0",
  );
  setDefaultDecimalPlaces(55);
  t("1.10169105558477e+8", "9.54554794536534718352898751994601135198603787e+33", "1.15414124143567305166857319282e-26");
  setDefaultDecimalPlaces(41);
  t(
    "4.1210694534e+1",
    "-3.08968522254076805528786621300289931293744645593651199137925504655009047857938420026946895375602334272558363460812935450749788416848942366875306e+1",
    "-1.33381531016000544815746014945642854255561",
  );
  setDefaultDecimalPlaces(82);
  t(
    "-5.9763133095228587774043615271822400000154140790860998991023751330593842804172505132280847908945858859e+59",
    "-4.93829853175435446447833973482962578020019930660432550508896840641873689864889796e+81",
    "1.21019684636192792846237788456616062988099535143973567445899e-22",
  );
  setDefaultDecimalPlaces(68);
  t(
    "1.01877420184692809489027254143967925299544649166015505416687511676e+13",
    "-2.248616533164623772364633783251445939562178831731093037e+54",
    "-4.53067113410013550561384559e-42",
  );
  setDefaultDecimalPlaces(14);
  t("2.3685895290051634301648384300364274968327926334820084089086389167e+1", "7.1822201870194901201807183707339638583038947449450100505521755966509286031234e+58", "0");
  setDefaultDecimalPlaces(4);
  t(
    "2.4347321895996111301851889970681593534894429674464038481946006500628046619725570391495e+25",
    "-2.2997225370002395796679632273994765958065109380722810379292300626147647234684561908232395164994158236480952523956892765913056374528120614254981653e+142",
    "0",
  );
  setDefaultDecimalPlaces(93);
  t(
    "-1.6295098334253718440779399551991196862830009941519505934398913343667741486198717757604160314775282731202842e-20",
    "2.84922447407693139703656106439206112335171045878885067752073791022236269073880588954370327484500879657283025519508410759128e-10",
    "-5.7191346215474553109933695817173248267504763845440555316017030158924045176432437015e-11",
  );
  setDefaultDecimalPlaces(30);
  t("-7.14121275628396058866652754e-17", "5.46989137728003288469996731996e+18", "0");
  setDefaultDecimalPlaces(12);
  t(
    "2.47471596230845037379853008296353e+4",
    "6.52043564012544856763305923237844596915466987929379715879401079037473825800903292849288438512486804985849740679641963155569788229054338504864e+93",
    "0",
  );
  setDefaultDecimalPlaces(58);
  t(
    "2.123240488106900500980782526969142780021400824302735496383894581901284044450447845989424971196026487350752892374279373139193137e+54",
    "-2.4016272175677742395585658575267349381569170037888154410501882e+8",
    "-8.8408412120561852849682270199745711616958675716901228934268630292392252749508610604540204934105086998009e+45",
  );
  setDefaultDecimalPlaces(1);
  t("4.4884089e+0", "-1.30232343457997197059695659019510154751629648230704876211369991239850219250808429669600145496903187e+43", "0");
  setDefaultDecimalPlaces(88);
  t(
    "-6.15087019700559463056917807859230460009729349527606891151725894e-6",
    "1.7636625229403856260837811034606410952317717330817269679069670829428074810601800204827764690040964826249222158463517435867983776001e+95",
    "0",
  );
  setDefaultDecimalPlaces(36);
  t(
    "-8.188931465079649122029539366120005932192871682107911828995743867945176880167786742845593429950655913194665491054913106579712769017347694815990495e+83",
    "4.98916352628145664179280535033047354268293261521168087361127e+43",
    "-1.6413435683041354121505371928602797898932073688432033763377343247818052629632e+40",
  );
  setDefaultDecimalPlaces(5);
  t("1.78378955205017919504736306296e+5", "4.249713947504523829389222202825401538759067e+31", "0");
  setDefaultDecimalPlaces(42);
  t(
    "4.2088658436084273436300157104354149691264372179862e+43",
    "1.0732447697366034688672546809907664567356301366637648790018261335680234835591730906338405145612495970694553651620110373090816775865647681e+14",
    "3.92162716492098101280861088879918920322082590305799511834011862640533933e+29",
  );
  setDefaultDecimalPlaces(45);
  t(
    "-1.3413438720523468313498444599e+22",
    "2.1244511005869261723975065335688549362616066506371998904966284758202530238043332882528067154816233020087375222451661814324655588e-14",
    "-6.31383735630239355512748167007950830348330847351620106361566097644518106838253012e+35",
  );
  setDefaultDecimalPlaces(44);
  t(
    "1.7541361305936576732816777553706989277734166960060364389463541351127192960120802217759705089658730497796749168120590790908199738850416793219126726157e+70",
    "1.225137173625915963518289615908727720609099880650519226151684952804612667418333729944991500418373952501351070905535861765346648e+85",
    "1.43178753233167874862027454441e-15",
  );
  setDefaultDecimalPlaces(70);
  t(
    "2.428212191149723101040167390779624854442160382645861647770806472472244127629781353612745669762928808e+34",
    "3.362243972357540316051251836243036325674699592875699433373381266440087e+2",
    "7.22199879340435777254956453068327637689897207550543624788716027429945596453309265749765223086893532401e+31",
  );
  setDefaultDecimalPlaces(16);
  t(
    "-3.3989859681380950375900186300406569930243907907695970546171922025328430024503026158111105328054658e+59",
    "1.4133950968448691168295195224010774153579229224354404265985754156976010618693636137377190053316866636954986859143803454202076541e+8",
    "-2.4048378091346666464365433065190768544493201089971276234928910229463e+51",
  );
  setDefaultDecimalPlaces(2);
  t(
    "-4.121603787724728823021154151185682899722401281323456001e+50",
    "-1.10785203722757278766912646614198648137155053983031324857120583554073464026808373053543826776993464575573093419704790189682187420517044452e+97",
    "0",
  );
  setDefaultDecimalPlaces(62);
  t(
    "1.2410600613350838916283185057677987099961374918243243890287024404801948503452997743416036751655602515322430909157952040598974881018434784324852910654e+59",
    "-2.60433553026096786709956407e+23",
    "-4.7653616322268708038410247871512427715371229547278691719045274877050251816675112474743957325899529e+35",
  );
  setDefaultDecimalPlaces(84);
  t("5.0715788427419703878245e+10", "-5.97119907354177500314613160126e+28", "-8.49340104103043886283095565581879795747514558244768382849554829033e-19");
  setDefaultDecimalPlaces(49);
  t(
    "2.911860410312139938344684979145680607917681064156740152445189012301603515187449355111192263e+81",
    "6.973832305242210691626918024888058e+11",
    "4.1754092769384523671384922328074358885069856161226785858355631579870792081087303379790340671334417794059327671374016147e+69",
  );
  setDefaultDecimalPlaces(43);
  t(
    "1.6855550351161961027893374165371262090765994293137752819092331984e+52",
    "3.541324691283011257057985063335456819035556595195149990586e+56",
    "0.0000475967380021718538389394796957116982424",
  );
  setDefaultDecimalPlaces(77);
  t(
    "-1.122071825415120156561922827260287930525e+20",
    "-4.07493605462697846277150648e-14",
    "2.75359370152824430543511719715557649325540894447871635095048947603228327453156063200769115897084745587289439715e+33",
  );
  setDefaultDecimalPlaces(90);
  t(
    "5.01546000459582962665178491362293126344731298161841147856692432544198475e+19",
    "-7.8433303054678581669210954451668855926763627794745389250725271598563e+45",
    "-6.394554110642743344472062175722649425912274239734441362551886618e-27",
  );
  setDefaultDecimalPlaces(78);
  t("7.5390496139129e+13", "1.3309869198946868746479353111121636026887205018804451203882476381129052873966076182136e+63", "5.6642552238675797207813685049e-50");
  setDefaultDecimalPlaces(62);
  t(
    "1.517340758116826490874279649316328080465491935206913928859404120668e-9",
    "-6.0481402822630400855667019331498008001262936673441606e-6",
    "-0.00025087724280579702986788369959402262442704871187172764922398",
  );
  setDefaultDecimalPlaces(30);
  t("-1.0085928768149701723285600177489780741315642e-10", "-8.3680995588112168829514624755130813938304020651425976769839767204922609556568e+77", "0");
  setDefaultDecimalPlaces(52);
  t("-2.44566189283660656257652682415e-13", "-4.646678995953964448329e+6", "5.26324692315982011972268891096271e-20");
  setDefaultDecimalPlaces(82);
  t(
    "-2.30078195806926108407790325876485512315205928728524915803257670168981411387887641546274265184787104901774692e+108",
    "-6.83487968225813188873800930233700658821363538376885276995429879112304391240268870120604064992927641382968940032304408655463271756240299901995345079149e-12",
    "3.36623622511101841017789239670639634480511961933023676660773073151858311818636304157477202263905803535502572786562754722523509054426252665316793574828478672958790629782061055964164106377471678505073573e+119",
  );
  setDefaultDecimalPlaces(64);
  t("1.4552092863216214503827373212083285546771e-15", "2.1201251297769261300737e+3", "6.863789622052801485909781036717224046097964227e-19");
  setDefaultDecimalPlaces(86);
  t(
    "4.03936669434115841595593826064495922130222717291628374811891473114623080082655411533755453201763661295261868739679e-15",
    "-2.50400169337985761074e-20",
    "-161316.45218214257792701567758848775057235458324007478829057972854000467944171291959769724743",
  );
  setDefaultDecimalPlaces(7);
  t(
    "1.0973720326234726226436859646212880052510575882214535321660037797970371908733453994937525551661590032585938855245813235274488111614610459406855588e+99",
    "-3.2333710977896470874917234873636675111976597486339642150079089169836979254458639267272e+25",
    "-3.39389448174891857569839401493313001185456165649638914512062713580397758406576812e+73",
  );
  setDefaultDecimalPlaces(48);
  t(
    "-2.48652779219e+1",
    "8.31210540623376785493938837768681032277739658218750700016308418887382521222614767365717459542088556052900658309281922792284948181862633523e-2",
    "-299.145363378717171923203763550745703733626603241956",
  );
  setDefaultDecimalPlaces(37);
  t(
    "6.7574220952337302e+14",
    "-1.40899826636176486919445174946098229636761407532509163846394137988189842013903968883901002112550422958164375812488802328071737855596060351660056931e+7",
    "-47959051.8779157971445621822453088476560887679",
  );
  setDefaultDecimalPlaces(56);
  t(
    "-3.723635210502740204610760277666227336411868977686928033448911140494951828837691686998978559224e+33",
    "7.36391e+1",
    "-5.056600651695553319650512129651540195917479949764361641368391439459406522944592868461155e+31",
  );
  setDefaultDecimalPlaces(99);
  t(
    "2.14631748947456705645294884354815123348956233543523279416869663488807403122047031962881842001620718611849131165876209214841270305406854853537822969e+142",
    "5.709631016992182980748e+15",
    "3.759117678685374785540945501738176731135162509105269198665415415845487809605148248120706703547730411649189620814403762340397802394417251631032665775733211579092447687908017924420663112654580390461373153868415422177559843116197e+126",
  );
  setDefaultDecimalPlaces(50);
  t(
    "-8.673831445123704570440313085922663953557226573001049570953702394869136635866434907294281730196079910144306496e-10",
    "1.4114089888396611006622865061200284288096237607628371840229894398742245498339043450188579731776147380132986084824e+2",
    "-6.14551240193998032191478232094637216292e-12",
  );
  setDefaultDecimalPlaces(81);
  t(
    "4.6272619278339013606537562201863669945144493370237892804369895589590615786690842472410599332443583481280548731287903805709e+121",
    "-2.2578776239846958164380306470621702941063467217206292204732069445544560506399707926422642185578372470603812014679375973172765064887850938853e+19",
    "-2.049385617130003293007333348085740454337603007148683250882576952110238735132349519849882057553049575936931576529463299333612517893224942933341743155261151022082754489780876678544394177e+102",
  );
  setDefaultDecimalPlaces(68);
  t(
    "1.5061162079092820011674e+6",
    "-6.30603440670627949821628823866936155318515494748192594606412135701089785677657101470638512891598063542244425517699681677087812464521515e+85",
    "0",
  );
  setDefaultDecimalPlaces(44);
  t(
    "1.860776596079574518063547129885122297e-11",
    "-3.241113980071379739962629187313246698626621610824629980897800075532490584157111565419230521147647121546832107419112516210151397276506207e+136",
    "0",
  );
  setDefaultDecimalPlaces(28);
  t("-2.6180419046802543996159600159466420366670221053566870142632063292282e-17", "1.620720312895224041719610068831e+30", "0");
  setDefaultDecimalPlaces(98);
  t(
    "-2.6058887210188594269539818676904132295672122326402678536831560944700853e-17",
    "-9.57711021193567007964106754397351876769726348992e-2",
    "2.7209551350586079166109075605629597967748164955233741395173758839943666058019340127e-16",
  );
  setDefaultDecimalPlaces(88);
  t(
    "-1.242457283506517970006275822884957000396353475e-8",
    "1.8604182988455298962651226923895589653003308532059971795038087302449558872899137768317856559948741235705631523989717266523863486e+127",
    "0",
  );
  setDefaultDecimalPlaces(76);
  t("7.620302544308974115636792576153295486041704495e+21", "5.5e+1", "138550955351072256647.9416832027871906553037180909090909090909090909090909090909090909090909090909");
  setDefaultDecimalPlaces(29);
  t("-2.2855538240755260961537866e-6", "-9.939897391520118696526940081234358392718210487e-6", "0.2299373659556453436522298941");
  setDefaultDecimalPlaces(64);
  t(
    "3.1148853729375034732821747280415412371179129789480951548474151387404731589795950009491288083535e+74",
    "4.284397902569678476082012284209912676253403353e+45",
    "7.27029898663070111022974057799023461682597009315485656410854911230903618781091790234760597755e+28",
  );
  setDefaultDecimalPlaces(86);
  t(
    "-1.000693889373675955809311357470355916059077730226665600116080743603931906078388718181550439623011478785e-19",
    "-1.51809834543994307465989410838687005714513569922650030942190716756589231962241921233020855617676293481693032264150505960768755091390908261807985e+66",
    "6e-86",
  );
  setDefaultDecimalPlaces(88);
  t(
    "-5.481580318615407328259550601836362742690295890861383537750867162085863388674383353777049385076866024812228992189471163404480923657564388607056612618e+127",
    "7.27786746414474481872661268773638279624e-6",
    "-7.5318496051501985797665428848000606284228404949940345129826558546782121445713544063772293396618958977978770978281085160355048443884392324010565172186909630408038189106091297873362057125926414385096003731183457928173141929e+132",
  );
  setDefaultDecimalPlaces(91);
  t(
    "5.51700900762799862248045331860372896647748006458965984143646339353604980864692990646085381546513307924415945373019722345948407442534771852e+137",
    "2.7045500441139619616932475118129812034829813741535966376041197088231846088212478155595425076656245716970785741e+12",
    "2.039899028540781450421479414915813858065194554788758683775778325390446587180524415572477639847659936182176684290148009195485141630777435921315090685890030634441489886983961316329500786681808051471054707466416742151897e+125",
  );
  setDefaultDecimalPlaces(52);
  t(
    "-2.014502686273129e+10",
    "-5.029693469118373194492329586515808579971308701356516256443754205049373186937309207993359920352613622063084317e+18",
    "4.0052195996473715446905401159250773045747571e-9",
  );
  setDefaultDecimalPlaces(21);
  t(
    "2.25387271593561494451207079156278550887314902647471973639016042798550182868621e+60",
    "2.14372988265805423481688483285435127605446173071449251746288307961251919238e-14",
    "1.05137906327125149414165522417116840903125458724473180478036135791926934173218672815793288138981e+74",
  );
  setDefaultDecimalPlaces(38);
  t("-1.03094136664116199143209309973397e+4", "-2.5746489611404317905141700227057699687456314368338575905776467867000794588e+73", "0");
  setDefaultDecimalPlaces(56);
  t("1.2321492885633058467642749203026944499539149e-3", "-1.9485030802e-12", "-632356859.52153305031468993635861045838438849597462391530070109868");
  setDefaultDecimalPlaces(91);
  t(
    "4.1878874954204004942692322394464734704966217235574947220290049624401605734030707037721008632302697974892155110695089949581119933482500395949108e+116",
    "5.5847237201319138e+11",
    "7.498826630087048643898958259848022760357476937242242500598769798343062839034415101734914579705557717366865931745304075746482270155218006569590268455568359475624310121075137066861119243332863687007e+104",
  );
  setDefaultDecimalPlaces(0);
  t("1.11365316777242919862115e-7", "-9.509223483834242755627398936042973967794692431774443416522642749844763860842494378569161972906097841138932831157406567e+117", "0");
  setDefaultDecimalPlaces(57);
  t("-1.126158689739565591314465456e+2", "1.1958535082313483412842553580289700144229723235772126042084372e+29", "-9.417196019311257674989654927e-28");
  setDefaultDecimalPlaces(1);
  t("-1.2366790077736256410550362121297508737052606127498922581123e+58", "-4.485702907909270460553993143784582e+26", "2.75693471717239991314246911666798e+31");
  setDefaultDecimalPlaces(51);
  t("-4.93262391087634534464262299921270820291271748378583e-18", "-7.243707796953703105524927546638e+30", "6.8e-49");
  setDefaultDecimalPlaces(79);
  t(
    "8.43088827100549885757969744345797797320345063848696665752918325554264544480619413826791638700671316912978338155465913506935816315404980661e+104",
    "-8.0650571e-4",
    "-1.045360022436232826867363089525798642293983341852219081936714776085422314592936253144186218719606234298053932135788491202295165790462885453098651961186982792719471260780038370714077151419e+108",
  );
  setDefaultDecimalPlaces(49);
  t(
    "-6.88570360688567330989264762481466429985264489280700796919289e+59",
    "-1.4112598710499208793307023856961854205632101948633589613537534708398233847664965825682781835501935806797e+103",
    "4.87911e-44",
  );
  setDefaultDecimalPlaces(54);
  t(
    "1.41663596167785902730422180801742531065237861107984544840158595393087515205871276046990385492103545277849071432599212364416874750390078146101238454218e+149",
    "-1.14821913510277483473500879212741025191332046241204849980089140545725833e+3",
    "-1.23376794408765773682151814715872206365967543201764426667723894241379125248013977130727789985478638209891148134715102516740878445222105114669384247118692282029871552711869381885601020455327369703525704e+146",
  );
  setDefaultDecimalPlaces(57);
  t(
    "1.16030117259840127784731565291789350292569664955e+5",
    "6.1163230170565821183161189729226223732700174974572423215859112856992896007026633983815143824317971705703492615324019330069436614e+97",
    "0",
  );
  setDefaultDecimalPlaces(63);
  t(
    "-9.45616642782338751514373324566928523107058274e+23",
    "1.16466323618286019739169567236877068364896169207328074129204273835307676320139006675457e-13",
    "-8.119228060134890245131145252996807217516829505014621459878919913698196271426348223637327415059729753e+36",
  );
  setDefaultDecimalPlaces(15);
  t(
    "-3.15509286114992931685376557619023253895145277264132856421034467406613746715218403731778096953890795e-8",
    "1.2052264983079440436910537340860524972138933282513284011669503465309151209578548776760451e+47",
    "0",
  );
  setDefaultDecimalPlaces(4);
  t("-7.4165876697933004849216527844e+28", "-4.92828678663237074612883727733974823111216286449075103616826635589196859987055766e+77", "0");
  setDefaultDecimalPlaces(88);
  t(
    "-9.2202348453428128404172890984058456788044164e+42",
    "2.281044889412321440866646865187053007904525165753335491056458200917398068652410165284415119650091540681711368593373647554979553e+90",
    "-4.0421102136741703257964097669482172732416e-48",
  );
  setDefaultDecimalPlaces(72);
  t(
    "5.17924578979183906432431571084291209320168014785070974319812613406562383411261820294683516416188097127874205849136970289407700046577649256349873e-12",
    "-1.254742910301666835394143226077414192648333920542857964697356663870223652514154761507518849421907931696080123345448253529205422741840586646e+85",
    "0",
  );
  setDefaultDecimalPlaces(99);
  t(
    "2.5846199764792338772564714935067603390317681278025910389609287512916519010587583414699079691161567743080987305237205e+5",
    "-2.1830524619413517296103178221864046648401301862217696274550992395781858760038148768670955133768303249121661342265270915785144655139386253680939427212e+89",
    "-1.18394771611708e-84",
  );
  setDefaultDecimalPlaces(96);
  t("-1.73343760421761286665373075891646037e-1", "-9.9918004456084877418361e+21", "1.734860112202780042056926296794226581563438084535590268876950240243641587e-23");
  setDefaultDecimalPlaces(67);
  t(
    "1.366618058503242976057891859755605035954509800373591469458854092374512793510833951638699961976879874553422173e-9",
    "1.17000154606800725232390908279000139551831933593006995701360817057925238335896125776437664059055224035396903e+3",
    "1.1680480791636554261542418628320714623211449037435139041e-12",
  );
  setDefaultDecimalPlaces(12);
  t(
    "1.9609616865250752643157942157599169237119031617949558627054879934232414215845187347421726958576046579697495747769706448157913484466643e+57",
    "1.937753927354709504023267308865883548570055265668636224452674241406233877876904868972048563e+50",
    "10119766.28633155409",
  );
  setDefaultDecimalPlaces(14);
  t("2.745713179546454712e+9", "1.27457776739541511625387536118598713098080990761862558e+3", "2154213.92855242387183");
  setDefaultDecimalPlaces(41);
  t(
    "1.144485265735504435506902577864384e-16",
    "-3.29656655719682609635555905796818562496100224313965667458997030021311707736696492250164203e-15",
    "-0.03471749306067996215381900162939803359184",
  );
  setDefaultDecimalPlaces(55);
  t(
    "4.86972991200497923712367282851620190545694691890780147733771428031727535611538791786041317481501903425641608638993933037276680817894202e+120",
    "1.000872931259905371724871137555250402583553942622394490605674675152361139827806459870741726823722510394100632486351782062003913451757e+132",
    "4.8654826800790101021693186680207027326995026e-12",
  );
  setDefaultDecimalPlaces(44);
  t("5.30754991206632452665119018649276645e+0", "1.59236714955066563805469579131992848509047184191755156996562552887281820384e+46", "0");
  setDefaultDecimalPlaces(16);
  t(
    "2.5796285527656516653701857176780477390641565713092939881983381882757433601056823660051206433616386598e+35",
    "3.36614816379300949820014081878817969508959277467049867642556454456e+9",
    "7.66344328069891121521306983893505368081712e+25",
  );
  setDefaultDecimalPlaces(73);
  t(
    "-7.670154039047309302484910526362128423530933629421461581538815970044230413682480944051731538906295837294662807440102122428735821544446268599257e+141",
    "7.8948367538422272889068874857141813008896998839006759172448508542698830485638603220205968689617e+5",
    "-9.7154054962750555803785461042957644518859343831049922538298335864020458632304630074073242601115315775786975499019437168981342140867102539591334610926720462412199693322742523112640213305458204821586152095689178e+135",
  );
  setDefaultDecimalPlaces(79);
  t(
    "-6.52917986128955101500719389606788431065673146774323749110273434161272223931683494471959776057369205171765485e+107",
    "1.24255692316600065600846525418e+9",
    "-5.254632395152876702718659549315503303330739897464100083470378473330902612937347608035770872182716422362723386524922900431307281489442435047397865522496971377070148692218695712894e+98",
  );
  setDefaultDecimalPlaces(10);
  t("-2.8554844824107e+13", "-9.543619510309784073783443754765185770302e-12", "2.9920351281041499913184121076024769e+24");
  setDefaultDecimalPlaces(89);
  t(
    "-6.7188641677860741651287202578847683294812050677538799133676205652846184670946906382576272292960358948105473447606525223682977117022489133644e+139",
    "-9.31942563607003288736114693094513e+32",
    "7.209526026777111752804876819678883522341817017547025050225661891888910805173973565940366984721599557575067408730256099299000731795990135179225320053140107822474524894240017947381047388958894664239e+106",
  );
  setDefaultDecimalPlaces(20);
  t(
    "-2.03156762640989798039739757715438649483888855342592729544945758015284657335378307659929847743e+49",
    "1.48228854264715034264353412708528542839620821223264071819250698784097626675575985050405006855355763832381e+71",
    "0",
  );
  setDefaultDecimalPlaces(84);
  t(
    "-4.0074091134869209005648068711400619221053959917739184912774420401762111747666806325249745418273578921331211682155e+12",
    "1.1376540145300142231992781130044235069267688655818622050672160072485945729061971602e+24",
    "-3.522520082823647607824618006514418354665551995021577353315815775837751522e-12",
  );
  setDefaultDecimalPlaces(81);
  t(
    "1.083196997305296574e+6",
    "4.61099816685884335238951012990235183591137838560456061216395723958212145110325686932803003299572011852389405267467e+39",
    "2.34915946202425918560591922137472696512721333783e-34",
  );
  setDefaultDecimalPlaces(12);
  t("-1.766180340934734814884893937122391686016e+3", "-8.37928531980055023795389259190008377363900122117e+0", "210.779353313245");
  setDefaultDecimalPlaces(39);
  t(
    "2.54531435926795728160176583637591949837243437502943e+50",
    "-8.718810989558261606859899419033449e+0",
    "-2.9193365498073672374178546074253074555185585777649034364118319509239065083999162691858151e+49",
  );
  setDefaultDecimalPlaces(39);
  t(
    "3.465473688882663149113970408215621091596095837723825994915677399669642789451242504439075819717468633048e+65",
    "4.599109021760606038447837194402610619902590423e-12",
    "7.5350979341560145421316412557843869439538430010651748523092900381600240140057465588947973447371960249884363173945036e+76",
  );
  setDefaultDecimalPlaces(27);
  t(
    "7.4162631844457618150313364774872226058665659835304535791687187237196156379633206352868276341632184955793577808982576172385965431053470634924731082e-6",
    "1.95443877034866789503116571777716288613659893345561382617862811078676950392902185814345019423597716178281423494780670655107067362214101045515721731003e+5",
    "3.7945743284261167e-11",
  );
  setDefaultDecimalPlaces(65);
  t(
    "-5.070668661765073616834672657266872500671097078230987614665718626227334e-15",
    "-2.4297531815340194864014303921108512235799836515700523433047842122207097520319462091123047130833156696050118e+106",
    "0",
  );
  setDefaultDecimalPlaces(87);
  t(
    "2.7302904512292130161720232210426996773962161219757570470388298305967574185505847037867466964071807e-15",
    "-1.0273315679149302736029590632342831e+17",
    "-2.6576526376684832865146175143328708508115937536070997004e-32",
  );
  setDefaultDecimalPlaces(1);
  t("-2.85766045187920053e-17", "-1.33264911989014442808109493720177715159572134306414627383335514050985679465132366314577259705e+84", "0");
  setDefaultDecimalPlaces(15);
  t("-8.26697533717123855339135968614575484217533073317e-12", "2.29e+1", "-3.61e-13");
  setDefaultDecimalPlaces(88);
  t(
    "4.0455347772181911585358915122770566085261620332499185330929664568803593100052611084660099971022468e-11",
    "1.02947751500757942684247995421300652976137127674260148452123656456080960594932541e-2",
    "3.9296970727800755386674446265206411477097433037049410493038334219441003976085054e-9",
  );
  setDefaultDecimalPlaces(69);
  t(
    "-2.65672684903112633136690878093186177600378689779813280005050034352317289238705453779849653176761332e+13",
    "2.3260440928266728047648774973e-8",
    "-1.142165299971849948635480090753473613143786799498490995426878161826221159042031701073801396e+21",
  );
  setDefaultDecimalPlaces(39);
  t(
    "2.1764437370090353980096353800400348440731152310637718030778864214142982752449626824830449170982e+41",
    "1.75365697207587293025181599856051433368425038650066500207572646190947426761499247535363131448655873482579565018271355905200315727667e+131",
    "0",
  );
  setDefaultDecimalPlaces(58);
  t(
    "4.4906446311190658557085927921643697915814680945694033055909122616445897071256237828763855894369929267802324734015234970530642388861e-12",
    "-1.25135524191866368867802014114630664198342423202705405e+46",
    "-3e-58",
  );
  setDefaultDecimalPlaces(97);
  t("2.8259152661699511898518792353391582318145644933805166204020512545e-19", "-3e+0", "-9.41971755389983729950626411779719410604854831126838873467350418166666666666666e-20");
  setDefaultDecimalPlaces(98);
  t(
    "-2.374342823209742526245138258113155151641271742115497672442104953564248237003895255314e+85",
    "-3.1401503203542934250115605465268462870636343721742203311564854158798826281313520375235617528158061e-17",
    "7.5612393706739898580661062418046115259836394603430532615348573506037072564207218879177426203325010123739039176956834406951720038152838348226323935280732925816977813927774224869761791262794945879119064e+101",
  );
  setDefaultDecimalPlaces(31);
  t("-2.549123210827849262828707518305433067563117666e+34", "-3.584315007930082353960647366827055865189607023620626805069e+57", "7.1118838e-24");
  setDefaultDecimalPlaces(97);
  t(
    "1.97759749636858184656e+0",
    "4.26095775251213317582516600062140076999217842330187326327898737719648001104807e-2",
    "46.4120418749200117049333800951318561564326769055395235938936988167536402376343428417580472421917257",
  );
  setDefaultDecimalPlaces(99);
  t(
    "-4.7061435300036910482481549805212011585063236821e+43",
    "5.2811272130339965597930474281430194021612129905273580498254073266037259056248804622191e+85",
    "-8.91124818654012580413808580538815669141049204987908783966e-43",
  );
  setDefaultDecimalPlaces(32);
  t(
    "1.206669585234486817210486238739424784915522e+35",
    "2.756062573958289258500952269968007432163133891054278720804826018891558461e-17",
    "4.37823726005412810873302005700032195613028523296769807021715041482649120146155387656e+51",
  );
  setDefaultDecimalPlaces(92);
  t(
    "2.32803837405298438581429366637815358921197063579405189902079302780725914976760600697495318753898196010733449e+81",
    "-7.856418520739547667542e+7",
    "-2.963231105760693767812373884095492289309817724041666434973953608681327441916074318010255598016207353363503143606330211348739835455047977350911085902845825272037566132e+73",
  );
  setDefaultDecimalPlaces(94);
  t(
    "-5.854987176352968300626602761167900265282350010709116701652951563135042906e+39",
    "-2.75883711252070827359791546276921573091932740674669410980328148180404277460936137612324122812785611535753401e+40",
    "0.2122266352652967592826020809747777915341990427287562117481261146454297526746578891803441369278",
  );
  setDefaultDecimalPlaces(83);
  t(
    "-2.1147532365079e+13",
    "-1.0652545636042759856247204119550361538045085950960815369881475954015808043023812691741095e-15",
    "1.985209271812605895032532316182795295305956922528069070738883687159995045154006288418722966881866018451917889082e+28",
  );
  setDefaultDecimalPlaces(19);
  t(
    "4.293449752324460062710424599228773424715678446763348884303779774164993161234001113e+64",
    "1.13068882784774280015043581729901460619814237e-1",
    "3.797198350758455403143233549216084397472431487550914601866450999549359211839969031832e+65",
  );
  setDefaultDecimalPlaces(88);
  t("-6.67214965818898578303e-6", "4.835874052515230729914710887501494363839273349247977709836230613e+51", "-1.3797194851918595636735679520008e-57");
  setDefaultDecimalPlaces(38);
  t("-1.636865984137413108007542188004061150336628412731321e-14", "-3.03284073281848295931104070342219423887427176579063041447552873335448e+20", "5.397e-35");
  setDefaultDecimalPlaces(2);
  t(
    "-1.07764218078492839100962156414360867375124568867465365282742337714832602339873993715701311705339992288073558e+16",
    "1.33014489562003245540681293262880058623891291933432851358791276771081137624334101434740319e+16",
    "-0.81",
  );
  setDefaultDecimalPlaces(33);
  t(
    "2.5699215516583034105091297228270125777272187691595811890550414471073113108787663045970195918090272898554779451317383349533365267487825374038217808e+31",
    "1.21508558130677076816312841489200688601812809412833442046553613483221856577e+74",
    "0",
  );
  setDefaultDecimalPlaces(54);
  t("2.4284398780688370754202e+9", "4.287091e+0", "566454007.640340985395504784013215488078046395562865355552284754");
  setDefaultDecimalPlaces(43);
  t(
    "-5.1229307822097854941923223377063971706009164900280093963902405457386636270565855e+18",
    "-2.2191975643305126632120652997072397058700986028949427676735219048262334966601607453712603e-11",
    "2.308460888994924085023787514663654864693701961559045321681433278680632801e+29",
  );
  setDefaultDecimalPlaces(98);
  t(
    "6.4364029143735528666360315982703491849282665113289536858285774859046993480344378098716542591369055e+49",
    "-2.2779782535978393056221121966756350916233308753313222242774969228699574203075e-16",
    "-2.8254891828786762239125970369843207108993778303557330924197667605605926554640761061476729729916403864191093272150379884683584718146315610807094761445488762804747656e+65",
  );
  setDefaultDecimalPlaces(1);
  t("2.748e+1", "9.5821067694021432312902e+4", "0");
  setDefaultDecimalPlaces(34);
  t(
    "-2.121994806934626811536647636227597157861295811266378764563041083579375356570122836732026215838425296274072067352921269068190834e+54",
    "2.28918151366617590664166535547e+22",
    "-9.26966601060919888552475137299940341303471341605529664921619871077e+31",
  );
  setDefaultDecimalPlaces(65);
  t(
    "-4.23894315585123185617981674282251993492633332866410414394747957716291382950242418661622006093688786028730721193524159429710062495e+47",
    "-1.51941940081682266017196105508519464587845277242317152413576447165963378254673796512839029756946820812371219287281891073632581970032992723977272397361e+139",
    "0",
  );
  setDefaultDecimalPlaces(68);
  t(
    "-2.06172028809764421759933555288147521546506771991073124e+6",
    "-4.9506168566663027773294989396673582671248319244877e-4",
    "4164572512.45653172893278718295867480170907768479131197669718266669050903206491",
  );
  setDefaultDecimalPlaces(87);
  t(
    "-4.7712489194478121319339338303586135702395840481310922978656178057345081307769283794151499681505746230142401454983696742213806786852733099022766e+31",
    "6.1737366210557639247926756807636556038543793939499596628014501752770055990008788401195050541659326076649644039260775047506935780132016716071e-9",
    "-7.728300075476634262327600755505512722431329030270270217839894858993008263080706512835280269765304230116203796628263798807813573e+39",
  );
  setDefaultDecimalPlaces(88);
  t(
    "-1.409312999900317524185415710418171860722282045670955540865e+23",
    "5.84844538965318789211949854639169847289138172202124880383680632194230738e+37",
    "-2.4097224236608450498006420687685505923520944356175074800971184206614315759e-15",
  );
  setDefaultDecimalPlaces(6);
  t("-9.340336756080665148828312748059464847473366393773593867228758e-13", "9.048699589e-15", "-103.222973");
  setDefaultDecimalPlaces(3);
  t(
    "1.5359300831232671e+14",
    "-7.7248180569534618054749752017776634309972838178720362987754897687441759357598515637291117021225267167411297972563103688049223951209690939606269e+142",
    "0",
  );
  setDefaultDecimalPlaces(51);
  t("-1.261723e+6", "-3.2342140530135005e+7", "0.039011734514738787475729198125429058594442896941566");
  setDefaultDecimalPlaces(27);
  t("-6.3368853885880837638572215447896451007821e+20", "2.96290261295234796723269154911588748402467e+0", "-213874238082829595380.60533591893119941169200751");
  setDefaultDecimalPlaces(78);
  t("-7.611694739896154965e+19", "-1.91884067e+3", "39668195796038422.330291758929624938583358252459804283802260663987281445311454650374905801845444");
  setDefaultDecimalPlaces(47);
  t(
    "-3.91833816062967730675289539666336493582923798444943536480782368883551304461962497094022622275909951608424602896206820169820508577380483491744734e-14",
    "1.793837810238116713339471746921688549388186936854517133806902428024165882905627e+54",
    "0",
  );
  setDefaultDecimalPlaces(85);
  t(
    "-3.843015814327703472868124968939881162129864467e-6",
    "3.75862785998091196122499655488291512882805781668899208160948768054002365021015e+43",
    "-1.022451798233417040770398704058190756e-49",
  );
  setDefaultDecimalPlaces(53);
  t(
    "3.56368687825028758688148248336707863236818728375232e-20",
    "7.18330556037609516970129064803575818011187063687839953128236004362836829927125551825543169047867422460502808445395e+113",
    "0",
  );
  setDefaultDecimalPlaces(10);
  t("1.636408811168430912514652416943404600328935818511926822068665336353158452125311e-3", "-2.961128413379014027820561310656009586e+36", "0");
  setDefaultDecimalPlaces(88);
  t(
    "-2.39057598323185482880653335889673819782918758753816923265596358094613454063949e-11",
    "-1.827278721055513278108390527326581030880097649664835263207484732038111424823687505074844869625267227773665862232215578977844693849593713567109e-14",
    "1308.271122344683841010282697957137916332921057713371296398859563881854922584442611890764849",
  );
  setDefaultDecimalPlaces(90);
  t(
    "-1.63116347107582790692642394171640092396337447436024363922515165394526657865458136241184498071373751383479759406207563356343090503560645437145e+140",
    "1.15069151855533031299764313045439615856723e+16",
    "-1.4175506161058007204276513737212926225382304255109922011893518014705258607049166032362432741124590409819694717961125840250033766437939591956395735224008618691829698292761354949624600603832140260651118851326356101781e+124",
  );
  setDefaultDecimalPlaces(74);
  t(
    "8.423305278812779803734301596276205113955178558760801116394703856248451374495597409050093116466598018313903e-7",
    "-1.094349726481744052935337852952575495717398309998411472338686311e-20",
    "-76970872062015.33619447388832619046885165988273175352025885713021933538038849673140585845",
  );
  setDefaultDecimalPlaces(81);
  t(
    "7.2369784072307098078301175230914363914920151613626071713442469889579374352862418386068528132486236620798e+71",
    "4.613672100219785138870854268253920557949082376669e+11",
    "1.568594007121996414990744524719795127452672092396700945975606237878558911038492366747957404521120329866752313040664439225419997033370177478365e+60",
  );
  setDefaultDecimalPlaces(73);
  t(
    "-1.3727844402396153334728031410018986461139468e+43",
    "-1.9234735895849397331724781256274477146205687403521221093226869435100918437068674101311389026804e+82",
    "7.137006963198512826590505843245835e-40",
  );
  setDefaultDecimalPlaces(58);
  t(
    "3.91409218917293834197841557833428105378746780998323135022585235008965874144031822661e-10",
    "-3.6778433052982671225679374285168028990159823250715601789386603983879777697e+12",
    "-1.064235712145303541794800893893761719e-22",
  );
  setDefaultDecimalPlaces(96);
  t(
    "5.65345349135198966300101290063031208721522919006232527878228511741467714569960901919076757902465996921837663577266049934018167860526e-13",
    "-1.0617886470394440320463179528453137312190962120392975441034177997384019914886885671542941821876033368272747737560461250829799961094909575545982529e+56",
    "-5.324462177209520875818662525e-69",
  );
  setDefaultDecimalPlaces(91);
  t(
    "1.716268138518519184568532490258713430036628874386391816265021617711122033857538689902622234335264422099849783746857056478686862966e+2",
    "-4.005757336148499052043637522913296409832284654627290781677626721259068577715352156165064528790038995626791828141225946149991015e+128",
    "0",
  );
  setDefaultDecimalPlaces(67);
  t("5.60064655560871e-11", "1.3698962805704594831922887609075425892274859952435807036755987433314568687794168632e+58", "0");
  setDefaultDecimalPlaces(96);
  t(
    "-1.30961746504728742277267149126277102668012276086578179266958973849415782916878070474800752005250727234258419622e+86",
    "-7.1827596667801610785892613697677641731672956014314809176909387316806776973667181593009504957925909574003907968e-7",
    "1.82327897048287831986966477439144544473200074548197536809125856459338532338776946166652115795406614680705086251396195754690264157851543203073447514202949540477435763195022763047093693074117e+92",
  );
  setDefaultDecimalPlaces(72);
  t(
    "-3.4906012013799280076206219616366310078959718968301135228613229333012393332293871017128760446842231727709661362733451286e+75",
    "-1.07550695128936516193662755500813144120975131342198979e-9",
    "3.245540344667453200136561792628548695784477865235829690345080226648553258608781124511006395504244383066627134850893953364252355289068565860597248383484216527e+84",
  );
  setDefaultDecimalPlaces(36);
  t(
    "-1.416700560711774444685614141239829950081257927831193947073e+30",
    "-1.6007816675561848656038112429140471621086091885676695704670858941342347376890699147172878810108660755431392886992030925127602541492165475991103e+59",
    "8.850054e-30",
  );
  setDefaultDecimalPlaces(6);
  t(
    "2.2781363603385368528688947890290793707190170929886976729353815475155033493276069171845083639942693916617274958781754e+44",
    "1.7122712892640469269649517258515156428e+9",
    "1.33047629462835002653166793557397436535641e+35",
  );
  setDefaultDecimalPlaces(78);
  t(
    "3.98204022780898258395764989040185071039321448843615760695066917773445778350433868123703641563e+57",
    "3.8064693294116020425066195889555469501862536572233448997437315597498518350271083024688652577e+50",
    "10461243.433753136297787504235417135503570760859027140411414202008704804999652853148194",
  );
  setDefaultDecimalPlaces(70);
  t(
    "8.8398482874581504605069416005201823515270917518101238199358031547015449311595340985028e+23",
    "-2.342736799671715977336221540291500278634389127070877530610462834697e+66",
    "-3.77329979564792105376013829e-43",
  );
  setDefaultDecimalPlaces(100);
  t(
    "1.23408904489657576905285748591873670158366244214497803610326e+30",
    "4.1941649837350334985079732639806099770700226445142897205844674960511906443381483731410414613877761190429994714920189892598108961924595758653731453e-17",
    "2.94239508861089519390378033844232553616638208946657864206028704926312963940566293719388918996370902801433383063627937912331102493559483070594825077e+46",
  );
  setDefaultDecimalPlaces(81);
  t(
    "2.40609095899566353468548076541772649904318938402154411414864390469756726355600327524757167905704516269636888e+53",
    "-2.56193360237616872409942119202911070047400006750589985837010070129432054542693582783835644959431415337524631747880797618773879312243851261e-17",
    "-9.39169913210880001065843352879512852376421317286135061032878431430237603372457921017976833659789702438148072980635952929245262308808649199445557568637e+69",
  );
  setDefaultDecimalPlaces(46);
  t(
    "7.8547755229006715666647972745744113587410823621861760433105835924e+51",
    "-1.3021517176919248437001537629938595532953411621314280529578252064504837295221103472537357335158042213319625661037516696333106e+24",
    "-6.032150797929544617443098844350574977693094645113583607833847498051959423e+27",
  );
  setDefaultDecimalPlaces(14);
  t(
    "-2.25099376764183486260203639400302402168344452802477776122949331497284860138970886165380571190469552698391560018700980463444366608e-20",
    "-1.45326588044397832499125596193126647128335188009750349365576043616688579726049479193295145315334215835903682038231665517485643118291059e+106",
    "0",
  );
  setDefaultDecimalPlaces(21);
  t(
    "1.864891087878797713658007518614075420600202466095484210742064731816345302463255309953509703093057809189699246388537020302186097820484e+44",
    "-9.69756728011951616172274362980318970843466256625215926e-16",
    "-1.92305042492658442592352488059314393702425144162380476830274985676638731858380457e+59",
  );
  setDefaultDecimalPlaces(46);
  t(
    "-3.5152014353390771336581019471861626301150042285094218525169314147489e+50",
    "-6.3526697136691071087616319247782159608853187209918129025750501978131017389349537963705696439e+5",
    "5.533423889133383956328855660010040048083025704227934965817720012853306171164002938046592365e+44",
  );
  setDefaultDecimalPlaces(100);
  t(
    "1.0920570316397e+13",
    "-7.3756662090490062481440614041260714374062141472168169126866310233461696521749844597137020579935170433502724498e-6",
    "-1480621547515103973.3060445240959569467689860185005216641485119826464504958069297639063508502123872890946262542786488306",
  );
  setDefaultDecimalPlaces(16);
  t(
    "-3.7586011110135469694065746800236482055865853970223964922997550417152387745e+51",
    "-1.79531021457823724020007260892133577247734347182161351665325823359254432442069020561633229780478686415728614454452194253932e+60",
    "2.0935663e-9",
  );
  setDefaultDecimalPlaces(85);
  t(
    "2.50651847918847594398212687422687181430602781498773684013181729649355577227544239317117869559866836622071049812179638901803075806e+82",
    "9.660878690632447984752994565364561583438380177846425e+48",
    "2.59450362586468528052791553577717118762215378353206164992932065628419631581183182404821422203929946219702540750973773e+33",
  );
  setDefaultDecimalPlaces(27);
  t(
    "-1.09803657088767615669749686794250656011807335925553385051734754331135158083008400668513773388697675936388623123251450394314512461352212e+14",
    "1.275871648212772015956333696908706582931851120188162966783282453808926930973941503110865566984007331663113449698808963240744056618072217e+9",
    "-86061.679670192105867481971596068",
  );
  setDefaultDecimalPlaces(5);
  t("2.657035899121e+9", "4.577384724717e+7", "58.04703");
  setDefaultDecimalPlaces(25);
  t(
    "2.256783728536238295564781177103117408097496774931826848855740198025048243933188680605738085892009490452579660483966e+94",
    "6.661820464353693086661142e-8",
    "3.38763816979445376342434399758796309327927377286775754702717790366457927416116397460798809076273984737520848807181156147517978e+101",
  );
  setDefaultDecimalPlaces(0);
  t(
    "6.34858971634518700940176651129421211064935739263659647000210069792477390258143493907252900023781160457558631423634e+27",
    "1.25004424752331711228680986069290184295684689676443695738372444605318771227683530110370847786211740389077545751420862907473178637096964544366943e+143",
    "0",
  );
  setDefaultDecimalPlaces(92);
  t(
    "1.33714584749060238826647302456035769834256333640020660043170500625404860644800033913713974161251336941141987490607986596243562036109463733696e+52",
    "-2.811117694e+8",
    "-4.756634168482461226564614354280243445198717234498708258038893074727480999050622955301777349250014607931317282321086147887323640321032525e+43",
  );
  setDefaultDecimalPlaces(0);
  t(
    "-2.70363048736662982386249028280695468309713918327469827002312892586049110577176007827022938249566693854e-1",
    "3.25927288896748347918399344388131261397364042621543405514328774337224547274e+61",
    "0",
  );
  setDefaultDecimalPlaces(3);
  t("5.3220496148388866295049738103239192964546660189253717083781465304822556696166282826819207661487702087997118e-4", "-2.3050808169316681787696074818233203091e+38", "0");
  setDefaultDecimalPlaces(46);
  t(
    "-2.79512981791840083277452448780552490495312347134193053125832910135619686992374507802956236721553254616418477809309051678961955e+2",
    "1.76718864504695576412116026943932162302193478927528825195488729271140528931655450633951416425319486512598042135266729216e+37",
    "-1.58168163073e-35",
  );
  setDefaultDecimalPlaces(47);
  t("4.456762747154e+11", "-9.021746970583435698483715697782223337668541971027938950740459979882306147095908881912686167114216081310339830692689715452571e+123", "0");
  setDefaultDecimalPlaces(64);
  t(
    "-6.47240051607150104442858232963635896376012073465005e+36",
    "-2.781171517267855735966556621627543680867328790793578536348444640015752344221193704517296269239489281261516873041916653924877182193694026821917e+15",
    "2.327220912441173103733425902464217207996852085276008146140053372892293021172412360514e+21",
  );
  setDefaultDecimalPlaces(37);
  t(
    "-9.20789160491844560834849636560494124674857708414439065441338848895575972508650286472709219598886855844881320328153e-1",
    "2.54689997701022e+0",
    "-0.3615333027615594071210070529674818998",
  );
  setDefaultDecimalPlaces(87);
  t(
    "-5.980449913799611823333087456094242852020728167244997564881674357676568020739686711301146e-10",
    "-1.22806968695170168176866929703600854610267222786485489017202296969198531094659919e+31",
    "4.8697968668571287861537211408075020503574850998e-41",
  );
  setDefaultDecimalPlaces(20);
  t(
    "1.7266537932659569879922556324610399499812669099147132572682e+30",
    "-1.84143564478277205005977609764625457369423855445813646506735317809561836989014391371827903882916239603232553198143378834181953806862981e+2",
    "-9.3766719361492782995814627485153369667672325486e+27",
  );
  setDefaultDecimalPlaces(36);
  t(
    "-1.440542682574333515129504285871046398183888772664582852743641518583799e+39",
    "-4.24757810513780006017991716522543837425863843816776551086815159418687806025499575726128548715159544780707287520760720065457057014993624274137e-7",
    "3.391444834956364822146380884057457373051929259773150209581320201812098517892117706e+45",
  );
  setDefaultDecimalPlaces(47);
  t("-1.198521649009267846611569071179e+2", "4.15204968677392109764169174889176557646288645137399761968704002471700663248188486768159254398233894546e+101", "0");
  setDefaultDecimalPlaces(12);
  t("2.5228153801078029834979898272396007157951610761991105349689420878e+44", "2.295301134e+3", "1.09912174169117235468502575455077552181227697515663342e+41");
  setDefaultDecimalPlaces(3);
  t(
    "-6.4129064248638406129657094221862482675535570473211738094939354566341856822392503572036181617260659112897167094906666867754130450258694666261307024462e+148",
    "-6.1e+1",
    "1.051296135223580428355034331505942338943206073331339968769497615841669783973647599541576747823945231358969952375519128979575909020634338791168967614131e+147",
  );
  setDefaultDecimalPlaces(25);
  t(
    "-1.1503190451667290783403979838644101779184816080940096381222490182727371783674598603818366251476983375120305437012963160923640983675401253e+87",
    "6.310294150184431729942059363669918840713316630010989512625054086e+27",
    "-1.822924601911162199232751186304919466305513506671389974705826679974200245657724745271e+59",
  );
  setDefaultDecimalPlaces(21);
  t(
    "1.43106066875359393630546545461458247769762255159490356043659038242179142332927334e+80",
    "-5.6241921820939846931777297852017232074020563943819520369656770820027031932950925607e-6",
    "-2.5444732726412366794237213584412671162365857386244105464740971151532051942468485754205769105946383723507405e+85",
  );
  setDefaultDecimalPlaces(73);
  t(
    "-1.443780405946236510135664912013943817708807169840842375755226e-13",
    "1.7957646647613006155607922847465072846998150258403646747225159079595681787684002403338199733475907021117732370937272909817e+38",
    "-8.039919897511453167964e-52",
  );
  setDefaultDecimalPlaces(21);
  t("5.902043471756052783177506587e+23", "-3.6678853239230722272191628972901522458533073894675097026714168651844689867297608066e+29", "-0.000001609113412914279");
  setDefaultDecimalPlaces(99);
  t(
    "-6.830139364455047102216914e+8",
    "2.9566137656148231829493540434115787212550717753e-10",
    "-2310122290536900873.336346717353642467367485927061706053157369569313824846406182417647905881643484450055292152532299412",
  );
  setDefaultDecimalPlaces(99);
  t(
    "-6.72117376165e+10",
    "-1.590188726615277824601147908664315209813326884779396039880434109273995904506056204973195478553420765885988871221755454371279689038829e-17",
    "4.226651622638554025489952163758643416988517407430201482893786101279134580475890678414727127846395535198946079088817092058611672e+27",
  );
  setDefaultDecimalPlaces(27);
  t(
    "6.7504417031434390890755259836455183015387181114798572100688137637248927346346223869331853018762158397866179502997029516970513562219634329567e+119",
    "-4.952492602188036614568761566518622893096537944e-7",
    "-1.363039230015418770480985191497379153848996645622180457561838229137957142703750836900056753263428452157318371244844787502813524613699231845612274095830652e+126",
  );
  setDefaultDecimalPlaces(54);
  t(
    "-7.47085006467964256852512696080051956574022869072944186376598940236339105377827521606509320773252448036822534446e-7",
    "-4.5584099988123933885406466465616290385382463785420311134342558990823032641484301830503119e-5",
    "0.016389157769103765964028976812781461576541301640012178",
  );
  setDefaultDecimalPlaces(83);
  t("-1.7419258613974731819351332928e-1", "4.8561238063371250366171381124618121899466931334314196074221448048416e+67", "-3.58707053375431e-69");
  setDefaultDecimalPlaces(73);
  t(
    "-1.583292043330168851109e+18",
    "-5.040757522960445953571802877232160876835102448172e+9",
    "314098037.0744551482069867815181999438208135278723796027935562927792725727318044766",
  );
  setDefaultDecimalPlaces(11);
  t(
    "-1.71143726302650648792071808877208293462055502519202007732805410560409269910157257897615730386893976105223757918088363874141645224839844e+10",
    "8.634e+4",
    "-198220.66979690832",
  );
  setDefaultDecimalPlaces(50);
  t(
    "-7.61034639291705544353615526814200529060283145851527690381e+23",
    "3.856819807239682567993396883058343749781518361787080267736219565590715661939915563050408446797809327672715165532462858115191011630719e+132",
    "0",
  );
  setDefaultDecimalPlaces(65);
  t(
    "-6.9762617367480320221470074226512309281964400937266131777517734696017375121983548794326913113772265018581819648551e-12",
    "8.09529460497624586044814328505338418512128511425103779351084675750809073e+30",
    "-8.6176749299026932293302e-43",
  );
  setDefaultDecimalPlaces(56);
  t("-2.7e+0", "-1.460132617073082538928054577344538593092004768572376923152109965845016998462195112417234007515672805990982898665532117130952311812e+59", "0");
  setDefaultDecimalPlaces(99);
  t(
    "-5.811734020975191019744237024668343524408345277348984683642719e+23",
    "3.64776705639375950733679976277951183809597585019679719324139899236113787013435537805575119365150517917771101630178773e+116",
    "-1.59323e-93",
  );
  setDefaultDecimalPlaces(38);
  t("1.5812454176530499548674889e+17", "-4.3246601752932597830177584214403165301878e+40", "-3.65634605624434e-24");
  setDefaultDecimalPlaces(38);
  t("-3.83043534003857067089263554917752490759500882e-14", "-1.689630344273592251102278836599045967272212654251335161528706e-14", "2.26702565624515679169993773977076342116");
  setDefaultDecimalPlaces(18);
  t("-2.502769009165348848797211562860804111439e+27", "6.4816131262426455020532923646632415766778284244499108221345060492980344372161562e+73", "0");
  setDefaultDecimalPlaces(18);
  t(
    "9.2131232268514188823495034603747812093192879417592353765293660073653609909422963802025775209363844738430698e+106",
    "-1.1715161061592004802147726041069963283741e+36",
    "-7.8642736351756334650760381440235594160542212797058719636210366789586992109719308016386637e+70",
  );
  setDefaultDecimalPlaces(26);
  t("-1.20298354020266545e+13", "1.553157356279070253964442392430118211793129690640033268681620170489819125e+16", "-0.00077454067055039218342002");
  setDefaultDecimalPlaces(55);
  t("-1.89287e+4", "5.77199242025722167180263092627239495163122148330579444740599160017687542723438068950361879152185297045497350924042571118303966143176974183644e+77", "0");
  setDefaultDecimalPlaces(9);
  t(
    "-5.27560795539545355e+2",
    "8.5939472324813851718886144174168149093097620828452087902541099228713240547408493396190498851701976972785877263203247e-15",
    "-61387483686843555.733575546",
  );
  setDefaultDecimalPlaces(49);
  t(
    "-1.933155169772037523127077374442763437250286979829555e+46",
    "-7.8800336350699184075821817776947772058185178e-7",
    "2.45323212983326931539466548683697104260133521220456141737160990093712628560026286698789403082280975739e+52",
  );
  setDefaultDecimalPlaces(93);
  t(
    "6.523038980923965699011111403139444517498137430696e+40",
    "4.855693029236416545358544131427115439421496567533504516197235131243310139954098601052056595697935745868218909723184821e+16",
    "1.343379604445412839095475568863245124423879757277598983963344671220349588800979378675929041410980460696334038279649623e+24",
  );
  setDefaultDecimalPlaces(1);
  t(
    "-2.74604898554454619502856595534567016912367154863e+47",
    "3.962133497693724163882013656620871907236035296931966142172413815892110360267553032046746538693539677611256354e-16",
    "-6.930733119272645474930816835365084548228793262669334842860798705e+62",
  );
  setDefaultDecimalPlaces(43);
  t(
    "-1.0001227676424422231364169245567388649500607148685420700868244718375241689789153616132807054315682589545862430046054822830816406904e+78",
    "-1.011639043375458565019581253273811436497002772436263898851530315451611798947892459591145152e+78",
    "0.9886162205695513034942161330237927305624084",
  );

  setDefaultDecimalRoundingMode(1);
  setDefaultDecimalPlaces(92);
  t("2.11074887e-15", "5.201532e+3", "4.0579369116637175355260719341916958311512838909767353156723826749503800034e-19");
  setDefaultDecimalPlaces(45);
  t("6.0408e+4", "-1.04310038966e+11", "-5.79119714639259892307535579949847489927e-7");
  setDefaultDecimalPlaces(30);
  t("-3e+0", "-1.67234861806e+11", "1.793884341818714583e-11");
  setDefaultDecimalPlaces(5);
  t("-6.2163189e+0", "-3.90185509384e+9", "0");
  setDefaultDecimalPlaces(5);
  t("-2.9813379579e+1", "-4.4142e+2", "0.06754");
  setDefaultDecimalPlaces(60);
  t("-7.979e+1", "1.632e+0", "-48.890931372549019607843137254901960784313725490196078431372549");
  setDefaultDecimalPlaces(93);
  t("-3.81666e+3", "1.1434991889e-17", "-333770241120282092401.228812100296890730920919851296975414933763928968887439147006464483553425981796076812241278888");
  setDefaultDecimalPlaces(60);
  t("2.555e-16", "2e+0", "1.2775e-16");
  setDefaultDecimalPlaces(8);
  t("-1.71427920814e+10", "-3.7e+0", "4633187049.02702703");
  setDefaultDecimalPlaces(70);
  t("2.7706e+3", "1.14e+2", "24.3035087719298245614035087719298245614035087719298245614035087719298246");
  setDefaultDecimalPlaces(87);
  t("-7.9083e+4", "2.24581e-14", "-3521357550282526126.430998169925327610082776370218317667122330027918657410911875893330246102742440366727372");
  setDefaultDecimalPlaces(0);
  t("-2.1517789e+1", "-3e+0", "7");
  setDefaultDecimalPlaces(31);
  t("-5.5e+0", "7.28606e-20", "-75486614164582778621.0928814750358904538255243574717");
  setDefaultDecimalPlaces(52);
  t("-9.67767631e+0", "2.244611e-19", "-43115160310628434058.2844867106148905088676835318012787070900035685470667");
  setDefaultDecimalPlaces(0);
  t("-1.1e+0", "-5.151272739e+9", "0");
  setDefaultDecimalPlaces(30);
  t("-1.12178e+4", "-7.85e+1", "142.901910828025477707006369426752");
  setDefaultDecimalPlaces(37);
  t("1.05798069514e+10", "3.54e-14", "2.988646031468926553672316384180790960451977401129943502824859e+23");
  setDefaultDecimalPlaces(42);
  t("7.91102923e+3", "-3.59023901e-12", "-2203482611593594.154613121425584420910183358516847044119216");
  setDefaultDecimalPlaces(38);
  t("-1.15452214e+2", "9.76e+1", "-1.18291202868852459016393442622950819672");
  setDefaultDecimalPlaces(26);
  t("-1.9e+0", "8.78e+1", "-0.02164009111617312072892938");
  setDefaultDecimalPlaces(26);
  t("8e+0", "8.60623653e-17", "92955846287901176.24155049803168726063353966");
  setDefaultDecimalPlaces(34);
  t("0e+0", "3.24398e+4", "0");
  setDefaultDecimalPlaces(66);
  t("1.0713341298e-13", "-1.1e+0", "-9.73940118e-14");
  setDefaultDecimalPlaces(43);
  t("-3.571229055e+6", "-4.3532637996e+1", "82035.6683950130169823398266819796058931213500908");
  setDefaultDecimalPlaces(4);
  t("4.62e+2", "-1.263e+3", "-0.3658");
  setDefaultDecimalPlaces(43);
  t("2.4726049686e-11", "-1.527014874e-1", "-1.619240919456819907832803467505713e-10");
  setDefaultDecimalPlaces(23);
  t("-2.62e-8", "-3.445e+3", "7.60522496372e-12");
  setDefaultDecimalPlaces(4);
  t("-4e+0", "4.19594554008e-8", "-95330121.9425");
  setDefaultDecimalPlaces(94);
  t("-3.50283e+2", "1.44e+1", "-24.3252083333333333333333333333333333333333333333333333333333333333333333333333333333333333333333");
  setDefaultDecimalPlaces(65);
  t("4.59483e-16", "-3e+0", "-1.53161e-16");
  setDefaultDecimalPlaces(53);
  t("2e+0", "4.7486368e+1", "0.04211735039411731804799221536589195450787055350284949");
  setDefaultDecimalPlaces(79);
  t("-2.8293390912e-5", "-4.92142e+4", "5.749029936888133912569949323569213763507280419066041914731926964168878e-10");
  setDefaultDecimalPlaces(6);
  t("1.1e+0", "-8.79345192697e-9", "-125093081.662986");
  setDefaultDecimalPlaces(85);
  t("0e+0", "-3.069e+2", "0");
  setDefaultDecimalPlaces(66);
  t("4.085e-3", "-4.62933537695e+1", "-0.000088241608511227999635499599272557733283368440355745783768430414");
  setDefaultDecimalPlaces(59);
  t("-2.3253e+3", "6.8e+1", "-34.19558823529411764705882352941176470588235294117647058823529");
  setDefaultDecimalPlaces(17);
  t("-3.8614049595e+3", "3e+0", "-1287.1349865");
  setDefaultDecimalPlaces(97);
  t("8.873374484e+7", "-1.9410233e-2", "-4571493028.4453566322465062629593369641673028860601518796811970263314201328752725430962111583101552670696946");
  setDefaultDecimalPlaces(27);
  t("-7e+0", "-4.93480947659e-9", "1418494479.514752446966869700541514255");
  setDefaultDecimalPlaces(8);
  t("2.759529e+1", "-3.138822623e-7", "-87916054.24847226");
  setDefaultDecimalPlaces(75);
  t("2.2e+0", "8.1826e+4", "0.000026886319751668173930046684427932442011096717424779409967491995209346662");
  setDefaultDecimalPlaces(28);
  t("-3.39985022e-20", "1.785746588e+6", "-1.9e-26");
  setDefaultDecimalPlaces(68);
  t("7.149e+3", "-2.9105e+4", "-0.24562789898642844872015117677375021473973544064593712420546297886961");
  setDefaultDecimalPlaces(79);
  t("-2.9e+2", "7.6459e+0", "-37.9288245988045880798859519481029048248080670686250147137681633293660654729986006");
  setDefaultDecimalPlaces(47);
  t("-3.12e+1", "-2.192359312e-10", "142312438609.97179462341709432345093622135238751411383609914");
  setDefaultDecimalPlaces(55);
  t("-4.3e+0", "-1.373952952e+4", "0.0003129655927257689679609931796267213085765108498416764");
  setDefaultDecimalPlaces(2);
  t("2.4e+0", "2.49765901122e+4", "0");
  setDefaultDecimalPlaces(61);
  t("3.567934362e+7", "1.7925455e+2", "199042.8896783931007609011877243841230250501312240051926157522919223");
  setDefaultDecimalPlaces(98);
  t("-1.11898263e+8", "-1.241596e+3", "90124.53567827215938195677176795028334498500317333496564099755476016353145467607820901484863031130899262");
  setDefaultDecimalPlaces(62);
  t("5.047313e+2", "2.14806e+5", "0.00234970764317570272711190562647225868923586864426505777306034");
  setDefaultDecimalPlaces(47);
  t("3.60621141e+8", "-1.27229e+0", "-283442564.98125427378978063177420242240369727027643068797");
  setDefaultDecimalPlaces(3);
  t("-2e+0", "-8.27289361e+2", "0.002");
  setDefaultDecimalPlaces(40);
  t("-1.58277e+1", "4.373e-17", "-361941458952664075.0057168991538989252229590670020580836954");
  setDefaultDecimalPlaces(67);
  t("7.45738e+2", "-1.004239e+4", "-0.0742590160310444027766298659980343324646822121028958245995226235986");
  setDefaultDecimalPlaces(96);
  t("0e+0", "-6.612015e+2", "0");
  setDefaultDecimalPlaces(26);
  t("-3.17523301e+2", "-1.5e+0", "211.68220066666666666666666667");
  setDefaultDecimalPlaces(25);
  t("1.9238253126e-16", "-5.40045e+2", "-3.562343e-19");
  setDefaultDecimalPlaces(5);
  t("-3.564264733e+3", "7.9176034e+3", "-0.45017");
  setDefaultDecimalPlaces(55);
  t("9.8043e+0", "-5.95521022461e-15", "-1646339865464963.0857542624540083574223550201193306249480955886372184753");
  setDefaultDecimalPlaces(57);
  t("7.51e+0", "1.08e+2", "0.069537037037037037037037037037037037037037037037037037037");
  setDefaultDecimalPlaces(63);
  t("2.24e+1", "4e+0", "5.6");
  setDefaultDecimalPlaces(13);
  t("-6.03101557639e+8", "1.10296e-5", "-54680274682581.4172771451367");
  setDefaultDecimalPlaces(73);
  t("4.43609e-5", "6.81323119485e+10", "6.510992909433575875655432881776487981377897920753984437206e-16");
  setDefaultDecimalPlaces(43);
  t("3.901985e-20", "8.511401e-16", "0.000045844215306034811425287094333823538569");
  setDefaultDecimalPlaces(12);
  t("-4.633e-4", "6.73557e+4", "-6.878e-9");
  setDefaultDecimalPlaces(27);
  t("-1.06e+0", "2.6992e+1", "-0.03927089508002371072910492");
  setDefaultDecimalPlaces(17);
  t("-5.905272095e-11", "6.392e-15", "-9238.53581821026282854");
  setDefaultDecimalPlaces(99);
  t("-6.847e-2", "1.34394772e+7", "-5.094692225081493497380984432936126414203076292283155181066120637490273803210142727873372932e-9");
  setDefaultDecimalPlaces(49);
  t("2.5631406418e+4", "-1.4510754e+7", "-0.0017663731614497771790494139725613155594809201507");
  setDefaultDecimalPlaces(52);
  t("-5.8917519e+2", "-2.17529e+1", "27.0849031623369757595538985606516832238460159335077162");
  setDefaultDecimalPlaces(38);
  t("-2.437e+0", "-1e+0", "2.437");
  setDefaultDecimalPlaces(23);
  t("3.897578e+5", "-3.47704e+0", "-112094.71274417320479488300393");
  setDefaultDecimalPlaces(4);
  t("-9.8196710807e+0", "7e+0", "-1.4028");
  setDefaultDecimalPlaces(74);
  t("3.4146e+1", "1.08e+0", "31.61666666666666666666666666666666666666666666666666666666666666666666666667");
  setDefaultDecimalPlaces(78);
  t("3.855703e+4", "-3.8559e-11", "-999948909463419.694494151819289919344381337690292798049741953888845665084675432454161155631629");
  setDefaultDecimalPlaces(52);
  t("1.26594145e+5", "4.63335186e-19", "2.73223680879699043620658673654022899957353983472345223528955126667198549432e+23");
  setDefaultDecimalPlaces(43);
  t("9.42028e+0", "-3.0955333647e+6", "-0.0000030431847730747865584457804632752631109");
  setDefaultDecimalPlaces(45);
  t("-1.5939e+2", "-4.65404866e+3", "0.034247600668618707566327851845021319566521249");
  setDefaultDecimalPlaces(57);
  t("-7.11143141e-11", "8.3507e+0", "-8.515970409666255523489048822254421785000059875e-12");
  setDefaultDecimalPlaces(25);
  t("9.91854830348e+11", "1.9456e+1", "50979380671.6694078947368421052631579");
  setDefaultDecimalPlaces(96);
  t("1.5914e+3", "-8.0507038e+4", "-0.019767215879933379240706880807116515701397435588178017429979227406180314322332912061675899689664");
  setDefaultDecimalPlaces(84);
  t("-5.9778e+2", "-4.8245388e+2", "1.23904071410929475787405834522462540875409686828510944921823408281015379128052613029");
  setDefaultDecimalPlaces(21);
  t("-9.5079771113e-18", "5.3166e+1", "-1.79e-19");
  setDefaultDecimalPlaces(66);
  t("1.451e+1", "1.0335e-5", "1403967.102080309627479438800193517174649250120948234155781325592646347363");
  setDefaultDecimalPlaces(48);
  t("6.559098e-17", "-4.194e+3", "-1.5639241773962804005722460658e-20");
  setDefaultDecimalPlaces(34);
  t("-8.38359e+0", "5.9841e+4", "-0.0001400977590615130094751090389532");
  setDefaultDecimalPlaces(36);
  t("3.089046e+5", "1.1383e+0", "271373.627339014319599402617939031889660019");
  setDefaultDecimalPlaces(16);
  t("3e+0", "-1.388527768e-17", "-216056176126828455.3312584527297692");
  setDefaultDecimalPlaces(26);
  t("2.899677e+5", "4.1264e+1", "7027.13503295851105079488173711");
  setDefaultDecimalPlaces(67);
  t("-2e+0", "-4.4747e+0", "0.4469573379220953360001787829351688381344000715131740675352537600286");
  setDefaultDecimalPlaces(4);
  t("2.941551513e+9", "-6.056417003e+10", "-0.0486");
  setDefaultDecimalPlaces(41);
  t("-2.30510216e-19", "4.8819426543e+8", "-4.7216903663743e-28");
  setDefaultDecimalPlaces(60);
  t("-2e+0", "1.8458109205e+5", "-0.000010835346013979767219607800559656511144799026558798604746");
  setDefaultDecimalPlaces(83);
  t("-9.745e+1", "-4.8934339e+2", "0.19914440859209317203610331795837683635616289820528688453317005058554075901587226916");
  setDefaultDecimalPlaces(47);
  t("1.997e+3", "1.5248138e-11", "130966810504994.11797033841115551288950821405210262394005090982");
  setDefaultDecimalPlaces(35);
  t("-2.04e-5", "2.350322598e+9", "-8.67965955710050999561e-15");
  setDefaultDecimalPlaces(13);
  t("-7.04e+2", "-9.24e+1", "7.6190476190476");
  setDefaultDecimalPlaces(57);
  t("3.11723735896e+2", "1.3219983e-13", "2357973802961773.854020841025287248856522735316679302840253274153226974649");
  setDefaultDecimalPlaces(82);
  t("-1.69e+0", "1.3e-6", "-1300000");
  setDefaultDecimalPlaces(99);
  t("3.31924794e-15", "6.0343918476e+9", "5.50055088205803574339297932469253722382348924476563022459960278168529056926e-25");
  setDefaultDecimalPlaces(73);
  t("-2.550616e+3", "4.5079e+4", "-0.0565810244237893475897868186960669047671864948202045298254176002129594712");
  setDefaultDecimalPlaces(43);
  t("1.1327e-13", "5.065576455e+6", "2.23607324864668339114033e-20");
  setDefaultDecimalPlaces(94);
  t("2.4e-16", "-2.1986394097e+4", "-1.09158418129486510677458452908945872062160371089977010521699464650508488518e-20");
  setDefaultDecimalPlaces(27);
  t("1.429093137e+5", "7.6e-15", "18803857065789473684.210526315789473684210526316");
  setDefaultDecimalPlaces(9);
  t("3.642684e+4", "-5.51e-20", "-6.61104174228675136116152450090744e+23");
  setDefaultDecimalPlaces(76);
  t("4.65985882e+7", "-1.36e+1", "-3426366.7794117647058823529411764705882352941176470588235294117647058823529411764706");
  setDefaultDecimalPlaces(0);
  t("-1.52013168692e+5", "1.26867e+2", "-1198");
  setDefaultDecimalPlaces(58);
  t("-2.65906219e-17", "-8.8326589031e+10", "3.010488935632676169521128442363e-28");
  setDefaultDecimalPlaces(34);
  t("4.93011e+3", "-9.4058645e+3", "-0.524152777238073119169428817521239");
  setDefaultDecimalPlaces(34);
  t("-5e+0", "-2.08e+0", "2.4038461538461538461538461538461538");
  setDefaultDecimalPlaces(17);
  t("-1.0355e+1", "-5.112069e+6", "0.00000202559863726");
  setDefaultDecimalPlaces(13);
  t("-1.2268e+4", "-9.217e-8", "133101876966.4749918628621");
  setDefaultDecimalPlaces(59);
  t("7.425e+1", "-4e+1", "-1.85625");
  setDefaultDecimalPlaces(30);
  t("-5.659039972e+1", "1.099497843e+1", "-5.14693139966441935075265081716");
  setDefaultDecimalPlaces(96);
  t("-6e+0", "-1.12e-13", "53571428571428.571428571428571428571428571428571428571428571428571428571428571428571428571428571428571428571429");
  setDefaultDecimalPlaces(82);
  t("1.30602711055e+7", "5.2884219e+2", "24695.970466161181277915818327580861126076192975450767269532712584826108522090493574274");
  setDefaultDecimalPlaces(52);
  t("1.4827003318e+4", "-2.13738574e+10", "-6.936980555507963667802892705740611893480677943e-7");
  setDefaultDecimalPlaces(2);
  t("3.75e+1", "7.619065e+6", "0");
  setDefaultDecimalPlaces(35);
  t("-1.448e+2", "-8.021e+2", "0.18052611893778830569754394713876075");
  setDefaultDecimalPlaces(75);
  t("-2.46e-9", "4.5704836e+3", "-5.38236260162928929446328174112691269694086638884340379210637579e-13");
  setDefaultDecimalPlaces(31);
  t("3e+0", "-4.17903e+4", "-0.0000717869936324936647978119324");
  setDefaultDecimalPlaces(100);
  t("7.4247621011e+2", "9.41565e-10", "788555447696.1229442470780031118403933876046794432673262069002140054058933796392176854492254916017481533404491458");
  setDefaultDecimalPlaces(29);
  t("3e+0", "-1.7e+1", "-0.17647058823529411764705882353");
  setDefaultDecimalPlaces(66);
  t("-2.3e+0", "8.101598406e+1", "-0.028389459520687083535994267351493798543635192869864895152148078469");
  setDefaultDecimalPlaces(48);
  t("-8.377755e+5", "-1.61886e+1", "51750.954375301137837737667247322189689040435862273452");
  setDefaultDecimalPlaces(44);
  t("2.9029e+2", "-5.32e+0", "-54.56578947368421052631578947368421052631578947");
  setDefaultDecimalPlaces(75);
  t("4.7488114e-8", "-2e+0", "-2.3744057e-8");
  setDefaultDecimalPlaces(24);
  t("1e+0", "6.25326040382e+11", "1.599165771809e-12");
  setDefaultDecimalPlaces(21);
  t("1.657375e+4", "8.7890672e+7", "0.000188572343604336078");
  setDefaultDecimalPlaces(18);
  t("2.4624e+2", "2.605e+0", "94.525911708253358925");
  setDefaultDecimalPlaces(50);
  t("1.02864e+1", "-2e+0", "-5.1432");
  setDefaultDecimalPlaces(83);
  t("0e+0", "7.5278e-9", "0");
  setDefaultDecimalPlaces(33);
  t("-4.10950179e-8", "5.6e+0", "-7.338396053571428571428571e-9");
  setDefaultDecimalPlaces(88);
  t("6.99984e+2", "-3.5937571058e-12", "-194777771394257.2595997954047370610140916441231569223433853808339925898616918151764312262441718411586034");
  setDefaultDecimalPlaces(60);
  t("0e+0", "1.991171e+6", "0");
  setDefaultDecimalPlaces(67);
  t("-3e+0", "1.085e+3", "-0.002764976958525345622119815668202764976958525345622119815668202765");
  setDefaultDecimalPlaces(51);
  t("-2.7971927097e+2", "1.1e+1", "-25.429024633636363636363636363636363636363636363636364");
  setDefaultDecimalPlaces(47);
  t("-2e+0", "-4.2e+0", "0.47619047619047619047619047619047619047619047619");
  setDefaultDecimalPlaces(9);
  t("3e+1", "1.461005e+0", "20.53381063");
  setDefaultDecimalPlaces(17);
  t("0e+0", "1.15e+2", "0");
  setDefaultDecimalPlaces(45);
  t("4.5984828e+3", "-1.27382076e-18", "-3.609992036870242246640728323504477976948656418505850069518414819994e+21");
  setDefaultDecimalPlaces(33);
  t("5.39e+1", "1.077063535e+7", "0.000005004347306215319971815775937");
  setDefaultDecimalPlaces(35);
  t("-1.52336849e-11", "-9.85033366722e-14", "154.65146069817663960828354945574430145");
  setDefaultDecimalPlaces(90);
  t("-5.5584945243e+8", "-3.31e+2", "1679303.481661631419939577039274924471299093655589123867069486404833836858006042296072507552870091");
  setDefaultDecimalPlaces(10);
  t("5.7362851e+1", "9.5135e+2", "0.0602962643");
  setDefaultDecimalPlaces(77);
  t("-1.406e+3", "-4.27e+1", "32.92740046838407494145199063231850117096018735362997658079625292740046838407494");
  setDefaultDecimalPlaces(48);
  t("3e+0", "-6e+0", "-0.5");
  setDefaultDecimalPlaces(58);
  t("-6.5244809793e+10", "1.46948e+2", "-443999304.4682472711435337670468465035250564825652611808258703759153");
  setDefaultDecimalPlaces(50);
  t("-6.8053785297e+7", "8.0978e+5", "-84.03984452196892983279409222257897206648719405270567");
  setDefaultDecimalPlaces(62);
  t("5.88e+0", "-7.8142e+3", "-0.00075247626116557037188707737196386066391953111003045737247575");
  setDefaultDecimalPlaces(72);
  t("-1e+0", "3.8579521512e+5", "-0.000002592048736760392820291337365511491676066073030149094089676847623003");
  setDefaultDecimalPlaces(66);
  t("-4.6e+0", "7.746895e+5", "-0.000005937862846985792372298837147011802793248133607077416177707327");
  setDefaultDecimalPlaces(25);
  t("1.801754007e+5", "9.12239887e+7", "0.0019750879485496559963509");
  setDefaultDecimalPlaces(6);
  t("1.3402098e+0", "-5.176489e-5", "-25890.324504");
  setDefaultDecimalPlaces(49);
  t("6.73591e+0", "1.83355e-20", "367369856289711215947.2062392626325979656949633225164298764691445556434");
  setDefaultDecimalPlaces(65);
  t("-1.275947e+4", "4.72e-8", "-270327754237.28813559322033898305084745762711864406779661016949152542372881356");
  setDefaultDecimalPlaces(22);
  t("-1.855377294e+2", "-5.1907933018e+7", "0.0000035743617326403941");
  setDefaultDecimalPlaces(50);
  t("-4.14581607e-2", "9e+0", "-0.0046064623");
  setDefaultDecimalPlaces(32);
  t("-2.708e+2", "3.7e+0", "-73.18918918918918918918918918918919");
  setDefaultDecimalPlaces(9);
  t("2.0567e-6", "1.03938030418e-11", "197877.522955623");
  setDefaultDecimalPlaces(14);
  t("-3.13e+1", "-5.99349566745e+1", "0.52223279596224");
  setDefaultDecimalPlaces(32);
  t("-1e+1", "-9.43969238e+0", "1.05935655500672152199942769745215");
  setDefaultDecimalPlaces(88);
  t("1.1138476037e+5", "-3.5e-17", "-3.1824217248571428571428571428571428571428571428571428571428571428571428571428571428571428571428571428571428571e+21");
  setDefaultDecimalPlaces(67);
  t("3.752668981e-19", "-1.9062681e-15", "-0.0001968594543967871046050657827196499799792064925180251403252249775");
  setDefaultDecimalPlaces(20);
  t("-1.83321904e+1", "-6.210508e+3", "0.00295180207480611892");
  setDefaultDecimalPlaces(94);
  t("1.083808e+0", "1.9288160112e+5", "0.000005619032575977612768170077911265318928206955979254679053029213054056381632342600703106399");
  setDefaultDecimalPlaces(12);
  t("9.16876695e+1", "-2.7552e-7", "-332780449.69512195122");
  setDefaultDecimalPlaces(21);
  t("0e+0", "1.850366e-12", "0");
  setDefaultDecimalPlaces(74);
  t("1.064655646e-20", "-1.006476583e-19", "-0.10578046861523453844727950317349807630844800290798221184247860439292505626");
  setDefaultDecimalPlaces(41);
  t("4.8919e+2", "5.1125e+0", "95.6850855745721271393643031784841075794621");
  setDefaultDecimalPlaces(41);
  t("-3.4501255817e+8", "-1.61e+3", "214293.5143913043478260869565217391304347826087");
  setDefaultDecimalPlaces(19);
  t("-7.979e+3", "5.4991e+1", "-145.0964703315087923478");
  setDefaultDecimalPlaces(31);
  t("1.19987151e+1", "2.36187e-14", "508017591992785.377688018392206175615084657496");
  setDefaultDecimalPlaces(69);
  t("7.09219e-9", "1.1e+0", "6.447445454545454545454545454545454545454545454545454545454545e-9");
  setDefaultDecimalPlaces(63);
  t("-2.528329945e+0", "2e-12", "-1264164972500");
  setDefaultDecimalPlaces(75);
  t("5.8215210699e+5", "-1e+0", "-582152.10699");
  setDefaultDecimalPlaces(94);
  t("7.27e+0", "-8.974886328e+2", "-0.0081003811461309908637318620755683402790391308006770333771295871949231890037593799817539037248");
  setDefaultDecimalPlaces(29);
  t("0e+0", "9e+0", "0");
  setDefaultDecimalPlaces(85);
  t("-5.72993177e+8", "1.228e+2", "-4666068.2166123778501628664495114006514657980456026058631921824104234527687296416938110749186");
  setDefaultDecimalPlaces(18);
  t("-1.5e-10", "1.27016922e-14", "-11809.450082564589307242");
  setDefaultDecimalPlaces(62);
  t("8.02354e-20", "-7e+0", "-1.14622e-20");
  setDefaultDecimalPlaces(24);
  t("-1.632e+0", "-1.495e-4", "10916.387959866220735785953177");
  setDefaultDecimalPlaces(23);
  t("-1.019964e+3", "-9.044799e+2", "1.12768011760128666209166");
  setDefaultDecimalPlaces(26);
  t("-1.6747e-20", "1e+0", "-1.6747e-20");
  setDefaultDecimalPlaces(86);
  t("-1.20042507913e+3", "2.03967464307e+11", "-5.88537531320774659847328294609135374429107183733304124396406839721766115626254e-9");
  setDefaultDecimalPlaces(5);
  t("0e+0", "-2.0955584e+7", "0");
  setDefaultDecimalPlaces(43);
  t("2.8812293e+5", "4.227328e+0", "68157.221299127959789256949070429358687095016048");
  setDefaultDecimalPlaces(6);
  t("2.58330872021e-18", "5.8493617358e+10", "0");
  setDefaultDecimalPlaces(72);
  t("-7.4e+0", "9.072526041e+9", "-8.15649353505118255521136177910475727010371223248605718716834268e-10");
  setDefaultDecimalPlaces(19);
  t("7.574e+0", "2.1e+0", "3.6066666666666666667");
  setDefaultDecimalPlaces(36);
  t("-7.4e+1", "-3e+0", "24.666666666666666666666666666666666667");
  setDefaultDecimalPlaces(65);
  t("-1.912851e+4", "1e+0", "-19128.51");
  setDefaultDecimalPlaces(67);
  t("3.3343543239e-16", "8.82068529e+8", "3.780153371620857363113110228649819565209768e-25");
  setDefaultDecimalPlaces(58);
  t("2.238129904e+3", "-1.1421031e+1", "-195.9656622944110737463193997109367797005366678367303267104345");
  setDefaultDecimalPlaces(70);
  t("1.33071848e+7", "2.51265161847e+0", "5296072.3652182990329491031949793851199787335554172298425471182746365335597913");
  setDefaultDecimalPlaces(55);
  t("1.31957917758e-4", "-1.7384254e-18", "-75906574856764.0578652382782718200044707124044552041174732030491501102");
  setDefaultDecimalPlaces(76);
  t("-7.5567e-16", "-2.707e+1", "2.79154045068341337273734761728851126708533431843369043221278e-17");
  setDefaultDecimalPlaces(46);
  t("1.72453479e+7", "-2.15e-11", "-802109204651162790.6976744186046511627906976744186046511627906977");
  setDefaultDecimalPlaces(54);
  t("2.654e+0", "-3.903910331e+1", "-0.067983118846896486260508835442306679353901379350098602");
  setDefaultDecimalPlaces(13);
  t("9.9633e+4", "-3.80649e+4", "-2.617450722319");
  setDefaultDecimalPlaces(10);
  t("1.97e+2", "-1.09e-5", "-18073394.495412844");
  setDefaultDecimalPlaces(66);
  t("2.48256275e+2", "-5.00686600629e+4", "-0.004958316733224373839447408528583708921950072336853841305357350924");
  setDefaultDecimalPlaces(9);
  t("3.09e+1", "7e+0", "4.414285714");
  setDefaultDecimalPlaces(75);
  t("7e+0", "-4.678205e+4", "-0.000149630039726775547458907850340034265279097431600368089897727867846748913");
  setDefaultDecimalPlaces(29);
  t("1e+0", "1.544968e-18", "647262597024663293.99702777015446274615396564848");
  setDefaultDecimalPlaces(16);
  t("-2.2649063e+7", "1.18267454e+2", "-191507.1495493595389311");
  setDefaultDecimalPlaces(98);
  t("1.763805e+3", "-4.1e+0", "-430.19634146341463414634146341463414634146341463414634146341463414634146341463414634146341463414634146");
  setDefaultDecimalPlaces(98);
  t("4.55911e+4", "-5e+0", "-9118.22");
  setDefaultDecimalPlaces(10);
  t("2.09497993e+0", "-4.8e+0", "-0.4364541521");
  setDefaultDecimalPlaces(23);
  t("0e+0", "5.159969152e+1", "0");
  setDefaultDecimalPlaces(94);
  t("-3.225e-7", "-8.8025074e+7", "3.6637288143603264678880020027020937238859918481863474491370492912053672343405244e-15");
  setDefaultDecimalPlaces(39);
  t("6.954664e+2", "4.3319608021e+0", "160.543096249361143313287045220283896621919");
  setDefaultDecimalPlaces(13);
  t("-7.50592093463e+0", "1.004304111018e+11", "-7.47e-11");
  setDefaultDecimalPlaces(73);
  t("1.674e+2", "-1.3218253e+2", "-1.2664305941186025112395715228025972872511972648730509243543757257483269536");
  setDefaultDecimalPlaces(100);
  t("1.01541279e+2", "-3.982e+3", "-0.0255000700652938221998995479658463083877448518332496233048719236564540431943746860873932697137117027");
  setDefaultDecimalPlaces(77);
  t("-1.403739e+6", "6e+0", "-233956.5");
  setDefaultDecimalPlaces(77);
  t("-7.2023890918e+3", "-8.88655604911e+10", "8.104814792139108284249645437501312382919834058864530800139321960628831e-8");
  setDefaultDecimalPlaces(68);
  t("-3.1310186057e-5", "-1.86e+0", "0.00001683343336397849462365591397849462365591397849462365591397849462");
  setDefaultDecimalPlaces(1);
  t("1.962872e+1", "8e+0", "2.5");
  setDefaultDecimalPlaces(84);
  t("1.05685049e+7", "2.8e+0", "3774466.035714285714285714285714285714285714285714285714285714285714285714285714285714285714");
  setDefaultDecimalPlaces(91);
  t("3.12055671174e+5", "-9e+0", "-34672.8523526666666666666666666666666666666666666666666666666666666666666666666666666666666666667");
  setDefaultDecimalPlaces(98);
  t("8.4004e-18", "3.097e+2", "2.712431385211494995156603164352599289635130771714562479819179851469163706813045e-20");
  setDefaultDecimalPlaces(17);
  t("2.835828433e+9", "-6.457556487e+9", "-0.43914883883848866");
  setDefaultDecimalPlaces(97);
  t("4.3e+3", "-3.5275628424e+9", "-0.0000012189719055648254381329232248293510939721650357522203386728813560086954384572015016755070467");
  setDefaultDecimalPlaces(10);
  t("0e+0", "3.0990189e-20", "0");
  setDefaultDecimalPlaces(85);
  t("-1.97386262896e-7", "-1.11e+1", "1.77825462068468468468468468468468468468468468468468468468468468468468468468468e-8");
  setDefaultDecimalPlaces(58);
  t("2.959684e+5", "-1e+0", "-295968.4");
  setDefaultDecimalPlaces(28);
  t("0e+0", "2.5248734981e+3", "0");
  setDefaultDecimalPlaces(48);
  t("-2.01e+0", "2.7173e+2", "-0.007397048540830971920656534059544400691863246605");
  setDefaultDecimalPlaces(56);
  t("7.5e+1", "-1.2e+0", "-62.5");
  setDefaultDecimalPlaces(56);
  t("-1.0717777e+3", "-1e+0", "1071.7777");
  setDefaultDecimalPlaces(72);
  t("-2.28e-18", "-1.0596906867e-13", "0.00002151571235470781645777768823340928962039919001960593526088219795619");
  setDefaultDecimalPlaces(82);
  t("0e+0", "4.48e-12", "0");
  setDefaultDecimalPlaces(61);
  t("-4e+0", "-4.84e-20", "82644628099173553719.0082644628099173553719008264462809917355371900826446280991736");
  setDefaultDecimalPlaces(29);
  t("5.1e+0", "-1.891e-13", "-26969857218402.96139608672659968270756213644");
  setDefaultDecimalPlaces(98);
  t("0e+0", "6.886955622e+9", "0");
  setDefaultDecimalPlaces(53);
  t("1.28901784e-7", "-3.801111e+2", "-3.3911607422145788428698872513851871202919357e-10");
  setDefaultDecimalPlaces(46);
  t("9.82944274e+5", "1.32428e+2", "7422.4806989458422690065545050895580994955749539372");
  setDefaultDecimalPlaces(86);
  t("3.57e-19", "-4.7147e+3", "-7.57206184911022970708634695738859312363458968757291025940144654e-23");
  setDefaultDecimalPlaces(43);
  t("-7.08374842e-19", "4.19421211e-10", "-1.6889342346589142817576767713829332e-9");
  setDefaultDecimalPlaces(32);
  t("-3e+0", "-9.785962723e+5", "0.00000306561560156885138790856193");
  setDefaultDecimalPlaces(38);
  t("2e+0", "-1.632e+1", "-0.12254901960784313725490196078431372549");
  setDefaultDecimalPlaces(22);
  t("-3e+0", "-4.533e-3", "661.8133686300463269358041");
  setDefaultDecimalPlaces(43);
  t("-3.272e-15", "2.6088439e-20", "-125419.5392832817632361982255818372268267948112955");
  setDefaultDecimalPlaces(27);
  t("-3.3622192377e+7", "-3.2557700138e+3", "10326.955600207635280481923824272");
  setDefaultDecimalPlaces(79);
  t("1.372451e-9", "-1.4e-3", "-9.803221428571428571428571428571428571428571428571428571428571428571428571e-7");
  setDefaultDecimalPlaces(93);
  t("1.72034008e+3", "-6.452568769e+4", "-0.026661321120125205751216690364884974385927385379253754993959367750211419714975222141642548064");
  setDefaultDecimalPlaces(83);
  t("-3.25553e+4", "-7.2244e+3", "4.50629810088034992525330823320967831238580366535629256408836720004429433586180167211");
  setDefaultDecimalPlaces(81);
  t("-4.012e+3", "-8.8945e+1", "45.106526505143628084771487998201135533194670864017089212434650626791837652481870819");
  setDefaultDecimalPlaces(66);
  t("-6.3819893e+1", "2.4241692134e+6", "-0.000026326500908940220765201142620863547346624346829929920930824078");
  setDefaultDecimalPlaces(89);
  t("-1.218e+3", "1.08e+1", "-112.77777777777777777777777777777777777777777777777777777777777777777777777777777777777777778");
  setDefaultDecimalPlaces(45);
  t("6.51769e+4", "-1e+0", "-65176.9");
  setDefaultDecimalPlaces(86);
  t("-2.52835196226e+5", "-1.79594e+2", "1407.81538484581890263594552156530841787587558604407719634286223370491219083042863347327862");
  setDefaultDecimalPlaces(34);
  t("3.95756e+3", "3.432e+0", "1153.1351981351981351981351981351981352");
  setDefaultDecimalPlaces(53);
  t("-7.4475823e+1", "1.04933e+5", "-0.00070974643820342504264625999447266350909628048373724");
  setDefaultDecimalPlaces(69);
  t("-2.6e+0", "3.9026144202e-14", "-66622005662213.383321521505405521383513694833141435743829315541563067583726958730208");
  setDefaultDecimalPlaces(12);
  t("-7.652e-7", "-6e+0", "1.27533e-7");
  setDefaultDecimalPlaces(95);
  t("4.25e+1", "-7.3643733631e+3", "-0.00577102733722748343310432068552491285896357244674147338655592449507158529850502929615649052072");
  setDefaultDecimalPlaces(3);
  t("6.4089060412e+3", "-9.3908e+0", "-682.466");
  setDefaultDecimalPlaces(48);
  t("2.9137e-6", "-1.380143433e+3", "-2.111157384320938184690837129824607150089e-9");
  setDefaultDecimalPlaces(58);
  t("2.989488204e+8", "5.66229e-4", "527964516829.7632230069459529624939732864265164800813805015285335085275");
  setDefaultDecimalPlaces(55);
  t("0e+0", "5.5909666e+7", "0");
  setDefaultDecimalPlaces(99);
  t("-2.8201695192e+6", "2.264447952e+9", "-0.001245411499394003293920707434303616972689862911011169048057678651383725864501565722010465533543868");
  setDefaultDecimalPlaces(35);
  t("-1.39474e-4", "-1.965924046e-6", "70.94577243906400644330894968869005837");
  setDefaultDecimalPlaces(56);
  t("-9.9871e+3", "2.1530843e+2", "-46.38508580458275600263305993174535711397830544767801242153");
  setDefaultDecimalPlaces(65);
  t("-7.042e+0", "-6.1319627219e+10", "1.1484088079742962404782586713265778831218174826197486705e-10");
  setDefaultDecimalPlaces(62);
  t("-2.626e+1", "-7e+0", "3.75142857142857142857142857142857142857142857142857142857142857");
  setDefaultDecimalPlaces(80);
  t("-1e-13", "-1.355589555e+4", "7.37686415708625019613698631662885599616470930981760183302681172e-18");
  setDefaultDecimalPlaces(10);
  t("-4.13e+2", "-1.2e+1", "34.4166666667");
  setDefaultDecimalPlaces(73);
  t("1.1692686027e+2", "-1.4567565e-19", "-802652057979490738500.2229267554323594917887787011762089271611281638352051286539651616450655961");
  setDefaultDecimalPlaces(56);
  t("3.8193201061e-1", "4.33193161e+7", "8.81666759762165312669836909082689788816864539558e-9");
  setDefaultDecimalPlaces(96);
  t("-1.11684088358e+5", "4.008e+1", "-2786.529150648702594810379241516966067864271457085828343313373253493013972055888223552894211576846307");
  setDefaultDecimalPlaces(97);
  t("9.12346339e+1", "2.7e+0", "33.7906051481481481481481481481481481481481481481481481481481481481481481481481481481481481481481481");
  setDefaultDecimalPlaces(95);
  t("1.21069e+4", "3.5127690124e+10", "3.4465403097279952537080744148049237670962552015251886762516010630019072756495943177433616e-7");
  setDefaultDecimalPlaces(15);
  t("9.83588249e-20", "-4.84945483589e-4", "0");
  setDefaultDecimalPlaces(55);
  t("-1.8687e+3", "2.354e+3", "-0.7938402718776550552251486830926083262531860662701784197");
  setDefaultDecimalPlaces(74);
  t("-3.8457e-18", "-8.64947422e+7", "4.446166208701642907492242921558762678178142485983e-26");
  setDefaultDecimalPlaces(34);
  t("-2.19330894005e+11", "7.4993e+2", "-292468489.0656461269718507060658994839518355");
  setDefaultDecimalPlaces(81);
  t("-2.252563e-11", "-6.6652329238e-19", "33795713.154398854828509781718425352413638331010970032560889691499126060894406218080261233");
  setDefaultDecimalPlaces(42);
  t("-1.07778720732e+5", "-9.99399e+3", "10.784353469635250785722219053651244397883128");
  setDefaultDecimalPlaces(7);
  t("1.840942662e+6", "8.96e-9", "205462350669642.8571429");
  setDefaultDecimalPlaces(69);
  t("5e+0", "-1.14e-20", "-438596491228070175438.596491228070175438596491228070175438596491228070175438596491228070175");
  setDefaultDecimalPlaces(56);
  t("-7.76987e+2", "4.14716871e-1", "-1873.53602983757079899457478304517782687456667274093124607897");
  setDefaultDecimalPlaces(91);
  t("3e+0", "1.7e+0", "1.7647058823529411764705882352941176470588235294117647058823529411764705882352941176470588235");
  setDefaultDecimalPlaces(25);
  t("-1e+0", "1.49e+1", "-0.0671140939597315436241611");
  setDefaultDecimalPlaces(98);
  t("1.528e+1", "-2.73e-11", "-559706959706.95970695970695970695970695970695970695970695970695970695970695970695970695970695970695970695970696");
  setDefaultDecimalPlaces(17);
  t("-2.83170621e+6", "1.590975e+4", "-177.98558808277942771");
  setDefaultDecimalPlaces(51);
  t("-1.6690187e+7", "7.8088977e+7", "-0.213732944663880024961781737773309541499051780381244");
  setDefaultDecimalPlaces(43);
  t("-1.24484150574e+11", "2.1398927241e+0", "-58173079973.6027758009423104239246756547257330804997058");
  setDefaultDecimalPlaces(85);
  t("-5.4273802e+4", "2.589e+2", "-209.6322981846272692159134801081498648126689841637697952877558903051371185786017767477791");
  setDefaultDecimalPlaces(15);
  t("-5.8273e+3", "1.06e+0", "-5497.452830188679245");
  setDefaultDecimalPlaces(42);
  t("0e+0", "1.530548458e+10", "0");
  setDefaultDecimalPlaces(37);
  t("1.5354737958e+5", "1.2148e-3", "126397250.2304906157392163319064866644715179453");
  setDefaultDecimalPlaces(68);
  t("0e+0", "2.43e+0", "0");
  setDefaultDecimalPlaces(14);
  t("3e+0", "6.08364589e-9", "493125348.55640652681052");
  setDefaultDecimalPlaces(34);
  t("7.37439696e+6", "5.2759e+1", "139775.1466100570518774048029720047764362");
  setDefaultDecimalPlaces(9);
  t("2.6220805e+6", "-6.622686e+3", "-395.924025388");
  setDefaultDecimalPlaces(34);
  t("5.433e+3", "1.48329522472e+0", "3662.79073070270377537064953276835491");
  setDefaultDecimalPlaces(87);
  t("-8.8097834e-11", "-4.59009142e-4", "1.91930456147646837064521908803289151047017708418539515711867891293546393025871367e-7");
  setDefaultDecimalPlaces(58);
  t("0e+0", "1.14438e+4", "0");
  setDefaultDecimalPlaces(60);
  t("-7.92379131611e-17", "-1.6261e+1", "4.872880706051288358649529549228214746940533e-18");
  setDefaultDecimalPlaces(69);
  t("-6.6e-5", "-7.599409e+1", "8.68488589046858775465302630770366485077984353783300780363315095e-7");
  setDefaultDecimalPlaces(19);
  t("5.946695248e+2", "2.95274863589e+1", "20.1395241563038851429");
  setDefaultDecimalPlaces(22);
  t("-2.3938289e+7", "5.5644e+0", "-4302043.1672776939112932211919");
  setDefaultDecimalPlaces(46);
  t("1.094843155821e+9", "1.81034907e-15", "6.047690878870117573513046298855501939192312784185869744998957576728559e+23");
  setDefaultDecimalPlaces(18);
  t("-3.546437e+0", "-1.32e+1", "0.268669469696969697");
  setDefaultDecimalPlaces(64);
  t("-3e+0", "3e+0", "-1");
  setDefaultDecimalPlaces(74);
  t("8.9365058e-2", "-6.85953e+2", "-0.00013027868964783301479838997715586927967368026672381343911317539248315847");
  setDefaultDecimalPlaces(56);
  t("-1.6e-9", "4.7e-3", "-3.4042553191489361702127659574468085106382978723404e-7");
  setDefaultDecimalPlaces(26);
  t("2.9012403e+0", "-1.0524576685e+10", "-2.7566337220336383e-10");
  setDefaultDecimalPlaces(3);
  t("2.902297612e+3", "4.08651017e-3", "710214.215");
  setDefaultDecimalPlaces(64);
  t("-3.903e+3", "5.356928e+1", "-72.8589221285035005137272705550643951160067859788296575948006021361");
  setDefaultDecimalPlaces(97);
  t("1.00220782529e+11", "-9.00986866e+7", "-1112.344544753885457859715349058151531367605973514823688894927797981907540925241411898672449682524007");
  setDefaultDecimalPlaces(87);
  t("6.52111e-10", "-2.122615872e-13", "-3072.204484109313208791458617718279268572245934849958570365387336555259679128603067375913789");
  setDefaultDecimalPlaces(37);
  t("0e+0", "1e+0", "0");
  setDefaultDecimalPlaces(17);
  t("-1.351e+3", "-1.980225e+6", "0.00068224570440228");
  setDefaultDecimalPlaces(8);
  t("7.45493e+3", "6.1841248e+3", "1.20549475");
  setDefaultDecimalPlaces(32);
  t("2.4e+0", "-1.86e+2", "-0.01290322580645161290322580645161");
  setDefaultDecimalPlaces(78);
  t("-3e+0", "4.07269652912e+1", "-0.073661270329125631633946110843145137931985254344533012338925495845440376168658");
  setDefaultDecimalPlaces(64);
  t("1.440195501e+7", "-4e+0", "-3600488.7525");
  setDefaultDecimalPlaces(50);
  t("1.6e+0", "-1.6e+1", "-0.1");
  setDefaultDecimalPlaces(28);
  t("1.006e-1", "-4.27e+1", "-0.0023559718969555035128805621");
  setDefaultDecimalPlaces(58);
  t("-4.7736117708e+6", "-1.4e-2", "340972269.3428571428571428571428571428571428571428571428571428571429");
  setDefaultDecimalPlaces(19);
  t("-3.05261858e-5", "-4.8801511e+0", "0.0000062551722630064");
  setDefaultDecimalPlaces(56);
  t("-1.762e+0", "5e+0", "-0.3524");
  setDefaultDecimalPlaces(80);
  t("-6.178e+3", "5.3155988957e+3", "-1.16223968761029555046455270863224398799515312345691817169740706701908046300898399");
  setDefaultDecimalPlaces(93);
  t("0e+0", "1.19e+2", "0");
  setDefaultDecimalPlaces(77);
  t("-7.354731622e+9", "2.02315238e-15", "-3.63528308332365948629138849145905658376557874498805670781950690239160334527051294079984227386767575065e+24");
  setDefaultDecimalPlaces(59);
  t("6.197e+4", "1.47e+2", "421.56462585034013605442176870748299319727891156462585034013605");
  setDefaultDecimalPlaces(69);
  t("2.2268702697e+10", "7.4e+0", "3009284148.243243243243243243243243243243243243243243243243243243243243243243243");
  setDefaultDecimalPlaces(97);
  t("-3.321621232e+8", "-4.1517366645e+10", "0.0080005585624010860238893651054683841689979130900632293703125833211187761255949955734481772067603");
  setDefaultDecimalPlaces(93);
  t("0e+0", "-1.7996097507e-7", "0");
  setDefaultDecimalPlaces(34);
  t("-2.23482e-18", "-4.24876938e+5", "5.2599230509e-24");
  setDefaultDecimalPlaces(32);
  t("0e+0", "-1e+0", "0");
  setDefaultDecimalPlaces(49);
  t("-9.4986e-17", "1e+0", "-9.4986e-17");
  setDefaultDecimalPlaces(70);
  t("-5.5e+0", "-4.151524137e+1", "0.1324814650836751235296985098559719634842147131180222739483015078517415");
  setDefaultDecimalPlaces(53);
  t("1e+0", "-7.5e-11", "-13333333333.33333333333333333333333333333333333333333333333333333");
  setDefaultDecimalPlaces(55);
  t("-8.300158339e-5", "-1.57229e-7", "527.9025077434824364462026725349649237736041061127400161548");
  setDefaultDecimalPlaces(70);
  t("1.047978e+3", "2.85e-15", "367711578947368421.0526315789473684210526315789473684210526315789473684210526315789473684");
  setDefaultDecimalPlaces(40);
  t("1.0082e-8", "1.3149e+0", "7.6675032321849570309529241767435e-9");
  setDefaultDecimalPlaces(32);
  t("1.84564076e+6", "1.079711145826e+10", "0.00017093838172690613163354494713");
  setDefaultDecimalPlaces(25);
  t("3.811343453e+5", "-3.57e-17", "-1.06760320812324929971988795518207282913165266106e+22");
  setDefaultDecimalPlaces(50);
  t("1.88405623e+1", "7.607e+0", "2.47674014723281188379124490600762455632969633232549");
  setDefaultDecimalPlaces(31);
  t("-7.768519091e+9", "8.438e-8", "-92065881618867030.101919886228964209528324247452");
  setDefaultDecimalPlaces(45);
  t("4.2364608e+8", "-1.7909462702e+6", "-236.548737976762559384122388062024620307339022481");
  setDefaultDecimalPlaces(65);
  t("4.89718057e-9", "-5.0796935e+7", "-9.640700900556303249398807231184322439926739674352e-17");
  setDefaultDecimalPlaces(14);
  t("3.534638e+5", "6.4871783834e+2", "544.86523895269521");
  setDefaultDecimalPlaces(92);
  t("3.911599767e+6", "-6.20895e+3", "-629.99376174715531611625154011547846254197569637378300678858744232116541444205541999855047954968");
  setDefaultDecimalPlaces(54);
  t("3.0633e-9", "1.1361150929e+9", "2.69629372864042162043880369613563471e-18");
  setDefaultDecimalPlaces(83);
  t("1.7e-6", "-2.443718317e+4", "-6.956611930981405333550969982764998033118233569307079838858530764124889931e-11");
  setDefaultDecimalPlaces(83);
  t("1.4364716e-19", "4.35987421e+1", "3.29475468972303216977445778189091377478067194053288982390159371e-21");
  setDefaultDecimalPlaces(26);
  t("-1.24595322e+7", "-2.01e+2", "61987.72238805970149253731343284");
  setDefaultDecimalPlaces(42);
  t("3.2364118145e+3", "-1.4e+0", "-2311.722724642857142857142857142857142857142857");
  setDefaultDecimalPlaces(89);
  t("4.344545e+0", "-5.75375801313e-3", "-755.0795480251003838587636045753807984147491286241694456326900051831829270443435695258245015");
  setDefaultDecimalPlaces(72);
  t("-4.7193822125e+10", "1.3e+0", "-36302940096.153846153846153846153846153846153846153846153846153846153846153846153846");
  setDefaultDecimalPlaces(35);
  t("7.207341e-18", "8e+0", "9.00917625e-19");
  setDefaultDecimalPlaces(36);
  t("1e+0", "2.4e+0", "0.416666666666666666666666666666666667");
  setDefaultDecimalPlaces(85);
  t("-2.134599e+5", "-1e+0", "213459.9");
  setDefaultDecimalPlaces(61);
  t("0e+0", "5.66405638e+6", "0");
  setDefaultDecimalPlaces(92);
  t("6.69684934913e+6", "-8.8e+3", "-761.00560785568181818181818181818181818181818181818181818181818181818181818181818181818181818182");
  setDefaultDecimalPlaces(55);
  t("2.701617e+4", "1.637706216e+0", "16496.3469858381486414288605228082006620410849072578717012087");
  setDefaultDecimalPlaces(87);
  t("0e+0", "-7.66134643e+5", "0");
  setDefaultDecimalPlaces(46);
  t("-2.52322e+0", "2.5431632445e-15", "-992158095024717.5530850984662380763658445520601735009858113731");
  setDefaultDecimalPlaces(16);
  t("-7.415451491e+1", "1.51363e+5", "-0.0004899117678032");
  setDefaultDecimalPlaces(45);
  t("-6.32637e-7", "-3e+0", "2.10879e-7");
  setDefaultDecimalPlaces(48);
  t("1.478495434e+1", "2.0699453e+4", "0.000714267876547269147643659955651968194521855239");
  setDefaultDecimalPlaces(42);
  t("-1.4163e-3", "-2.08671006e-6", "678.72390474793608844728529271574988237704667");
  setDefaultDecimalPlaces(35);
  t("1.1862047847e+3", "5.552e+0", "213.65359954971181556195965417867435159");
  setDefaultDecimalPlaces(64);
  t("-1.5e+0", "2.168450586e+8", "-6.9173815150980802658696138718468358033407361213441088761e-9");
  setDefaultDecimalPlaces(68);
  t("-4.158965e+3", "-4.50521809471e+1", "92.31439882751584652418022295367085101272207040482673911869737226215732");
  setDefaultDecimalPlaces(44);
  t("-1e+0", "-1.6526310111e+8", "6.05095749313329583326248645389466878e-9");
  setDefaultDecimalPlaces(85);
  t("1.3151863e-3", "-2.9186e+1", "-0.0000450622318920030151442472418282738299184540533132323716850544781744672103063112451");
  setDefaultDecimalPlaces(3);
  t("1.6786079312e+6", "4.156407e+2", "4038.603");
  setDefaultDecimalPlaces(53);
  t("-1.6444708e+0", "1.091950577e+7", "-1.5059938010362899419027460251069586641190995955e-7");
  setDefaultDecimalPlaces(38);
  t("-6.7e+0", "-8.13465e+2", "0.00823637157099567897819820152065546766");
  setDefaultDecimalPlaces(92);
  t("4.04766815083e-20", "-2.965760443e+9", "-1.364799426192225330722708003965376241954279784693992561960945947e-29");
  setDefaultDecimalPlaces(77);
  t("8.009746e+2", "6.722282e-10", "1191521867127.85925969782285241827105735820068244682386130186148096732627402420785084588835");
  setDefaultDecimalPlaces(100);
  t("-5.35078867201e+6", "-3.350201016e+4", "159.7154512954753399191256170283484864181057247939178584500793429405371537264198596971591390622394820502");
  setDefaultDecimalPlaces(81);
  t("6.5154861e+3", "-1.0792779e-18", "-6.036893834294207265802440687426287520572782969057366967302860551485395930000975652331989749813277933329e+21");
  setDefaultDecimalPlaces(80);
  t("6.831e+1", "-1e+0", "-68.31");
  setDefaultDecimalPlaces(93);
  t("-5.90111e+3", "-7.7696168444e-5", "75951106.961642027300895198311485991814940212162928624738091209547007555908402653483106423646282631353");
  setDefaultDecimalPlaces(46);
  t("2.767489e+0", "1.82654e+2", "0.0151515378803639668444162186428985951580584055");
  setDefaultDecimalPlaces(38);
  t("1.1e+1", "-5.0646679e+7", "-2.1719094355623988692328671737786e-7");
  setDefaultDecimalPlaces(35);
  t("-1.6355499428e-11", "-4.62212e+5", "3.53852765138075169e-17");
  setDefaultDecimalPlaces(66);
  t("3.3994e-10", "2.45621934e+8", "1.383996919428213605711613686748350414014735345256e-18");
  setDefaultDecimalPlaces(92);
  t("8.21e-17", "3e+0", "2.736666666666666666666666666666666666666666666666666666666666666666666666667e-17");
  setDefaultDecimalPlaces(20);
  t("-2.25e+0", "-1.275248e+2", "0.01764362696510796331");
  setDefaultDecimalPlaces(8);
  t("1.35029023e-2", "7.9e+0", "0.00170923");
  setDefaultDecimalPlaces(29);
  t("0e+0", "-3.241e+2", "0");
  setDefaultDecimalPlaces(54);
  t("1.786e+1", "7.305e+2", "0.024449007529089664613278576317590691307323750855578371");
  setDefaultDecimalPlaces(35);
  t("-7.339575911e+0", "3.0623589829e+1", "-0.23967065755463949333972122018000922");
  setDefaultDecimalPlaces(22);
  t("5.253068078e+9", "-4.627139176e+0", "-1135273411.5382917109818094652444");
  setDefaultDecimalPlaces(63);
  t("-2.5277e+2", "4.85692254e-6", "-52043243.003830157851354162218119294939383571062675419979005883013320612");
  setDefaultDecimalPlaces(6);
  t("2.6601e+6", "1.125301877e+6", "2.363899");
  setDefaultDecimalPlaces(41);
  t("1.14e+0", "-1.9297e+3", "-0.00059076540394880033165777063792299321138");
  setDefaultDecimalPlaces(48);
  t("-2.5817180113e+8", "3.83964e-16", "-6.72385434910564532091550249502557531435238720296694481774333010386390391e+23");
  setDefaultDecimalPlaces(24);
  t("-6e+1", "1.5e+1", "-4");
  setDefaultDecimalPlaces(88);
  t("-1.91846e-1", "2.89e+1", "-0.006638269896193771626297577854671280276816608996539792387543252595155709342560553633218");
  setDefaultDecimalPlaces(3);
  t("-1.41114e+1", "1.6312529e+2", "-0.087");
  setDefaultDecimalPlaces(31);
  t("4.09630878e-15", "8.32788234e+6", "4.91878801e-22");
  setDefaultDecimalPlaces(63);
  t("1.538059e-16", "-9.81e-3", "-1.567848114169215086646279306829765545361875637105e-14");
  setDefaultDecimalPlaces(87);
  t("-6.4006e+0", "1.070049649e-13", "-59815916074376.47035759179058428904732064446478782032664355371420714329863772517344192876792392649063");
  setDefaultDecimalPlaces(32);
  t("-3.70636e+3", "9.9e+1", "-37.4379797979797979797979797979798");
  setDefaultDecimalPlaces(57);
  t("4.318e+0", "2.8460547764e-2", "151.718794585600935098010786128592658382680030557123749390954");
  setDefaultDecimalPlaces(23);
  t("-1.165242e-6", "1.27832e+0", "-9.1154171099568183e-7");
  setDefaultDecimalPlaces(64);
  t("7.597703079e+7", "1.2011e+2", "632562.0746815419199067521438681208891849138289900924152859878444758971");
  setDefaultDecimalPlaces(65);
  t("1.104424e+5", "5.98e+1", "1846.86287625418060200668896321070234113712374581939799331103678929766");
  setDefaultDecimalPlaces(25);
  t("-1.05796660138e+4", "2.5545956e+7", "-0.0004141424973017255647039");
  setDefaultDecimalPlaces(27);
  t("-1.4874e-14", "-1.2743e+4", "1.167229067e-18");
  setDefaultDecimalPlaces(42);
  t("2.194224969e+9", "-1.1032e-14", "-1.98896389503263234227701232777374909354604786076867295141406816534e+23");
  setDefaultDecimalPlaces(18);
  t("-2.6533668536e+10", "-1.603072e+1", "1655176344.917757904822740339");
  setDefaultDecimalPlaces(21);
  t("3e+0", "-3.9581e+3", "-0.000757939415376064273");
  setDefaultDecimalPlaces(28);
  t("3.276e+2", "-7.45098e+2", "-0.4396737073512477553288292278");
  setDefaultDecimalPlaces(75);
  t("-1.918278293e+8", "-2.41730000785e-14", "7.935623574941196763625369381351445975423467957194297991984760171645899413634918960396262839072245e+21");
  setDefaultDecimalPlaces(6);
  t("1.4740132595e+8", "1.2133758777e+5", "1214.803497");
  setDefaultDecimalPlaces(11);
  t("-1.2582961e-13", "2e+0", "0");
  setDefaultDecimalPlaces(78);
  t("4.764386e+3", "-9.725951e+0", "-489.863253475161452078053858177981772682177814796722706088073032652539581990491213");
  setDefaultDecimalPlaces(7);
  t("4.033502e+5", "-1.87354e-9", "-215287744056705.4880067");
  setDefaultDecimalPlaces(85);
  t("-1.62e+0", "-8.385172e+1", "0.0193198183650854150636385276294869085571530315657210132362222265685188091550179292685");
  setDefaultDecimalPlaces(8);
  t("2.4326956063e+2", "1.5724420866e+3", "0.15470812");
  setDefaultDecimalPlaces(37);
  t("-2e+0", "3.6e+1", "-0.0555555555555555555555555555555555556");
  setDefaultDecimalPlaces(10);
  t("-8.91704311e+8", "-8.7e+0", "102494748.3908045977");
  setDefaultDecimalPlaces(51);
  t("4.21676261e-19", "3.99058e+4", "1.0566791318555197490089159972e-23");
  setDefaultDecimalPlaces(38);
  t("1.67098e+0", "-7.3291608e+4", "-0.00002279906316150138225920762988308293");
  setDefaultDecimalPlaces(76);
  t("0e+0", "-9.1e+0", "0");
  setDefaultDecimalPlaces(73);
  t("1.4547243e-12", "2.3676319e+3", "6.144216505952635627185121133061266829527005443709387426314e-16");
  setDefaultDecimalPlaces(79);
  t("1.38604e+2", "-7.6e-17", "-1823736842105263157.8947368421052631578947368421052631578947368421052631578947368421052631578947368");
  setDefaultDecimalPlaces(11);
  t("-2.0000307e+1", "6.5559103996e+9", "-3.05e-9");
  setDefaultDecimalPlaces(95);
  t("-3.2667833e+0", "7.337079871e+4", "-0.00004452429791465193660013245343066812581520008370643509381526807696925506182758031475162606963");
  setDefaultDecimalPlaces(34);
  t("5.8e+1", "-1.1593346e-6", "-50028697.4959601826772012152488160018686581");
  setDefaultDecimalPlaces(26);
  t("-1.3814e+3", "4.0932e+2", "-3.37486563080230626404768885");
  setDefaultDecimalPlaces(14);
  t("7.625487e+2", "-2.71558569988e+6", "-0.00028080450565");
  setDefaultDecimalPlaces(31);
  t("0e+0", "-1e+0", "0");
  setDefaultDecimalPlaces(50);
  t("-1.628e-12", "1.4102489e+3", "-1.1544061477374667691639397839629586e-15");
  setDefaultDecimalPlaces(67);
  t("-2e+0", "-1.739e+3", "0.0011500862564692351926394479585968947671075330649798734905117883841");
  setDefaultDecimalPlaces(94);
  t("-1.01122465e-5", "-2.79305e+0", "0.0000036205032133330946456382807325325361164318576466586706288824045398399599004672311630654661");
  setDefaultDecimalPlaces(21);
  t("-1.0194e+3", "1.911716e+4", "-0.053323820065323510396");
  setDefaultDecimalPlaces(26);
  t("2e+0", "3.4e+1", "0.05882352941176470588235294");
  setDefaultDecimalPlaces(8);
  t("0e+0", "-1.22677e+2", "0");
  setDefaultDecimalPlaces(29);
  t("2.1271815702e+10", "-1.5762e+3", "-13495632.34488009135896459840121811953");
  setDefaultDecimalPlaces(94);
  t("-3.1298e+3", "1e+0", "-3129.8");
  setDefaultDecimalPlaces(79);
  t("1.0666e+1", "-2.43040213237e-13", "-43885741614286.1890818626512131905992959026412920032867721162712896751933983327243240818931277");
  setDefaultDecimalPlaces(68);
  t("-1.56515139e+0", "1.14744e+4", "-0.00013640376751725580422505751934741685839782472286132608240953775361");
  setDefaultDecimalPlaces(20);
  t("4.6e+0", "1.061043e+1", "0.43353568140028255217");
  setDefaultDecimalPlaces(50);
  t("0e+0", "4.1506e-17", "0");
  setDefaultDecimalPlaces(4);
  t("-3.0060722e-1", "-1.0936592e+3", "0.0003");
  setDefaultDecimalPlaces(4);
  t("-3e+0", "1.05e+0", "-2.8571");
  setDefaultDecimalPlaces(24);
  t("9.4919e+2", "6.668124e+4", "0.01423473828621063435533");
  setDefaultDecimalPlaces(7);
  t("1.77267944363e+10", "2.262746e-1", "78341954582.1758165");
  setDefaultDecimalPlaces(68);
  t("8.87377e+4", "5.0708e-11", "1749974363019641.87110515106097657174410349451763035418474402461150114380373905498146");
  setDefaultDecimalPlaces(91);
  t("5.53005071e-1", "-9.8450909e-9", "-56170641.4513653703288813717301482711551195530353102173998210620889239326373309564871564568286515262");
  setDefaultDecimalPlaces(60);
  t("1.056425617e+6", "5.3e+0", "199325.588113207547169811320754716981132075471698113207547169811321");
  setDefaultDecimalPlaces(46);
  t("1.6593445e+6", "6.89629233e+3", "240.6140025099545047853271614429952681544751163412");
  setDefaultDecimalPlaces(69);
  t("5.8547215e-2", "-1.1927534e+8", "-4.90857665968506147205281494062393785672713236449378387854522e-10");
  setDefaultDecimalPlaces(96);
  t("5.3976105e-14", "-2.577e+2", "-2.09453259604190919674039580908032596041909196740395809080325960419091967403958091e-16");
  setDefaultDecimalPlaces(16);
  t("4.1509e+4", "9e+0", "4612.1111111111111111");
  setDefaultDecimalPlaces(76);
  t("-3.66463849e+1", "-4.27851e+1", "0.8565221280305526924092733217872577135498105648929183290444570656607089851373");
  setDefaultDecimalPlaces(60);
  t("-3.34603e+0", "4.8e+0", "-0.697089583333333333333333333333333333333333333333333333333333");
  setDefaultDecimalPlaces(34);
  t("-4.89e+1", "-1.697e+2", "0.2881555686505598114319387153800825");
  setDefaultDecimalPlaces(29);
  t("1.26e-14", "5.9300271e-19", "21247.79497213427574386633072891016");
  setDefaultDecimalPlaces(13);
  t("-2.25e-12", "-2.90720541891e+0", "8e-13");
  setDefaultDecimalPlaces(49);
  t("-3e+0", "8.628651e-17", "-34767891296101789.259989771286380686853599711009287546801927670965");
  setDefaultDecimalPlaces(71);
  t("-6e+0", "-4.82525e-20", "124345888814051085435.98777265426661830993212786902233044919952334075954613750582871353815864");
  setDefaultDecimalPlaces(58);
  t("1.620997681e+5", "-2.1078061209e+11", "-7.690449633516860331459150380342744548863692409253787e-7");
  setDefaultDecimalPlaces(63);
  t("-2.72e+1", "5.05e-13", "-53861386138613.861386138613861386138613861386138613861386138613861386138613861");
  setDefaultDecimalPlaces(13);
  t("6e+0", "4.83001692e+0", "1.242231673176");
  setDefaultDecimalPlaces(70);
  t("4.867644129e+0", "4.6e+1", "0.1058183506304347826086956521739130434782608695652173913043478260869565");
  setDefaultDecimalPlaces(95);
  t("-4.53845946841e+11", "2.01083e+2", "-2257008035.69172928591676074058970673801365605247584330848455612856382687745856188737983817627546833894461");
  setDefaultDecimalPlaces(4);
  t("-4.1863241396e+8", "-5.822e+1", "7190525.8324");
  setDefaultDecimalPlaces(56);
  t("5e+0", "-1.406e+0", "-3.55618776671408250355618776671408250355618776671408250356");

  setDefaultDecimalPlaces(50);
  t("-9.062351331084072548596293701256909203776456047627403706193e-19", "5.60009490996127906773496e+1", "-1.61824959697812205144016243894e-20");
  setDefaultDecimalPlaces(90);
  t(
    "-2.56541084193287591971221904081740183803021496032511e-20",
    "-1.86289423372282257718886936034594388102866351925089e-2",
    "1.377110302610223122477267229214507349974019781489945483745422579473007352e-18",
  );
  setDefaultDecimalPlaces(100);
  t(
    "-2.9935362196466544675516530181707969e+34",
    "-3.59471478e-6",
    "8.3276042825479869297214535006051214444334857632293152337387947090478204782633686447857763001714422527842389765343218690635589174615962159868e+39",
  );
  setDefaultDecimalPlaces(53);
  t(
    "-7.273532335795492022187149789164692572911e+40",
    "3.3941305282821245791341136969158623277624992e-6",
    "-2.142973664444441330280587367392225773558065349437377599010425942447912685258437847404331878465461553e+46",
  );
  setDefaultDecimalPlaces(29);
  t("-1.2676364587902486301169319812394575003403006e+12", "-7.297621160577e+3", "173705435.08592060074441515604928030483");
  setDefaultDecimalPlaces(5);
  t("-5.6814281994268732257949763085799617361420012e-17", "-5.07035483285271791848728518136979768806e-9", "0");
  setDefaultDecimalPlaces(29);
  t("-1.0058176945683e+12", "-9.703239503827159803415195404911379753745355681542274e-5", "10365792724909908.1551775706664187884280496687");
  setDefaultDecimalPlaces(97);
  t(
    "5.165858401641268765011448930804571684173803e+42",
    "-9.8353126014453607783220450277049881922e+14",
    "-5.2523581211664929926151175827457074698214486932156323739403758167477411209268789245535358903976272780841298646487808971503786e+27",
  );
  setDefaultDecimalPlaces(93);
  t("-1.7524548969065084585268881162946396546686388e-6", "1.6548e+2", "-1.0590131114977691917614745687059703013467722987672226250906453952139231327048585931835e-8");
  setDefaultDecimalPlaces(85);
  t(
    "-2.5296950622833017512931501774354075681091321631e+23",
    "1.07704051238209920750678930288868e+32",
    "-2.3487464335843363340321385504596146203359057827730472288160553192881278852883e-9",
  );
  setDefaultDecimalPlaces(85);
  t("1.25918426e+3", "-3.34546311335039336446586e-19", "-3.763856355118978024841146275116053891577766734981546389028173114299665133062705839771430437221936679441695e+21");
  setDefaultDecimalPlaces(98);
  t(
    "-6.0488725308760496108740965524938505897400487e-10",
    "1.6018248760668274353e+2",
    "-3.77623835242754295114334728810164107341469818785768233179936799056410995769158346576975e-12",
  );
  setDefaultDecimalPlaces(32);
  t("-2.8e+0", "1.7550610415450172651958554005884974555e+8", "-1.595386105508387857744232e-8");
  setDefaultDecimalPlaces(26);
  t("-1.152745969929087521583847876287856e+33", "-4.537439692306e+9", "2.540520752008592396675285549888014384155536584143e+23");
  setDefaultDecimalPlaces(29);
  t("1.5898690273270546009865220869314e+29", "-5.5184837966731174601087957e+18", "-28809888474.90185167201469636476718851207");
  setDefaultDecimalPlaces(40);
  t("1.547110268831997627802896890141e+30", "1.7e+0", "9.100648640188221340017040530241176470588235294117647058823529411764706e+29");
  setDefaultDecimalPlaces(84);
  t(
    "7.4805046992554197020038249361088612627479549654649365e+20",
    "3.60228031896531692216550251811643998979682452297e+8",
    "2076602606374.632521160004886499069325435190492828738112922323324263160914090619236198974464554483",
  );
  setDefaultDecimalPlaces(6);
  t("-1.9196133389791021385330667882601760526369481956e+5", "1e+0", "-191961.333898");
  setDefaultDecimalPlaces(96);
  t(
    "-1.5067704169001670086316312433068342842977441330574193e+29",
    "-2.0711442311433551120241055152635e+20",
    "727506271.288682292456339751363504940431822712990685612631600183500347151432384380111156323253526482805105",
  );
  setDefaultDecimalPlaces(41);
  t(
    "9.27168052975723606165295014361475353491e+33",
    "3.846718810000940373226792658068970904994937087176547e+7",
    "2.4102828898364342612696329428703459410928912044799910793882266431029e+26",
  );
  setDefaultDecimalPlaces(38);
  t("8.87746828929826162e+14", "2.035726880994812275244e+21", "4.3608346346343129266714804657417e-7");
  setDefaultDecimalPlaces(42);
  t("-3.85e-10", "6.7844895626458973394e+2", "-5.67470841313893983025082333543e-13");
  setDefaultDecimalPlaces(49);
  t("-4.0215233160375547114101289538395e+13", "-1.300790833456040970547619455e+20", "3.091598751009693667218409857391538075990196e-7");
  setDefaultDecimalPlaces(57);
  t("2.731814822519116126854429575083219009477e+17", "1.569877e-13", "1.740145770986590750010624765560116499239749356159750095071142516260828077613723877730548e+30");
  setDefaultDecimalPlaces(98);
  t(
    "2.92641430356413840698150616797039126503193e+30",
    "-1.0521914025308993190159136481062469419687823480551275e-19",
    "-2.781256619779498218644509218665871054896585357837024023468737192996884543232020592408323388663608292307232036835656794462511976421652642756820664477e+49",
  );
  setDefaultDecimalPlaces(41);
  t("-6.07486307110970160920045033130086584524e-2", "-5.508762214312485829098098979606670738391608955e-19", "110276371256802691.54161266774170763356634422024872317201493");
  setDefaultDecimalPlaces(49);
  t("-5.614263239539e+8", "-1.225243929586764822025486133650292326974901e+15", "4.58215960427774536257555026961936374190175e-7");
  setDefaultDecimalPlaces(8);
  t("2.0138393118314103293549753706939401898993158e+27", "-6.2299189880341615809989883601386082871434722e-16", "-3.23252889114513715021735834432419191164460325977491e+42");
  setDefaultDecimalPlaces(32);
  t("-3.251508667721136498768899978914273608196386232426596053e+33", "1.418e-9", "-2.29302444832238116979471084549666686050520890862242316854724964739069111425e+42");
  setDefaultDecimalPlaces(16);
  t("1.2053093027016836947238752883122852714003e+20", "3.529160649487172054401974103458121437405e-7", "3.415286019571903325025873029848037536415717e+26");
  setDefaultDecimalPlaces(30);
  t("7.872070592119453888795e+21", "-1.002309103618827002569215195e+0", "-7.853935042291266916888983813234558875532349917867275e+21");
  setDefaultDecimalPlaces(40);
  t("1.3339649081181730389312934648e+14", "-2.400370971710710009310594154e-11", "-5.5573281123603796801770531704613588037532331708655073932790404593e+24");
  setDefaultDecimalPlaces(68);
  t("-2.9874278e+2", "1.737796841255526e+7", "-0.00001719089210590139408807190965209686280827938104995761289787528795");
  setDefaultDecimalPlaces(94);
  t(
    "-1.6309003640816162410074186102802366120372931175392133e+18",
    "4.590398360159474816512711772e-4",
    "-3.552851487218109774475686879817032272941676906866652776536996800503125137331255877791581351371303976666873162027107e+21",
  );
  setDefaultDecimalPlaces(46);
  t(
    "-4.7577051059066357651020510181430209218238014787100329e+52",
    "8.069523544376310588994863140657423935640875644467758e+15",
    "-5.8958934560917207123657257028159333457710686968003407833415688854698812204798228919e+36",
  );
  setDefaultDecimalPlaces(66);
  t(
    "2.378064565229995806194448237816e+30",
    "-3.9992887698054119121027e-7",
    "-5.946218695644981242039498074254235854339509804532334806491238467695222042581889587675151843191272257547e+36",
  );
  setDefaultDecimalPlaces(60);
  t("1.5538627e+6", "-8.607827672779e+1", "-18051.740335298117510780339708815457262657053666023967678028502379");
  setDefaultDecimalPlaces(25);
  t("4.9403065478833059658715649791902885606285477723838e-11", "4.3331e-3", "1.1401321335494925e-8");
  setDefaultDecimalPlaces(19);
  t("-8.2907989176228751594611397366795082694465363072108600831e+36", "5.7928721170862524307e+16", "-143120696436037517310.6948307112974147311");
  setDefaultDecimalPlaces(14);
  t("-8.42326307594885967406667917577522914209621399685084e+4", "-1.977843486534157822974728778586751e+26", "0");
  setDefaultDecimalPlaces(63);
  t("-3.1467525e+0", "-3.97599051864902679751151459607705059798666182733984e+45", "7.91438632773503792e-46");
  setDefaultDecimalPlaces(41);
  t("-5.1224749e-15", "-4.451685077439223e+15", "1.15068222727e-30");
  setDefaultDecimalPlaces(42);
  t("-6.2725716493058414681880009261041431407582e+15", "-1.63169624843e+3", "3844203022064.456060880937209782283044479868345492240546");
  setDefaultDecimalPlaces(11);
  t("-2.5856444e+2", "1.331891504648307943116105575063988963649431367e+17", "0");
  setDefaultDecimalPlaces(65);
  t("-1.5983892e+4", "9.99832092677715834e-14", "-159865762632128476.77799985456482846692994384147816660589792363445455336035295137765");
  setDefaultDecimalPlaces(63);
  t("6.456425158755e+8", "-7.032517e+6", "-91.808169944772262903879222759077582037839368180695475034045420722");
  setDefaultDecimalPlaces(68);
  t("3.26625106468e+9", "-9.00859197118092859075353622721775082623586405059433617804e+43", "-3.625706520096536185858186853366628e-35");
  setDefaultDecimalPlaces(56);
  t("-3.446240016338779007002e+12", "1.27236437553884859320003408542e+2", "-27085323061.47985465403582994448420807549946422615166979464418381753");
  setDefaultDecimalPlaces(100);
  t(
    "1.2032653368386897679831929759529e+5",
    "1.85186637257972829158249135503016025282964613141175634391e-2",
    "6497581.8701351015422192342371625402278143429713920892617345482149496173521951416423220739522932884796119689",
  );
  setDefaultDecimalPlaces(60);
  t(
    "2.72383304908373621837703260321326119535824699180983634648874e+59",
    "1.60714655012e+6",
    "1.69482555830416159085214301851377774673790244094497048422581222720037729772431439078973991084088206560820116381236e+53",
  );
  setDefaultDecimalPlaces(42);
  t("2.3747792e+5", "3.365696326630937214416980479391353e+22", "7.055833234893043714659191e-18");
  setDefaultDecimalPlaces(90);
  t("-7.8765562223726227913427458699918277e-13", "-7.5239102098509e+6", "1.04687004532031903595776768822619041626156314683938779556405056039585565e-19");
  setDefaultDecimalPlaces(67);
  t("2.5128930308e-12", "9.91295111757172818569513947e-8", "0.0000253495957056182587891118694877069694581497397908986199983783149");
  setDefaultDecimalPlaces(16);
  t("2.6194053548070822349e+3", "-4.069e-4", "-6437467.0798896098178914");
  setDefaultDecimalPlaces(58);
  t("1.8584398397278446686258996817178444824e+25", "1e+1", "1.8584398397278446686258996817178444824e+24");
  setDefaultDecimalPlaces(59);
  t("1.643621e-2", "1.063292011868952440335279589710938865248641082044e+4", "0.00000154578514806200892574700804598339571040273757423243911");
  setDefaultDecimalPlaces(38);
  t("-7.336301388251367456927048405173868930771814933368914916937e+39", "2.15580941309684073e+9", "-3.40303801610769512454551447433328392784590437007199866523128382717567e+30");
  setDefaultDecimalPlaces(7);
  t("8.767203443249799491482106121862180975725563306219684e+49", "1.4457116542803925412953602810684312975397e+26", "6.064282194372779121188241171522e+23");
  setDefaultDecimalPlaces(10);
  t("4.5053765945661722482772782335789e-4", "-1.26589932488999e+0", "-0.0003559032");
  setDefaultDecimalPlaces(54);
  t("2.0668119346812924620258734503891169293791885563333441797584e+15", "3.30702181840934585363097062059799293681339872082032e+47", "6.249768063748107989413e-33");
  setDefaultDecimalPlaces(12);
  t("-4.8701665314398e-16", "-2.6727144e-16", "1.822179927433");
  setDefaultDecimalPlaces(47);
  t(
    "1.141786243870539884908057993439024483893943119234357885316e-13",
    "9.857469964924570892050256917070612406353591656858588e-8",
    "0.00000115829543273609842952375919116717650075901",
  );
  setDefaultDecimalPlaces(75);
  t("1.3945661476e+10", "1.48248620972114999493761527057302e+32", "9.4069417877574225564888834526350408761464357097550896e-23");
  setDefaultDecimalPlaces(60);
  t("3e+0", "-7.05261705985573870949975803682537267307755585e-19", "-4253740100361219674.151815966427341147766814777449666247321112520671669488270374");
  setDefaultDecimalPlaces(28);
  t("-1.0410580894111215951343177210285093997e+8", "1.717504995167024286255893e+3", "-60614.559628100561043685936326151");
  setDefaultDecimalPlaces(42);
  t("2.99808600062783538684226e+14", "-3.979120788365e+11", "-753.454383539770177202834860342763054614488743");
  setDefaultDecimalPlaces(72);
  t("-5.915e+0", "-7.008818969322e+12", "8.43936763938445556106333002782649096711744016919666915504815e-13");
  setDefaultDecimalPlaces(44);
  t(
    "-1.4561546197785060411672004289316065660593225042818692060407e+24",
    "6.9159264119329792728300044058245803537e-13",
    "-2.10550912928455450497059444385320309256650851039912509907582156018108975210181407e+36",
  );
  setDefaultDecimalPlaces(14);
  t("9.76456040150081971842e+13", "2.1980688820578933033003772309630118466025183497758727e+43", "0");
  setDefaultDecimalPlaces(87);
  t("1.25111007108357e+7", "7.966062719013321516990495336678e+30", "1.570550113919430451570989937202402826464729211937022011455462757e-24");
  setDefaultDecimalPlaces(64);
  t("-1e+0", "1.50782915834038076007179751317685504124775596540346695377e+51", "-6.632051081309e-52");
  setDefaultDecimalPlaces(52);
  t("4.3164250604162875727691742778478575318376567945e+10", "-2.3833368582581102941507832699e+29", "-1.811084759361711659812010655737502e-19");
  setDefaultDecimalPlaces(31);
  t("-2.8736796022442891771250370924738326e+25", "3.253571e+3", "-8.8323863294954656810164495948415836015258311559821501e+21");
  setDefaultDecimalPlaces(28);
  t("6.6082848889423954577929994e+3", "9.9370169674389112889115056993447796939517836691753089776e+55", "0");
  setDefaultDecimalPlaces(43);
  t("-4.0826267685085304910509145463354068003046406262612592270925e+30", "-7.7e-6", "5.302112686374714923442746164071956883512520293845791204016233766233766233766234e+35");
  setDefaultDecimalPlaces(81);
  t("4.995e+3", "8.67431660914255653294809079818e+17", "5.758378700098829364404604818195114293101729939920124278166207884979e-15");
  setDefaultDecimalPlaces(91);
  t("3.23303074365498085193368766385e-18", "2.24203755e+7", "1.442005618351477142714977125985244983965589693178867588546855515422e-25");
  setDefaultDecimalPlaces(14);
  t("3.761162615635684857182e-7", "-1.641463891294685e+8", "0");
  setDefaultDecimalPlaces(18);
  t("4.643651600139551640262763730036067470741472165522e+48", "8.0154830831632678337443704615529000684705732671141268e+52", "0.000057933521310695");
  setDefaultDecimalPlaces(83);
  t("-9.68045275285028877634220366322e-14", "-3.1262e+0", "3.096555803483554723415713538231719019896359797837630349945620881581473e-14");
  setDefaultDecimalPlaces(40);
  t("-1.173110276824634399230516900728339554122265493835155e+52", "4.921800007984379e+16", "-2.383498465848996077664315403652742204665199070870216690585625204242073310045e+35");
  setDefaultDecimalPlaces(33);
  t("-2.648495276155095728685701822137641957105689908373518395e+4", "6.5183526280298688200726986869612421405654e+20", "-4.0631359291091111e-17");
  setDefaultDecimalPlaces(35);
  t("1.29124825256e+0", "1.847808861121237525708670140324916797508247e+19", "6.987996863357824e-20");
  setDefaultDecimalPlaces(17);
  t("3.0922881689779e+11", "9.09578272454647642700639828005611e+20", "3.3996944e-10");
  setDefaultDecimalPlaces(22);
  t("2.198375539376238513278887688e-9", "9.0991197122433360006488424595026e+5", "2.416031e-15");
  setDefaultDecimalPlaces(37);
  t("-3.756895583358466848211402e+24", "-1.6925320980693677810794263196e-5", "2.219689415429031301465811949827595627913786737724730098119866426068e+29");
  setDefaultDecimalPlaces(92);
  t(
    "-7.7975943084838142836315448328167301981308088887368243e+32",
    "2.9001445359738494864289862370067776975486205e+43",
    "-2.688691619249050058486115426367343744478214770476585056911980847037381781081808862e-11",
  );
  setDefaultDecimalPlaces(18);
  t(
    "-9.364738253603371219919746637897280430414242857703144809e+53",
    "-6.951242320073330170440414083665e+1",
    "1.3472035389358402563632183147220004860822546580177361760639451815522411e+52",
  );
  setDefaultDecimalPlaces(49);
  t("4.61e-20", "-6.848726486656815827e+4", "-6.731178430006710516605464e-25");
  setDefaultDecimalPlaces(80);
  t(
    "-1.0113209376804108536e+15",
    "4.230941031773015341829e-14",
    "-2.390297879563231285214358945963819396434096509486207590457136649773817675858439179877561927748016407665869663e+28",
  );
  setDefaultDecimalPlaces(88);
  t("-4.8174544317e-5", "1.972684e-5", "-2.442081160337894969493340038242313518029243406445228936819074925330159315937068481317839");
  setDefaultDecimalPlaces(29);
  t("-4.703801705449019544852557995e+5", "6.44677131681542536195e+20", "-7.2963681729797e-16");
  setDefaultDecimalPlaces(78);
  t(
    "-1.9439784372892937754252245251940750475268459121141e+3",
    "-2.25287077335321320874333e-5",
    "86288945.654696449900967443200156425364355962796575809570683302153506676774731534615728",
  );
  setDefaultDecimalPlaces(93);
  t("-8e+0", "8.32961082904610017794375423927862929873810837445e-2", "-96.042902413919295617608463049907141243384289396397750509447556031443811668146471521954058584957");
  setDefaultDecimalPlaces(28);
  t("-3.26650795591278468183555067289718428178190136477021e+0", "-3.33027584500621819853691e-16", "9808520699001393.2282224281679892070722041872");
  setDefaultDecimalPlaces(28);
  t("7.5305898402195e+0", "2.4890979169070824814431647565417763145831695158862e+12", "3.0254293288618004e-12");
  setDefaultDecimalPlaces(37);
  t("-5.76546077936876310996283665486892e+28", "5.2e-19", "-1.1087424575709159826851608951671e+47");
  setDefaultDecimalPlaces(8);
  t("-9.5232791736931730139e-6", "-8.822244197252038785418834675e+26", "0");
  setDefaultDecimalPlaces(54);
  t("-1.13795064565196764484569177705739934169920635901277e+22", "4.7584099981050775280186645145e+24", "-0.002391451443034814471328822087737544447332400017516815");
  setDefaultDecimalPlaces(84);
  t("4.85e+0", "1.32820023968964543850189895143417231865887e+41", "3.6515578412583916056277030969067178667567808e-41");
  setDefaultDecimalPlaces(57);
  t("-4.38794536306752085261717764702846454498045842610069310006e+2", "3.281488949256886e+6", "-0.00013371812097862462496319770458399628423014426343549587");
  setDefaultDecimalPlaces(18);
  t("3.1198538370377326421e+19", "7.5095676874177089472298e+12", "4154505.248371423648830092");
  setDefaultDecimalPlaces(42);
  t("-1.5775248757e+9", "-3.644746649066923094924584154614998e-14", "4.328215449773047428790100972978941168699746155074734066057622996e+22");
  setDefaultDecimalPlaces(59);
  t("3.68155070257311e+10", "-6.043976606e+5", "-60912.72257603291590238825619967993635215602619756400824162951765");
  setDefaultDecimalPlaces(39);
  t("1.4375317319496815722873e-14", "-7.82027631807433059003843573e+21", "-1.838e-36");
  setDefaultDecimalPlaces(67);
  t(
    "2.0206859205792220996937395395646551579348950292778e+49",
    "-4.69e+0",
    "-4.3084987645612411507329201270035291213963646679697228144989339019189765458422174840085287846481876332622601279317697e+48",
  );
  setDefaultDecimalPlaces(10);
  t("-6.1392166502898e-15", "-4.543469424730016640432408e-11", "0.0001351218");
  setDefaultDecimalPlaces(77);
  t("-3.18761439e+0", "6.37564085316090540282319729281623654e+24", "-4.9996768378501895179477271603404284024485923759781737e-25");
  setDefaultDecimalPlaces(56);
  t("-9.58309801e-15", "-1.5816362060688244416844e+3", "6.05897738887686683623638917710591680038e-18");
  setDefaultDecimalPlaces(5);
  t("-6.3003206972066743008e-14", "-4.0427125701611865047265771e+16", "0");
  setDefaultDecimalPlaces(78);
  t("4.96e+1", "-2.87620243125221332477349626265374135745275921e+28", "-1.724496143284519424753639587042317624516279944160738e-27");
  setDefaultDecimalPlaces(60);
  t("8.768e+0", "-1.0057e+1", "-0.871830565775082032415233170925723376752510689072287958635776");
  setDefaultDecimalPlaces(75);
  t("4.14886242e-9", "-1.110190434798226410802279014731921489220043e+34", "-3.73707274892351471362054308835508e-43");
  setDefaultDecimalPlaces(4);
  t("2.189077726802e+12", "-2.96061369129188520560299048649313668615554611686e-18", "-7.393999876582277422764000746620582e+29");
  setDefaultDecimalPlaces(1);
  t("2.49320207746581776770474758291479209703764212231422374383e+6", "1.5e-15", "1.6621347183105451784698e+21");
  setDefaultDecimalPlaces(97);
  t(
    "9.435669617291975140252398922606106482969721463503418803584e+4",
    "-4.6442148918133871550028721e+18",
    "-2.03170392350378716920260625995314214918238543928525578543124175905421527023486719214e-14",
  );
  setDefaultDecimalPlaces(88);
  t(
    "-6.80434494927159452892029723335854098815e-2",
    "-2.172944513140422577673e-15",
    "31313937876111.2255863420876534365804627595327256240137743061074327503910530578401328607055783489078588",
  );
  setDefaultDecimalPlaces(84);
  t(
    "1.48084671413141988632365381097746522361954168260818e+50",
    "-1.73057513046604659481955425465867930754042743e+44",
    "-855696.287356576969531155990800532126533926526629160109843587117844643731932418977268804628",
  );
  setDefaultDecimalPlaces(39);
  t("2.3453426238988458814339333828e-4", "-1.5864644141295004805904415289451960351769280423476135035e+18", "-1.47834556073906327e-22");
  setDefaultDecimalPlaces(51);
  t("7.9168914818411107531121313335136244376050749893979935293e-7", "-7.190847e-10", "-1100.967866767449057546646637525958268560723790868863366");
  setDefaultDecimalPlaces(31);
  t("-2.87470599115801209495424524720254230486749561082226088e+26", "-6.481610670043045032139465e-1", "4.43517227044265045568020589368391819165116613473097954066e+26");
  setDefaultDecimalPlaces(40);
  t(
    "-3.2720598421088189999069689433930780981757e+40",
    "-8.552072303668052044542261430337191223925e-13",
    "3.82604323949109554089565861548794350855798553467296110827257517789989626051051148945427012325e+52",
  );
  setDefaultDecimalPlaces(24);
  t("-1.34882040739458954193701997698017665933043836e+37", "3.93812795717143619267876737194276101e+35", "-34.250294100737675491163195");
  setDefaultDecimalPlaces(16);
  t("8.68349637285014685961839876169838695234822562640827e+8", "-2.3171134988888762571251206044239036505e+20", "-3.7475e-12");
  setDefaultDecimalPlaces(28);
  t("1.55247810557791685458407440288e-5", "8.039692e+1", "1.93101689166440313209e-7");
  setDefaultDecimalPlaces(40);
  t("2.073697419442225005443784146876419182793429593e+7", "-1.562064874041081861361222156244037e+18", "-1.32753604149457838319913351696e-11");
  setDefaultDecimalPlaces(37);
  t("-7.33151106921536e+8", "-5.4593775049013e+2", "1342920.7016062367486434766278524846475457352");
  setDefaultDecimalPlaces(79);
  t(
    "7.512640222108689852222091008286162537712637191961971046e+55",
    "2.47339659824069120054808275016e+15",
    "3.03737792291473820222239212744362079559115503771827712952558009450224077485802856713816441271524582289141762318299429431e+40",
  );
  setDefaultDecimalPlaces(49);
  t("4.059418798590646604481666293750769100403876315907144602229e-4", "-4.577343060669524163767814949015842221892512785583856e+51", "0");
  setDefaultDecimalPlaces(65);
  t("1.532461061524127020671253858149424476376e+39", "2.6842713588582896409205e+22", "57090392760288361.78673973503127711973269725067345288559926009761384805766665211041");
  setDefaultDecimalPlaces(65);
  t("-3.3434912467242465603238388756989622e+16", "4.9386932160499485102e+17", "-0.06769991778105278163497042196914292543932252229684480152856012508");
  setDefaultDecimalPlaces(9);
  t("1.3165858298141e-5", "2.29238290695699725895571687055853495226689688e+5", "0");
  setDefaultDecimalPlaces(98);
  t(
    "-5.65271935509644620853498152335934962701e+31",
    "1.2938646642725803088306023e+26",
    "-436886.44656467562230681217671155579099487965898016625914562033531100223548659757619463439547840029934647",
  );
  setDefaultDecimalPlaces(49);
  t("1.31493650736e-9", "6.924815160736905593256067573995738668306e-15", "189887.5965405653900542965332389807951190935471795834238");
  setDefaultDecimalPlaces(100);
  t(
    "7.370768572676098271e+15",
    "4.724157876305523003056581975417537532660752136505059439e+5",
    "15602290959.9294102679475747188948577722144113404051699394751136135617308362757659522543122771643822571528362013",
  );
  setDefaultDecimalPlaces(51);
  t("-1.033680017616050755693212582237723e+9", "-2.047215535025127711750305424224751974732867e+33", "5.04919975415956030293600296e-25");
  setDefaultDecimalPlaces(53);
  t("-8.196e-19", "2.12e+1", "-3.866037735849056603773584905660377e-20");
  setDefaultDecimalPlaces(39);
  t("-9.0245240923163196204250167780415746852134358475531e+23", "3.2127854382958e+13", "-28089407978.340802391378667109436125725232184797399");
  setDefaultDecimalPlaces(51);
  t("-7.988050470278e+12", "-2.016916190354925521e+12", "3.960526723161614360062944041345405628050234633947749");
  setDefaultDecimalPlaces(87);
  t(
    "-3.20306460893786840932393093962738686908535e+4",
    "8.532772539421957958626368406577983e+13",
    "-3.75383803346392265286949440144058755555308052678525486554108118800204715972129e-10",
  );
  setDefaultDecimalPlaces(93);
  t(
    "1.0243161001655978178961016150930091584374542254425e+49",
    "-8.254638223298121066e+11",
    "-1.2408976292559248668274879819424852859594134862529716487059529545683886944391193814420256098851980793806527807843683827567666113083e+37",
  );
  setDefaultDecimalPlaces(62);
  t("-2.30332947e+8", "2.297562393086284707175128144882448814796e-18", "-1.0025100850062088872618165462672310983375094807695163663273149876237573409342340457610351e+26");
  setDefaultDecimalPlaces(54);
  t("-1.461412655154719657536026042221696647128e+0", "7.975657e+1", "-0.018323414047955167298894950500274731562904472948122017");
  setDefaultDecimalPlaces(41);
  t("3.2475e+0", "-1.50513288231648962228233576173634e-5", "-215761.68045720342401575255914896119987249224427");
  setDefaultDecimalPlaces(55);
  t("-4.93698e+1", "-2.95650977723143839350057384603894161538922268799440509392007e+7", "0.0000016698676385312452549957292604276622442268646551233");
  setDefaultDecimalPlaces(85);
  t("7.6090825283924811e-6", "-5.01490630258156163852207586816058241582953497516074634e+38", "-1.51729305978767650004873507424802786691508e-44");
  setDefaultDecimalPlaces(93);
  t("3.328319e+6", "1e+0", "3328319");
  setDefaultDecimalPlaces(35);
  t("-7.273e+1", "1.18049806975026e+13", "-6.16095882438726719544952e-12");
  setDefaultDecimalPlaces(95);
  t(
    "4.63021945045406387277634160054332587254048853883322598e+54",
    "-5.54604790055993810815117698e-18",
    "-8.3486827619836988960127662568192797677399633950347637890997927872805873924833209316705278079805088270184737923928611002995414609831221988484435849513284000494746402598e+71",
  );
  setDefaultDecimalPlaces(57);
  t("-2.6197e+0", "6.9236098386307535616175443761674787157910490322623482e+24", "-3.78371985287675380223165263359902e-25");
  setDefaultDecimalPlaces(0);
  t("-4.6804959360253550179620072518243435284e+31", "-1.2871222315598461e+14", "363640361518200569");
  setDefaultDecimalPlaces(36);
  t("-1.4536184376155715717e-3", "6e+0", "-0.00024226973960259526195");
  setDefaultDecimalPlaces(4);
  t("3.650112348534384235642837995447250464577e+25", "5.595640719473465612262e-8", "6.523135654209496422824211493666010782e+32");
  setDefaultDecimalPlaces(91);
  t("5.784978e+3", "1.04451676364170674121248070258696854118325648679527457585679e+23", "5.53842523295718059463069944368806181936890429882595740849353115059743016e-20");
  setDefaultDecimalPlaces(56);
  t("-9.4358143692340478662790492848961451153761e-3", "-1.51262073471398457710868967e+26", "6.238057004433585513702628018e-29");
  setDefaultDecimalPlaces(77);
  t("-2.161364692194786642361985809e+15", "-5.684280099205418655e+8", "3802354.30779865091864087663908735836783713610179291417126166436690385007937821971189");
  setDefaultDecimalPlaces(71);
  t(
    "-1.54379855856254854933744114322328864001073e+13",
    "-1.24316567854909251872567478460497624673633816e+1",
    "1241828490925.14104578589538104922940789673474127667754854315999327216174341381852897",
  );
  setDefaultDecimalPlaces(55);
  t("-1.96160973386833625159032026800831121e+9", "3.902309019793950638070241521916432480549462113715e-1", "-5026792403.9801260750222862590486214180419542697547152945555061738");
  setDefaultDecimalPlaces(72);
  t("-2.24e+0", "7.832821530205629394042281126298745611814548e-19", "-2859761315079005638.173240374998398697539784163371257974037454339606839364395308352390573506");
  setDefaultDecimalPlaces(88);
  t(
    "1.62095376083821290236150948567356525630742e+4",
    "-6.693394837779304208194796381671239543489809777894e-5",
    "-242172141.3607812142117483726729602807939111319391890543699855279347159106930576961987266250936795",
  );
  setDefaultDecimalPlaces(6);
  t("1.51804349257809172525e-4", "-8.320488614301230576e+0", "-0.000018");
  setDefaultDecimalPlaces(23);
  t("2.090075713215452460787e-14", "1.761e+2", "1.1868687e-16");
  setDefaultDecimalPlaces(39);
  t("1.456766777643166058252231990494962204799319e-17", "5.7149272610372910955e+19", "2.55e-37");
  setDefaultDecimalPlaces(52);
  t("-7.3219e+2", "-1.3866902677629e+12", "5.280126478288602215821008116695862629699071e-10");
  setDefaultDecimalPlaces(8);
  t("5.5207482444837670885312513454844e-5", "9.993085804796100996330778936247164530712832334556411e+36", "0");
  setDefaultDecimalPlaces(100);
  t(
    "7.18346273246663561e+9",
    "-6.1e-19",
    "-1.17761684138797305081967213114754098360655737704918032786885245901639344262295081967213114754098360655737704918032786885245901639e+28",
  );
  setDefaultDecimalPlaces(46);
  t("1.0184351002996448552175608e-1", "-9.3129229306898002504880691221313303709336750320115828e-6", "-10935.7191923439469163104134552373339966594840640924");
  setDefaultDecimalPlaces(92);
  t("-7.4746e+3", "-1.29746e+4", "0.57609483143989024709817643703852141877206233718187843941239036270867695343209039199667041759");
  setDefaultDecimalPlaces(3);
  t("-5.9508e+2", "-4.3668175239829704964791248446041576996832544406e+27", "0");
  setDefaultDecimalPlaces(60);
  t("2.63386830441859155675e+16", "-6.10494752688376268972729867e+26", "-4.3143176789318537004619536210704064139517017226328e-11");
  setDefaultDecimalPlaces(86);
  t(
    "-9.95579922250769830157890219777e+29",
    "-6.289078499216e-15",
    "1.5830298864529666361388282942410150203539287633247828200024263858181929652303534269353764763339072898272431032979726032972255825691e+44",
  );
  setDefaultDecimalPlaces(0);
  t("4.047e+1", "3.96760070441530681852974957e+18", "0");
  setDefaultDecimalPlaces(44);
  t("6.07468802035226670262444559e+13", "7.9205e+0", "7669576441326.01060870455853797108768385834227637144119689");
  setDefaultDecimalPlaces(12);
  t("-7.823993114553249e+15", "-6.4773e+4", "120790964052.201519151498");
  setDefaultDecimalPlaces(59);
  t("-3.52102236647009e+3", "-3.459660588474760557e+11", "1.017736357780224225828337083961614589354228320312576e-8");
  setDefaultDecimalPlaces(60);
  t("5.7350437e+1", "1.01904141760910865423644744502006797347604532e+40", "5.627880870098147401414e-39");
  setDefaultDecimalPlaces(51);
  t("1.53520675105314367736090680685170740155333e+41", "3.27489556839854588150288533025978711639104e+34", "4687803.68408472313216158369582081997722981424214069358695");
  setDefaultDecimalPlaces(93);
  t(
    "-2.690725575912882439455702238083822539e+36",
    "1.212773e+0",
    "-2.218655573559835549979841436182882154368542175658593982550732907147504108353335702559341278211173896516495667367264937461503513023e+36",
  );
  setDefaultDecimalPlaces(58);
  t(
    "-4.629314740214061385127891810915256e+22",
    "-1.2036021067446153155358595188804e-17",
    "3.846216880373346064192864985478632416582925231508226196020269114428976988447093150695494869925817e+39",
  );
  setDefaultDecimalPlaces(47);
  t("-4.760129548892845529695162e+10", "2.803641470091026857180674654306828942906935573267e+48", "-1.697838186e-38");
  setDefaultDecimalPlaces(35);
  t("2.3998452177052047499580607889685827316118108e+43", "1e+0", "2.3998452177052047499580607889685827316118108e+43");
  setDefaultDecimalPlaces(46);
  t("-7.1864297694777255501694417e-9", "9.8167916239e+8", "-7.3205483469585062811546408788e-18");
  setDefaultDecimalPlaces(21);
  t("-7.8864296771694128027129950695844825380394612943296449638e-4", "-3.05148675162642763660116593580932313050595746322e+15", "2.58e-19");
  setDefaultDecimalPlaces(81);
  t(
    "2.119923762161684427022239999761778145335748571878265967e+20",
    "-3.93783545054802915862120637727239758678072322928909525968e+45",
    "-5.3834747256050384598702672805860492438787573358968910792e-26",
  );
  setDefaultDecimalPlaces(45);
  t("-1.3172580415656342262790280369177667264769600331432804e+9", "3.30989503412260731850479e+12", "-0.00039797577505801940294076975011398504069585");
  setDefaultDecimalPlaces(0);
  t("-1.0089714192411860794495985338240248645372487986092940972e+48", "1.1657794331556336910798759265349089743227089619392597e+11", "-8.654908386143114824022084371017498605e+36");
  setDefaultDecimalPlaces(36);
  t(
    "-1.1334986330912624946026418825977925841258876987329e+19",
    "-2.4941764649202021677779794401186011315110214733596897e-5",
    "4.54458074251585588497529372369528367277288830945126612726485e+23",
  );
  setDefaultDecimalPlaces(14);
  t("-7.0798208859592099519107e+22", "-2.005718969e+0", "3.529816986020243373343047841514431028e+22");
  setDefaultDecimalPlaces(16);
  t("1.342487872820847396394930105e-1", "4.859100819628656924541694039501070750660545e+42", "0");
  setDefaultDecimalPlaces(22);
  t("6.34561888387321354933942589323877928658548939665e-10", "-2.25285991966593696759819506469319e+16", "0");
  setDefaultDecimalPlaces(36);
  t("-1.461334621414511461208588141361016e+14", "-8.24875690446361e-10", "1.77158163143800069149606132131757037542877275199277307547729e+23");
  setDefaultDecimalPlaces(81);
  t(
    "1.203046026295572345462187843024e+30",
    "-5.111809344767726e+6",
    "-2.35346419468278741076123373949643163102120628105386032696912023693372418487832782255661937576752800605223e+23",
  );
  setDefaultDecimalPlaces(10);
  t("-2.03216575454e+11", "-7.3234273e+5", "277488.3495518553");
  setDefaultDecimalPlaces(60);
  t("-5.7912586146829567118961379922056660971829e+7", "-1.8790185423281226e-20", "3.082065708360456029123135402643678216941942997544749941373289031059890856881787947957205e+27");
  setDefaultDecimalPlaces(90);
  t("-3.59840443276762402513e+5", "1.538875802517103737192851631390164090784411183302e+48", "-2.33833323448311858683481380541563045365229569127e-43");
  setDefaultDecimalPlaces(38);
  t("-1.51e-2", "-9.3859131693034441287620086651858492951670367295531833e-2", "0.16087939156931935315983806401024678787");
  setDefaultDecimalPlaces(92);
  t(
    "-1.15930712072622891765386771131004300911e+14",
    "4.7546260154173302186442507930923888587726311503141001e+30",
    "-2.438271941824792420386147771961069760661415036230067285661766048583354399408e-17",
  );
  setDefaultDecimalPlaces(93);
  t("-7.503877562085477869719752158888072298098279e-10", "4.59193240090909410103539921954039e+13", "-1.6341437344765544546045927785401362575464923953652127707424639810262111e-23");
  setDefaultDecimalPlaces(70);
  t("1.902857861686886569075875581318981911733e+39", "2.943672e+6", "6.464231958203517814063100716788357913969355281430811584986370764134047543340426514910628629820170182004e+32");
  setDefaultDecimalPlaces(36);
  t("-6.3423895080145203608295866808249922027956053750708652114967e+22", "-3.1967457956193773228261143e+8", "198401434255602.637584407045709516430700074649903056");
  setDefaultDecimalPlaces(61);
  t(
    "-1.985871885720102181148441752203291607452872e+42",
    "-2.6128790598577e-15",
    "7.600320719889173687941242461419915423406077572052142680688412690429675350472647900654176392022939362752160550178557612e+56",
  );
  setDefaultDecimalPlaces(79);
  t("2.26833543002694888901828916e-15", "-1.871170110143895851518009076232749699197467064712e+39", "-1.2122550578004425344412332e-54");
  setDefaultDecimalPlaces(68);
  t("1.49343841738069471951445743438894e-10", "1.2580872013699667377e+15", "1.1870706702639112662092536343887550504802598e-25");
  setDefaultDecimalPlaces(3);
  t("1.4191656403217729e+9", "-1.351958304413090235487400715855169857763100206722379e+51", "0");
  setDefaultDecimalPlaces(62);
  t(
    "-6.200634152394060878909976880751710811333724443583107774055e+43",
    "3.318639897401575443039468047395497647880528787509946932e+31",
    "-1868426326474.59753873661532945722609468244049467933102432454242940855953273",
  );
  setDefaultDecimalPlaces(66);
  t(
    "-2.22582587215615818882526481940759249637918346098e+30",
    "1.000506646239834129462547721563725092887588917835329e-8",
    "-2.22469873690634085397460025887299603265666868598602541366604027462989309586232196407422660531348130124337e+38",
  );
  setDefaultDecimalPlaces(15);
  t("6.3162778981347415830900861e+18", "2.640125782647538795741070108151e+27", "2.392416e-9");
  setDefaultDecimalPlaces(11);
  t(
    "-5.799413229682366477685415555405534156376630015897603554517e+41",
    "-5.95973436751374380790379191606563543542868232e-18",
    "9.730992812858772749810991441569567974462091313821676066607791613860062e+58",
  );
  setDefaultDecimalPlaces(94);
  t(
    "-1.4122736067636595679e+6",
    "-7.36798584455519966020719893429335783247312578404076119276e-9",
    "191677024977905.2844720340919326256088247459745708190612759432747319439585002569686341282233205284760795494559",
  );
  setDefaultDecimalPlaces(29);
  t("-4e+0", "-1.6628070490771e+1", "0.24055707499075742101825345512");
  setDefaultDecimalPlaces(56);
  t("-1.32047401218213370009424e+17", "7.552e+0", "-17485090203682914.46099364406779661016949152542372881355932203389830508475");
  setDefaultDecimalPlaces(99);
  t(
    "-5.62629589616268333312068265433463e+32",
    "-1.3654218386084668411415488042452562679030089770529982e-12",
    "4.12055508200789608187120744121074140118126467372195302279246890027657558690552787208688002946061308565517593468330269443979102184895317944311339e+44",
  );
  setDefaultDecimalPlaces(30);
  t("-1.07730966e+8", "4.90424602521647737279998754325e+19", "-2.196687634471695745e-12");
  setDefaultDecimalPlaces(17);
  t("-1.00341546120691838324731980563989e+23", "2.9999634538341185517702645e+25", "-0.00334475895006154");
  setDefaultDecimalPlaces(77);
  t("2.0986897138e+3", "1.0402e+2", "20.17582881945779657758123437800422995577773505095174004999038646414151124783695");
  setDefaultDecimalPlaces(61);
  t(
    "-1.79840950671231894245010255007480574737036389948e+19",
    "-4.90660886e-20",
    "3.66527994797677625041035480067756154373871142335156505627799318815072616161215671061255125194552394e+38",
  );
  setDefaultDecimalPlaces(94);
  t(
    "7.15684295086625463590147603652645e+32",
    "5.0354e+3",
    "1.42130574549514529846714780087509433212853000754657028240060372562259204829804980736386384398458910910751876712872860150137e+29",
  );
  setDefaultDecimalPlaces(42);
  t("6.7472461730860408441831324135116e+11", "9.8833287476727876950654466477701291e+21", "6.8268964286701528384499262074083e-11");
  setDefaultDecimalPlaces(13);
  t("-9.892302475918012039867974398526250807057967735373030833978e-7", "-1.223997252221669861155025227353613067823377964419950290692e+42", "0");
  setDefaultDecimalPlaces(1);
  t("1.062418969913384562e+8", "1.339638283896594862946484326416613e+33", "0");
  setDefaultDecimalPlaces(58);
  t("-3e+0", "2.33137835947367178395706352392560307e+18", "-1.2867924195184153457539605283164217915335e-18");
  setDefaultDecimalPlaces(13);
  t("3.6694132984923593341888975849202216926318616e+4", "8.95443930467976353749871041387508327625498553998852672129928e+13", "4.098e-10");
  setDefaultDecimalPlaces(43);
  t("3.710418e+4", "5.195307728779801916082471898515e+3", "7.1418637618823954587669685754571914481417154");
  setDefaultDecimalPlaces(0);
  t("-2.4056043471169364204555208333e+27", "-2.63212486404180725989595027e+24", "914");
  setDefaultDecimalPlaces(17);
  t("-2.1918277100963066238110583690609638264497e+10", "-7.442e-4", "29452132626932.3652756121791059");
  setDefaultDecimalPlaces(6);
  t("2.80307645085382879e-18", "-1.52709939608411740395635514554e+9", "0");
  setDefaultDecimalPlaces(2);
  t("9.8951296e-4", "2.1525100137474766714613764590929471e+25", "0");
  setDefaultDecimalPlaces(91);
  t(
    "-1.173060110442220012467895535070552306174665592221198964295e+47",
    "4.87489622713504516917162871893554657036045925095e+32",
    "-240632837251516.6793627452254704965411062997943402580563204304552505230143648804198933828218496837701558142",
  );
  setDefaultDecimalPlaces(12);
  t("-1.491231e+1", "4.780410159161309035057418102796744456907e-12", "-3119462452698.047352186926");
  setDefaultDecimalPlaces(17);
  t("-2.72760307669e+10", "1.5151497367587466666908e+3", "-18002201.43604400144072974");
  setDefaultDecimalPlaces(3);
  t("-4.4644775434953850922214961796185293055130194305277406163342e+8", "2.8777216797252e+13", "0");
  setDefaultDecimalPlaces(70);
  t(
    "-5.9004092899686217824521483259826677737e+11",
    "-3.46882991954408004971013817214368034198974e-11",
    "1.70097970405655759696908920484901448565935944393379080923221275096779092558155007321599851899e+22",
  );
  setDefaultDecimalPlaces(54);
  t(
    "5.725208721541169372692539837607818972932656047985559690323e+10",
    "-2.64335681479402190667311801855524e-4",
    "-216588569863100.164903787885961504847977781286672333624940631968024274",
  );
  setDefaultDecimalPlaces(48);
  t("-1.0169838e+4", "-4e+0", "2542.4595");
  setDefaultDecimalPlaces(65);
  t("-8.606153587e-2", "4.438427300652407543e+7", "-1.93900969961476567297185709919720645233180754497667649504e-9");
  setDefaultDecimalPlaces(65);
  t("5.3623438e+5", "-7.72636891094812504923577233971686428361341942998261172334e+56", "-6.9403155114709e-52");
  setDefaultDecimalPlaces(68);
  t("8.98061956057572142472e+8", "-3.987469700705710084038661903883e-14", "-2.252210106821956299996951328761332190429289079857996826609044659200421328291633511382784566e+22");
  setDefaultDecimalPlaces(55);
  t("-1.056945686904e+0", "-2.58277715645139512109961968712e+26", "4.0922837042441160191788249709e-27");
  setDefaultDecimalPlaces(62);
  t(
    "-2.710973918933078368782942035248135054227779095201e+24",
    "4.6321177750571e+0",
    "-5.8525582694184848550500477866752843549317206675176558415302257403091664935545268153762e+23",
  );
  setDefaultDecimalPlaces(95);
  t(
    "-4.95796517200012827144917091e+13",
    "-1.097430733668317356249936960668746527264511252735587179e+41",
    "4.517793260106201731249684597094198858002785086354158552338057907538e-28",
  );
  setDefaultDecimalPlaces(23);
  t("-4.23248827118495468101891071135577e-14", "1.035535213930693642426580101606181220185805890439252e+3", "-4.087247e-17");
  setDefaultDecimalPlaces(68);
  t("-8.117679121727499751e-13", "8.4375837515818337156272653147398124567853e+40", "-9.62085753543559e-54");
  setDefaultDecimalPlaces(9);
  t(
    "-1.8027739439477990278923962225016149910449279812e+30",
    "-1.823851338699362417391835815950337124381730020364816804e-10",
    "9.884434688812991478806585776619210764426488562385e+39",
  );
  setDefaultDecimalPlaces(97);
  t(
    "-4.23787270989796527070407874148741216125069e+17",
    "9.5364375948985304211967735929e-10",
    "-4.443874001928135170717388144891185378790252991261009575536601598676352110858517641662095459299694192210048888097728090483274e+26",
  );
  setDefaultDecimalPlaces(77);
  t("6.96119618e+2", "9.1921672856337463871e+15", "7.572965073078591252520047596083077165807074379708621562171525204e-14");
  setDefaultDecimalPlaces(52);
  t("1.37118035631282435950068744640350215391e-17", "1.52065851328068533096318391438821e+13", "9.017016932714399115686e-31");
  setDefaultDecimalPlaces(2);
  t("-3.6351e+4", "9.69301446984098312826012110160503e+10", "0");
  setDefaultDecimalPlaces(26);
  t("-8.417944054695458625e-11", "-4.643037767855156031619e+21", "0");
  setDefaultDecimalPlaces(27);
  t("1.101005286016e+7", "3.136773485038578228217521063934792553919005764505835413e+4", "350.999296336649271645362508305");
  setDefaultDecimalPlaces(68);
  t("-1.613029e+5", "-4.6340003141531789663298e-17", "3.480856475286550013637572500530090933248282643142744736046723486523687524009558624451488e+21");
  setDefaultDecimalPlaces(65);
  t("1.21e-18", "-2.07702265458452171879294293439848774e+2", "-5.82564661646429159586046569326771631167988751e-21");
  setDefaultDecimalPlaces(100);
  t(
    "1.2044428672561692011363674475e-3",
    "-1.694748984733349447978600327909212909284883421846451402e-1",
    "-0.007106910097637116160931095610403056492219663727552481509416717586165882486194861773670575437534422",
  );
  setDefaultDecimalPlaces(6);
  t("-5.84843393531605051035409019918429415416945113466868862e-19", "-1.023548423728483e+8", "0");
  setDefaultDecimalPlaces(86);
  t("5.4e+0", "8.123e+1", "0.06647790225286224301366490212975501661947556321556075341622553243875415486889080389019");
  setDefaultDecimalPlaces(47);
  t(
    "1.531184739006383373010163573116054499664385874559240181892e+57",
    "-3.2863e+2",
    "-4.65929689622488322128279089893209536458748706618154210477436630861455131911267991358062258466968931625e+54",
  );
  setDefaultDecimalPlaces(38);
  t("-8.884004107443463113e-14", "7.6793131024742527996932378610321924645e+34", "0");
  setDefaultDecimalPlaces(26);
  t("-9.5455440688347586903394e+2", "-5.03970230360111043782845181182391371e-7", "1894069033.00895509752693316065823393");
  setDefaultDecimalPlaces(68);
  t("-1.9766954093763071997e+6", "-1.0268046543110817820307664419491e-6", "1925093932012.35485318805490683731232945171765077219353134621689675958507072259953");
  setDefaultDecimalPlaces(29);
  t("1.088963674416014663864583433767009165e+36", "3.2195474856568018543766780320967318423452975644456225315e+28", "33823500.9505958966281858167064194496");
  setDefaultDecimalPlaces(10);
  t("1.0160353397e-12", "-4.9299668335423739690183e+22", "0");
  setDefaultDecimalPlaces(71);
  t(
    "2.99500562609687367650802276907947e+32",
    "-2.4583879445924627762064027129472148198939645297204657742676e+46",
    "-1.218280309535673488530141450293803834212892053718757398628e-14",
  );
  setDefaultDecimalPlaces(43);
  t("1.24267954124012803109039653533147806981439889941e+38", "-8.2708744774245e+2", "-1.50247660586803014925177258919213110843973570541800065007201761744792932388174e+35");
  setDefaultDecimalPlaces(69);
  t("1.175483530003994435532218661e+6", "-4.6846370539e-14", "-25092307397120433205.055272446407440990334775270945350279230945738048011984538429345406839");
  setDefaultDecimalPlaces(66);
  t("-1.587750945029658225864084149432027362e-10", "-9.59768e+4", "1.654307025270334316068137455543451502863191938051696e-15");
  setDefaultDecimalPlaces(47);
  t(
    "-1.44744325608602245580492103679672277153558794665e+10",
    "-7.731319758258329994621309011923835996788835326e-16",
    "1.872181336879661880279324517255814687533288246350718933659089285694506414e+25",
  );
  setDefaultDecimalPlaces(71);
  t("-5.896425274867e+0", "-1.779394759561486750777723876354662949898341782e-4", "33137.25210880194122440175146453854697796704684789620438091767825649072474402");
  setDefaultDecimalPlaces(47);
  t("9.05228107526204328434342984e-19", "-1.086472685338054926e+7", "-8.331807322376848136344e-26");
  setDefaultDecimalPlaces(54);
  t("-1.338346650791984522698e+1", "-6.71809122159e-3", "1992.153137919482096238643134556984687096046062249998260819");
  setDefaultDecimalPlaces(100);
  t("-1.3254418222398206e+8", "5.015068586409328783100039483e+16", "-2.6429186349150327116459125007645155837827716402173934903780454116319880793257329019685123838e-9");
  setDefaultDecimalPlaces(16);
  t("-1.635455815038705207812000439094872576160032218815221e+27", "3.683082892751999260429250846147890121147629867423084011874e+29", "-0.0044404534534293");
  setDefaultDecimalPlaces(15);
  t("-5.970100186164424978035156524537e+25", "-1.6281216394963378639309724078418797935e+37", "3.667e-12");
  setDefaultDecimalPlaces(70);
  t(
    "5.5154283246727306268834502946e+29",
    "-2.65390812422305078900968742281692171702783832364059008468e+37",
    "-2.07822881068552772963943759434496749528524004623717163060993504e-8",
  );
  setDefaultDecimalPlaces(29);
  t("-5.73394150887863989396213414e+26", "4.102504266373796025295757375e+15", "-139766862788.5881865936813273356351478081");
  setDefaultDecimalPlaces(5);
  t("-9.68522607393399846578005923335343759074117966837e+31", "-1.117889563577536945914695431468644e+25", "8663848.72844");
  setDefaultDecimalPlaces(6);
  t("-8.62309964e+5", "-3.778324302506954611137813207490030519481487e-4", "2282255028.844001");
  setDefaultDecimalPlaces(42);
  t("-1.66089446410523248e+17", "4.502622002265709198512551892062905348372292718323597e+2", "-368872728661094.390244647185633360023833610312599629109114");
  setDefaultDecimalPlaces(54);
  t("-4.0744638718e+4", "6.483342240712449645857397732749274222051837870303040826192e+57", "-6e-54");
  setDefaultDecimalPlaces(37);
  t("-1.9e+0", "5.4634e+2", "-0.0034776878866639821356664348208075557");
  setDefaultDecimalPlaces(59);
  t(
    "-5.769530666957146372251806773819245018688713039416652e+15",
    "-5.74425217316622733235802278697e-8",
    "1.0044006587853167932506229961797979751509714402865998247319368850119698795501378978e+23",
  );
  setDefaultDecimalPlaces(32);
  t(
    "-1.2724077315680565241511340961131679124797481e+18",
    "-4.21775320765964715031662690499109509421e-16",
    "3.01679038322418091687907172663097935378064024195247558112106875199e+33",
  );
  setDefaultDecimalPlaces(33);
  t("-2.849303954936656334240512037253388019782857e+6", "1.70986709159e+4", "-166.638914156017682003566189077110409");
  setDefaultDecimalPlaces(50);
  t("-2e+0", "-2.185253734437e+12", "9.1522552666648203738831700797876566745e-13");
  setDefaultDecimalPlaces(83);
  t(
    "1.42300788964686997815883028417058600464e+14",
    "-3.9906100615448134385955538265233e+5",
    "-356589059.74291219187971142584513414653518465847578895898892412771802052232183828159656408386",
  );
  setDefaultDecimalPlaces(13);
  t("-2.090020567852913e+10", "3.225760705562869487763311e-19", "-6.47915564303527932710246293027840370928809e+28");
  setDefaultDecimalPlaces(97);
  t("-2.534615615e+9", "4.00872364472096740735941974455274546208840486588646486219289e+28", "-6.32274968202859322730735228638394686429751113978766705371435906028351852083163e-20");
  setDefaultDecimalPlaces(97);
  t("3.307861248557758129592641e-15", "8.47796310439778685356319963189545e+0", "3.901716966474961623085896240930132617282115801445494255643104635832525756881058079e-16");
  setDefaultDecimalPlaces(46);
  t("-2.094912556739776535e+9", "2.18323119413118956517125091113507e+33", "-9.595468232458270768446e-25");
  setDefaultDecimalPlaces(28);
  t("2.116591353258e+8", "-3.2e+0", "-66143479.7893125");
  setDefaultDecimalPlaces(29);
  t("-3.568114814946888760591700382631646198035091370479e+17", "-2.747272409200836684222707752191e+18", "0.1298784497306122506409550022");
  setDefaultDecimalPlaces(91);
  t(
    "-1.85665422605550872126607444183870231654216813827e+47",
    "1.3e+0",
    "-1.428195558504237477896980339875924858878590875592307692307692307692307692307692307692307692307692307692307692307692307692307692307692307692e+47",
  );
  setDefaultDecimalPlaces(100);
  t(
    "-3.6216469113087041775708276328049553096394611995331025418906e+58",
    "-3.427421073e+3",
    "1.0566682161811824098482537493591921174604568930749240748134362655241806059818200808500426699687272419358203555049449857893197355620039977504100500697365001e+55",
  );
  setDefaultDecimalPlaces(23);
  t("4.623878994e+0", "-2.746180300736968374563573737588073628715315e+33", "0");
  setDefaultDecimalPlaces(80);
  t("-1.734676e+3", "-1.166317469326919593241264388471278966061015221481465e+7", "0.00014873103126896310918172212124217766176275955034496838525538314646910239367982");
  setDefaultDecimalPlaces(32);
  t(
    "3.62833324458048282953412736622867623559295216797719234e+53",
    "-1.618727139539763464809782e+7",
    "-2.241473041350310970759083416345818825984325879330382644016785885495742502690758e+46",
  );
  setDefaultDecimalPlaces(25);
  t("1.61654124354063834467002416289099817544197836e+0", "2.7e+0", "0.5987189790891253128407497");
  setDefaultDecimalPlaces(90);
  t("1.28544596618e-10", "-8.13124911873677480997908259234488855481032134001174242e+25", "-1.580871459488255926146153683192410639317832344908282478e-36");
  setDefaultDecimalPlaces(90);
  t(
    "-9.517652150039382309991860930326696622459187374993782e+52",
    "-6.01657948732873924577e+5",
    "1.5819041649967564581949327743940629312206125862853413728874729700832747942275398829205207156479662935569601864418453909765805054016081282e+47",
  );
  setDefaultDecimalPlaces(21);
  t("-3.76203740099426818384524074562e-19", "4.16186867681861404871279743e+24", "0");
  setDefaultDecimalPlaces(4);
  t("-3.45353505756255394826761387857852823422412978444043661405e-5", "3.35e+1", "0");
  setDefaultDecimalPlaces(9);
  t("-2.6748507362640855382354e+15", "-1.10177982546754936163459423457554562719157902511184e-10", "2.4277543248071279154763992863867312e+25");
  setDefaultDecimalPlaces(41);
  t("1.353026460181369e+5", "3.579e+1", "3780.45951433743783179659122659960882928192232");
  setDefaultDecimalPlaces(15);
  t("2.44223943774631778873279113166245024346000243497e-6", "6.4410979698538806360075519125205579924080241772895412969e+55", "0");
  setDefaultDecimalPlaces(47);
  t("6.116233359107037467380350753552433538204933117e+33", "6.48504535244909865680723251143422675843100125420036809e+31", "94.31288490214215495109584780365605121449478136347");
  setDefaultDecimalPlaces(86);
  t(
    "-1.069568763155062878887096559527087e+29",
    "-6.620124415812256388197174207564e-20",
    "1.61563242014059958337403885231501923556089729130225454644430726055640944197821446509031178660306331730989751072970079373938863701314989e+48",
  );
  setDefaultDecimalPlaces(92);
  t(
    "9.88484036032404119876158172636854818e+31",
    "-5.13530535189550612975648274764651532e+20",
    "-192487879161.37103025859099985593003672517201634473170188343859818508424596875751200786510984229011206094",
  );
  setDefaultDecimalPlaces(96);
  t(
    "6.38183695244257682058736984323278242652628143752428718e+28",
    "6.761694836097976676758377864842e+28",
    "0.943822090043535982604015540185037193289800117777522739346569758657373821417289677617259736554677",
  );
  setDefaultDecimalPlaces(59);
  t("-2.1628797152500324304e+20", "4.9288625875180258727613879093458223824284e+40", "-4.38819236049989054535741497984032731966e-21");
  setDefaultDecimalPlaces(94);
  t("9.384243890458776353e+3", "-1.4293207238988457e+7", "-0.0006565527060197377818825583344091237499795188210973937020204655563031553574689205079881136781");
  setDefaultDecimalPlaces(89);
  t("-1.43e+1", "3.5305984292673562535e+16", "-4.0503048665796383226506133299678947516527726818165991323796531610181672664e-16");
  setDefaultDecimalPlaces(65);
  t(
    "1.0652828675022221228215966775977181944592952809e+42",
    "-6.72049570605162270129585361e+5",
    "-1.5851254343380712475382202571408179804832157378731091834978419950829388558619221883612149403654338084e+36",
  );
  setDefaultDecimalPlaces(16);
  t("-3.141787767599609794709556133391219e+33", "1.1662818731058929664004457253610309523618e+4", "-2.693849437300094337278341305407539095210229544e+29");
  setDefaultDecimalPlaces(26);
  t("1.67127185143027389603699360915829329856081e+24", "-9.641642185611405577916360129e+15", "-173338920.82454349170341726428673429");
  setDefaultDecimalPlaces(17);
  t("-1.470660509431888992950456081324656662466896446231329613372797e+8", "3.315281198709e+7", "-4.43600533796221353");
  setDefaultDecimalPlaces(47);
  t("1.39019856e+6", "-1.915626404085686e-13", "-7257148664452300981.9286976888330975468401651889119887103116414005");
  setDefaultDecimalPlaces(46);
  t("-1.932676719030777595935411912016603286715340277685046e-3", "-5.91776997477153301231433376046751945549643584934885293304637e+13", "3.26588685817480144485736296068e-17");
  setDefaultDecimalPlaces(76);
  t("-1.49239722058680416573833487102190441e+4", "-2.57442e+4", "0.5797023098743810900079765038423817442375369986249329946162630806162164681754");
  setDefaultDecimalPlaces(7);
  t("-1.204e+3", "1.264170584275034730844134873469064270447106945229304e+11", "0");
  setDefaultDecimalPlaces(45);
  t("-6.458842691937754351894e+11", "-7.5767261459944167350232372527192556892743586038977606678826e+55", "9e-45");
  setDefaultDecimalPlaces(3);
  t("1.0105e+3", "-1.63620229915674939329971225e+10", "0");
  setDefaultDecimalPlaces(0);
  t("1.430220230495982484799806813122508297216e+5", "-2.88719523825111169e+2", "-495");
  setDefaultDecimalPlaces(17);
  t("2.35922429863e+2", "-4.878475198084845721379814e+13", "-4.83599e-12");
  setDefaultDecimalPlaces(12);
  t("-9.928873235787972444078e-12", "-2.7483080305499532549502516887468177543048e+28", "0");
  setDefaultDecimalPlaces(36);
  t("-5e-17", "-1.919832942154855612889557788116653931034079370180612725273e+26", "0");
  setDefaultDecimalPlaces(34);
  t("-7.93876e+1", "5.3444244658144361338145015770960354e+0", "-14.8542842185911844841517151235783454");
  setDefaultDecimalPlaces(99);
  t(
    "-2.331397292348531197811966398660726158819943144e+36",
    "-1.2487232782699e+7",
    "1.86702477075519145738639800091252670503484614812401617183701450564389157237021865193200793830604882617652092957536505626638039762e+29",
  );
  setDefaultDecimalPlaces(12);
  t("2.02292365138707581565225689237784700819199e+41", "1.01152547781740922485280539565966037192173e+8", "1.999874146276555167716425179824384114572862957e+33");
  setDefaultDecimalPlaces(4);
  t("-5.0043638704127586330662535e+1", "-4.131911301491421142173816240856835348120653839535e-19", "121114987841254581095.6914");
  setDefaultDecimalPlaces(58);
  t("-4.1907008704681547246792341885243969587218334794358999e+0", "1.04771016409099062835358164043998022827845098989126401826e+56", "-4e-56");
  setDefaultDecimalPlaces(9);
  t("6.74636989794906568e-17", "-2.72264052353342188923641958801171818299533380510970272350563e+5", "0");
  setDefaultDecimalPlaces(63);
  t("3.989983413584975397020439566458971950523904e-12", "-5.855290232154065369500136158219317932087e+39", "-6.81432218624e-52");
  setDefaultDecimalPlaces(67);
  t("2.748373212559411165353020622348150220685686429e-5", "-4.95771846729e+8", "-5.54362501762173184700524141074628354804085773454391501e-14");
  setDefaultDecimalPlaces(7);
  t("2.23356872260141426134650150629865109771211702108782529787e-6", "7.07067818173836238174e-14", "31589172.4271954");
  setDefaultDecimalPlaces(56);
  t("-7.805414675244025e+15", "1.2880869871132375e+2", "-60596953104362.35508902378796844926810049570511146707019130863064856946");
  setDefaultDecimalPlaces(25);
  t("4.126243685e+3", "-4.4162672407511708733073e-10", "-9343283501788.6276221825173123974261659");
  setDefaultDecimalPlaces(56);
  t("0e+0", "2.0418480408101084044686716586e+28", "0");
  setDefaultDecimalPlaces(85);
  t("1e+0", "3.346e+0", "0.2988643156007172743574417214584578601315002988643156007172743574417214584578601315003");
  setDefaultDecimalPlaces(82);
  t(
    "2.9236486832077956e+13",
    "1.438942971110897993726188125270256720010581400138842841924e-11",
    "2.0318030261829415620040678453234121650660738080716747993897222226799435207600881005050966016497326051421228e+24",
  );
  setDefaultDecimalPlaces(82);
  t("1.1659846752830817247095538779131876950312033209e-5", "1.7550409473957777411e+1", "6.643632315321367517152683858509582813163092832672768274047096347897286098143e-7");
  setDefaultDecimalPlaces(87);
  t("1.59914278363054143617250088e-12", "1.1046913514250031028144111672774004152555183637256577467395e+20", "1.4475923809557464188527058781563394142642926538923383163e-32");
  setDefaultDecimalPlaces(85);
  t("1.508111523833323102e-14", "3.16157976178450074966524651156545873682843429610913e-3", "4.7701201217903002031718258139835214142624644051179628380552666203233168873e-12");
  setDefaultDecimalPlaces(60);
  t("2.9767674205641259459518559e+22", "-1.0000629582e+6", "-29765800204438828.358874975277531482117442553628220163789284121492422255781136");
  setDefaultDecimalPlaces(42);
  t("1.33501639378883149342565335758325e+5", "-2.2607250452102215079474933038357914256904759767054208e-16", "-590525768101396990527.667614887107132351686408086703524279413733");
  setDefaultDecimalPlaces(94);
  t("2.222886921683566506134460224364e+16", "-3.33337e+0", "-6668587410589183.037389969383428782283394882656290780801411184476970753321713461151927328799383206784725368021");
  setDefaultDecimalPlaces(33);
  t("5.18477883019080112084235846e-5", "-5.2e-2", "-0.000997072851959769446315838165385");
  setDefaultDecimalPlaces(45);
  t("3.3425003924630380591502472727690614316e+38", "-2.91169235942626091373440732099279e+14", "-1.147957950173577542565025111638054641900114227124581142807133977218367e+24");
  setDefaultDecimalPlaces(85);
  t("-9e+0", "1.356233021898532887e+18", "-6.6360277730159401618785733645162427669130738767440227747447767356896e-18");
  setDefaultDecimalPlaces(65);
  t("-7.60780793477514831778261526407e-13", "-3.705395452851779657767078771e+8", "2.05317031112562061104254507439604906688191977e-21");
  setDefaultDecimalPlaces(55);
  t("7.52922177485043911902969718135542949e-6", "3.08787049191790183714108762212744e+24", "2.4383217478055491114112e-30");
  setDefaultDecimalPlaces(23);
  t("2.350980240939935265983489822553209256034257e-10", "-8.433764946179482481216628953e+17", "0");
  setDefaultDecimalPlaces(63);
  t("-4.356619371974717295e+7", "-5.0950077623311270340442524162e+7", "0.855076100999191859875720829086014546331883408421889757669012229");
  setDefaultDecimalPlaces(75);
  t("1.8595120729741093056751738847054703698045139795545544e+12", "-2.7261515201073271452877528e+20", "-6.821015116947356240963881489488958793722922173351538574825287408765e-9");
  setDefaultDecimalPlaces(57);
  t("3.01918028648837e+11", "1.0294298794249604268175654391293529863666313759e+15", "0.000293286638248239329597056801140592163094941196578978793");
  setDefaultDecimalPlaces(9);
  t("7.3821332422710961186450390329050760473881899501038e+8", "-1.80598177304261537203e+20", "0");
  setDefaultDecimalPlaces(38);
  t("-8.93477e+3", "5.2487441685011725371848490805886e+1", "-170.2268145134497238222794079865127767986");
  setDefaultDecimalPlaces(50);
  t(
    "-2.25743408033319881651408e+23",
    "-2.72404103312682272708067748381680913140032370912e-7",
    "8.287078105214797004971138374682488716147129467758935416388433003052973174973834e+29",
  );
  setDefaultDecimalPlaces(73);
  t("7.812657834587126405018364711e+25", "3.81012134120621e+5", "205050105625082048593.183715578574164368205674309949045767292115034067281942458479248376682341");
  setDefaultDecimalPlaces(7);
  t("-2.46056600607116215907151274205340882103974812937261e-17", "4.489609376982546585728140287505762766555309811e-9", "0");
  setDefaultDecimalPlaces(17);
  t("-4.4293679422675393637536057114228008026241701026e-12", "1.41923504817170678887896084610813881820805101065746742993e-6", "-0.00000312095445217");
  setDefaultDecimalPlaces(69);
  t("3.3658751095163321530940179868053748034995321e-13", "6.251780213588994551576953395e-16", "538.38666660101048882224118307740679160413480237128189908134091538166381");
  setDefaultDecimalPlaces(82);
  t("3.1729738860633425661780178329842835831009859e-13", "-2.23432450368793651749948827256638287477e+38", "-1.4201043227275572441389695073804e-51");
  setDefaultDecimalPlaces(82);
  t("5.9e+0", "-1.5843156179016845162896765027952763295e-7", "-37240054.5278606689682367597506318994427027307905370443328922629845977892447248020247954223");
  setDefaultDecimalPlaces(12);
  t("4.123568290486946999917783243e+27", "1.04e+1", "3.96496951008360288453633004134615384615e+26");
  setDefaultDecimalPlaces(42);
  t(
    "-1.45995936970879842791548702873108675033335732059e+38",
    "-3.288647421619562690453915426996547510032558e-19",
    "4.43939158728609201167309354839572113320342632199797881665467144539000081493285161231402275536582836e+56",
  );
  setDefaultDecimalPlaces(39);
  t("-6.80525087276968448327476810623534182416852e-1", "-6.8050255862194885136981393509940842e+9", "1.00003310590788257812291978363e-10");
  setDefaultDecimalPlaces(34);
  t("-1.028999638779096625343886e-3", "-5.96e+0", "0.000172650946103875272708705704698");
  setDefaultDecimalPlaces(94);
  t(
    "8.8019749685014936726558602930409260405974575540781880337e+17",
    "1.2560783e+6",
    "700750500068.4665655521523055561843589366568592163552251241025340538085882066428502108507089088315593064541",
  );
  setDefaultDecimalPlaces(23);
  t(
    "3.28285189516155362292391706393259270911732262801958571166e+54",
    "-1.68159823036768867681980203347160084657e+16",
    "-1.9522213070144251719915039172376818053230119463904593360162086e+38",
  );
  setDefaultDecimalPlaces(24);
  t("3.3967746756e+7", "-3.687885151974233984636860594e-7", "-92106303087600.384259579319461118960069");
  setDefaultDecimalPlaces(38);
  t("-7.54994240884956e+4", "1.37897454661588293482674617e+26", "-5.4750411654643954e-22");
  setDefaultDecimalPlaces(10);
  t("1.87560451850458356655011499614895160050239912055e+9", "7.789339948651208331800063478770856335054e+19", "0");
  setDefaultDecimalPlaces(1);
  t("-6.11307023577698032211452547103017994355731e+41", "-9.8901193264e+2", "6.180987341031542199689395115638470446228e+38");
  setDefaultDecimalPlaces(22);
  t("-1.127613592864201544e-18", "3.9628e+5", "0");
  setDefaultDecimalPlaces(69);
  t("2.010947494956377e-15", "5.64846023370623509068730452413073489566724693850114441e+39", "3.56016934129479e-55");
  setDefaultDecimalPlaces(19);
  t("-6.1948187535469410756036330507510033070792737476645854e+28", "-1.00096343931291544945576675883e+30", "0.061888561662144309");
  setDefaultDecimalPlaces(1);
  t("-3.314862510591128e+15", "-7.9685949238631e+11", "4159.9");
  setDefaultDecimalPlaces(28);
  t("2.92699181087330983987216670098562080722182773935209144476e-13", "6.971197427821546642912712374695858975538400350202e+48", "0");
  setDefaultDecimalPlaces(97);
  t("-5.10235e+4", "-2.028318505982263715937810377e+13", "2.5155565977193803833448168515750669128102560797165582373530950826572326340070111521846084e-9");
  setDefaultDecimalPlaces(31);
  t("-6.357e+1", "-5.36359182897975843743399070186310864727982240547294258041369e+38", "0");
  setDefaultDecimalPlaces(65);
  t("1.13594527086760279348464125083111705572146744193633788251835e-18", "4.922488091826579841e-4", "2.30766484281344271432842498203191135232475451748791e-15");
  setDefaultDecimalPlaces(31);
  t("2.273886803413789936116855690708081850696151336651e+1", "6.76825111914159532790165051521263059976847e-15", "3359637169760011.4465383232465347985554330060208");
  setDefaultDecimalPlaces(97);
  t("2.1993266036964788189274640619020133e+5", "4.97344e+3", "44.2214363437877770502401569517680579236906447046712134860378329687298931926392999613949298674559259");
  setDefaultDecimalPlaces(61);
  t("-6.916e+1", "8.98743326596297811019029915433702138271703721153364e-17", "-769518926631937568.9157130329204354645998040107019317871240212557711785971538486");
  setDefaultDecimalPlaces(65);
  t("-7e+0", "1.35934568698158501313807005481071724921392702e-1", "-51.49536329896656113685140835230657070115091112660696135887313747813");
  setDefaultDecimalPlaces(30);
  t("1.59416888725292e+11", "3.9339162002532423626015e-13", "4.05237124052184129720706239144907356609121973135947295e+23");
  setDefaultDecimalPlaces(50);
  t("-1.273311e+1", "2.175373999861845362358921676103597606290368908721952500508e+1", "-0.58532969506892424563445646540673255828425813666843");
  setDefaultDecimalPlaces(4);
  t("-1.54454275671921740494197491439586965550933690178644409e+18", "-4.5594120636300418247981516316276145620408451549572e-10", "3.3875919420397974765338687979484e+27");
  setDefaultDecimalPlaces(73);
  t(
    "-3.173774493098250731395147750037755119781065e+6",
    "-6.374458344459509727632140367877033039e+6",
    "0.4978892827587149360284107189621618246179413982611516757703805770489797973",
  );
  setDefaultDecimalPlaces(98);
  t(
    "-3.2816590612392769876402325516335354183e+21",
    "-3.785976894683267186500875080035410724e-17",
    "8.667932088671182551964965308662359248067273979558858565954244271690694763778376553402059381166445252986195192654014905534546777126356898e+37",
  );
  setDefaultDecimalPlaces(100);
  t(
    "3.0507908499916715151172591062939514807618e+15",
    "7.4631708556359329299551866683695169122405504787859e+33",
    "4.0877944629765751277681701700073701143020541428677007973890378137092450870737569e-19",
  );
  setDefaultDecimalPlaces(52);
  t("1.656740407895958637258e+8", "1.031244044111619e+7", "16.0654543156482719305980840509742352085907483216963038");
  setDefaultDecimalPlaces(65);
  t("-2.914159108566290062931999915157637119382389e-15", "3.469277380077e+8", "-8.39990231193797140293831891687776220338551e-24");
  setDefaultDecimalPlaces(54);
  t("-1.66945e-15", "5.7461906420664e+1", "-2.9053160676194437708163440591983398999e-17");
  setDefaultDecimalPlaces(40);
  t("1.3e-3", "1.92382069073905459414237086744012737848364074922162550087e+56", "0");
  setDefaultDecimalPlaces(53);
  t(
    "3.2587279425948066346983540600629200357274397639e+46",
    "8.8921762656404436156758065505e+8",
    "3.664713614806085258038997764669255644051098080785336419578210943701020446571904024575095296e+37",
  );
  setDefaultDecimalPlaces(74);
  t("1.3676033191143468e-17", "5.807365804e+9", "2.35494605518455265539873334281871250967609961151e-27");
  setDefaultDecimalPlaces(85);
  t("-4.255771665667843578747e-5", "1.66286591523965156220429376351842469519365353475892e+36", "-2.55929935580795369780562326754344450968624356e-41");
  setDefaultDecimalPlaces(77);
  t(
    "7.643922404542017997101170792628986505647757562063e+4",
    "-2.4717571380111928972430122283809053196087841e+24",
    "-3.092505443594031567614134608539387678344759830462570413753e-20",
  );
  setDefaultDecimalPlaces(78);
  t(
    "-1.69063559205575408072530278362300111640479939e+44",
    "-2.8125589705764139806762475536794801236488862045810078e+44",
    "0.601102273674023740154083096385022051424588048465837605515425824182767406940415",
  );
  setDefaultDecimalPlaces(43);
  t("-5.19036402883684e-6", "3.97591091337444347229766386537e-10", "-13054.5279859695430785741390032298732399588046821");
  setDefaultDecimalPlaces(88);
  t("-1.043380028800765114223e-3", "4.41854e-19", "-2361368299937909.6131821823498259606114236829359924318892665903216899699900872233814789500604271999348201");
  setDefaultDecimalPlaces(95);
  t(
    "-6.65730521081926658314773049012985e+13",
    "-3.645979039686295075384461543960471e-14",
    "1.82593074133307964620411490039271734177018950054705438099007341764897717459938625941412059492106845495158714919636009809477e+27",
  );
  setDefaultDecimalPlaces(50);
  t("7.19631e+1", "7.8266723321802561180616707598010914145566591212e+13", "9.1945972625065067806801998541530482884e-13");
  setDefaultDecimalPlaces(97);
  t("7.2662764462026e+3", "1.49144553121807852016921926612054579967488308e+12", "4.8719690354820797021998717211456181192107470278891316174155745330514066655146757977680292e-9");
  setDefaultDecimalPlaces(19);
  t("-2.2501892926802284483604670558655499839142460185138773154443e+31", "3.84590394397363646e+13", "-585087231886323320.7682504241415231209");
  setDefaultDecimalPlaces(14);
  t("-3.3792263215562122158441621641205999073822e-16", "-1.3210099909680901474988828e+12", "0");
  setDefaultDecimalPlaces(100);
  t("-4.54459111766008084562e-5", "-6.48375221505991102365306245066367784667817e+23", "7.00919925210017917904322605673999515094723687407524043537266629707277773e-29");
  setDefaultDecimalPlaces(79);
  t("-1.1775e-14", "2.740031963515912213992144300601748703811e+31", "-4.297395124139623537342685013055731e-46");
  setDefaultDecimalPlaces(21);
  t("-1.22708032479185495090661285863632478908468633134477499e-12", "-1.7896381424303138374067414055072993375060731482908469365e-14", "68.565834382893180303241");
  setDefaultDecimalPlaces(46);
  t("2.127460626674808748228511084272727654e+9", "-3.0198692480008177362861243575846409260372e+21", "-7.044876622003445968744150553070829e-13");
  setDefaultDecimalPlaces(29);
  t("-2.350385287307762214796214534876129998256667e+12", "1.069775259923662129181657e+24", "-2.19708323360878889e-12");
  setDefaultDecimalPlaces(0);
  t("-1.2668337075e+3", "1.0541e+4", "0");
  setDefaultDecimalPlaces(78);
  t(
    "1.78889378380005451993829840355759912896493070099117973654532e+50",
    "-4.8680461646142258619988779e+25",
    "-3.674767500775781049798096719148760913493828132053371417860674900412744288729016959826758909471215209309e+24",
  );
  setDefaultDecimalPlaces(45);
  t("-2.06816e-15", "-3.14539485396056340759352898604175606619529175794746279585e+51", "0");
  setDefaultDecimalPlaces(54);
  t("-1.6881073816521684192e+11", "7.859096715528666151849e+10", "-2.147966162977309433240245326237234419408904511061353281");
  setDefaultDecimalPlaces(23);
  t("2.20211348853914588453852572837440145957543381e-15", "-1.3600492545841555e+16", "0");
  setDefaultDecimalPlaces(41);
  t("-3.9e-17", "9.41484e+5", "-4.142396471952789426e-23");
  setDefaultDecimalPlaces(9);
  t("3.783399574e+9", "-1.070670799376816900716800933387048622e+5", "-35336.72139188");
  setDefaultDecimalPlaces(30);
  t("3.6071326460686668695651844406915890113112582238053344e-6", "-7.66318525499825865408958380292122676888959837168674996569976e+9", "-4.70709310298344e-16");
  setDefaultDecimalPlaces(64);
  t(
    "6.8390063817791125978119281e+25",
    "-6.659623572700332659104106050983669322495761e+5",
    "-102693587814994836220.718520273372429087562974762806529103538853507777321399599827567",
  );
  setDefaultDecimalPlaces(63);
  t("-2.5350099564808800714155181554345071164561498e-18", "-3.0418069499762901256358e-12", "8.33389494524180645858255607709342491309748776601205008687e-7");
  setDefaultDecimalPlaces(48);
  t("1.2170763903942423709128857601836e-13", "1.545507685898858763645441659104080186519448e-4", "7.87492939374414978109464638339137924734e-10");
  setDefaultDecimalPlaces(77);
  t(
    "1.870852147466795155712559617097086e+26",
    "-6.14268579319370685056326119862817763379572437066877932e-13",
    "-3.0456582193081720427127339290394384602041223576222332814419532097956808077592469725701603897657294023073875326328663e+38",
  );
  setDefaultDecimalPlaces(27);
  t("2.116e+1", "-1.049040685761399811733099319177346683339e+40", "0");
  setDefaultDecimalPlaces(24);
  t("2.15973774128860046791634103090450916442531213e+1", "-9.24008631259903445061874530520274620461e-20", "-233735667419443554521.823702098906574100989029");
  setDefaultDecimalPlaces(76);
  t("5.344327313101860085282372601118130083319258e-19", "-2.7765401522425257e+8", "-1.9248154249760847243707535514439792688896871810939e-27");
  setDefaultDecimalPlaces(46);
  t("-8.83925e+2", "-1.047e+0", "844.2454632282712511938872970391595033428844317096");
  setDefaultDecimalPlaces(8);
  t("4.23948402303873289813681813e-15", "2.50818635243156629999559183e+17", "0");
  setDefaultDecimalPlaces(18);
  t("1.176835796970634510588529624392040545719652811e-13", "-8.42472595576901654444471050116158885518e-17", "-1396.883178336228603306");
  setDefaultDecimalPlaces(60);
  t("1.8450995516223436229017955181703338665108614e-7", "1.14771e+5", "1.607635684643632644920577077981662498811425708585e-12");
  setDefaultDecimalPlaces(77);
  t("-9.91561715367044563164935769651865e+24", "-4.5838626259588819585e+12", "2163157573160.52482296043647673461438063359790978809954309241123693723119955808453264902099");
  setDefaultDecimalPlaces(44);
  t("1.7094089369500966565891044427964486498632487398e+14", "4.47898541234931440671e+0", "38165092751518.44342005676926834005757079596980458532513418");
  setDefaultDecimalPlaces(91);
  t(
    "-1.040873049150191809257e-17",
    "5.22165564283858901188724096270395929083710285155604e-7",
    "-1.99337742728732276778944157721669300162894469064976212955213558846444918209462916e-11",
  );
  setDefaultDecimalPlaces(96);
  t(
    "-2.116375563984251206169217987712927509439031206728109625e-20",
    "4.758481949958874025533542203579113967370535743152632561658e+34",
    "-4.44758556665859021534041277345160950573878e-55",
  );
  setDefaultDecimalPlaces(89);
  t("-1.28630844436879e-20", "1.69660345249929215299245184234429206638369305e+1", "-7.5816681999197255913562018434398571862511146603172339450351252394991e-22");
  setDefaultDecimalPlaces(0);
  t("-8.86203321963765376339985489962565437471395767559e+2", "2.2512965153871545484636e+15", "0");
  setDefaultDecimalPlaces(66);
  t("1.75294e+0", "-7.6359951e-12", "-229562745528.739273287380710865044950068131919047459839255266153850727326946556");
  setDefaultDecimalPlaces(71);
  t("-1.2939784708996476e+16", "2.3287741854465823e+13", "-555.64789363701448179245713666643739837578457776803544348625706925997520005");
  setDefaultDecimalPlaces(30);
  t("2.7636856e+7", "-2.67074425639476358237356140546012745686278054383574658209651e+18", "-1.0347997916246379553e-11");
  setDefaultDecimalPlaces(86);
  t(
    "7.4052972511316365738761895588147221107e+37",
    "4.282788e+5",
    "1.7290833100147933014373323075563679805537887936549742831071722438747843694341162812635133936118248206542093608182333564e+32",
  );
  setDefaultDecimalPlaces(68);
  t("-8.170682e+4", "2.059805428813095931744371e+24", "-3.966725150689656264769374848051595936552148818259e-20");
  setDefaultDecimalPlaces(61);
  t("2.0468574e+8", "2.080941096008622901342536448013628e+33", "9.83621018358473676373706278689141877e-26");
  setDefaultDecimalPlaces(94);
  t("-1.44687071736e-12", "-1.66389382397711379923269450655694916839984949e+36", "8.695691374715392500075932235048498546613358496e-49");
  setDefaultDecimalPlaces(87);
  t("7.59e+0", "-1.806481175963331596594125736277116998473e-3", "-4201.53838356634152072331114401323608289637571332693344441939212353708413320567873486790282");
  setDefaultDecimalPlaces(10);
  t("-2.014442097e-17", "-3.98475338e+4", "0");
  setDefaultDecimalPlaces(77);
  t("-5.540488051043722249984129e-3", "1.2e-4", "-46.17073375869768541653440833333333333333333333333333333333333333333333333333333");
  setDefaultDecimalPlaces(1);
  t("7.61035600090326154741394730746792950572549769210555e+7", "2.009857926339933502052565071081955085124726144896758885e+45", "0");
  setDefaultDecimalPlaces(96);
  t(
    "-6.5271713008278704145499438340475379645012805259e+28",
    "5.03317672774536100663969855245344555067084813032999668984061e+33",
    "-0.000012968293493146926381122558308268281170877395201009652992586686816638921106038684184383511499",
  );
  setDefaultDecimalPlaces(18);
  t("2.57687591379700031743031e-3", "-1.765086906165501123741611083173620105907514e+36", "0");
  setDefaultDecimalPlaces(25);
  t("-7.39753151e+8", "1.3609203963715528035311788763789079312768496184819841102335e+53", "0");
  setDefaultDecimalPlaces(71);
  t("-3.22e-14", "-3.1448621004308853118525012040818245332e+36", "1.023892271638498826143e-50");
  setDefaultDecimalPlaces(26);
  t("-7.729381194318665376747644966619199801703224161317924275949e+29", "1.179031969415715994917003985196660901e+20", "-6555701113.13356217071567434958811801");
  setDefaultDecimalPlaces(57);
  t(
    "1.55892942862753669277413412485281667237562971908794e+28",
    "1.210505101538923701829302940691782425183202008517305242014256e-12",
    "1.2878338361776903527812735411475141777960167044780261166481357590250705514184402765841341224372203e+40",
  );
  setDefaultDecimalPlaces(38);
  t("1e+0", "-1.74918567308597174125592258381903e-5", "-57169.45978843781782754606020977275916794097");
  setDefaultDecimalPlaces(62);
  t("-2.7970075203e-2", "4.48249808087723027817046420914630339895471133454817e+50", "-6.239840977e-53");
  setDefaultDecimalPlaces(1);
  t("4.8713331350636615818361723717473381776762567518273283e+0", "1.386e-7", "35146703.7");
  setDefaultDecimalPlaces(21);
  t("-4.236888139187e+12", "5.111782401759076159102851463466491055156421941358e+48", "0");
  setDefaultDecimalPlaces(48);
  t("-3.238232559583e+7", "1.604638864376588957710362725450779e+23", "-2.01804445316178428467293108397953e-16");
  setDefaultDecimalPlaces(9);
  t("9.90982465391705645198901347396877043e-16", "9.61765692582343838056511714664847157e+27", "0");
  setDefaultDecimalPlaces(16);
  t("3.19074181774128892075071361293249205e+12", "-4.558006212892027719259989135778248247539508956e+25", "-7e-14");
  setDefaultDecimalPlaces(20);
  t("-6.923790828987464707348187208225283e+23", "-2.19171882e+5", "3159068930652091908.09804115667779090385");
  setDefaultDecimalPlaces(99);
  t(
    "-3.356991026928290374516e+21",
    "-5.36617769388891020752831085e-19",
    "6.255832770411769914334602672990232464380481712186507745506020827283184496871174272888054218316615259419687364289624992913375651318538305163e+39",
  );
  setDefaultDecimalPlaces(34);
  t("1.164097978704838063579003969839981677371e+13", "-6.82630387e+4", "-170531227.5682269127552043723831446837380534");
  setDefaultDecimalPlaces(31);
  t("5.017767768804312723397585292643413485590171871e+28", "-1.3806230906060823943678156458716022811349131439e+6", "-3.63442260450790604198349377826468675592443289090683717e+22");
  setDefaultDecimalPlaces(4);
  t("2.48022800207158545334821185897654938696711e+41", "8.6383565039811142192545101748865550034816455634275e+33", "28711804.1601");
  setDefaultDecimalPlaces(73);
  t("2.1495654559807727747e+13", "-5.1195253615558393107478684698789e+15", "-0.0041987592680418196075531483765244505133154901589694329640297646285761646");
  setDefaultDecimalPlaces(3);
  t(
    "-8.831199500907340321736537379774303836238761250932192368042e+42",
    "2.69182228730743808010182043835199354784832486540037666009e+9",
    "-3.280751312056698354049365090923892706e+33",
  );
  setDefaultDecimalPlaces(80);
  t(
    "-2.947466159229526823801076608307527055295142189417433e+40",
    "-7.174245856760427422216629269146449088452554988e+31",
    "410839859.41910169861889477287363680419557596176305533096612081263898704768288842607642381",
  );
  setDefaultDecimalPlaces(84);
  t(
    "3.0518847743596536225565917818019259973011211510691119e+52",
    "4.91615040135989914172641372003821993540401367176730288436e-1",
    "6.207875116097841958464025350024471255630691686664802433703252930501899495083116489883914159007864745918942471362140290355798878976979219e+52",
  );
  setDefaultDecimalPlaces(90);
  t(
    "-1.06195125501441495568e+0",
    "-6.17187607557050368022769360181146821e-10",
    "1720629581.688826123771107593839748143635253184231396395951833317317515506460651588068681093786803311",
  );
  setDefaultDecimalPlaces(70);
  t("5.8e+0", "1.875120202701519e+15", "3.0931350382998577501683393899884273762811864875948887763e-15");
  setDefaultDecimalPlaces(71);
  t("6.2185748553e-5", "1e+0", "0.000062185748553");
  setDefaultDecimalPlaces(47);
  t("4.37832481721e+10", "1.61437186379912931225006063894991e-13", "2.7120918763452754033146968722960478772019990455859970935716123358454132e+23");
  setDefaultDecimalPlaces(50);
  t("2.17213915073794973127207586e-7", "5.648402538573e+9", "3.845581358453808412747145178677399e-17");
  setDefaultDecimalPlaces(63);
  t("1.422865735923249335e+1", "-2.895758504449e+11", "-4.9136201576795154942940979249082954714914912439467433e-11");
  setDefaultDecimalPlaces(18);
  t("1.5293506829e+5", "3.70266783038125722363046344743660861770375805785174e-10", "413040205862194.621402272697478463");
  setDefaultDecimalPlaces(71);
  t("-2.6651101847626568128864160946031e+19", "-8.79922463739689300009e+10", "302880116.6679938477759363517289922152095854966946234451602077132284847213191096");
  setDefaultDecimalPlaces(3);
  t("4.931404683877259230254405328972137288234220843886e+13", "-1.180405564652786817826269718771492094042116e-20", "-4.177720633948230247288290408078275915e+33");
  setDefaultDecimalPlaces(45);
  t("-6.098051356084368376029093582e+13", "1.011541e+6", "-60284767.064156256405119452221906971640299305712768934");
  setDefaultDecimalPlaces(39);
  t("-5.4018706771558417339239e+0", "-1.2e+0", "4.50155889762986811160325");
  setDefaultDecimalPlaces(93);
  t(
    "1.11640887794614637307533437671347307387210346568e+47",
    "1.02706627120085123785217462445481107e-17",
    "1.0869881615728995692944510142215586228069549270372085929167514987416063076714334902328449606547345212471728034948044842397452201131867112327151801807330288801e+64",
  );
  setDefaultDecimalPlaces(10);
  t("3.943188e-10", "-4.44e+1", "0");
  setDefaultDecimalPlaces(80);
  t("-2e+0", "1.64287109111252873846596060073e+3", "-0.00121738096848829976483136149621598810494370318992184401385964758770030583573276");
  setDefaultDecimalPlaces(43);
  t("-1.73351736929808e+6", "-7.4443250318777341e+15", "2.328642774025710166566078824680522e-10");
  setDefaultDecimalPlaces(6);
  t("5.9345532480311071e+10", "1.180585259272237760409218712627995653905621176651950553e+16", "0.000005");
  setDefaultDecimalPlaces(77);
  t("-1.805346730287288604845101077987604504772e+21", "2.0496623367998018298519e+20", "-8.80802021813031712976641814786882843293252911053340663122006875843087717076773");
  setDefaultDecimalPlaces(64);
  t(
    "2.360015772411890578369992280338652745089208100228e+26",
    "-4.458536633323810227611462e+3",
    "-5.29325194902012968731009633907329153867757025824603193386973328753106097836277574431341e+22",
  );
  setDefaultDecimalPlaces(36);
  t("1.461566123e-19", "-7.0401627707153094673e+11", "-2.07604e-31");
  setDefaultDecimalPlaces(20);
  t("2.56584e+5", "7.02328114225218322326094882065760501221246e+12", "3.653335169176e-8");
  setDefaultDecimalPlaces(75);
  t(
    "2.34621607572608885962309449997130558443846518065692481616752e+6",
    "3.283778566e-5",
    "71448668921.182332232297495907685560562808825540550312982569117603528446929999237957143",
  );
  setDefaultDecimalPlaces(29);
  t("-1.35214358904502321324630765854e+11", "-5.41742225851072912830210205792653658767416e-1", "249591692233.48169472530989411456704270197");

  setDefaultDecimalPlaces(1);
  t(
    "1.700514658972307219025656035914469845537750836410038031010681486404053411904000967287088646169839324256642891990751280813734484848634678629548828e-5",
    "1.71493513436543180274760138512704446656832469864731527459064104587005030464222613970030631287045179110502546191789759826998e+122",
    "0",
  );
  setDefaultDecimalPlaces(0);
  t(
    "2.15578975934406365279423585146934143812939950561684696028766432567055e+9",
    "-1.1059063953952889099770042690392723178709766547857659128926461890335657784389013280542e+58",
    "0",
  );
  setDefaultDecimalPlaces(63);
  t(
    "7.619866167638467882785825119187245495885799700092235356803214256079766191510395688976863352029644522856282314146729752947379e+109",
    "-2.78986059572699428091161236879857227096789911103436087736503205856626603248180079785557728e+89",
    "-273127129696344174153.094588840006808094897927620494556788708212003329757959798976885",
  );
  setDefaultDecimalPlaces(75);
  t(
    "-2.03104824250235535405245670785393862916094531e+38",
    "-3.367860639539140371690632306088923013347223954890113442248814948218861613e+7",
    "6.030677809697864895726646448614679204705889425945790038695854167538696970378686875650364522884621462723586e+30",
  );
  setDefaultDecimalPlaces(36);
  t(
    "7.9845325747732459872901136787619402469602905786745810130726659644235275804862168752111454616576702289397567365405564518972583195268098e+132",
    "1.546581882740093686950829138107573004483224298578555137307012902477329001533242086972339168551233838509500730571873939734e-16",
    "5.1626963071796589446287652464184126499787016713844223849865600334893706373165623373774553083311995704677632114087972335538235928915871671706419360123236526390393937720040945173971142101e+148",
  );
  setDefaultDecimalPlaces(96);
  t(
    "5.2714254972620875423515890025414782693814e+15",
    "1.38003412090900904585185297920329895481038776387295368245121697136492414130318805209454054460822e-11",
    "3.81977910357018838349475428934760417436512408402644825108727482826279522739979521578308730062434550805602687386361878975324e+26",
  );
  setDefaultDecimalPlaces(86);
  t(
    "1.684484853942306949113634490634829835334125852953105602534915363071707583405198683693248943559527335207125044e+85",
    "-6.49096947231405322838471e+11",
    "-2.595120591965721001496318625352156660466148985639649879843428689737797801520372874205482757578512442635593075284162674491503552522987405640514762440117118833072e+73",
  );
  setDefaultDecimalPlaces(50);
  t("1.4676818636378627550017237408878774293387811413e-4", "1.478391650726864e+0", "0.00009927557849209066583614523550404513748063028449");
  setDefaultDecimalPlaces(42);
  t(
    "8.102100254991725793463521201031331212948579045182565678433502574197691755554657904456930154391875329762624182517321546628057800696659367060957e-5",
    "2.14759410353092021302994688562361939643339355932861748458e+43",
    "0",
  );
  setDefaultDecimalPlaces(93);
  t(
    "-2.8596357655288204747269789344316341419968896475319884939258954802694549783947742521174596158788144616195022413276e-19",
    "-7.084353685228983631112100375862982070420183725694059243716928203085525883075406907788262573355275179503e+78",
    "0",
  );
  setDefaultDecimalPlaces(72);
  t(
    "4.14796286123913640778862111205132371216191078600882137704884504775279562042111440016909085354700018259146049022280585270690243e-13",
    "-3.59734232478959551058956222282178549085903493309633295710463554080277989098026212115205302307481327175046814817726792818015695868979e-15",
    "-115.306314682791442998267925295592267609388265781829499083143878904738953411",
  );
  setDefaultDecimalPlaces(82);
  t(
    "7.533991859978953500033170819631275722021363395713866982099586487348882990296720068e+26",
    "-4.50802176364968616430048796454097044167526674878027002731842361246039003771774603764359594012653666894975088142517841786514470428947450468386347e+46",
    "-1.6712412350643683421817125733638056370037839511375252799681048e-20",
  );
  setDefaultDecimalPlaces(93);
  t(
    "-1.267443640670211600101051802081609261609822829479262525095174093815e+32",
    "2.14254225393196551890686641361032626429136152105e+48",
    "-5.9156062772821194519306272391399697471759772028552313254488459560157016467244e-17",
  );
  setDefaultDecimalPlaces(6);
  t(
    "9.108266365951551445554150263196134178080038832022756577818122144733947885404577571808867868965844591617104782799465055e-3",
    "1.693537814434863037252974944740164469420498899824093011135578075514729765244015e+68",
    "0",
  );
  setDefaultDecimalPlaces(67);
  t(
    "1.010689762018034985039943864850992311572031637408275362755724164634746004786260312683552860356784709086e-11",
    "4.46523341839340107330462070951381055677150757625034103525650830159242563525134175591929988542062182507064269829435174137e+33",
    "2.2634645657150952687016e-45",
  );
  setDefaultDecimalPlaces(6);
  t(
    "1.65130933037833831874183296041530169147878671324269901408801e+59",
    "6.8742704965320437060217819025747631718333200032864446618583106897635645569343808693297099263280713089e+5",
    "2.40215937270928848423178500669721209647736464860469801246405e+53",
  );
  setDefaultDecimalPlaces(18);
  t(
    "-4.76870778060502108949922539281130263791924455848909509066881301971769593302436238501605875239981619971725e+14",
    "-3.1166255910763255584923434227222889605e-19",
    "1.53008683309891886125540363409633248122393101948123e+33",
  );
  setDefaultDecimalPlaces(15);
  t("1.159656592955785087732049601427059859507103322800898632e+1", "1.06310564060590727851809556398685842e-10", "109081971599.252307819676135");
  setDefaultDecimalPlaces(10);
  t("4.004384860242e+0", "2.64166419121532975e+13", "0");
  setDefaultDecimalPlaces(81);
  t(
    "3.4129472637859762321435258280687e+4",
    "1.98963400887125872356702190152243991519482880392645401396399759663679764570378068199622678326523531859849923776393775781111e+95",
    "0",
  );
  setDefaultDecimalPlaces(47);
  t(
    "1.65658238265798806305995689685071539259138963273321727898912570414142197621199734551676121e+21",
    "-6.8096960159855634802801548496326921011727210980622596527315591570467983087931242970675210154018607482477535440884472713301556938297e-13",
    "-2.43268183890912173867866375371641219516096364667884846268448276539465402050659047e+33",
  );
  setDefaultDecimalPlaces(74);
  t(
    "1.3323410673604665096022027925788243147871944102318098775604231852e+15",
    "5.9700748234546847794638246265529939585463898629957526702524349423505744808442134582430150761e+52",
    "2.23169911058080309726429401927151062e-38",
  );
  setDefaultDecimalPlaces(68);
  t("4.2549238760761519198442681566496988233008681673194366012950561399e-16", "-6.487e+0", "-6.559155042509868845143006253506549750733572016832799e-17");
  setDefaultDecimalPlaces(73);
  t(
    "8.83066671695967922324455516961581009012086082784124759646067747842952978257889148e+62",
    "6.36264312391044699646682306527761616051691e-3",
    "1.387892821424250792851042199265572819019493060813232060438848475883328509046165150130869174585736493912164715663521445304785301682699724655e+65",
  );
  setDefaultDecimalPlaces(39);
  t(
    "1.1658649520763099390514007613182339240995224186892998229870303061145790380398895175909459401153253559041566324653481e+32",
    "5.39970030636463998050391881933069913954838e-3",
    "2.1591289996263349350012639569511324667327157843575550582485433302869508572e+34",
  );
  setDefaultDecimalPlaces(41);
  t(
    "-1.70815015438547061363223768909432573021282901575585e+7",
    "-1.23805159728751000005333626222022624418454929551669083671386302791876802631e+1",
    "1379708.37251687714544931187828530568123499240942",
  );
  setDefaultDecimalPlaces(57);
  t(
    "3.92379134193129086645208612059126214892289735088801010173416611026780140592605618881027912722571767853162441072810348512721225622601e+56",
    "6.33375588234891717847e+2",
    "6.19504669080508626598110495557958518771267192985420940391591817889566260980831824704787324829223919314102833337e+53",
  );
  setDefaultDecimalPlaces(17);
  t("2.32843797316084681883696112552213844816982065e+44", "9.847263358645834e+10", "2.36455336712051397428145246454728736327859808956928e+33");
  setDefaultDecimalPlaces(99);
  t(
    "2.111156029706103468482883232191232318365144738508969114838276355301300644741187846337057346725401357287347265583371069575438416656e+81",
    "-6.19687251157221130006549415396954472886981679705653158991034743256058573171366385860964132752232901011355521279254284004377691115538991e+59",
    "-3.406808879420501627754232456493630012806489788192721221583874294246094619812985319979693788915210665674185200423461954099e+21",
  );
  setDefaultDecimalPlaces(40);
  t("3.866842793003289333e+18", "-9.19921897030382e+0", "-420344684204813553.9755385935803147714939574664918217337021");
  setDefaultDecimalPlaces(51);
  t(
    "2.13102494646030035155786745384610806098216107140948882228829354649328668591580014908647871588554512073077191274547249284822863733234032994e-1",
    "-1.15783985119625151353657883049071007172981253995378225093870065599061756492797928203404388239154449530823764391172e+20",
    "-1.840517878408294596027949876578e-21",
  );
  setDefaultDecimalPlaces(7);
  t(
    "-4.63001581215475159063985476545714705064931119328796700632751478783893688009823210210365671516509925095242276641327017847777e+106",
    "-5.63897126138159724183e+14",
    "8.2107455376893643749762508140143314917509650924848351318352859984506204487471933232720976799701708e+91",
  );
  setDefaultDecimalPlaces(43);
  t(
    "3.61595961954320593098660739358441364e+34",
    "-2.6516866522046396522102558837960081312157734718423775736177675300024742628511603179082632e+12",
    "-1.36364514130538756565406870783408884142882308937957011567980267831e+22",
  );
  setDefaultDecimalPlaces(58);
  t(
    "1.5597337870314004811166373762377094982771931683316780066872847544e-19",
    "-1.34537299990921389289223974222564522014572493437157119038798098742034e+1",
    "-1.15933186345842506713455171531342762019e-20",
  );
  setDefaultDecimalPlaces(74);
  t("6.46821110637815056336121683360071354935352e+7", "7.5755e+3", "8538.32896360392127696022286793045152049834334367368490528677975051151739159131");
  setDefaultDecimalPlaces(54);
  t("9.6e-13", "-9.64859818622758098614867568531054773106557e+40", "-1e-53");
  setDefaultDecimalPlaces(81);
  t(
    "-4.667857894371616354459259321756840840477789152245714943399779466851934683108e+61",
    "-8.15105308595186647407710356171952437437339984271039e+33",
    "5.726693036040399733975590292856670051647607516244134126441684109446922629616464557718825212117110273760884554e+27",
  );
  setDefaultDecimalPlaces(62);
  t(
    "6.9464617911132493266908788270233805038400405175458e+49",
    "-4.85626587355681054811428126111129932992731528658861054961355221810934857055188780240008777729143851e+98",
    "-1.4304121668745e-49",
  );
  setDefaultDecimalPlaces(28);
  t("1.1933377363271533871522e+18", "2.73383634267134719314e-13", "4.3650664734418322202212160013401681115052730029167197416613e+30");
  setDefaultDecimalPlaces(88);
  t(
    "-6.388713654158582567927392724072e+20",
    "4.56280794126306268280109463739284347279309718544372523545207442845291835865222324226098004549440298963836846156492305792918424183994817e+52",
    "-1.40017150324983395918501356970229606788122591703201286913e-32",
  );
  setDefaultDecimalPlaces(48);
  t("-4.49583021184411140241363278338084888762914702659706240769344e+21", "4.5882090268806008368954526431038627217086e+25", "-0.000097986604043205605845990739771270144992290694");
  setDefaultDecimalPlaces(69);
  t(
    "-1.516726174939433249007661998520278710552853600366620360076137514423939673136467796664260213306494487611371211036139563921412876561442067e+136",
    "-1.175488454866770985000170706720450832741960761196922685470230119306827045184265831683033515360861422258369807794780811227756357486931e+50",
    "1.29029440370925455109947299892575754440464003035662726865576469370041278793364935289597993965460302178644094482187958986872702660096032046633917427824624854e+86",
  );
  setDefaultDecimalPlaces(82);
  t(
    "1.0648828774861515848805513192301562645611230541297573930883507444937365516250461792903853418452326565098612700746963897266206242286060145297751e+142",
    "-1.9055982190387469713665708193083358178433775714763086301134347e-16",
    "-5.58818153190401923806459450805514434713841423172487621554060904269032289690548417506253903112699301055435107591134364145845549527017987143490670408177701275839824346150075282599360508380254964488236553445075673980051387548313858280323612808e+157",
  );
  setDefaultDecimalPlaces(97);
  t(
    "2.0173763004380138129164211395928e+29",
    "-1.168001012770756696409962960513018209882395054706993693566494294382493234530886743785916594680657651999168288e+23",
    "-1727204.2390206076119595122212504669047121335880544051834318965722127284703760483252645947134452813737049",
  );
  setDefaultDecimalPlaces(30);
  t("-1.898935357931480325492799803493427385507e-8", "3.339413634287071306931920973529620584190364357484e+13", "-5.68643351e-22");
  setDefaultDecimalPlaces(61);
  t("7.38304639151181324324122416260011397053261505521423623549998452352180712551e-12", "1.3989590710117271847090355804918e+17", "5.27752851709406635779558085830105e-29");
  setDefaultDecimalPlaces(34);
  t(
    "6.7172850751367087485852958788732102973233083609401494604013393319983476644770812367254594279010625e-2",
    "-1.115184444253353102508008851450200992594005533480804768262617195140093720586616351706614171147149791e-13",
    "-602347451110.127105872710420616103627811111051",
  );
  setDefaultDecimalPlaces(15);
  t(
    "2.7822251708378823170152834664648095683686853671105882957692915019235480295219873366602687532691354328e+69",
    "4.7383321166086099391141917294986491911669244094e+47",
    "5.871739469434274701475156008016276662e+21",
  );
  setDefaultDecimalPlaces(10);
  t(
    "1.2738169747776397e+13",
    "9.600693608544987767162221556939613486182620278617726451484647059460393877301004163778101678939844590403053056578225341249985420908077421739e-2",
    "132679681980882.4479642164",
  );
  setDefaultDecimalPlaces(21);
  t("-4.5277655229961210318301842649495028519340586336492863351967385752e+29", "2.019222956808159279246782002135689793e+36", "-2.24233064889143e-7");
  setDefaultDecimalPlaces(93);
  t(
    "-1.187291234400297637244045558230401649034350591533099416932e+21",
    "6.1575125641377872068500844852734380971268672329871801135359960095702616612896240435705025196880677e+24",
    "-0.000192819945072503390118542453196207237929340551359328498908109767758538761809853191697459855",
  );
  setDefaultDecimalPlaces(28);
  t(
    "-5.86617803977010802037872621763849015649485009677512956987614163567731967593442513091766735015747331756988207553444229752774e-12",
    "-4.1797049454218640842771239619908507645046043781682861212780465396432411065454e+45",
    "0",
  );
  setDefaultDecimalPlaces(34);
  t("-1.00579927848928167465031486153504851081552706599542e-9", "4.28771133071582467108e+12", "-2.345771906994e-22");
  setDefaultDecimalPlaces(54);
  t(
    "-1.8271925215927347806202528218918266668753270130561480514772226424692659347840853897e+34",
    "-5.149405467447471649459143223e+27",
    "3548356.27752277736295624002366840147998456355363364537867812",
  );
  setDefaultDecimalPlaces(17);
  t(
    "-2.65576175686015882822154825504208290706286989e+10",
    "5.2053353660719536462011406751142334531778095926464881485482788243605613663782763559308622684986414920786345447699294e-1",
    "-51019993335.49661020486647109",
  );
  setDefaultDecimalPlaces(49);
  t("0e+0", "-5.55343439e+6", "0");
  setDefaultDecimalPlaces(47);
  t(
    "-9.6171451745091569984891007368337306378150723848744175866847080062468488855895738052505762039577306363341024e+51",
    "1.03e+0",
    "-9.33703415000889028979524343381915595904375959696545396765505631674451348115492602451512252811430159e+51",
  );
  setDefaultDecimalPlaces(64);
  t(
    "-1.164688340553350639234745752451271275105074810465403765642264532459523653082728856043022137368681295148535629723773422897164550869155186e-15",
    "2.239533563837521710853169489939743730104394529735826522383419238324e+50",
    "0",
  );
  setDefaultDecimalPlaces(17);
  t("-5.6632722347942242018042588126838734095e+4", "-4.91285801182925508643025337525922e+30", "0");
  setDefaultDecimalPlaces(73);
  t(
    "-7.396229650529688206660414406726106759972133590175167409605741675255599407631001402170259771127402934877828164161494058498167508550084798604333e+124",
    "4.3450505418331821510179856845663441405070467456e+46",
    "-1.702219474623006306542594602151285995907022173769646717855964256346936869760507341865496297178979384330202450688398626965991487403813917246619985037513e+78",
  );
  setDefaultDecimalPlaces(45);
  t(
    "-3.46526366147852e+8",
    "4.854901059837464228619245531136799924602882439867193678758321949081016761446424339235403194400348167973849858011320782865857613e-5",
    "-7137660724221.911371282512389202409052475991701682365349629",
  );
  setDefaultDecimalPlaces(6);
  t(
    "-2.818733904270779908365956e-3",
    "5.851743778427533513349104686731217061595839424177948603127492189613110784152899515464525854367895505268017408029514595742457443157804750202604812e+89",
    "0",
  );
  setDefaultDecimalPlaces(97);
  t("2.344383e+0", "-3.5126189694956907690600244000977410099059824618e+15", "-6.674173943599082575317321542208510231401916854929086587772171096926150973278297222e-16");
  setDefaultDecimalPlaces(15);
  t("-4.1973985267762839084729226546995973350288105244997297569023879894802339138438570317173092231215562211e-16", "2.4430659313348617e-6", "-1.71809e-10");
  setDefaultDecimalPlaces(87);
  t(
    "-2.56624922733170997155552563101005547508531610958038832986543280134129249369233079363184310523227897074846925464109093582953394e-8",
    "2.991270453739874393018497705731730281644587717559060492281674561845045110464029775132956501510569360323e+46",
    "-8.57912805618503615539085746544816e-55",
  );
  setDefaultDecimalPlaces(61);
  t(
    "2.367603839391840973002331774589494630487178e+42",
    "1.783778101548371309087026742371677253442429351646438906173353429865036239150687017345852518889899328023576075493482e+34",
    "132729728.9576933325503005730311435759665998671787428625436797057932789",
  );
  setDefaultDecimalPlaces(8);
  t("1.208177295315078873661175094873817940204525957999341224e+25", "8.3851602906881620650800184968269217061886740848428110960550488982928212472402446e+62", "0");
  setDefaultDecimalPlaces(98);
  t(
    "-4.33078329873455969859440158821707688863890474429126612690137076185357340840186850908110559878227299409065590747356169447e+7",
    "-5.22597183e+6",
    "8.28703911849168865227963080738052292302330444114021588000287931489591173016688172442962747233613197",
  );
  setDefaultDecimalPlaces(39);
  t("-8.886448798190643631463e+21", "-1.3272113581248412976342627407061862186e+37", "6.6955792261647890693048e-16");
  setDefaultDecimalPlaces(37);
  t(
    "3.217659182673909332045211595889513699853502570922972380532767097957748340238039396458808220577612795697667263839127e+7",
    "1.994903576537398501690306683349644455509699974140344633612309508815400397680898645188007971782411084509731e-18",
    "1.61293970321055655485127595909952619746757920246768854946871593e+25",
  );
  setDefaultDecimalPlaces(94);
  t(
    "1.541650731123488014146319101439006302666028542877055844328745659041169126075372818324912237858655825e+72",
    "5.640766618446521139916283841041827774167e+22",
    "2.73305179136814178688136017157185171640591162569695613015322288305221332402298779107756213040062805769831779740541795746867902106535381637429884e+49",
  );
  setDefaultDecimalPlaces(92);
  t(
    "2.26883738126922647e+8",
    "6.75683723951291622084488163917564171373e-12",
    "33578393275502095370.08003674501541312498514090593423430365767333182695722566840107163607516229832006247575845413",
  );
  setDefaultDecimalPlaces(31);
  t(
    "1.3345396398523494526848527500235427488119907506291374075269368209933819e+52",
    "7.1981535281917943e+8",
    "1.85400274476722822245113667994692533381946544732536904753629925371882506478e+43",
  );
  setDefaultDecimalPlaces(73);
  t(
    "1.070940621707968037138141123136216581082473770020953138384309050633902213142784024617680139507368158e-10",
    "-3.8389764827521255051998298841048486469413119925359064104761757003215778480216059571630953172452e+7",
    "-2.7896514253721631378678363826782853300605553564648815321e-18",
  );
  setDefaultDecimalPlaces(40);
  t(
    "-1.13067811981952370574532674407152436166809361095477169665313649726170322670289906616818774708531975232e+18",
    "-7.9718136125899190340560990342321118303392204797454333208178096367891888702938696e+3",
    "141834490213599.444638229824195470226289187102670366341",
  );
  setDefaultDecimalPlaces(0);
  t(
    "-3.25182580415398563224525305478017596396903748429104415441809833843087365067919762200880142814612223020118542794983258974569387e+116",
    "-2.4004547695504463258241149388284032557295431941536225513832834140617446104e-10",
    "1.354670725482148049048332818643604410106913577023067588663768576147077098414889279349873746019059330255862523310227061878485173e+126",
  );
  setDefaultDecimalPlaces(48);
  t(
    "-2.9065686038957074707566174210828422776476534235754893250578146777099688084055462072929582e+34",
    "-1.0060299235646394950752695023277296220838063892812e+48",
    "2.8891472667104563020866829490281809e-14",
  );
  setDefaultDecimalPlaces(87);
  t(
    "1.0997725705491813520687937631053637094484014462e+38",
    "-2.6694766718217318540658600979722791617335342808600994824363763725274005314e+73",
    "-4.119805886142706729605447637294053312388873715694108e-36",
  );
  setDefaultDecimalPlaces(68);
  t("-5e+0", "-1.46213676021526652311980049900503451984663938152362061e+52", "3.419652754824291e-52");
  setDefaultDecimalPlaces(67);
  t("8.97203802771135431191623344767102133346521588446337343181551e+9", "1.9743862641777266020573265620240144049715865708929499882337589696e+64", "4.544216190365e-55");
  setDefaultDecimalPlaces(1);
  t(
    "6.2106601149038260493226553786848670959157243532852829562026520447720980648133245170478564156320035118e+78",
    "3.5186386590554023005720474500471484985049041472224023501e+0",
    "1.7650747111870565194177701523405746197380275477528791055661327570757013005519229e+78",
  );
  setDefaultDecimalPlaces(11);
  t("-1.6590029493133342576787232351365679051741548296397950621314217797477340731915354408374e-1", "-1.1586513860382498787154874748462441484966586e-4", "1431.83961051989");
  setDefaultDecimalPlaces(86);
  t(
    "4.67507283198991936233341510049498431534997894754116549800128011098978538968501626362947481373300236076239092e+11",
    "5.01221539394486636587322843519419335624552960766092416576496740154259718546729474311490624368005717409616066136264671394189542766516e+50",
    "9.3273581930213122794853163854275224188589963406e-40",
  );
  setDefaultDecimalPlaces(70);
  t("6.3100047608802664030691e+19", "-2.05806019072631395106572879958079095392562188333290586870471e+59", "-3.065996217852788151996594642861e-40");
  setDefaultDecimalPlaces(4);
  t("8.083951208280093000568189304468816525927830090563289504610754129050235582854e-3", "-3.8625312964944984617141608850997696977973220198668531761572782111988e+14", "0");
  setDefaultDecimalPlaces(35);
  t(
    "4.8660577046883289991720362166172890011979845307938965029999e+58",
    "1.58744068033800244642908000557181139998508090796568685125012919829321587883950261707090128901e+13",
    "3.06534774178285135246349906599753563092061404980981291873910011054341827579841335e+45",
  );
  setDefaultDecimalPlaces(50);
  t("4.29800802718274841126413080650074761880657897136740296783394528513e-1", "-6.28081002508707543073649614731567709e+6", "-6.843079172933847819429015042997452135781663e-8");
  setDefaultDecimalPlaces(39);
  t(
    "-3.05258455098035002938037105316897835559927863125641950496987981916968246143231753913e-18",
    "-2.468264959308864536622622783102483579102103552870727864238636840844138715661224457352350373677282159904061053e+39",
    "0",
  );
  setDefaultDecimalPlaces(5);
  t("1e+0", "-8.5429431695360234e-12", "-117055677435.14687");
  setDefaultDecimalPlaces(1);
  t(
    "5.81059586158303206011971449531010490814693787763595089539797843180510866323318062214080517195891557899002242950246929136686216878e+73",
    "1.53291058232683937022705449615593589770734111348689820544118336189935606618326851895605809541881202e+99",
    "0",
  );
  setDefaultDecimalPlaces(39);
  t(
    "-2.57535458535389880639141131037350420845103654336007721081137282068207675209217121846304765e-17",
    "-1.05473344701993312817984822833180241602674130639923145253645859134271775479735849278383653278332896951360835195314483176830295850600363473e-17",
    "2.441711308795944404989554457244102598815",
  );
  setDefaultDecimalPlaces(75);
  t(
    "-7.55e+2",
    "-3.35755805222134715389168909748117689980259907461069879327916043478569797599751e-8",
    "22486580671.34520519308711905662081697562929872364030603988174643010874523534365274265",
  );
  setDefaultDecimalPlaces(9);
  t("4.128353345111403983037336184158061240435876780034565767340718394625370693171421668773746e-5", "2.25855853331797881750294967546511964290682576e+44", "0");
  setDefaultDecimalPlaces(10);
  t(
    "-2.6700228532219326456101713275431360564972705287431045056288899298872025589503069946660422321005736356333841559107726e+60",
    "4.557168072685516812765426215768082239985702024278842106124606e-12",
    "-5.858951898713933679194221120991580766768821839343789089162947494527765261078852896e+71",
  );
  setDefaultDecimalPlaces(22);
  t(
    "2.4457276979212092696025267149906690872692470651518405377097941858671827905e+66",
    "-9.4596238409653905057682020958877534e+15",
    "-2.585438637982473389943031350214155169142761286416508296873261687726109599e+50",
  );
  setDefaultDecimalPlaces(100);
  t(
    "7.5142037648366308363971215e+10",
    "-6.9412947806062723996761981043231851395895877031896459589786775889872906343858307e+17",
    "-1.082536328212287641666069320457663884005876631727228345965251996302998695436387455084225478904e-7",
  );
  setDefaultDecimalPlaces(2);
  t(
    "-1.2005000729722456000283320012758237486851916003379083483169306097181242e+70",
    "9.839959780201817891678808292665258031268740581e+17",
    "-1.220025386066794782068986805898001008172343653281180559e+52",
  );
  setDefaultDecimalPlaces(11);
  t(
    "-1.7970387592656869213983729964634430511528141758443673494980402570391231309763464434971627888507927557853021273103969965740633e-5",
    "1.79217428695849417513177245952946515194946404145475890079755195700044195902661383013655996813469696191884716088258523479752917932975317954807e+66",
    "0",
  );
  setDefaultDecimalPlaces(67);
  t(
    "5.4379439567411811290587012300090471906378400288576777157430609099696490753803342771e-13",
    "1.872503102394945472694635738494544187283872596352786419951854341615742328296150652273120242354062209128699e+9",
    "2.904104110581184157819772068372996770942427691e-22",
  );
  setDefaultDecimalPlaces(83);
  t("3e+0", "-1.5822223658660048004651608300604076698529752894262908553e+26", "-1.896067243593789464000550176210952529906037414553383823274e-26");
  setDefaultDecimalPlaces(56);
  t(
    "1.20926478302815571817269694795706881584021436636821852978622806336753090995850819521e+22",
    "-1.2091354002023322385528718346782890739324322438793889e+18",
    "-10001.07004414726282248504596513286881305317865248962700856984",
  );
  setDefaultDecimalPlaces(35);
  t(
    "1.26887917515102426171743218572051341808235031280442356791673756991785576320395832203257689432301875928817528168981007360346727e+32",
    "3.438985819303033786533824364908100912505003872902093912617692459933769089016680446561036138629458434034482168241251898112651873544192944980604490286e+64",
    "3.69e-33",
  );
  setDefaultDecimalPlaces(79);
  t(
    "9.99955748577975491970065318247644185705275238115495179292442730346344476421750477870676666e+59",
    "5.9621152395090106396757474856842426723107472396522104218411774760682011e+28",
    "1.67718285945161198511312251340514847760360613291091711941636157228407951089069203253053260802326319887419912982e+31",
  );
  setDefaultDecimalPlaces(24);
  t("-4.2935406521441600361410180383388949213809197362579637054415e+27", "-1.169289327718594860002107995486163290768914853996862894991291e+26", "36.719232360747742225610671");
  setDefaultDecimalPlaces(39);
  t(
    "-2.412485862866972238180271229310919279000745257988110755941634450351555460023713589492119018548625564471763014190245132788276032448079941e+35",
    "-8.0419269028977630457712569344996137064567801480581700794981130496262398434919376002530393965756190765150635460336429996902779182289506165e+119",
    "0",
  );
  setDefaultDecimalPlaces(14);
  t(
    "-1.42616410012974524012905931418513425236354074058620220781050235299655909388000629832262345503658096782231901020128153403573908713704059826481e+6",
    "1.055466270425178308516417217335683750518074880490659441101295195e-18",
    "-1.35121712563608217268060559075802962417e+24",
  );
  setDefaultDecimalPlaces(76);
  t(
    "-7.923149490572720158366921820357165656133127313218305235671639473227603485658032682153552221324441894461291405160707e-1",
    "6e+0",
    "-0.1320524915095453359727820303392860942688854552203050872611939912204600580943",
  );
  setDefaultDecimalPlaces(62);
  t(
    "-6.221539e+6",
    "-9.59430762634839921536372201505323763238876161398423350905124794684449357724591850286597651227405184886737852889889e-9",
    "648461488030056.2635281022187093110680616498180638388665241758324237062123877",
  );
  setDefaultDecimalPlaces(43);
  t(
    "-3.462485200527069476288311583345436139870265e+34",
    "5.31674534792131220577626851379594e+0",
    "-6.5124149718413676283686696988861209929334029153451368567598293690163425956894e+33",
  );
  setDefaultDecimalPlaces(33);
  t(
    "1.21238563472707192592334840466887351491571814531322803696962297860892419162089265503882889297515451691384147834586223937532e+28",
    "-7.2e+0",
    "-1.683868937120933230449095006484546548494052979601705606902254e+27",
  );
  setDefaultDecimalPlaces(83);
  t(
    "-1.249683193248976529831827908722926470626505404123220571787902618475919207420132527935277307460757298301042738926400424e+117",
    "1.2392954130171202245022655549039416262266991156191810866088720178472355480101431308147505549e+51",
    "-1.00838200490597055370832155791799859381266111788790699096175625481800920676148173924375201966258549771341930747946320852989972977969012075242139512848e+66",
  );
  setDefaultDecimalPlaces(24);
  t("9.22729237055487270457288202617426161862603867814631997e+6", "-6.250616502051781792396427592548947228519684722774161617897345932614973353629307861315246001968599e+77", "0");
  setDefaultDecimalPlaces(84);
  t("3.11926517749422378737868182848468098658775e+17", "-4.7780861363764834259399500448893456458901387034529066665061621519077656392023133671245417716378788e+95", "-6.52827e-79");
  setDefaultDecimalPlaces(11);
  t(
    "-9.7335249656396009999084491371197291123275008643632432432042177136977092149966812134049832486797951289145992764037879254928377620730223075129108e+130",
    "8.937262182273475586255e-7",
    "-1.0890947101166467923109296421620556193495337404823279897110788419124254265539856134556402105820171524525306222997371167980665577976984593254126123774e+137",
  );
  setDefaultDecimalPlaces(75);
  t(
    "9.3730695130431253308228849661044661361591447289523696814577065311280564821676345577e+19",
    "1.0730958473141842108994538916420454177663266861834154311461341e+12",
    "87346060.806242687955015236738535213804538595716231765941048598172002108948346872421",
  );
  setDefaultDecimalPlaces(62);
  t(
    "1.526188509820446384606832124504594679368945163962012847452217e+60",
    "-6.658e+2",
    "-2.29226270624879300782041472590056275062923575242116678800272904776209071793331330729948933613697807149294082306999098828e+57",
  );
  setDefaultDecimalPlaces(26);
  t(
    "2.5978849136291696476277320757134595795483071570716477740911726093351519804466290782498009188036479e+94",
    "-4.78906865844539293159640875206457437528643940729454482710221180071779114219447208494124432024848804402332384995159953597295834302e-6",
    "-5.42461405110129279781109475239831581315046074256811173082534787334205538623822767631318475217656447246885542580805808934048904e+99",
  );
  setDefaultDecimalPlaces(12);
  t(
    "2.0604634634087028742959022497230337812779599982567437056715006365608945743311884238726930708292996110177940051172023246644711103552341528e+108",
    "-4.7225090255749380000102506300616568449606922343688496230007351805312383927734921836302302e+5",
    "-4.363069402832646645199053291370070596136553707677020953617400591416319166406462399402591333549072210605392111098941e+102",
  );
  setDefaultDecimalPlaces(79);
  t(
    "-8.1739011924714913445557232014709417240158502221913774438192864621393e+42",
    "3.487616270388829424871984941701892837801749345923837391194191001952618382525e+19",
    "-2.343692814450654749192425173754475932980302309896945069832714621929726148608470525892173041271096255687e+23",
  );
  setDefaultDecimalPlaces(73);
  t(
    "-1.048135224710564401e+15",
    "1.0570205103734881653253178588814506033500842783059876696987982349980969044663676214375418665376133004966120106527281339854907586529516203527e+139",
    "0",
  );
  setDefaultDecimalPlaces(52);
  t(
    "3.005844901470571229792293621258075101236433643054e+48",
    "5.0912127610187066553974754544920693001175881741006603510986202068572343139463946939122624798399e+94",
    "5.90399e-47",
  );
  setDefaultDecimalPlaces(14);
  t(
    "-6.777426982997683041753052535433897113424949993712531344397062277408435973318862358876445371028371127168e+20",
    "-1.15049097089805868239598789960961024651553891972739967107976781301573457788309667219027675571698998760412365745e+76",
    "0",
  );
  setDefaultDecimalPlaces(82);
  t(
    "-1.0916245119273359531167948322133093098992934782921405915204162634546581196968773063006551631671215582815959992678214745002e+52",
    "3.43517922308469786304448118321196671580466487209424399047110708499e+45",
    "-3177780.3748681465299465471217464489063933548869721898870244919025521962689585029248046328",
  );
  setDefaultDecimalPlaces(100);
  t(
    "3.090764533336175822841373e+19",
    "9.98082903477688499384408138725898673595131016e-19",
    "3.09670120845353992556399721636038885163134478226284338383126358067970098975941026409144657671166426602699212863997968562098471116223659535e+37",
  );
  setDefaultDecimalPlaces(48);
  t("-9.54163504135871207e+9", "-2.53367025971481228236532e+5", "37659.340258557205465231197533900995967226687025460002");
  setDefaultDecimalPlaces(66);
  t(
    "1.05115126985786353865186060990441219367691365350957356e+48",
    "-1.7064837910504320381780881061710618837872722891402997301242911381369019509842695990290910349364468712533878767065867113e+36",
    "-615974951166.0018260307699863783783342434508612235950750027842080071102556582",
  );
  setDefaultDecimalPlaces(75);
  t(
    "-1.4991610228070786386665422784206315746170680910493398405545901580399439674545185327631865791712970053077102e+7",
    "6.65273424735010667557006e-1",
    "-22534509.37716652515234795194790278208956380087263777178406221202537863369381016846",
  );
  setDefaultDecimalPlaces(59);
  t("-5.49271519785425259259e+20", "-4.20180371947700612918873141855394973642733306993032611534502670338688244309189945210930287126245129255634483648952939651e+115", "0");
  setDefaultDecimalPlaces(16);
  t("4.9334657850197618415996208201882892923252905119490435533745097710571e+45", "2.67229217921054163602093769221893e+24", "1.8461550811697635591747064645465616739e+21");
  setDefaultDecimalPlaces(93);
  t(
    "-7.133163573053004916952664191415698490022079096375750856297518803861744461127686761629963762749388491659789405e+79",
    "1.3011959072561084450493020040545351285870457353898247387800195964970901022555540609784247668720065245625330435463910920817120068946e+56",
    "-5.48200584806252155191738676398018063685300963171655813052012514376693151135917558182586364062401892858250397950460056e+23",
  );
  setDefaultDecimalPlaces(47);
  t(
    "1.010168708150900132617105285514231245476688175340293501120526505299047171177422945825236925166012800870774250721e+45",
    "-3.869464841295546737649161311275883404649893074287588024021546242921944707401367951593381242711227587090362978002977609779497618093364154261565e+141",
    "0",
  );
  setDefaultDecimalPlaces(72);
  t(
    "1.55590448127841206226725210974667205420763715124e+39",
    "-1.63856039518598763655642565341254043842188328655789269653025712975086954355148379786272381519216062091970415901771443168123147425800412011177e+123",
    "0",
  );
  setDefaultDecimalPlaces(79);
  t(
    "-2.678760140715090090353810848384544080075837323e+45",
    "1.8133056790421368530449574331452718375490078082555179905851830470913419757652994499777731046055147142140174919248189e-18",
    "-1.4772799598411461004307172065983274966972956643682758604775302233369952866779857129915728789592422503174810105275654665256609931377147449224906e+63",
  );
  setDefaultDecimalPlaces(8);
  t(
    "3.41760524162003817164053751170706099954276429784883189563207393307200646797490883106248709866539626288879109481922603522634890983054095659986333377143e+149",
    "-5.205504984837561952336199865651703780652645634581921094418e+57",
    "-6.565367340103862597554984966935085725968293619681157400241020011544011982824569446304157047296008663e+91",
  );
  setDefaultDecimalPlaces(99);
  t(
    "1.11147787e+3",
    "-4.88969694512089414591890790920948021349375761064440564406700381458957267669621838621368906011264151e+18",
    "-2.27310175349224946801376512644298547010143506589511499928525617403859187720243741679e-16",
  );
  setDefaultDecimalPlaces(37);
  t("1.00980539386599742352e+18", "-3.566685536755107331932313887079057879111548120900500509730928729534e+46", "-2.8312151e-29");
  setDefaultDecimalPlaces(48);
  t(
    "-1.19106805429234340036847588512466883457631680584693793547245919577246253149718323879879674880619931547580088688207042399671484929026643460416694098834e-11",
    "-3.9350875222275810337838279526999721e+32",
    "3.0268e-44",
  );
  setDefaultDecimalPlaces(95);
  t("3.43391e+4", "-6.95038445539238739473157199915556386215377282045355922083e+32", "-4.940604396834242331466376699296215954850243230243108317433870061883e-29");
  setDefaultDecimalPlaces(39);
  t("6.51113828810343452687152019900319725515662e+41", "3.6e-6", "1.80864952447317625746431116638977701532128333333333333333333333333333333333333333333333e+47");
  setDefaultDecimalPlaces(80);
  t(
    "-1.1281748155497857039827335847410698147883963003961981257693862532e-19",
    "-1.685420841909001818695453718289989614207955068785046903258074061550583024434550337165215644600292040653462224e-19",
    "0.66937276880470510317728127464857059338468647183900704407007781740981644298226029",
  );
  setDefaultDecimalPlaces(36);
  t(
    "-4.2639104464050590356907454092934039078170402323995195168098153547152058234321196180472446836836168525385854701069452987e+13",
    "-1.40724289313792671426683553765726452547169474697366600951015699989700054113329193676420456521755282388861696e+107",
    "0",
  );
  setDefaultDecimalPlaces(79);
  t(
    "-3.76426849267547908972237897086404956978e-12",
    "-5.11117048234792202202996082481040947273149398309027493805831635457903500158545970381727672382354819762e-5",
    "7.36478758764916875412251873667937128275324257535473243369511988302056233e-8",
  );
  setDefaultDecimalPlaces(19);
  t(
    "-3.888097530332968859321386010962902676167784734440767657450162333105340150799298405148751397504616443606740171073580546236857500053103151851e-2",
    "-5.8519320264263625547024653238284572561926301386511884112154092010254317015644e+37",
    "0",
  );
  setDefaultDecimalPlaces(65);
  t(
    "5.129737731545283730653842814584217796e+36",
    "-3.93e-17",
    "-1.3052767764746269034742602581639231033078880407124681933842239185750636132315521628498727735368956743002544529262086514e+53",
  );
  setDefaultDecimalPlaces(89);
  t(
    "-2.784615869033735337219970006057293198508194705938491753178102967943789866548577370935670894970270368781224272482580998809232652295173e+125",
    "-1.5072791372579960202934791030544650016731427885883698022049406335320733020912582842846e+60",
    "1.8474453737211794122313964707745045691771057824301301502258560519352451120615767217556302867978552900873875899289582702636764545833303560835694861277887849e+65",
  );
  setDefaultDecimalPlaces(13);
  t(
    "-5.69732783470007521935730171911609866699301101706593516761584916511582991002862388547140983939068211972854181793342912490754715e-10",
    "-3.15280566004111748405027457660604902282049968793233346511777093204656755358451299581767050460857351330372672158616376700170011545063395138771e+40",
    "0",
  );
  setDefaultDecimalPlaces(94);
  t("-1.99e+1", "6.4375096597035057975552928797532065396006782019262360689053756642665487521690317826463e+85", "-3.091257497e-85");
  setDefaultDecimalPlaces(53);
  t(
    "-1.287027336388626227339657337394789224613589185657917031344986139304964584119268194590082981170086992170549806e-9",
    "-1.08101046894862803416485460990479984551890886889320571911699015840747097215601654358021414856978175790419579586715198893043454001171228253754392373e+123",
    "0",
  );
  setDefaultDecimalPlaces(9);
  t(
    "1.536875747064992939499998573211169013850121562110571435657450545654255396780945920501671362957738362230716300186319763003026835588242948877701e-13",
    "-2.403774570521154838249176737912187386862916653736474501473664576244128956921956161739290900107025000375881737042246719345311896620225e+112",
    "0",
  );
  setDefaultDecimalPlaces(51);
  t(
    "-1.31553926082821949915996051747789571553693387596814718349899283853330581858320758672410122761528981152979057506512251370546335204346075820857777951714e+149",
    "-1.44023743696527749468363399373121185e+3",
    "9.1341832052372602757888989883684637901604856409263006428352868220678245429770319594651619895671380773781398087880443052756771385006485808786507291785148703464680429577473223875825128238458622855016e+145",
  );
  setDefaultDecimalPlaces(5);
  t("-4.82653398023973281008602839773349181389337680431157583446060514e-19", "-3.67966855032966254795337e+23", "0");
  setDefaultDecimalPlaces(45);
  t(
    "-1.71169944110805582696795673119841792631604266189e+18",
    "1.087504470383200477258250994083195781715903250011220754392324498933252478564940407503906749699444063e+25",
    "-1.57397002745644784453756175935370619794e-7",
  );
  setDefaultDecimalPlaces(8);
  t(
    "3.6972638836594739208272247544735196922641954072006961001998729974853416628889115332318337839500679425997028826930740145535838125365037938946184e+40",
    "2.323425745492243712243731759794313951311247836476827990039152337954282758953834519820592153687410673747784023186923086659109767890965247006867449e+16",
    "1.59129849139042196682612442284531e+24",
  );
  setDefaultDecimalPlaces(44);
  t("2.43927732989716379377136448348717888307542705367457983569519469838172686e-15", "-2.3038978965309605191244849760604501740523518011058740912388332e+54", "0");
  setDefaultDecimalPlaces(60);
  t(
    "7.11653793332756353369234317179420815629510896905566035583402223410911748980198e+72",
    "-2.763e+3",
    "-2.575656146698358137420319642343180657363412583805885036494398202717740676728910604415490408975750995294969236337314513210278682591e+69",
  );
  setDefaultDecimalPlaces(14);
  t(
    "5.7813548332461918075989960269915313438647574879452e+29",
    "1.730480716185627482465096394852283926933699111362055690981182180560294060488375886536369e-1",
    "3.34089526636830192225238903649308424971706104e+30",
  );
  setDefaultDecimalPlaces(8);
  t("1.43531802096271764668577192834156401671952875121332157587069910996350655900355068595857281648269946087682261989040639e-6", "6.544120400290234742583e+21", "0");
  setDefaultDecimalPlaces(79);
  t(
    "1.563588148181258729814995171844910195896547567835482662368614991123632404838914567175046934300798704068173640489923e+114",
    "-9.8711040664167583148190774629013733373247920910387790118803519940458527375863504503884502158e+34",
    "-1.58400533279844766505255063719979286355652430889094302806282297469565562334963095496093779913231616093224584694393722317632905579370882177249670335628103081148e+79",
  );
  setDefaultDecimalPlaces(30);
  t(
    "1.7013043308558104444771859718691031983088652381770166775959546306550494704435852943432161893e+26",
    "-2.97960293426e-7",
    "-5.7098357344662042656622805599703571232610282863019557697619846e+32",
  );
  setDefaultDecimalPlaces(48);
  t(
    "9.123141637915e+11",
    "-3.9287566928722303846645543577505396044963850596966646117626656713732252454360920501634729663349e-17",
    "-2.3221447269734755087615791967044601740549118389457726674600697799719101685631e+28",
  );
  setDefaultDecimalPlaces(17);
  t(
    "-1.008217885907048248521319842251e+11",
    "-1.76723247401517951783011868256998259682686076481348094605435387598501593538251736829068870156158464892293483041244003147053672638606965446268e-13",
    "5.7050665417909711441393922936340400884213e+23",
  );
  setDefaultDecimalPlaces(83);
  t(
    "-2.08584040657526923054020479624019339575208593987857992164860011689783231428701961526570897e+1",
    "9.184756568429007669393076786250991302692058307203229e-18",
    "-2270980609050631096.38600131631910227938909726998955842781418948218111834910021794306288681246015078923",
  );
  setDefaultDecimalPlaces(72);
  t(
    "-6.840628218600976064877718626097391261614597317238320230006610169038919022358478470244227e+24",
    "-3.1939748258530802525909512628032459301e+6",
    "2141728908828800623.484157537811266665654531146534062076277720666833642731630045052821492479",
  );
  setDefaultDecimalPlaces(2);
  t(
    "-3.589934560262813617988398151744501633142410324057125435154103180108353947720504789455325413204822739096657332879387667428795019096861711249961216e+65",
    "-7.12489997975592345914494647178745598449256558563413030309819096676233577971e+11",
    "5.0385753771462675646957347507836795090664214159295583666e+53",
  );
  setDefaultDecimalPlaces(56);
  t("-1e+0", "-1.70368243660762119506621819978198305697236799702125888475131114234340843174423516089236609e+82", "0");
  setDefaultDecimalPlaces(26);
  t(
    "-2.2234537026839080720098444497096727565480057087707561749315055463834771526987268859617471790864862706806039082271691892024e-16",
    "-3.065815461989462830561346004462241527539091895483752382505938518161038593541188320806541494116165137247257199121368944971523699e-16",
    "0.72524055353320872990176311",
  );
  setDefaultDecimalPlaces(90);
  t("5.3484849863243e+8", "3.01822938e+1", "17720604.741857956468504060483302299575388799641198907155293810041700674187990311061116236301430476");
  setDefaultDecimalPlaces(86);
  t(
    "1.21632749292390660689327368804067788326008364697986681448626572557217548004574764130113187447700162304234004515230709267286e-3",
    "-1.5784941150188661323253269583094244931112e+7",
    "-7.705619434060221905256292770923711141374799525549513764439214948402956655185e-11",
  );
  setDefaultDecimalPlaces(6);
  t("4.148084478037e+6", "-6.141622055106057512247240263319741968743e-11", "-67540536373258940.09875");
  setDefaultDecimalPlaces(38);
  t(
    "1.62091962056226346591994441821867541592163131777994364776336612192771863422e+6",
    "5.92438874331475931738950560042293063918795797319064867e+12",
    "2.7360115799142199406369815192064e-7",
  );
  setDefaultDecimalPlaces(34);
  t("3.4802962535171470083573672260316203e+34", "-2.592318708667655696799813294592738856104e-2", "-1.3425418108816855092226076412008454123002560668415181974517652378548075e+36");
  setDefaultDecimalPlaces(50);
  t(
    "-1.651559901193690087662717389896631881434459690920251800245514864228196237448780186404177e-7",
    "-1.999627100730253514508890312666506978066095319798744943899829521646271787844359316500004396982324899665006e+105",
    "0",
  );
  setDefaultDecimalPlaces(12);
  t("1.72337390050810444861332e+13", "-7.740768527646287535971086506572e+24", "-2e-12");
  setDefaultDecimalPlaces(11);
  t(
    "1.6452101710262667839784520337298363891031701980421302569688592008194667020987515632277835e-3",
    "8.51836970482614889460820342211680009362999416742010656589132167946835316541586e+44",
    "0",
  );
  setDefaultDecimalPlaces(22);
  t("2.6e-19", "-2.75599145042801521893568295636569180877327200151513810792302517824495042499710503967595939428492111189087e+26", "0");
  setDefaultDecimalPlaces(46);
  t(
    "3.3388790751865011066224200873758764194315e+37",
    "-1.8358874185168869985496068104319412973386547033806517309795061849412783273978747013057938794810385029195636205674712914023538446474e+130",
    "0",
  );
  setDefaultDecimalPlaces(97);
  t(
    "-2.884814196759497466704899144877953516571186418031516217045432231164214863038935703021450112544e-8",
    "-3.30677298548034518e+8",
    "8.72395598193882803254862938481878214724431619923141007569275118448438045346587168e-17",
  );
  setDefaultDecimalPlaces(79);
  t(
    "5.432550256853607453863309153994015547384546633388934310757544380835439439049875762543538215096311783649551207819984107546192727191114512607e+47",
    "-3.1312804464213821724207296771595002830560352788925979277128329639824914833440577122078072651e+74",
    "-1.7349293203878485075947928729841506172350680330411329e-27",
  );
  setDefaultDecimalPlaces(70);
  t(
    "-4.507784485172309156883383019246829688890443834907695417488e+28",
    "-1.120312074632034415035100500485477126347133795992173321221417048849694810383527849084370501727221707954997713939432776218173338194991048900604627987e+88",
    "4.0236864239e-60",
  );
  setDefaultDecimalPlaces(97);
  t(
    "-3.032482734916670136315527229716301876587577170199060938297655489271144705e+0",
    "4.084048214256993765889310806692934519988918660793152366904505993412124873344241037981623775184124306043836110816594236358733075e-9",
    "-742518838.129918175314852923961634152086881433418751418429808553756436801914141454806868592443443297761101",
  );
  setDefaultDecimalPlaces(88);
  t(
    "-4.932050162311146063339494300939331059129082793984029564952908818413015411956735170112917476866546566066e-6",
    "-5.2464563420476229867485046730559382200491632107070627680854133843e+64",
    "9.40072658716956306e-71",
  );
  setDefaultDecimalPlaces(26);
  t("-2.6830879660882031546668312e+1", "1.285430616473775118404e-10", "-208730672173.385449023092912602257055");
  setDefaultDecimalPlaces(31);
  t("8.74686647476753e+14", "1.5307637089551358888981914891626770325035803509085140426312259727409833382002318295026749590557193e+89", "0");
  setDefaultDecimalPlaces(19);
  t(
    "2.3563891624922515777760506609628543384093874597207265434678250774499706398471154860727272433189919100391e+11",
    "-1.338618918160815229378421609512184e+7",
    "-17603.1365650337113592734",
  );
  setDefaultDecimalPlaces(95);
  t(
    "-5.4971717626235582758e-10",
    "-2.06936684453563889117297314450048219199605309744487869604030149158227060606481302259456e-2",
    "2.656451067213803185735364622181415874666846470383424282047480925356890350673420881670143e-8",
  );
  setDefaultDecimalPlaces(26);
  t("3.13016260242911149758232450309043156806861068909177069203016734e-13", "-2.006150105957234244e+11", "-1.56e-24");
  setDefaultDecimalPlaces(48);
  t(
    "9.18028339071000780850860595774988011367895e-1",
    "5.407478028548412635677651935060633187454413036800526776481478175889878087602697324612999416043838900105818973809371471992557476785117624033878e+56",
    "0",
  );
  setDefaultDecimalPlaces(70);
  t(
    "8.0420872621966049213360864375541828518065760971882496516128342929259321018841874984e+11",
    "-2.3282058176712113621587717837125121909094451899877456334952736087963859659124905323169779e+88",
    "0",
  );
  setDefaultDecimalPlaces(17);
  t(
    "3.966692568779277428919444362751703959880186299608785893703378520232934847979359025572324631881200361289374057241724877995521030312678700116288318e+95",
    "2.3012360521360427541759777522073451924130377189927475570422674536432479964178592221814132711817407284478e+70",
    "1.723722590343277596232354805075912263012889e+25",
  );
  setDefaultDecimalPlaces(51);
  t(
    "-4.4588359269725721502594937666913883176869592598462986550377864844630801196791422e+64",
    "4.0285231301731781227885624395742186700247117367155740170757922286629877383003482295469439482440932021706093622213948576005754913248880953304476e+142",
    "0",
  );
  setDefaultDecimalPlaces(25);
  t("2.26422992596e+10", "-2.41791638841865976339775907768575624807472701752165461177617512265106364174552503072294117053551974375971760574709e+53", "0");
  setDefaultDecimalPlaces(21);
  t(
    "1.5623667900345895357034743866978787801989683328494378600017980758535518518128730890139174465057345829923450172758361899637134e+5",
    "7.32872004626092572749903666198e+29",
    "0",
  );
  setDefaultDecimalPlaces(95);
  t(
    "5.192119786751265581823254190083989226283608751276298707628813836472989099893633e+47",
    "5.294717277556940415998884106856646344568232545785118809363e+39",
    "98062266.87040379974526997500748895390708269802712310007203320765255039453935634100686124494748185811657",
  );
  setDefaultDecimalPlaces(63);
  t(
    "-2.610227832373815127309904911689613727548051723638559653069357086451861539452146338e+64",
    "-1.1e+1",
    "2.372934393067104661190822646990557934134592476035054230063051896774419581320133034545454545454545454545454545454545454545454545e+63",
  );
  setDefaultDecimalPlaces(72);
  t(
    "6.336866999363563201762777788767038893527990619968614045279875530585293323036842740964081089843046035200806777534744351636947354982e+98",
    "1.85748984589715043100398268664665727411079695499128783021663787761e-11",
    "3.4115217444448074483845481850483279338422701021127067560982720196197316908094626896005983515931295824430974349298627002465975452340086584804785483929570636575800480367651075442523018e+109",
  );
  setDefaultDecimalPlaces(89);
  t(
    "-1.741945130013037404546051775925968850619864240688509697017889787762124998180587716547597269472491800585171378147166827978e+40",
    "3.54796977995182394290860047499669268061046244876950941485117762995388268749682068785965127034511157660107286897265719269056e+122",
    "-4.909696e-83",
  );
  setDefaultDecimalPlaces(44);
  t(
    "2.10509865532226306013717195013653813419900616824848326443440094766149163306098729579153737978181209741244959867e+110",
    "-1.243048417900459511918971e+7",
    "-1.693496910504764078443588714652122073525680396821315266869790324612757883088196703463429036915685616185986048366440091321946650855264922509096265089e+103",
  );
  setDefaultDecimalPlaces(81);
  t(
    "9.73780883981556357938593891391053868582483859e+16",
    "-1.19628479058883835035161723386247571294680593954632930898441734348805434925630658109521859316888404448290617957460486995725442823160914337364534937e+22",
    "-0.000008140042334754080154439662758508251431584193605129641394331436348901837462221",
  );
  setDefaultDecimalPlaces(57);
  t(
    "-2.271464829780587934853949637132768777383773600987805439955035538412187637942959300556274311827922303516223467814098648642252446986031e+53",
    "-1.198852295817138009738958623906801113936e+39",
    "189469948692249.612539355825343379135366164655830522530772334749628236246",
  );
  setDefaultDecimalPlaces(33);
  t("9.716e+3", "-1.2617709739e+7", "-0.000770028808791573042541044619286");
  setDefaultDecimalPlaces(85);
  t(
    "1.31448228534709750865891086185e+28",
    "1.7833559049252245222964241157879579694381809124799367e+9",
    "7370835410457304553.2829221746962114240849583644179760632559776493355135213670671597644428207167552705415",
  );
  setDefaultDecimalPlaces(45);
  t(
    "-4.6002915204421948703116513525556628628011471308509187701376e+48",
    "5.836302970415392019703701286293938549268197901504266e+9",
    "-7.88220135891056134821037170584154370522439782107786112208766806697141415107708087593e+38",
  );
  setDefaultDecimalPlaces(62);
  t(
    "-4.215528963092251352751592503658759748205467955383221394819640506780269708135924777276148531451060544565835813307820412089185e+89",
    "2.285788410892843854984493433104537938015049743685758656216749018475522375266391517467715803509350428316032733293026116855037023017761e+30",
    "-1.8442341132728196209390961546734837773385905327369982839225730617821149979570330963470337068351339754258408045001085839779e+59",
  );
  setDefaultDecimalPlaces(8);
  t("-1.6213259308448282809598810206323815492603446730212937799942925885371519488574329759446839e-11", "-3.476528664e+5", "0");
  setDefaultDecimalPlaces(28);
  t(
    "6.25631534001409764374832204783430728934779280917896094802659462315606220500132782959662e-4",
    "3.00355315472456956431808641396725591562658681841463154105912084453705123803687208837998623550764467296545092615068773964e+68",
    "0",
  );
  setDefaultDecimalPlaces(83);
  t(
    "-1.4553359614090896545e-14",
    "7.7226358831220452030374995295292627401985157682919527217312773212643e-7",
    "-1.884506771308163919227234197130134268270236778898728410603717367940547478979e-8",
  );
  setDefaultDecimalPlaces(42);
  t("-3.22131019041417121125692584186235174240447402407177299201e+35", "4.0222477489e+7", "-8.008731414655230192792080405960773020657812677859369519380129299921454e+27");
  setDefaultDecimalPlaces(29);
  t(
    "-2.45906495111731310784326936193705354e+20",
    "-2.5147076100880509412088408836063327587657207576116525645389622465135969365734242773895926116656636746380550699442288784737662877679124e+24",
    "0.00009778731098806395468519152",
  );
  setDefaultDecimalPlaces(11);
  t("-9.075628981677481217035900361116e+7", "9.4169385553736779179723172366440117215655954016722933136387786470303428376564859510330513608012545093301538539903e+19", "0");
  setDefaultDecimalPlaces(61);
  t(
    "-5.147662433648257906242165966385915358083892233966650970603879700038e+66",
    "-1.091464935559865575181967218372832000635704753183343488358750731349028089561119236687317492121837672544778974845860359924040091288889769722790248022365e+148",
    "0",
  );
  setDefaultDecimalPlaces(55);
  t(
    "3.64488806919579593984005491467738255017769299638595432546377741425446191605485371272752195796271392192296723784803672704971490203981093517273e+60",
    "4.456814520780117846057367782520560860898508042617555429921735060872207567633e+74",
    "8.1782359400449026521982717121579679339274e-15",
  );
  setDefaultDecimalPlaces(72);
  t(
    "7.64256997858584669400555034762640332692808696029759788630226523483245226666926499e-15",
    "2.16282229989767272333794901823983491890311383850926946067557032983296e-3",
    "3.533609755617662790458726676863177467697773551376626472973236e-12",
  );
  setDefaultDecimalPlaces(45);
  t(
    "-8.589474253815746214838906054301832621114392708439795804929841067367701976367011270230226112181533002724420685292026722798152824693e+73",
    "-8.1031922407651727252395530458813246306e-16",
    "1.06001116579762330583942593560067583929489529009901164707463079546691999802182726216536737350900851020885728623102344093395112873880632e+89",
  );
  setDefaultDecimalPlaces(7);
  t(
    "2.55782522090909810756856715366744004349590683958292623284733953374308232575098422339202739484630431736816591e+107",
    "1.38348691823550131758708931822226301528719218639812226464227395622176852358547560156236439e-3",
    "1.848825013951955114038102478561537425832827421998452574705835219566624198044087223235817569459427679574633640441986842e+110",
  );
  setDefaultDecimalPlaces(15);
  t("-9.63e-12", "6.5162e+3", "-1e-15");
  setDefaultDecimalPlaces(12);
  t("-3.78888841862124793339628e-18", "3.8983134432793067652076576953374133067218982111850345218027896616254679974033107296017653722926639679039018e+41", "0");
  setDefaultDecimalPlaces(60);
  t(
    "3.0161990246269547388266024757242640903449177268888557367392151290619671671421404121158e+49",
    "-2.22065e+3",
    "-1.3582505233273837564796804880211938352936832580050236357549434305550028897584673010676153378515299574448923e+46",
  );
  setDefaultDecimalPlaces(11);
  t(
    "-1.0677584632959742476697273725610428862120565859387944881450904996656e+67",
    "2.1245935822820027446848676898400170226973776349430143715844148980380907244157386940957431875552041026170541133885821604763957387687107108271e+58",
    "-502570690.31956057825",
  );
  setDefaultDecimalPlaces(12);
  t("-3.35256126657293e+6", "-1e+0", "3352561.26657293");
  setDefaultDecimalPlaces(25);
  t(
    "2.8676649468084036932986564711911158541641797432631538590049669891926130692689579109556166529122203306666910881829865236e-13",
    "-3.922695159506770733273374935529183861331459580292917574360264483076869668945725183187530463e+23",
    "0",
  );
  setDefaultDecimalPlaces(69);
  t(
    "-3.472927795737049572419702401426670897348980220592699587691284628396568512341907836843315328835753777362647946704328256969e+77",
    "8.47893365016256876990387996415270934143925269403907061780353725516514482971784315463748021102103100296856e-11",
    "-4.095948782038720443237776000664177532849336130206325506450744003656751657452779657253663929054008898132300261774710340104354241093866546931331925800262459905e+87",
  );
  setDefaultDecimalPlaces(56);
  t("1.045741201220320805337403179255105761483836863e+5", "-2.6689511656531389868381887246267678502601492944462057964024558391398406075914446101697265e+65", "0");
  setDefaultDecimalPlaces(50);
  t(
    "-2.9006278142228865805793374979227233141373876225139078201507827632040743650601163561e+82",
    "-1.1031570518112651777138848593603656864850379576520458497505187069945054e+7",
    "2.62938790941903314813310782701437670764604979493303885232764854745333081177113517156025842308339869085761927557530708729130865e+75",
  );
  setDefaultDecimalPlaces(55);
  t(
    "-3.22356522498342393374703672382911397933068045797842071858906034412701581985992e+29",
    "-1.09788874520134899752042358346683790590416493436675214420203414302127304020057672308216849551797058579479153845123552086702784114368207e+4",
    "2.93614925835880868239172577626347626679138511510256201694134890048035841087662693e+25",
  );
  setDefaultDecimalPlaces(95);
  t(
    "-1.63203782720586543835499817455941702455962548215214740445712238e+48",
    "8.5273858717770685967016623441969795952340010540907902992266477682558401985448056998197951968616e+9",
    "-1.9138782409359366147309234930477696461821061707081927889135131968490793889588881385729150858186161022675957964324669536957238779218934e+38",
  );
  setDefaultDecimalPlaces(19);
  t(
    "-4.5929071394981691038673785204069517069321958859555871304382396225710203e+70",
    "-1.8845400192241505515457279005444024554845778698404696195298894787566240104738621484681392938252137925009758521099053e-13",
    "2.43715022904582878790379187778774620189008339871973043491388756822798319724526801758462433403186017045e+83",
  );
  setDefaultDecimalPlaces(44);
  t(
    "6.8402393139358958751183151653e+28",
    "1.68942652685903761107664695014051429070055477483427901e+2",
    "4.0488527942397058368157950206427804712820344732294117021528705973358036e+26",
  );
  setDefaultDecimalPlaces(72);
  t(
    "8.7657923707809646373133415816325097129932329941947652828557677024410491798482677673692975980618921765209646087e+79",
    "2.7541621440172006196224171643493148984482e+23",
    "3.18274375741554723532879042600770245610310229087194907568604781081171260988505857411569328589567783790630692013123130195847929573e+56",
  );
  setDefaultDecimalPlaces(38);
  t(
    "-1.526627147752028794249694799692778974541865738673962421216617874804737174962847219498587141007761272418e+103",
    "-1.568351345702046526601207e+1",
    "9.7339614107236884118132328720328261061796781037209712615974053102197595728803652959207786103137383104227125224442189092055972691039962730568e+101",
  );
  setDefaultDecimalPlaces(22);
  t(
    "1.4331678071268569880273284705111172783782633564565189816238443879013444119787e+31",
    "2.52400183983279899180576427503107218729725030661876492e-8",
    "5.67815674501170863358964201559544829697875289507911509865565e+38",
  );
  setDefaultDecimalPlaces(77);
  t(
    "-4.2392252619877717432352055316461886118447190936363374340826157258516133292183724622498063193502805800936333761667119781168e+116",
    "-7.315217266660209698296e+21",
    "5.79507772285648896505968822629006191829715174749551352334857843464256996850322415960276405936460490496873175494504466819509191780041860729075406238768940954113928207450866e+94",
  );
  setDefaultDecimalPlaces(20);
  t(
    "-6.87905953683167552520596284439394311306852583718417032670784376661250245215166735574418066565530277610355285859953932572806083246e-6",
    "3.80367410221507274493352e+13",
    "-1.8e-19",
  );
  setDefaultDecimalPlaces(78);
  t(
    "5.09110043915251607231770745723099923727378435211622728597855720550702431181398546459135902672177727251110219335691653e+12",
    "-1.53344569767598568746177646016744296338430730889084107493284645686819406788480385799427101220032466197591055066527273353111328072009309220521028278e-14",
    "-3.32003959896873793347538704536216694292969627917100431511603256732392817636311201893967662800248012918004e+26",
  );
  setDefaultDecimalPlaces(31);
  t(
    "3.482327926859914577623223500952947319974512056242542560467481195114216905833721e-8",
    "-1.21968405563601857297692981256756439093097766950067139590410145738404617367450333182036538130039573e+88",
    "0",
  );
  setDefaultDecimalPlaces(54);
  t(
    "-4.1781699635305648201116189533839439792671194888866453805055733011465862545905417455923e+68",
    "-1.939340076392269345460295578323001814386396119638727925420578013902263300754000105774e-9",
    "2.15442872263185700043459511164677440197270158973318543240754824206465653749124681994883081653848280968137160679952114587223430248729e+77",
  );
  setDefaultDecimalPlaces(66);
  t("9.82552979344484115745782217474048743807736329e+4", "3.70385e+1", "2652.788259093872904533882898805428793843531268814881812168419347435776");
  setDefaultDecimalPlaces(83);
  t(
    "-4.6842661039533682751560706430545770202179205122188469404917105955722753289961859996544232130228042493689866951094035513812695184308170005763294861365e+80",
    "-2.0646125203709967344700270191610653006833489333866790166166261203689628e+53",
    "2.26883546318494558352511812912541046828861991814678717582975528424609730893930083553667063922361041129195552785e+27",
  );
  setDefaultDecimalPlaces(24);
  t(
    "1.41512123288189556174285107141159566238498262350588681087582316318616595758347889155633729365079822209802014442041066106324168933898054016e+32",
    "-4.0999560030774730401440926596936259676180165058361781315511881095202863822e+54",
    "-3.5e-23",
  );
  setDefaultDecimalPlaces(95);
  t(
    "-1.383924487188380129241798637531261315607930912545963139759688146019171138207716353756e+13",
    "-3.0318710137056446663774362317160437286689559639359891321797372832336352880416137825671753157102992e+94",
    "4.5645889318257e-82",
  );
  setDefaultDecimalPlaces(59);
  t(
    "-9.18280072917804520433413864636947532959905383582081842794679715047413765577551694533675667301324647190454335735492207090226556277696e+26",
    "-4.022289190025686090377748753492298421342954446794694146394116724541044792125946472902934568128346566186e+56",
    "2.28297874552361671586973574988e-30",
  );
  setDefaultDecimalPlaces(57);
  t("-6.07552466456056061269508891e+9", "-2.718367877961275663167889548467799491086803911259564e-6", "2234989867933948.972728891701538572956237934455948375696008967458616797338");
  setDefaultDecimalPlaces(99);
  t(
    "-1.33255560863110229234123366140159361836707310921047912692431564306621447521969756860592738764408838191912387067403783094643510288544453417e+84",
    "-3.7635959635625086612016949072060015681763642342098783406739779298338192760077944417221369840833778480653793921743830195484059194082e-10",
    "3.540644696009676216051635614763276504216072331653716077705298274147603981153227387119804901915976703239530734915016117330471798546544184143592140482472068363143681593771237534957202941022108951e+93",
  );
  setDefaultDecimalPlaces(33);
  t(
    "-8.78069390123891106513860874420567002803539988806550454985510902020802186250339124074886576625453118050628708e+42",
    "-1.3733156336461654077817844784645702582120579340389828138194985870098088852740831518497157448293e-6",
    "6.393791555351401244482331276667895625730937692722149815263294220371055192775646922e+48",
  );
  setDefaultDecimalPlaces(51);
  t("1.083737695122886788955744374635457773799981591452829332413933041162486451634985010444207382e-4", "1.0172921301543769123049e+22", "1.0653161102882281977555271e-26");
  setDefaultDecimalPlaces(79);
  t("6.5405e+1", "2.35246977410154538650678099698311931195374717e+31", "2.7802695158954575615369308754059422540223671323352e-30");
  setDefaultDecimalPlaces(93);
  t(
    "-3.5905909406080009552363983812236682e-6",
    "7.8987292792911969309028793195459570490063536035527963466017911582949568438296183920099849041923549738487381626105617962761023968e+127",
    "0",
  );
  setDefaultDecimalPlaces(44);
  t(
    "-4.45146912108009878914362116879335253201729163604445673228348419786019264365671201635212228784e+92",
    "6.7684068331072749513286273544962500417965368125712108236527488134e+18",
    "-6.576834446927735127804425094360112836785834088602085840544628882110506310959766686907426820670070190935640317551963935e+73",
  );
  setDefaultDecimalPlaces(48);
  t("6.23035359006942e+3", "5.82410111992044533818692783008636951701738657050662766521021441851935271500150751504790751859252613280460925898906028552e+72", "0");
  setDefaultDecimalPlaces(78);
  t("5.81344174e-13", "1.642058133769549434352986457470380720944775423040403584e+34", "3.5403385668536099619682232796756e-47");
  setDefaultDecimalPlaces(77);
  t(
    "-1.88140581609577154077733921491442182789682196434122008961621e+27",
    "9.1701390557270915003383967247749183972914829463719015342266728246268487085749720251351311751507878032910804042138633340903e+60",
    "-2.0516655250944792617367657449316133336644602e-34",
  );
  setDefaultDecimalPlaces(80);
  t(
    "1.9682903644846122570512299858214665609952724714905178123357078271e+17",
    "-3.40051756817649780867129586615e+18",
    "-0.0578820819190795502707054452321851899612526369521658477504599487685418183866492",
  );
  setDefaultDecimalPlaces(36);
  t("1.412177188017e+0", "2.6633596191173219674553313236626910343958215505218357045043623502781669348791500863756541088949041538e-4", "5302.23998997558232952082932594666578244");
  setDefaultDecimalPlaces(92);
  t(
    "-6.374966084350724621e-1",
    "-1.5998541131339940239745968717556940972195260039955402663366434700716964802452950659673310787061421088291358948535619259997519e+57",
    "3.9847171264026349000190485404108207e-58",
  );
  setDefaultDecimalPlaces(6);
  t("-1.296218282162240124999707520581239254728118158e+18", "-4.308271061876452908925097291091e+11", "3008673.928696");
  setDefaultDecimalPlaces(40);
  t("-3.85045888209357122562590224285902932021374259442379757265889965943810487758e-17", "1.232730264973295223037303494072264518991256138324638616044683792389e+66", "0");
  setDefaultDecimalPlaces(32);
  t("2.8857752141e+5", "1.94150647779224961772199795304269975028531026592256441678323793722769693327245209906334536166942107652626376971379653895891411343594504041e+137", "0");
  setDefaultDecimalPlaces(98);
  t(
    "-4.9375048442102453455739830334922926187781740743435573830105606074695410382549303827547504942518200485305591458071880101218185393875844065e+101",
    "1.32915290828606127652436039771302903695701215815962e-13",
    "-3.71477563900239526412664722973912293136969871759741267546692210371317453280265361259254008037061056118276924200435271169616975174865646561746963536432352769203871793046704321842067958962187813996604422803344455042e+114",
  );
  setDefaultDecimalPlaces(78);
  t(
    "-1e+0",
    "1.590845527006950497265030745857730998381925167450141462325380759367371338165145038616793837235568310569371e-10",
    "-6285965438.023518052368977584190216509008377040033101928764603878070756217282696200238259",
  );
  setDefaultDecimalPlaces(73);
  t(
    "2.146279285668155812654516729669576787588962735642905481040434645959306582544629196237854491250157824e+99",
    "-2.8139174831043505929455454722632618649999044219626712042743575822163519315840618869072591594174372339414336e+70",
    "-7.62737108872273118849705784890841151310253928134857711211185945625786144399645996393156227124633453808e+28",
  );
  setDefaultDecimalPlaces(38);
  t(
    "-2.093040039397815225155284517722998769265213332849715213390394289101974112924168520511489095437068491635230661330137077e+117",
    "-1.59178879500936799901370397836017702767198397602385219881894104523767552974303317683536027472639925709363898527403322168369383e+93",
    "1.31489808570080885711054279103536093062521516955762170651321147e+24",
  );
  setDefaultDecimalPlaces(41);
  t(
    "2.95124405966255900575165231110812694265038807496084616004369101044828285502489972774515155678155676627838084227105196370942278259603550501e-5",
    "-1.206959366661050039783590962125407028861773539966767281723236647863593432843332e-16",
    "-244518924263.94796787437296503951333252098822896112963",
  );
  setDefaultDecimalPlaces(24);
  t("4.09412812702461244973105195356925010168762667034779747e-1", "-5.983e+3", "-0.000068429351947595060166");
  setDefaultDecimalPlaces(75);
  t(
    "4.98981466968541959276662907293425136120879584542268141874652130908456217716528330130994487527396196776386763068930918106e+107",
    "-2.19970851577891391098280892239801803691e+40",
    "-2.2683981236116334889207929420392225132742409414179907848037452251212192678309663893119492988075714498210440609413983669179091750734547451224465e+67",
  );
  setDefaultDecimalPlaces(24);
  t("2.83395815552985210014368807e+25", "-2.438327186e+9", "-11622550787283278.480182142668362965133261");
  setDefaultDecimalPlaces(11);
  t(
    "8.955718836409165590620834493666262868314681720019159878315598277101023538966439727886368536991818805193346883669403439534084882156699029797019650679e-2",
    "-2.81323640661188e-18",
    "-31834220598598684.9220156799",
  );
  setDefaultDecimalPlaces(28);
  t("-1.40527901946316254447057e+13", "3e+0", "-4684263398210.5418149019");
  setDefaultDecimalPlaces(7);
  t(
    "1.1889257195167216612207134128438873111485181545457231821408133539639640585788684827169529101400344e-4",
    "-1.5140930560887390207422442154037966713331410475305234149855620537863363861948434938925570226059402588746569e-6",
    "-78.523953",
  );
  setDefaultDecimalPlaces(61);
  t("1.5612855e+3", "1.414973269872135043166766152052146687354690963e+45", "1.1034028226844783819e-42");
  setDefaultDecimalPlaces(67);
  t(
    "-1.870746601318098559604960119553864824564857075420171799424401069657277850189388480242246889999586954615614536779663156697442391653101e+130",
    "-2.193983561185411277565325955e-20",
    "8.526712024712402585825959821757311855797138754817018677587009326454145610576613905517734906323478425654503161730811434759126774610380815900048841179529126076327525769019872946760131590796902010815234819819122455447117e+149",
  );
  setDefaultDecimalPlaces(33);
  t(
    "-2.21982779712322659814331453134437327336414200576840179833760700367744723739895550893623520150207216624267e+96",
    "-2.72441112605469372561276850064215265390787160504366670117971339303838754992537379568511862996703101905703577466325613144789462666281e-1",
    "8.147917823026327634996289210662998157293578499427422096233766762979124374202144618214264642107275853478536839779823688183950503965e+96",
  );
  setDefaultDecimalPlaces(97);
  t("1.22719217099970377602e+15", "-1.62265308570868978503377023783760537614715301041756622239e+56", "-7.5628745405166538279769632569135139862776915805464551293e-42");
  setDefaultDecimalPlaces(21);
  t(
    "3.8648722421497448272813528722397345874716833894833167049104132009772254170568800073042479571246227997510757788995227050676993454441127e+64",
    "-4.980286687108523676747637753274216780684830880033195305341025e+0",
    "-7.760340889920995736168604843198544450736126209858074127717205729853683464584839884816e+63",
  );
  setDefaultDecimalPlaces(27);
  t("-2.854162393107557456041854789454e+30", "9.102738000573094663921679624386791933166058928458536850833624305998877099726160580538750139883599577365491005613152e+111", "0");
  setDefaultDecimalPlaces(33);
  t("1.17857e+1", "-9.5584604270990044609923529213709290526447981863591808425971095842546191167825459671280079132829530092844191101943808412524209017833202125275338e+142", "0");
  setDefaultDecimalPlaces(4);
  t("1.65557242738925984410493e-6", "-3.64077096129019914484571687601911126961e+9", "0");
  setDefaultDecimalPlaces(32);
  t("0e+0", "-1.16473076467041257694813676579808545721465855317087417536626569994867491353302377579165020329467685065187533662471482961501484744708184588010187758e-16", "0");
  setDefaultDecimalPlaces(50);
  t(
    "-7.651258331206891839483647132486608484905209492702780781429708582349687764098931879573938187664979096722315310995027926e+96",
    "1.92360616530733577135216536732671e+18",
    "-3.97755968409700197954627569157343302907274580316815654081599777407166384643363237664104022317507883801130581066755489027349417181e+78",
  );
  setDefaultDecimalPlaces(33);
  t("5.16057082397991630487104263829e+11", "2.3260791159083996466350038602790905533318371460389884164797146177237e+43", "2.2e-32");
  setDefaultDecimalPlaces(44);
  t(
    "-1.4994173737366278378882155847015263464715674e+2",
    "-2.4793625169061729514983200597558183987025851087002961901618117643314083283754969212236713651003971080485018582220592e+101",
    "0",
  );
  setDefaultDecimalPlaces(19);
  t("2.8620767622659015117431608786930092931746e-19", "-1.439613872805855426868067926402387938567424679984609393711171041152790784e+22", "0");
  setDefaultDecimalPlaces(6);
  t(
    "-2.5256679739338636178616828898042236671072546801558795051340902575494835336669536052331060623458321219517e+25",
    "-1.53022946552951844149591436144841807801871729262318592112226081459894580433451762096763889900139050084606862198206003274241e+34",
    "0",
  );
  setDefaultDecimalPlaces(67);
  t(
    "9.26916936198076973414195529809053895517625004888843995534600295918920567625253311771099326838244257231915818750766357521256014932111446404e+137",
    "2.29720628285927155962768364973780570233418810894869623882548976755599477907797840526215954730289246930721e+81",
    "4.034974756574181561463327535344296423393890025391897025692169161735454318211617594939709237043552317329195049772325582573488e+56",
  );
  setDefaultDecimalPlaces(39);
  t(
    "-1.67035303436881913001436989896846622911383855018e-6",
    "-3.7323599932677920749489628978095695243213355640320392066653283890537743630474454043055980538317209415347147715419234412698726e+107",
    "0",
  );
  setDefaultDecimalPlaces(83);
  t(
    "7.545051434197725185695060938267943886684486693282281228338955527024280812396362195e-10",
    "-4.8013589828163390246129975385287981159510845107324e-3",
    "-1.5714408069050515186304662304258686960161967261483077316035654259544050626078e-7",
  );
  setDefaultDecimalPlaces(21);
  t(
    "-4.01160750342550828394405787835049841691975528177331957719762445056851904908343439781804607232e+93",
    "1.7863553241327796228006437380916504188884514853050676694261126958983634562862851772221624698899382425730668404440071302443622128367575044e-16",
    "-2.245694039271285468222985276703806452466908746035808099248503905997431693445265582811639522842926071988333431225410221317865423245e+109",
  );
  setDefaultDecimalPlaces(71);
  t(
    "1.78840987587289725420029156866268291642764559239948004685568456249854978720996759509e+23",
    "-3.41052141390250931753471908717224175271888238112703112707401478338576195770696508889520216887113186854014842206449095552264260827713702179335151e+74",
    "-5.2438019259538929758e-52",
  );
  setDefaultDecimalPlaces(51);
  t(
    "3.16562529724701453440366198261869567936850053590679190128080911986417983e-11",
    "-3.29057655110992332871791854872695975359105285417426952150905681970927183129955466909713237e-11",
    "-0.962027549907397751890044787305223772973700621829382",
  );
  setDefaultDecimalPlaces(26);
  t("-1.02638471012e+4", "-7.49951084105141312112881941257639790069130523071355489110051932772e-11", "136860220869565.85664687834166666442228051");
  setDefaultDecimalPlaces(58);
  t(
    "7.304226920833179583333462338766324433916207204285064387869e+45",
    "-1.51448520763946168220173255491283164806753718559479958904830434985041270074678272481289452e-7",
    "-4.82291070522758363968614677466105612405272435503691692838436777674872509842079083456618188448364587305275674472e+52",
  );
  setDefaultDecimalPlaces(32);
  t(
    "1.5918476403466812766985047010800929379215867064470592236332536388210534539403305654458470217287677957010592490969939398823433483955522e+69",
    "3.319766207831217991857379533007229356779890185380170288362363055092331809667506440766390687e+89",
    "4.79505947314e-21",
  );
  setDefaultDecimalPlaces(47);
  t(
    "-1.5541270968117060109704910816978131337597096302565953110622439987622065257356976101697329673634e+63",
    "4.31580153014911965858711492995106336170832979375422678837784102598614583434624250368458375252007754396603048166640939127702727960585111960132887357e-13",
    "-3.60101614023480774202941762891129626346528276152454260996812534756135827148864292218559253685939090269002983199377804921007e+75",
  );
  setDefaultDecimalPlaces(90);
  t(
    "2.5574563714480147839213976247884730498140289035836661842413848640088838192457285596082907442184922163120124105145341279959e+32",
    "-2.2509741508221960145562311143112105914779015541972594568935e+51",
    "-1.13615537100409276844213266724757953216521423471362727622609121150755434e-19",
  );
  setDefaultDecimalPlaces(65);
  t(
    "-3.877233375034465155956547365143154465893069408744885925610973391694091270163018432240327086067217728926868377e-20",
    "-2.1682705667702311825418229053099569813445071037822213e+27",
    "1.788168614403983903e-47",
  );
  setDefaultDecimalPlaces(95);
  t("-7.96199876466188259725447950062928e-2", "3.435735297707124424410468637670132347758e+29", "-2.3174075051635699829762496249321732637472082571739154120900335791e-31");
  setDefaultDecimalPlaces(64);
  t(
    "4.39291690242525405233655095284262552072400773770095528229313113490594896e-7",
    "3.6407628073938358649651297455202142286149848182735304312979772254312943184514151140845581335553392e+97",
    "0",
  );
  setDefaultDecimalPlaces(35);
  t(
    "-2.83301281103707063664509318727911442066496219336115777805544594875130282582739082097473380061669413882116539316432196685011686286524086811619e+93",
    "-3.7424372597805010848964188489068829170839974e+5",
    "7.56996741530739943559678175579920848569625057202168238044283908961818549186171128766262019535132788832989894048682628097364e+87",
  );
  setDefaultDecimalPlaces(91);
  t(
    "-2.93806970213630893221199151715550582074267197134972831686066048636504518504698108493732169241791732594080787005517e+113",
    "7.78193924058726921681726573739583539958415475448685293469255904378698468890195758115268627963444636315186425916310554611502243199493455e-9",
    "-3.77549812624158390298957999909399505761694022283199055518397086926027592308138860188712787625636842490225890564036495831585646835174776015039305741551777904364932620241101923386565968615751549581549345620556665008e+121",
  );
  setDefaultDecimalPlaces(82);
  t(
    "3.995289750888855763906023168708263003080046678808886302991769068257190747701757450775385e+31",
    "-2.21771723751942726262495934677402044718378127737661101599874296918069673357505022622711827694434922e+15",
    "-18015325323248550.1582035665022873256310904550435595770186583691802787687634579285820150476333599038",
  );
  setDefaultDecimalPlaces(92);
  t(
    "-1.6114950399067269830242458217593160418011051381648300273747844723785169289096715461378e+38",
    "-5.23092353597110608458635813969468758346038305248808573970422650401487e+7",
    "3.08070846156530083905723082358711366587731720964440930505565767774271595068306346342418991099101601907010755901597709521936e+30",
  );
  setDefaultDecimalPlaces(54);
  t(
    "-1.0491829164616580670933516480664484325274781212706888848244321283056040472245452295748731809580288803383164350658422163167211490022058857e+109",
    "1.4767276883117076245094579434006602502254337389121777218512610840086563863193361139e-2",
    "-7.10478258629492546516359648288697097054533841386008239133014476102306540609424780162136730651047600250100199620789967257310207087607545209554806613700372668214465063e+110",
  );
  setDefaultDecimalPlaces(86);
  t(
    "3.756419269105850556852284913934772686196573e+37",
    "-4.4439584314614484313027036773155561344926767877008964551613830045942144428307604289279679604972737157275e-16",
    "-8.45286770126359515169944493617663836260771531072630158595027978930621050795246956566600173115980914999967549124563354682679672116752076586e+52",
  );
  setDefaultDecimalPlaces(98);
  t(
    "1.89038962391710927708329069478478238238898692936076993295298656214759458027826282499962359780247081e-6",
    "1.259508513571220418432066e+8",
    "1.500894677207924192526771436768215437952751900280844038098037699222508074134594381524e-14",
  );
  setDefaultDecimalPlaces(54);
  t(
    "-9.1422567543550716977031259814465441207720473506775771036935292443377695773173543573042422352557181654644485688758019e+115",
    "1.3637408280250547067527067693925703683190210739901148291242162646742707376917769e+67",
    "-6.703808059772417221081464852765880215966957152756865039190227402998133986228565403064229338954826293367e+48",
  );
  setDefaultDecimalPlaces(24);
  t(
    "-1.816923738859436514467104480901856420700359588024463485024289872492023011589087118075886e+87",
    "3.647211299270312124765097820072301697810783734899972666446200414054713695770087336313911236758351001577052644834257428066799912254089725e+96",
    "-4.98167939768925e-10",
  );
  setDefaultDecimalPlaces(6);
  t(
    "-1.91639224400600728584836207366939525169514000684668859224504825099457638475943550344075371171121963771745795329215591285628055061710128866e+137",
    "1.6768699389375840018547095e+8",
    "-1.142838928354919193456260350230104040215272935711959183988208602780924711153421968913116890672516885231020409782631822112287296306718298e+129",
  );
  setDefaultDecimalPlaces(81);
  t(
    "5.718389907936721563606852409044917593903441678018029440697753046719882767476439019477047646354617341414664964405460493446743569699000729247049e+133",
    "-1.04996815663409582652996949695376816479084624119219060236618435365e+65",
    "-5.44625079513675904679065867224694590173036797465736857569298141302854006725281103827506671086951197579687414158655533973728193490651559863965025511874e+68",
  );
  setDefaultDecimalPlaces(10);
  t(
    "4.4504424275464807311079565946489186744e+24",
    "5.3844855721363533525730969192776515593163731789248644668610510160394836444120716142190103654969479524452261377084529963219760335226537e+133",
    "0",
  );
  setDefaultDecimalPlaces(13);
  t(
    "-1.021884708196031174610250704489682434342351146513822145264488194680886564982288912153e+59",
    "-3.729801923265027472251808765709887686489364342758876315413536510630120186836465757312476676615019553217223150266086535850786358e+95",
    "0",
  );
  setDefaultDecimalPlaces(57);
  t(
    "4.8739631719243917253429840775857736971487541010095531503213e+41",
    "1.537224114466706394371509890848412870826901564993626656047558336999955473248314788267938739523115714695066380513925e+54",
    "3.17062627762332914289284836232421286083993709e-13",
  );
  setDefaultDecimalPlaces(23);
  t("1.24256e+5", "3.3397948012226391844410842038704168068701626959e+21", "3.720468e-17");
  setDefaultDecimalPlaces(54);
  t(
    "7.71874996498831848924421725092877185326469571625197479695461641492690273791545437781152128273044542265093353727719993690580240717907050957e-14",
    "-2.8233243447460644246555930590722639019240429915644170702074315318598287065131506476905e+6",
    "-2.7339225049903214975805256963946003e-20",
  );
  setDefaultDecimalPlaces(63);
  t("6.734072e+2", "-1.808310810523917932875719701907768581795507882824776453555892378673869167494537224364341823907615729746002084058457975947292026278808675031359e+90", "0");
  setDefaultDecimalPlaces(90);
  t(
    "1.6864126069602493774795768974549116469869915599422756184006695646452970524669197396039886509891558655925347318123764766495787434028540240351155907e+135",
    "1.245149393941144780265360934033227664731e+34",
    "1.35438575898303978850106528697459568480865353995316347462581161507346366435779918925144559029106876111024105691156700436014112107753384337826913250845731172280233437768602738631944843475862557e+101",
  );
  setDefaultDecimalPlaces(97);
  t(
    "3.6082402910490186464862260053965024304181544284881113010188e+57",
    "3.586432867809349220916e+7",
    "1.006080532953901281253574887916937941401795290734002583949528949844446609622878379982392068177483264688834328516782389572816217214343410863438569039e+50",
  );
  setDefaultDecimalPlaces(3);
  t("-9.850844627227948375559263427430599146e+25", "-1.473829248299726057478763253801400627e+14", "668384389751.548");
  setDefaultDecimalPlaces(29);
  t(
    "5.78965591785496111871333859622968091467910727886563376582467207559513685612431538192750050679592728485674033615689567687500136952496788310985219711e+79",
    "2.162343129375867107239853154469977057716193219452449194077921911015e+4",
    "2.67749176307928140810171799347468674204288615571411357112934427648572741263627405502850463718970312818534e+75",
  );
  setDefaultDecimalPlaces(90);
  t(
    "-1.95104195500074500078672498748149154133737540459530574959962784426368720464582942097843998111194e+47",
    "-1.686465037108914133460038923411815697996816211365558551572102600836942871687571768672560436851056527398539068330772185057003214928749e+40",
    "11568825.395546840153532796742169676372354182028505648621549943490228041347743596086736949421395296",
  );
  setDefaultDecimalPlaces(76);
  t(
    "3.1962813767743287991977567539581503706e-3",
    "3.21575181566371222281718415987254024629827286896e-9",
    "993945.2917994031079226492454570039450036638667912252643648075994262366696694877759",
  );
  setDefaultDecimalPlaces(78);
  t(
    "-3.6521521308819298712353620848385654023920939955788685391294075455e+50",
    "1.58648519638718707242813959003552611350673277126447e+39",
    "-230203984203.49393567142475872182838243328467298033209877978242920817365067485260921728795",
  );
  setDefaultDecimalPlaces(95);
  t(
    "-5.80810398547701e-8",
    "-2.756888618383341387964009894229196155644213108200417930089735561046143635945357252089335885749748052469797968208880681181189114661978351e-17",
    "2106760478.73233357952621693387858792587019669410649013364963936025729251046840892312065103063920602380382",
  );
  setDefaultDecimalPlaces(58);
  t(
    "5.394946703081114416685901729004796201459737643847726820712416052481326573890924309797e+9",
    "4.304902842941593620436663335869181724e+11",
    "0.0125320986324390082585449007632661330449191859052335052951",
  );
  setDefaultDecimalPlaces(8);
  t("-1.027e-18", "4.3779781702794909715444596834064553290650050793101397205030822181390650257347505634414400148177028264553006222927914185897533174452183e+29", "0");
  setDefaultDecimalPlaces(64);
  t(
    "-3.350070121893170668359338737818394788783223129012084111126848776806672750674e+3",
    "1.80443931458336840608861642067561357975773866838470014095198706331572881517547021390322700117477076360416036702817640963800772264504719e-17",
    "-185657123230363493830.4380580857704992876008435494700426655603801369310540009364908307",
  );
  setDefaultDecimalPlaces(27);
  t(
    "-5.1394247458274893165755111258789684273185376997386995978002e-10",
    "7.861492336623752524124892494972466099199872210345448807881180773226361196840825788866778171298314287774075267592884640818211538269218779154941e-18",
    "-65374670.937282882272161342892808249",
  );
  setDefaultDecimalPlaces(75);
  t(
    "-1.5437651785664176782476641659251452891516055160701984235763529417910225572595516168935775627672159976399e+46",
    "-2.3703634719550533163012274721e+23",
    "6.5127783010136196398374679125739395723203680617318639409448613021057400061103907966643484299296817e+22",
  );
  setDefaultDecimalPlaces(96);
  t(
    "-1.75960530944257432221258568225178018767525529342683003943375544618358290718e+26",
    "6.77821922065425327816386550299811267090173252835701088658540994348279372671651217542925595832918604616634345728216858078062967243948224086577997222904e+149",
    "0",
  );
  setDefaultDecimalPlaces(10);
  t(
    "2e+0",
    "-4.0070188954396812458861205777855290790196055377549531795151900164482977839278403607474141766297865991193447942536247197753692522196704885016163916e-6",
    "-499124.1749012378",
  );
  setDefaultDecimalPlaces(23);
  t("-1.9248081812176265055920356578045e+26", "-6.78603434514235364827742229600258198384753473600673511828100171585e+31", "0.0000028364256402496132");
  setDefaultDecimalPlaces(32);
  t(
    "-7.2623970559139438540119791131181622866223463795874066544216148444433331986869155320444745345661891006113554096784501e+115",
    "-6.820525082448e+7",
    "1.06478562399881222142839577316845661887163159241541158825101589926341071049768592196806926741604409348156512736341681602823981322606161243272e+108",
  );
  setDefaultDecimalPlaces(59);
  t(
    "7.86089408468188558675574963890932150460061598497154671900176266036325672504398021831962440048624165287966377125130648888708796784870286727810897386e+46",
    "-7.352620709580159115192548843986018309586711652508126095719149651508969740378517616693623095771152e+96",
    "-1.069128192e-50",
  );
  setDefaultDecimalPlaces(46);
  t("-7.8322014248223590715e-2", "4.077039073387161540045344595445825653834154359596657830914959777e+29", "-1.921051352180309e-31");
  setDefaultDecimalPlaces(90);
  t(
    "-1.337434918760533604671116623570302444860406073599092801765217692234989090234812974022531964336225949127583813247668496642013447879331505618583392796293e+150",
    "3.6872764984547981086321671550858948865811379031470588556135807036449147011165900742877127893620805625168883391612055661014976596421267248061035497756e+49",
    "-3.6271619969942676185971500082616900704564515774952028230841947622077690990454103026013332111978599924854407443289282803352593991787899441257673559970000318385668882206433053874350699652983418e+100",
  );
  setDefaultDecimalPlaces(45);
  t(
    "-1.37503241239549773541347475422899149537167617886565129514208027486020325616712371e+0",
    "-1.19709137931592185034738518540816390788017144682620910571078628809694677653517430482330936883e+56",
    "0",
  );
  setDefaultDecimalPlaces(19);
  t(
    "1.0335001214767574616325178474044213574555886220939815514211176604147783703856657109745216964255647522332049708513928e+54",
    "-2.5072821009612529706920046989638848036217658669832854776383511585023390257723513310694196486e+91",
    "0",
  );
  setDefaultDecimalPlaces(43);
  t(
    "1.06793e+5",
    "-2.6665492840932977625278268150144695354608217464127759108837689895679143781553429299339863356004011128530166648797863649631780486115165012e-16",
    "-400491379015755348936.6319824516861438068123248899335612790509166",
  );
  setDefaultDecimalPlaces(12);
  t("7.36507630638211436117e+19", "9.97633276846645741611334e+10", "738254875.545241024531");
  setDefaultDecimalPlaces(92);
  t("4.6091894389633479239411e-6", "2.2969692262769524668e+11", "2.006639612858097617883128255011311952019089738115625000688760499935185496694e-17");
  setDefaultDecimalPlaces(27);
  t(
    "-1.1170265963808901762924971762731981135895286237231975822676440210306461573305512413322414409463433975990150681707321999e-17",
    "5.7935297466165072670017023217832176700891253406720639920439316571299473909297577452305833472e-14",
    "-0.000192805879185007631555585",
  );
  setDefaultDecimalPlaces(86);
  t(
    "1.303455026300789761140268048551615327292642222210962109096712128538325061325e+75",
    "-5.1e+0",
    "-2.5557941692172348257652314677482653476326318082567884492092394677222060025980392156862745098039215686274509803921568627450980392156862745098039215686274509803922e+74",
  );
  setDefaultDecimalPlaces(32);
  t("7.236721191222319e-16", "-2.5685248069096240423834950807621431327388777920545046496120079017924453806922507438846587103601046e+81", "0");
  setDefaultDecimalPlaces(52);
  t(
    "-3.0414874626453800890614364299155493699604771250404869123665707e+1",
    "3.9026570658452450376110473882057872833903409173363869278005899016995435002377630497815425215615978344838245367039932559865477638e+6",
    "-0.000007793376182763957085196006702840921676336594866",
  );
  setDefaultDecimalPlaces(42);
  t(
    "-1.483254348187928290552244592177478417300592994749881765245663455322720390923845e+43",
    "8.4850435992770858912518380977450335417194236394995906707232593072450275499034550288090154839721000212700933194814694034960280604944563159e+55",
    "-1.74808099785639231389540500277e-13",
  );
  setDefaultDecimalPlaces(22);
  t("3.0948748019977962738113761526092009389561e-1", "5.10670111912989778127770803868470613047565862305233707484324759600714e-7", "606041.8908019262869327244277");
  setDefaultDecimalPlaces(59);
  t("-1.271248671566976454e+18", "-2.036558183947248e+13", "62421.42658075439522772208498662407743279795895717701622558160212");
  setDefaultDecimalPlaces(67);
  t(
    "4.9506504831376927999785344316791002570239767078632709848999281276498e-12",
    "-2.00474308987938871184359051131203634553400363592932101876438326e-7",
    "-0.0000246946878536717570691001279204408880863813376749913301879165403",
  );
  setDefaultDecimalPlaces(57);
  t(
    "2.4555684421613957930059498258857655719012012822144834936980240487650866079153554750370690592614075644322618370033543837821e+70",
    "7.59775922587686358055187122260194498466272668044146252e-1",
    "3.2319640161774100429747915103789705320791519614674186174956919083964212828538151487567199962219927254377615046489842054198558089e+70",
  );
  setDefaultDecimalPlaces(25);
  t("-1.15423317564956598022843571858770575823990885396e-6", "1.8891797077086228988416810806964648173461453461502544660205783967153e+67", "0");
  setDefaultDecimalPlaces(65);
  t(
    "2.051950102454183703055492229380223480181773595390154235598308047412089358733890201722367223342854350733868335e+108",
    "-8.61443221852314200304792020516358001248655086924981809325649889065860036651963916806027112694e-5",
    "-2.381991117234619051969473672742671191453327814799212790496329573375335417846080610746144441421292372938797985994104306397925897229038056974699900713605638252146299812565485795003e+112",
  );
  setDefaultDecimalPlaces(12);
  t(
    "2.513158179550391856087623655486358752323177320851477391329833318000842922655162616253792438485974565915046285800756830553777311825e-12",
    "-5.3106722582912499519098298e+24",
    "0",
  );
  setDefaultDecimalPlaces(51);
  t(
    "9.23980211001048535435756457024469710510518575328600104272954e+7",
    "-1.525209302997731232099493229062382024053757745977049075830742043422928294290534288641634381132927201062212595846101487557439998575231448521496437897173e+134",
    "0",
  );
  setDefaultDecimalPlaces(31);
  t(
    "1.0426148889632255259571173549135203580255354605144502419713337630157e-13",
    "-3.47171159204919350224883226385011130334338888714852789034491332999944810204490562815365003239571032430070585282e+72",
    "0",
  );
  setDefaultDecimalPlaces(70);
  t(
    "-1.1189850022353898359495668750669222597899541292603395419450222934316480261062634247987794134916126306105e+26",
    "5.4141529710625510886112445148004636176367165199339050569103385904085039921080422922097314913656014863675700370606529918056952205e+100",
    "0",
  );
  setDefaultDecimalPlaces(26);
  t(
    "-1.07676e-4",
    "-1.5717505088238975514292292778228909600398584416938913091567217267396522931799262606532627463877794123540525008896590436226e-11",
    "6850705.59198172718974793314830155",
  );
  setDefaultDecimalPlaces(26);
  t(
    "1.54661894812151745426122499678375047846685989132972542342627458916067998929602429919e+77",
    "6.88393453488800118317079587337692066843568772248552463554638e+10",
    "2.24670780973177908918960134918630365936128181482684303707120855830858337852594970605926289929e+66",
  );
  setDefaultDecimalPlaces(31);
  t(
    "7.3554434863869445448185651167014730161522774238195977032486035171863991106656767413613670077178130780738981838142900124006829266316745331255864702e+51",
    "1.9847350276697934497765667484031211803746687216434566e+52",
    "0.3706007796427469810533332120174",
  );
  setDefaultDecimalPlaces(23);
  t(
    "-1.7141653851718e+13",
    "-3.18621374283826683191515838401308292184122033024037980628666822939080277807489702269748224871364264724899230463620753855656248e+15",
    "0.00537994473542389573021",
  );
  setDefaultDecimalPlaces(96);
  t(
    "1.19580140355655554922903349077348438332545631457184851735900161175e+57",
    "-4.37663159288048588473455407705336928021106141884700851241274344528734268833074444383038131e-18",
    "-2.73224140113090320737857844736157215668897276013857448309262298803980843681790975488485336529721886958754589063354500266456988032622635826116474744016297681225941692950351e+74",
  );
  setDefaultDecimalPlaces(63);
  t(
    "-9.959369460975435808203292891402820049330845713592668e+9",
    "1.8180191127620055517059015895618330731004556824433074070598892623284497434415813e-6",
    "-5478143431531241.295517947469262960402231050518420523651531599458639138806334118",
  );
  setDefaultDecimalPlaces(72);
  t(
    "-3.991865770524245566863997056e+3",
    "-1.198220018831797397637302374709175305187641902838000441886296026220839855897407732682171631625379105273105517689144026089490558298964894787942e-9",
    "3331496476261.603791426352314195321227090043500719434084823720886412843203900950593349",
  );
  setDefaultDecimalPlaces(96);
  t(
    "-9.8275834204802767376546144887172111329819703606710281925048938349214262492567963305945262745458e+94",
    "-6.74311205549895305801239790667724892122828998796066057805651969251678685193281080085113165675424386701681365258255100267530318139148596254824971358e+25",
    "1.457425494281377447828529474645336735849806061521171937839727907446388260440219435733918278231039678520940847437940227721210241187167083267715744512449976301154664823e+69",
  );
  setDefaultDecimalPlaces(70);
  t("-3.2413288e+3", "7.8365723927319811447380367946e-1", "-4136.156265213814871905465691704582208041753914801279782106293377323761296");
  setDefaultDecimalPlaces(87);
  t(
    "6.498877639669776080768692496405897537860361399115270300688459827326406431586420401029055572295435526359071612321468001597473185198505436858803512268e+53",
    "7.648713301896143134743802e+24",
    "8.4966939969611376095545624690292981537584524155815602526574062802910945118304645467944342900695655286525579733619678e+28",
  );
  setDefaultDecimalPlaces(20);
  t(
    "5.5299272772158475547978370135981350254496571345540518388589521247877e+46",
    "1.32560748106365008167804118932808796748346189599392262e+22",
    "4.17161743292117386931287526775931731634785672e+24",
  );
  setDefaultDecimalPlaces(0);
  t("4.1805837494666547463429234462724250828081696153e+26", "-2.1e+0", "-1.99075416641269273635377307e+26");
  setDefaultDecimalPlaces(0);
  t("1.273547490139198650171124420039149848e-14", "-1.77723340956590083324091216156265902901383604327788772849325116e+62", "0");
  setDefaultDecimalPlaces(84);
  t(
    "-2.6099199466455089099449727958025671997494063418421061888052894613213022e+43",
    "-3.547746098928826870964203251777527647928355283474077e+47",
    "0.000073565578648188031850533456251182681188162837682913969059432733913222087576982509",
  );
  setDefaultDecimalPlaces(28);
  t("-5.518967406042486e+9", "-3.907687e-10", "14123360970421853132.0446084857871165218708663207");
  setDefaultDecimalPlaces(9);
  t(
    "-3.5695790410350590566294537990564750059742099870503332527108437823421174742007686061140623058402172660566871158693280335627915633282505638055333e+33",
    "-3.7483793720471082766883070318802631908762891064986789920663826532800481e+71",
    "0",
  );
  setDefaultDecimalPlaces(69);
  t(
    "-1.08964816529800774424003111967120729273637848447454509509675559170368797436535381934389250438828118336447492728189798e+27",
    "-1.0382414123565924741240568349157709477017617201141566892677241198347722292820767528854231670350738676119397e-13",
    "1.0495132946245446062825459324487186691747433204936199870676375916038706497210902766276905731430712434518172254e+40",
  );
  setDefaultDecimalPlaces(74);
  t(
    "-1.06889225167160858201741613713297408648376883301716285108249384425843927746209610601419333032129265917366185336506149760724e+41",
    "-2.76108223181363839697e-1",
    "3.8712800341679732243192885946976755120036363686264169881019919987998041054553881136578095947940618324550337548482961e+41",
  );
  setDefaultDecimalPlaces(82);
  t(
    "3.722742677423599788578874077621442990126109931525292202733021008343014562419417083137948478736658919567451491480571e+114",
    "4.85470405312889662883924782367819208954582850667582205025201203300249104899519597090687204476790534126303552382215877618670304e+3",
    "7.668320533409779246985014427227070364376970489922441333460622769287431018803377252531267763094656653550767928590637098610212510644365397576434907795295841675850703842160538705844878141240231735e+110",
  );
  setDefaultDecimalPlaces(20);
  t("2.236267046975770724052144917431426270205e+16", "2.0002217370083168049177512700212977123450361185151954250141412509264408902618e+76", "0");
  setDefaultDecimalPlaces(31);
  t("-2.61611648652116526868e-8", "5.796714520265096104588215088015541702103e+34", "0");
  setDefaultDecimalPlaces(38);
  t(
    "-2.8116859794193167321805847303402432887354287436324452e+24",
    "8.2556396485062162679002437092119354247440198021231396514190354743987409385764992942424418177280824345905353356023764638532588204348611397917987e-9",
    "-3.4057760502277567530228905790415300870219453059562078021389888130476553e+32",
  );
  setDefaultDecimalPlaces(11);
  t(
    "9.419154132638595406953432868428378827004082483372631e+38",
    "4.6406322017207891603798202630166123559791944851594392408919243126375835927682319127290503745763292862416787274160783922277744891e-13",
    "2.02971356556675323346036522945578035015135472817589755630100617e+51",
  );
  setDefaultDecimalPlaces(10);
  t(
    "-1.0265659880416824743520469738757614368263048419264166012662129690642e+68",
    "1.1104973663537964013239442391621680942027788458679311323419461258320347061522458010778030914700194484687048577912e+103",
    "0",
  );
  setDefaultDecimalPlaces(99);
  t(
    "7.784827290218422886922778660436304629703236831889111214996531e+31",
    "-1.029144827008557371407580329635260677844527402062344092698133621045945746932842874360720554781176741211527547537269837e-13",
    "-7.56436517574187039532327049574651229853700962098179357890786465158786429971786398617466746329783225829403037017158069696919942671165743463809338e+44",
  );
  setDefaultDecimalPlaces(35);
  t("-4.7913451501e-7", "-7.01547785790736989342259031554588742799791025206500033626483960176669673783264579333e+83", "0");
  setDefaultDecimalPlaces(91);
  t(
    "3.747182105942817511900021361937840913511620772555084244949979127482088619797704042211287399992197481992986e-5",
    "-8.644580984623432300987650928754822101572758327573658719715118505461255857866499951329091e+87",
    "0",
  );
  setDefaultDecimalPlaces(39);
  t(
    "-1.17813409501907731559181628952182186802958092561419873e+0",
    "1.067302589374921927294445733570786040488324943048331297666478994712746311809633e+0",
    "-1.103842627899052636993217076387559169704",
  );
  setDefaultDecimalPlaces(50);
  t(
    "-3.7409679866954173590990350551843564871671987627050069704832234011e+13",
    "-1.484513086308637041432943885363571112676077536590028462000061439524659712517417662715407600109281253362600602928e+94",
    "0",
  );
  setDefaultDecimalPlaces(87);
  t(
    "1.7252279918789199705433412501623546543711416706293997901531782358003011e-2",
    "-4.74557783019408656482047025177265061457092243665838023234981732669774251125913141401433372222351941653884348017804136e+116",
    "0",
  );
  setDefaultDecimalPlaces(60);
  t(
    "1.525521970400671825390967042e+24",
    "6.381293378067568768098656572689344648763786586120590859084941636816885235901154775228105263826095759664960855048683514253295681497295962e+65",
    "2.390615632316597637e-42",
  );
  setDefaultDecimalPlaces(69);
  t(
    "-7.1688448674757629565171223276674277212404323138347230264434234201062426065238666389236620098651800607630986873147e+112",
    "-4.7076805515e+10",
    "1.5227976471750120100554835464747501615266369489630658144378179395476432013218063058550038088465187697354104735742072154064678787285807194175757998009521483564919836086291e+102",
  );
  setDefaultDecimalPlaces(33);
  t("3.230240664773e+2", "-2e-18", "-161512033238650000000");
  setDefaultDecimalPlaces(79);
  t(
    "2.1790231744442782274019561590796009302030721095464597449066272e+54",
    "3.8438748655726343412479040513685673054959390226293860377e-9",
    "5.668819227078720657122090206053825075723064891355943495705384486896532066995727020232244087569073514703703455282716388179041368634044058697911e+62",
  );
  setDefaultDecimalPlaces(83);
  t(
    "-7.7506375703319090957936909319980691429404988726728132849425160608666334488005828053815908471016401412330577989227474e+79",
    "3.951970167488406787485318748940462191768649920137140686951551450703711036114749624958406545764650790283109239836372e+79",
    "-1.96120852178842916403983408005482147967662624523027482196743558513466365179247795975",
  );
  setDefaultDecimalPlaces(63);
  t(
    "4.383935509759313827342752484017636965099596272385938782232441834922277405473233435253057174180788394787303439934431570649633751739454251940730807613e+111",
    "-1.57221644910971154736955736494905987801519119230829547065738604132849556542767623451911579586453320582071769843653486e+5",
    "-2.7883791142382307183625709715661954905490469880210465135425958098546099705661225176750783342140843714657294946351448567617734940151609575576140603493776342925880668622541e+106",
  );
  setDefaultDecimalPlaces(46);
  t(
    "-3.528850287958818311190307649975649728435592498446487642069172366050091941007678478e+3",
    "9.89970777362836993309789508895279418893411267227e+13",
    "-3.56460045958048456422813252741790087e-11",
  );
  setDefaultDecimalPlaces(95);
  t(
    "1.7961574442053354635051999256610110103399926085455187913572809535794e+67",
    "6.53371597222479e+12",
    "2.74905957320597674942687694522672808264558731873771851498440951678556598644900088134809559669083233770233864687007721301817178888621042793873513023649e+54",
  );
  setDefaultDecimalPlaces(11);
  t(
    "-4.51558394152259268423722153529926263091657225962592947266499102642632987697604182252757890571880695147871502705e+110",
    "1.0974972290774594879957884492751110348390532103083684e-15",
    "-4.1144376695313646654908656642436718090613366742695313208600350147403433207378876321392994614423499992588745230594560453909295519131664793e+125",
  );
  setDefaultDecimalPlaces(10);
  t("-1.6136591525e+10", "2.729080822718639456949373145796450779121220293547206170682527550592963020365012303290503351454751e+96", "0");
  setDefaultDecimalPlaces(40);
  t(
    "4.40419416356487306005361457897985625217314247216081870421124416127885560864053935919375957621729170205716984363760323146983e+34",
    "-2.17461476981806911586587826709419192593173100342634795427447456473525797944550935252167121952923948682267047082342219528944e+26",
    "-202527556.8202515811474937255394703973327229270224",
  );
  setDefaultDecimalPlaces(50);
  t("3.314173050869895537188853103794371e-14", "-7.17310701025085378313679395809763098663e+9", "-4.62027549029133217768833269e-24");
  setDefaultDecimalPlaces(96);
  t(
    "-3.76740194500230675518e+20",
    "4.4110423098471244552162339151160687225005358275970607012576915904410506309125354920625912407675e+18",
    "-85.408429127783073939736368807602454833270511406218146537716246395371754194443016934887949833986592",
  );
  setDefaultDecimalPlaces(79);
  t("-8.685767e+2", "-3.01002065867262004275990378982057909529888423628699e+22", "2.88561707208691061467930756163413406432890800202889947352127e-20");
  setDefaultDecimalPlaces(93);
  t("-1.5665e-13", "2.032646086041171964651715840619034276455864184250000521155416302806671027668702e+78", "-7.7e-92");
  setDefaultDecimalPlaces(92);
  t(
    "-9.30103261646381655219990613363378874289e+34",
    "1.62396424936336368747948844001247365460819477920046711722e+29",
    "-572736.29146146928780155928394403393355050791704526421472953812461593117040661862693214202947164549",
  );
  setDefaultDecimalPlaces(14);
  t(
    "2.19223873755226811473827086752597474868348889543553336973584895382022954256750008880519584414913449e+50",
    "-2.3827e+1",
    "-9.20064942104447943399618444422703130349388884641597083030112458e+48",
  );
  setDefaultDecimalPlaces(53);
  t("3.765e+0", "1.19608971924131918611433472873552004526e+33", "3.14775717860708892154e-33");
  setDefaultDecimalPlaces(87);
  t(
    "-4.31460713519047953606639547990982626812e+35",
    "-8.298758443316980857226072633622074e+33",
    "51.990995576754589392581375039303401846055446445547962996514726126104434581727307755918426",
  );
  setDefaultDecimalPlaces(11);
  t(
    "-1.89394031655058414269306269871765623197076427315119836830693355133040936723359725267028900451350459e+99",
    "-3.7653603810936466226630789701382013479682582369814357412597482962896953072381057276686047516223182398765705959494953858218849e+118",
    "0",
  );
  setDefaultDecimalPlaces(82);
  t(
    "6e+0",
    "3.884785190430986533007666016786013183419686625074570906862061221313797640802900227621468118008014834339559414298132199633484517747927184404512668e-3",
    "1544.4869422327948401933329060338215565348909863079504563590284093953270036469109056422",
  );
  setDefaultDecimalPlaces(77);
  t(
    "1.22877390755111349262196171621164925227202663129849512244281681840515958656825545157982765e+42",
    "-5.44827890797914888312971982e+24",
    "-225534325298864845.70496370318988820091785517649722111195446678070543897326895523593828641994678",
  );
  setDefaultDecimalPlaces(4);
  t("2.0773251723547285824323617583111488941507394933566534460068e+58", "7.66942668306458064220375070801913802279077324113751567675761137117379223e+61", "0.0003");
  setDefaultDecimalPlaces(60);
  t(
    "4.8770740774745673090394636663520339172105837219371414641479177454507676542737757746735012988895627792971713142249805e+116",
    "3.520904646950914259986814385960349867801544060826961143615756706708319899197421610988380483076351382194314e+24",
    "1.38517641529942850464057109629199627971699542613933018527990200144008452612980959337628050852478982158717651242931755747003042616031216819106535917409167e+92",
  );
  setDefaultDecimalPlaces(67);
  t(
    "6.9157846791683709276506467506537234833967936264760610102259988155308349000732910414241941969511479731520478372001267405607e+85",
    "1.776994176422388278370959928255037717656782112856405748903515600756559392389e+35",
    "3.891844312676296305841969228604380808558883812923726808829932846496821674467475937656477278081257890051261588522375599e+50",
  );
  setDefaultDecimalPlaces(46);
  t(
    "-4.630784189889459871365226183825109809723e+34",
    "-6.11981392072200057807571634704384226805682504306517237693566033172122750428100343753756865211328369240005006938323248370672981e-13",
    "7.56687090470085952323104662664730090548753102422199117571377172056171425875027106818025045569e+46",
  );
  setDefaultDecimalPlaces(9);
  t("-6.03415744556919882382453447796407303911484754463434369392727559597570463078023509794e+16", "-1.1e+0", "54855976777901807.48931395");
  setDefaultDecimalPlaces(69);
  t(
    "-3.117852624937990762499622278353586927126949e+42",
    "-2.2449798339812233421381409392e+28",
    "138881097181564.615825061377958827334873991290070136915349458629662587600693502688924",
  );
  setDefaultDecimalPlaces(74);
  t(
    "-2.7318412277631789217109204633e+26",
    "-1.55863465228559274906893307693142232346023997517181883442655022544567185607527743138531502895456559460824001338375198377493617362388e-6",
    "1.7527142898800484446894451303042518827486243298852541045016505393607942545769743455722894285924315679505009e+32",
  );
  setDefaultDecimalPlaces(18);
  t("1.11315909e+2", "-8.0399878058102848215546630462722152969915379173099212759511261701881324319681e+8", "-1.38452833124e-7");
  setDefaultDecimalPlaces(95);
  t(
    "-4.03950144059356469019593382702606168834554078876000621435394831849856120052585657106802068116603871657542460045699861047557874066564785795571183e+99",
    "-2.247037066699847780014687004611032256493024027671369512398254261426275039727493511826539064851482783157126426512e+73",
    "1.7977012931639141154450527030332577456526675677948894819120546039784639042125234442187197141544459237097220490736127521431e+26",
  );
  setDefaultDecimalPlaces(55);
  t(
    "-5.212589581269704522107891080785061389692859697300114206132324191786637424691158371764964311738342870617062874884883096e+88",
    "-2.67793781613566925371832913779241605812748071752407019766310412368596665490385668195764127310977335627229e-4",
    "1.94649388416031283583642766429858471307272805196179939562992262849244953869013105207897994168529945563848461683075068188845554875303697200047981517e+92",
  );
  setDefaultDecimalPlaces(7);
  t(
    "3.749078460278331464125757529046174212063661835542332956119445270556947615840652614520454661325346e+72",
    "-9.059817823177074546284660629498421440211600368266392038249751883750914484230437574640569091515190716920426252005287748745e+120",
    "0",
  );
  setDefaultDecimalPlaces(41);
  t(
    "-5.3207251199046755530487995267127662582068124785097273613367596316942762750245838412419852019312958665394828147e-16",
    "7.832712702238725327106452895406768006776e+6",
    "-6.792953248986037627e-23",
  );
  setDefaultDecimalPlaces(9);
  t(
    "-8.11497302234605708337758846395368604410057587785774688670586106955825642623813224391913786762286613895364848719e+56",
    "1.5510113814727e-8",
    "-5.232052529905237266915569337065165235218781590081593881659783669696796819e+64",
  );
  setDefaultDecimalPlaces(17);
  t(
    "-3.597562758250930268516422920620480195554188913243320843966796887701723037147186378417587770344288173553e+49",
    "6.67021755758224048473227367105818443649634137435528041594431128080708788637504333146715451430992709082792808e+36",
    "-5393471393090.42559417400550849",
  );
  setDefaultDecimalPlaces(43);
  t("-5.0791008132352283358615614182558e+31", "3.67216115201463446193e+20", "-138313668790.0723937144491632097691562393845281545330463");
  setDefaultDecimalPlaces(23);
  t(
    "-3.78232694438388534499683269572204620134455868283365792903580150302902004017195935174575984028533955167363467509448634310865798291500019766436e+85",
    "5.11700416271712796965619473739271320119e+4",
    "-7.3916823674723583860628839281700774479714427338320635710924978749065882398718945153193870537294073276733e+80",
  );
  setDefaultDecimalPlaces(75);
  t("-9.3701616e-16", "-1.365296666123324573e+6", "6.86309564250676318609694223076823587789002910258035598e-22");
  setDefaultDecimalPlaces(68);
  t(
    "-4.684345983538014488336324917885952859313676031830330176220895807690009284220178153787372589270246856680948927700076591529318072e+122",
    "-1.20542082073396437878476083152e-9",
    "3.8860669261426725572684344400411657518060971316189435818663850702306492747905431076168591595522136230903946537811460133725116092997383078465438379384578185348711017958858386072485902029338320039219614e+131",
  );
  setDefaultDecimalPlaces(7);
  t("1.7274643591674087999851408e+2", "-4.1486738768627052667372552452794044e+32", "0");
  setDefaultDecimalPlaces(15);
  t(
    "5.787395434104878213785521493097060765272489955786119474249636677147275735984279558545960976031910535647194922479936301501350659928307932947e-19",
    "-1.08563612442290657385591257373636428e+13",
    "0",
  );
  setDefaultDecimalPlaces(84);
  t(
    "-1.33803578791701769731546720876192938584092127774685346838883302992233619069e-2",
    "-1.1077147392710335466399762768584862656231759671100010102486202e+29",
    "1.2079245138487135651028664615202893803661090857774422e-31",
  );
  setDefaultDecimalPlaces(71);
  t(
    "2.5778050801984909502133409798929745882941248621746745513023095e-3",
    "-5.14577750957372317309958270670721556751559131043066486186454282023774810566955668151390359473511210537675e+27",
    "-5.0095540963488657181586911646331303631469e-31",
  );
  setDefaultDecimalPlaces(71);
  t(
    "-5.895917207274182396678536186475896459700206436e+19",
    "-2.641168258325824398347732688193195919335005360633048481480224683221006569088113384803438506879896971865832107803055130821892857626521052330109546e+54",
    "2.232314124133639345842671142608803938e-35",
  );
  setDefaultDecimalPlaces(36);
  t(
    "1.498669372140204142e+18",
    "4.892915173405182179800161352616364004062912813134321977520826195259295140262603830024314248062205212521979849753258711367e-6",
    "3.06293757203482867287613906561659850141354208798294814789836e+23",
  );
  setDefaultDecimalPlaces(92);
  t(
    "4.9862012101977733308951816940386597160951399245594470341968108084423210484320189485103503845021942595448987217785355101896058e+102",
    "-1.7807294898492762918669819703602996271e+2",
    "-2.800089086310247572238867442803520778454732848406811434623775008607644689924873669125116449069662342794771756134607604015001377031687153064167111476548660234629660532839490285947915812206515586e+100",
  );
  setDefaultDecimalPlaces(56);
  t(
    "-1.30036820540386786208942928743681095500715624671359605360290749294583871746696374363870919451687429160267452e+107",
    "5.230601929155826207539705624086178195664028697973223357868152574e-20",
    "-2.4860775547752990904164202631278703213698910814316380939814180976159723442768173517780219921279859765458032742584273256358997185813193520249795777522280293659531390268619963379492469e+126",
  );
  setDefaultDecimalPlaces(73);
  t(
    "-6.868630080137329854496270653e+0",
    "1.71812508191396626438552230341198127197890769657326313972309573427129703921512078551946402e+17",
    "-3.99774740060588382552549379274534646908534533181981622246e-17",
  );
  setDefaultDecimalPlaces(66);
  t(
    "-3.5494832293644379256078342271322031054371395777320085487502314927625849519628051743e+76",
    "1.376812052418877138454235421040533729557573018966599269528021878023476615663888887568e-10",
    "-2.57804485596161375956343816712591083394870000020150410083020975492385813126149998952448618191991959771953838833662151001586247895303684610849902738549309e+86",
  );
  setDefaultDecimalPlaces(2);
  t("-8.22758096255389734930681e+12", "4.428258601410287e+2", "-18579721066.73");
  setDefaultDecimalPlaces(46);
  t(
    "-2.226748222530861099216886126409016747183230318345849892277838315265531796710703817956100525199459894789263463796250342175242635930043552689588e+141",
    "-4.6436767625179481965185476118743761764912085643e-4",
    "4.7952265767168683983565672619999001306023459372880083025138567925020570897867202362336608693657128329429601169732102704758992706342506524190469106795433973503220503101725360896901706105801358e+144",
  );
  setDefaultDecimalPlaces(23);
  t("6.843804126083252762529607286833653833611679123733416001748793274628e+19", "6.38110787250397888966016848781082097331276183948495924288988284650619858233153e+50", "0");
  setDefaultDecimalPlaces(93);
  t(
    "-1.28155149753174442478182283410078869422462772119109279366159412649275823554600142693076754621127222661194112394316702737892559257168474931e-4",
    "5.011181856253837606822223642384e+4",
    "-2.557383735600012533380198049612753799572902336216482225252827674809020704790237895993e-9",
  );
  setDefaultDecimalPlaces(6);
  t(
    "2.38238010584356153219439800533775106134229481230565851606295886355708929557593164686604297436923395716934638e+107",
    "-1.772917752515042647e-8",
    "-1.3437623389262936435501879893548427631500013167582563524505230701116060329295430791336799375629992424353053242580006720701e+115",
  );
  setDefaultDecimalPlaces(38);
  t(
    "3.617083438174420081043214862012625732983371691507566512292049133717937008121391634315378418856177083e+67",
    "-1.41101468260748431744457210694167e+30",
    "-2.563462650502141778924641667765020316568138443730546831607797740654968858785e+37",
  );
  setDefaultDecimalPlaces(33);
  t(
    "-6.591324030854000325249985412526888189057149178248658938785766804829163746400089687532506028603643170436161149e+54",
    "1.4570654128271693805181436409781295957003309151997012118680051889052646340391822272168659422573907937721138924e+109",
    "0",
  );
  setDefaultDecimalPlaces(53);
  t("-1.944e+3", "5.35350414576746089041535277413649666615328826417264312807265351195165302598e+29", "-3.63126645103459521392667037e-27");
  setDefaultDecimalPlaces(93);
  t(
    "-9.779353487965600965022151974091662777650103415786084784354343642033914244931977102363920388011318145987226215e+108",
    "-8.8475874280440405958811710687211484898913099982310550531358633561988655e+70",
    "1.1053130096197928547265987781810357775703913700529590039215481926120836757196267807072594062409361908085434576195537223417684784317e+38",
  );
  setDefaultDecimalPlaces(58);
  t(
    "-1.340559558847324141696903700704418494822105307525931471567208073888797858434114917180468950429157065731063107605590466041762966992064790269695628e+84",
    "-7.3122823959115623747469481501856107944507715753126765e-5",
    "1.83329839612985509941771539508705255453554391648297490778548774173793432173099986480946055325347246609462110902439541323059051596929527366015806369e+88",
  );
  setDefaultDecimalPlaces(5);
  t("-1.96029927929314581673384683319732638983609512423806642432186240219437696543e-5", "-1.48972789203354618228199725187216171144783968e+3", "0");
  setDefaultDecimalPlaces(43);
  t("7.0384911114696e-10", "-2.014929505080269773888375293933360861889250463074806405230734954573831e+26", "-3.4931699e-36");
  setDefaultDecimalPlaces(91);
  t(
    "-3.191070547946329144357009470064053366954531232901328253497685297580764712464325954e+71",
    "-1.289202833041817729295056462289849943493934132618364109799489898660484780279936054567173346003524071035713216220847031496786017943e+130",
    "2.47522768811881810606572588076688e-59",
  );
  setDefaultDecimalPlaces(55);
  t("-1.82e+1", "4.53072728575097258846782679752281555989302809798730088521e+50", "-4.01702e-50");
  setDefaultDecimalPlaces(78);
  t(
    "3.92976597175207612526508472546745734779223104956615493395132655554384285523372977423618823120416511260641622941569634141e+84",
    "9.90480627956957545986556799814418473e+3",
    "3.96753440787420280829840086172644222799227148871026299728529802094980005482275031972470717869439865069794435759009978043423419098507596879687848017664163223689e+80",
  );
  setDefaultDecimalPlaces(12);
  t(
    "-1.38307536038116825879520104105261259174773253003882113072399822534235811938900241375544208890448194096861901582900006e+0",
    "5.4568890184440949527572997265619174431227370405e+46",
    "0",
  );
  setDefaultDecimalPlaces(26);
  t(
    "2.5616421418637126167395265354389802403236993277125549747128855823908161871387273653525144287182343000393167344061009090259410425029e+97",
    "-7.448957857876439075720665916942995602028589046131e+13",
    "-3.4389268817718747189932144249084399000089991130134832277493574521331814450849926550885594140296819287479539062e+83",
  );
  setDefaultDecimalPlaces(90);
  t(
    "3.31290621311765027736063952693384254456442206498154949424081716607983687065927046181479239375821970193614486996122570779182910349e+83",
    "3.643550393048200328607964826836374856667616041046329147351894909740420518730636642314247547016211312987696550847501602733956445543555134654285978195e-16",
    "9.09252200666303237404135042963523945458067014840126056415761567418205600649698540209620099344669810164899637500923267855985337711349668238799760372189920897821648198348161347719539513129363e+98",
  );
  setDefaultDecimalPlaces(88);
  t(
    "-3.9260608206228521895916047288741470906623090630880968907508e+43",
    "6.14477020504233309172086565875905151255795959689036468990279522502983076e+57",
    "-6.3892719981638506624005182627968614026700411049788902599588717530303132051e-15",
  );
  setDefaultDecimalPlaces(16);
  t("7.094057755396e-15", "-2.243154344795630387341427030926405189717759685261451417783630255108058314008554881593006657439238028336011199607e+98", "0");
  setDefaultDecimalPlaces(17);
  t(
    "-6.8611802812630452571025846499106309984624722444464970493384880192709459545517698839460326209e+5",
    "1.3470726562627772757960616739712270465154434480664449e+11",
    "-0.00000509340030722",
  );
  setDefaultDecimalPlaces(15);
  t(
    "5.628473957470641391697848615512733681267895756509693700350302249623901713941896652796167943718e+80",
    "2.24140764199574866757115360375836416e+18",
    "2.5111335626834259964774623754760078575822146918655137826370696611030483187225e+62",
  );
  setDefaultDecimalPlaces(19);
  t(
    "-1.18565934350501141458601673128800093780009725956687913362352023426324610713449841909891607114120181957e+101",
    "-4.711452522525939475582965681539e+9",
    "2.51654736588398598829549025879174295063644965204202946534389548550289325719491959842774900052589623482273828619e+91",
  );
  setDefaultDecimalPlaces(73);
  t(
    "3.97977258148442420401985e+0",
    "-2.779724182605153110590411733248915529686125201321067998265276436775659304473793933042322074972768294777924747313212222019e+3",
    "-0.0014317149184760437744845917820053485561502807662999893467175129737380444",
  );
  setDefaultDecimalPlaces(53);
  t(
    "-9.9394668375794407390786129510317578036578827283398538332342108332411383653710744755914311349900430541334419555875306449128523093022738641168247298e+54",
    "-3.205452110587681123128758869100117896121700266597088097008922046538523e-7",
    "3.10080029108816070922798476457112045281503221179564192597920016396342317849409665752867298139825160137633936327746e+61",
  );
  setDefaultDecimalPlaces(82);
  t("1.2902265409751605e+2", "-6.11131782695e+11", "-2.111208380106585057011358943490694670292842345002562099156576577924038122e-10");
  setDefaultDecimalPlaces(74);
  t(
    "-1.132443092447921241583793364739645989092072584351798971589560884878890694189809713546221924702103793647288688837698038e+117",
    "-8.652870136614973657269130020331276106304839125234201775e+16",
    "1.308748513000261044984742107389841439471289110995958510147697179437172285827052832353079947180001588837267924223832994374457642705972868193644552328620082674880785972047487383e+100",
  );
  setDefaultDecimalPlaces(36);
  t(
    "-6.231805788202309413191416613727246158517706866468715028285290478323647836827380435367241411109058815597397122712004940352006379181434027e+82",
    "-2.22964547256769408162821114981529813242115694350088747336308037276237273231815345408473402196463040467279e+96",
    "2.7949760914346915632835e-14",
  );
  setDefaultDecimalPlaces(30);
  t("8.57327231010614080008113060317818877678767755972674768e+9", "2.045603695860929068955821736884205963767282e+42", "0");
  setDefaultDecimalPlaces(76);
  t(
    "-7.75189453850295567266335745306136667835645420227640892142767512764466061406822423584512882585463295632e+80",
    "7.766788535298320787956286380281904384648988002821395765990538651008012338213e-17",
    "-9.9808234809951690800515004093105684436118998871814384363456973169843828757611100607612914285550419864119855263384516335892170974572868809850984644391684710894203664576299849e+96",
  );
  setDefaultDecimalPlaces(76);
  t(
    "5.3004629352667697575332548215604396474336774471767884018417683619722297202871953671e+82",
    "1.91027130197360899949724178120056077014378656931637615532223427229923019417383496379958684227685148181554542240427268814947293267798751455737417311e-18",
    "2.77471735548273306189091856289175001642185632166760317187126145131527244489506117633423817048492513619315772695608512522398206596402464046772985863674996175553823275309344316193e+100",
  );
  setDefaultDecimalPlaces(43);
  t(
    "6.01817650929104629156890659511645162209551593031861649e+54",
    "6.1378931799256232565251730612833040996520621111479484296796701655120032960918514608916860901224131490420425698715173734065634109626927831309734922684e-11",
    "9.80495478313940346586105018527739850554224594838009517532948363363251219278683699292516105851087975693136019e+64",
  );
  setDefaultDecimalPlaces(0);
  t("-5.44857392041645376601578750881467249248853526605e+3", "-1.611156211371e+6", "0");
  setDefaultDecimalPlaces(27);
  t(
    "-3.24750177236482836372708896016800828731534932602183038137973331582818622493996908570802874504798150270523082579571836411026809e+110",
    "-2.4304994282346429995864960065924223490852647429284603779282812578243389612739295075e+82",
    "1.3361458697085984621649357343974605029955361230370778285e+28",
  );
  setDefaultDecimalPlaces(84);
  t("2.223400703881009e+0", "4.9571681065003760627333068279547012172141800400153193429888541985978065894905621917447e+85", "0");
  setDefaultDecimalPlaces(23);
  t(
    "-6.602340137146585061836760527848736152911805274401855749697811111131864764392842889485041227309344032e+11",
    "-1.06892845056640191222801824918478913022208464811469679575859058338172e+24",
    "6.1765968841e-13",
  );
  setDefaultDecimalPlaces(51);
  t(
    "-1.97404642333030077601806733034489171e+20",
    "3.793431853696425387937362318440711131938150082405907333237823126012987751761850213018605429982718414496685147034441986e+113",
    "0",
  );
  setDefaultDecimalPlaces(21);
  t("-3.601896439117554092269189650700717136197830561666279296724942692360074903561306202891153772538785042e-4", "-3.8054305302699900505365256561384562612750106e+22", "0");
  setDefaultDecimalPlaces(89);
  t("-1.1501e+0", "2.934351094603783007518886862582894947903278369225444e-7", "-3919435.55123656631359394507634414028618217041804507543155926883339420005595427174871748493195246");
  setDefaultDecimalPlaces(33);
  t(
    "2.39496092912385857486274409002575873785135354395542705e+52",
    "1.063779584787522355987485440388737078357328169087484702100103310514852281625080236109397273730235823379118172928061656328432924358310361890778e+6",
    "2.2513695161786962338274128909874492357940342805811570250039456845256220515490659e+46",
  );
  setDefaultDecimalPlaces(59);
  t(
    "3.151532497064806654653934377509360246475492285920665002345115135736224990067872555377509913720594731857980683737704752569072e+123",
    "3.97959549975278e+5",
    "7.91922821618575509650284461072765704690816296137215103162157423672826433829334842284548284726470506564815123137680286177620142637318604783525839617263427418736367685223285838759e+117",
  );
  setDefaultDecimalPlaces(42);
  t("-1.1942e+5", "-9.43683096080946039731070327857738011385552117127646681395727113594574148678432906859218e-13", "126546719439972403.85068356037255647176657870374969318952467");
  setDefaultDecimalPlaces(55);
  t(
    "1.59136833715074275690142343593488499440729342422334291344005150692874718573517062378454218727446624020006386910888695743e-13",
    "-5.84029861531386828720137296788301019805147e+16",
    "-2.7248064559199251207704564e-30",
  );
  setDefaultDecimalPlaces(34);
  t(
    "-8.18559945866118057998274279484328981696779778234825665962018888529713652706977439701725829046390529781229528078941385589940100815473061e-20",
    "1.27854458608563110309812727773504442897784094072837122935258682154745887649444738718860696618444433103633881822236379597045e-13",
    "-6.40227923824077445701995039e-7",
  );
  setDefaultDecimalPlaces(52);
  t(
    "-1.546967962126570818404715108662986077911822873678049118859436078835429146153280959e+9",
    "2.179e-18",
    "-7.099439936331210731549862820848949416759168764011239645981808530681180110845713e+26",
  );
  setDefaultDecimalPlaces(94);
  t(
    "1.85951712678106971563664119657481301632671934388907561166851111595198472770782915530863241331064020082686e+64",
    "-4.0165728807227291e+13",
    "-4.629611317911587934443842616971678798010907073523648214557912131472590270643869086751171861599808851168971092794565593486397070860223102122462852e+50",
  );
  setDefaultDecimalPlaces(84);
  t(
    "1.19902837918931229180637785e+18",
    "4.823145054299342188896642745287477470717799697061759276246534464497191826977311425342514031364217134006991535639506400781627953539498608e+130",
    "0",
  );
  setDefaultDecimalPlaces(69);
  t(
    "1.03943021983575795184370263979181046982370399769901639449859593570155975586075890296784946714e+40",
    "3.459738145258019116e+9",
    "3.004360955063666230343158965704299116908612863082972714765111711221654691799494671306442646127717594e+30",
  );
  setDefaultDecimalPlaces(78);
  t(
    "-5.845757981840137265358304492738596201862665995639372986177370740085332507405985258262859810963423321013e-5",
    "7.761754496483662049382390678564072335952793825961300912011e+28",
    "-7.53149044393051059863974893959055595631205181e-34",
  );
  setDefaultDecimalPlaces(2);
  t("-1.2171251476119e-5", "3.9651615791180068734600378734446045636230070225583282438183363035469175627893e+76", "0");
  setDefaultDecimalPlaces(13);
  t(
    "-9.80830827101068353185229682844756492449127373213265846187e+56",
    "1.5463614951914768624376e-1",
    "-6.3428301218766303548839074240058172900554139049760537105883963604096056e+57",
  );
  setDefaultDecimalPlaces(89);
  t(
    "-1.9335822816530134841270379507239370848597661e+31",
    "6.14994676509018404461233988187415213568502562587104004019653853088612890424408167105554481779226960769241183669773593419532161e-8",
    "-3.1440634456039214972339697001384257687004923526784146841434871442107834023754862195306688515542640807703531590082579955798577674e+38",
  );
  setDefaultDecimalPlaces(3);
  t(
    "5.587878712852264104143123729027037154071163059691477526e+54",
    "3.029758812489704339717036315343510493250858232234740883604828272851408587885742919351238303046709216269719185151512679920890187e+111",
    "0",
  );
  setDefaultDecimalPlaces(37);
  t(
    "1.1166162044204225806656122970681713317784702e+37",
    "-1.22188939298471832227617289930033032631400475341239652602026677967073530418680032872831426193172378296647066597312806032183987122204727706621640303594e-17",
    "-9.138439295989433710450575056750404906549590620748873819692877064951758904714704320330069606e+53",
  );
  setDefaultDecimalPlaces(89);
  t(
    "7.54079422777360848387368334296601767842780578054143e+20",
    "1.24994048740754292819012561544410841791433485678e+39",
    "6.0329226101105832391560900944867696730266779113909943895779189307841751e-19",
  );
  setDefaultDecimalPlaces(61);
  t("-5.2838e-6", "-9.25252395870248611804628355593997125626564285920467247900948136051728364045216351259546347126790508960814200335156e+113", "0");
  setDefaultDecimalPlaces(65);
  t("-2.5908962e-11", "-6.38269839549536134492478751418158325252765694e+41", "4.059248987589e-53");
  setDefaultDecimalPlaces(90);
  t(
    "-1.1993441604756474824929496979767230030128130568632141841768860725175466379555071443143091258687167533580234081659689968854707061894182720130119e+142",
    "5.5190451700765245027164259283971571452387996706e+41",
    "-2.1731008236321753759171333531370971753129724598072479194160993162945042631520523936861921256586999889013081674836981201030794126391040073527594467082895536939689565832767795655991567720425557e+100",
  );
  setDefaultDecimalPlaces(62);
  t(
    "6.45196767073464343663407e+10",
    "-1.86292959768228088717871746372852647202503962438554987289124618893360243833478388302216489967047018766358289158375192838011588659325334178185e-1",
    "-346334487291.50602593253663353035791773077750723563874118427225582952191721",
  );
  setDefaultDecimalPlaces(56);
  t(
    "3.56747119647900682871092910638285890449601625e+34",
    "-3.81259895394722421194588462656448839320471614994501005619094101888524365579481961e+31",
    "-935.7058635253429918045703825622185919278122359521228914647",
  );
  setDefaultDecimalPlaces(85);
  t("-5.6498973964710151794776525005317695733e+6", "3.639585621623103744457e+16", "-1.552346333853081888016311886511697613094675863746907091555575044156718813752e-10");

  setDefaultDecimalRoundingMode(2);
  setDefaultDecimalPlaces(58);
  t("-3.47161e+3", "6.14e+0", "-565.4087947882736156351791530944625407166123778501628664495114");
  setDefaultDecimalPlaces(53);
  t("8.466e+1", "-1.795201e+0", "-47.15906463955846726912473867828727813765700888089968756");
  setDefaultDecimalPlaces(74);
  t("-1.10652183e-13", "1.5856091e+1", "-6.9785285036520035108274794840670377080958982891811102749095e-15");
  setDefaultDecimalPlaces(16);
  t("1.24398e-1", "-1.2010354e+6", "-1.035756315e-7");
  setDefaultDecimalPlaces(70);
  t("0e+0", "-1.04969017e-17", "0");
  setDefaultDecimalPlaces(12);
  t("-2.43e+1", "-3.6186007e+4", "0.000671530296");
  setDefaultDecimalPlaces(28);
  t("2.8095272987e+6", "-4.18408492e+3", "-671.4795116299886188734429414975");
  setDefaultDecimalPlaces(88);
  t("1.07e-9", "-3.134417e+0", "-3.413712980755272830641232484382263113044626799816361383951146257820832390840147e-10");
  setDefaultDecimalPlaces(96);
  t("-9.43e+0", "1.14739857578e+2", "-0.082185913413649644403082230920145477679616716806449721179904042916974031037784978764269178706161");
  setDefaultDecimalPlaces(46);
  t("6.095490144e+9", "-3.9066e+1", "-156030567.3475656581170327138688373521732452772231608048");
  setDefaultDecimalPlaces(71);
  t("-9.0616444436e+10", "4.72171e+0", "-19191446411.5754673624597868145227046980860747483432908840229493128548767289816613");
  setDefaultDecimalPlaces(83);
  t("6.8e+0", "9.36e+2", "0.00726495726495726495726495726495726495726495726495726495726495726495726495726495726");
  setDefaultDecimalPlaces(18);
  t("1.7425e-5", "8.70274e-5", "0.200224297175372354");
  setDefaultDecimalPlaces(55);
  t("7e+1", "-1.28e+2", "-0.546875");
  setDefaultDecimalPlaces(21);
  t("-4.81428e+2", "1.8e+0", "-267.46");
  setDefaultDecimalPlaces(54);
  t("1.3913742844e-9", "2.9763769e+5", "4.674724778303446717383137868056965500572e-15");
  setDefaultDecimalPlaces(65);
  t("1.23e+1", "-7.120474638e+9", "-1.72741293598018149418763507995237662413818431186440804791e-9");
  setDefaultDecimalPlaces(47);
  t("-3.1e+1", "-8.7319e+0", "3.55020098718491966238733837996312371877827276996");
  setDefaultDecimalPlaces(29);
  t("-3.831815e+5", "-1.00073208e+7", "0.03829011856999727639389755548");
  setDefaultDecimalPlaces(13);
  t("-8.85933e+4", "8e+0", "-11074.1625");
  setDefaultDecimalPlaces(41);
  t("-5.953832544e-10", "-2e+0", "2.976916272e-10");
  setDefaultDecimalPlaces(77);
  t("-1.140580088e-1", "-8.063e-2", "1.41458525114721567654719087188391417586506263177477365744760014882797966017611");
  setDefaultDecimalPlaces(24);
  t("8.67238e+4", "-2e+0", "-43361.9");
  setDefaultDecimalPlaces(38);
  t("-1e+0", "-1.2e+0", "0.83333333333333333333333333333333333333");
  setDefaultDecimalPlaces(47);
  t("0e+0", "4.1728352789e+6", "0");
  setDefaultDecimalPlaces(82);
  t("-5.884350648e+2", "1.2065973e+0", "-487.6814035635584465504771144440651408717722143087838834050101056914349137031882965427");
  setDefaultDecimalPlaces(52);
  t("1e+0", "1.30443933563e+2", "0.0076661288316411731298075743232790723658560820764506");
  setDefaultDecimalPlaces(81);
  t("-1e+0", "-9.0455725e+5", "0.000001105513222076325185608760528977021631300838061935825510215080361138004255673");
  setDefaultDecimalPlaces(28);
  t("-1.7543e+2", "1.62e-9", "-108290123456.7901234567901234567901234568");
  setDefaultDecimalPlaces(19);
  t("8.51223311e+5", "-7e+0", "-121603.3301428571428571429");
  setDefaultDecimalPlaces(24);
  t("1.848657129e+9", "-4.411e-18", "-4.19101593516209476309226932668329177057356608478803e+26");
  setDefaultDecimalPlaces(58);
  t("1.20523e+3", "7.1e-10", "1697507042253.5211267605633802816901408450704225352112676056338028169014");
  setDefaultDecimalPlaces(55);
  t("-2.7330433e+3", "3.931663e+2", "-6.9513671441321395043267950483039873966817603645073344282");
  setDefaultDecimalPlaces(86);
  t("2e+0", "1.40231931163e+0", "1.4262086982709236328054232373988775231511499597503407163429451972397066460557247599544");
  setDefaultDecimalPlaces(54);
  t("-5.197810293e+5", "-9.5599891e+7", "0.005437046254582026667791912022159104762996016386671403");
  setDefaultDecimalPlaces(64);
  t("0e+0", "1.156885e+5", "0");
  setDefaultDecimalPlaces(57);
  t("-1.1593339e+1", "1e+0", "-11.593339");
  setDefaultDecimalPlaces(94);
  t("-2.36595566e+3", "4.2019523996e+6", "-0.0005630610333009066007792859910340046680237505468194975789653873831569712577569390131841511592");
  setDefaultDecimalPlaces(5);
  t("-3.324e+1", "-9.2119e+5", "0.00004");
  setDefaultDecimalPlaces(78);
  t("6.52e+1", "8.65e+2", "0.075375722543352601156069364161849710982658959537572254335260115606936416184971");
  setDefaultDecimalPlaces(0);
  t("1.8468172423e+9", "-1.1e-3", "-1678924765727");
  setDefaultDecimalPlaces(77);
  t("2.2328455e-19", "1.01343913e+2", "2.20323592597021589249272425468710686156355537603921016944e-21");
  setDefaultDecimalPlaces(56);
  t("9.781506458e+2", "-1.29225e+5", "-0.00756936077229638227897078738634165215709034629522151287");
  setDefaultDecimalPlaces(89);
  t("-5.609448e+4", "5.7285e-20", "-9.792175962293794186959937156323644933228593872741555380989787902592301649646504320502749410840534171249018067557e+23");
  setDefaultDecimalPlaces(42);
  t("-9.686133368e+6", "-1.4396996e+7", "0.672788501712440567462823494567894580230487");
  setDefaultDecimalPlaces(98);
  t("-2.1099879e+2", "-3.54516e+0", "59.51742375520427850929154114341806857800494194902345733337846528788545509934671495785803743695630099");
  setDefaultDecimalPlaces(43);
  t("7.417242657e+6", "4.51252627e+8", "0.0164370071512071219476800962756500473514141");
  setDefaultDecimalPlaces(69);
  t("3.18114954e+3", "-8.115027939e+9", "-3.92007219680873608881360623988358150247891586464197877606345971e-7");
  setDefaultDecimalPlaces(61);
  t("3.0330887e+5", "1e+0", "303308.87");
  setDefaultDecimalPlaces(88);
  t("-4.43514599e-12", "-3.021e+0", "1.4681052598477325388944058258854683879510095994703740483283680900364117841774e-12");
  setDefaultDecimalPlaces(54);
  t("-2.8671e+0", "8.42195e+5", "-0.000003404318477312261412143268482952285397087372876828");
  setDefaultDecimalPlaces(56);
  t("-1.661774e+3", "-1.19e-8", "139644873949.57983193277310924369747899159663865546218487394957983193");
  setDefaultDecimalPlaces(7);
  t("-8.83e+0", "8.81026874e-12", "-1002239575270.8900909");
  setDefaultDecimalPlaces(81);
  t("-2.35844020436e+1", "7.6e-10", "-31032107952.105263157894736842105263157894736842105263157894736842105263157894736842105263158");
  setDefaultDecimalPlaces(42);
  t("1.34168620279e-11", "2e+0", "6.70843101395e-12");
  setDefaultDecimalPlaces(83);
  t("-3.9e+1", "2.088334e-8", "-1867517360.72869569714423076002210374394134271625132761330323597662059804609799007246925060838");
  setDefaultDecimalPlaces(23);
  t("-1.7192079e+1", "-5.690713e+4", "0.0003021076445078147501");
  setDefaultDecimalPlaces(70);
  t("-2.2e-1", "1.89251731799e+10", "-1.16247284983186860776632464405150729851366943897373450317337e-11");
  setDefaultDecimalPlaces(37);
  t("1e+0", "-1.96183e+5", "-0.0000050972816197122074797510487656933");
  setDefaultDecimalPlaces(35);
  t("7.4889873e+2", "1.1e-20", "6.808170272727272727272727272727272727272727272727272727273e+22");
  setDefaultDecimalPlaces(90);
  t("5.13119e-8", "4.015562599e+4", "1.277825926877052278272800996371666823565810385714273358785210659842586107322193e-12");
  setDefaultDecimalPlaces(91);
  t("-7.43072e+1", "-3.741474127e+3", "0.0198604072827255448237394693602273839805173668116615042411063023234959283202334436455666021");
  setDefaultDecimalPlaces(43);
  t("9.21968092e+7", "-6.0863e+4", "-1514.8252501519806779159752230419138064176921939");
  setDefaultDecimalPlaces(0);
  t("-1.0411446689e+10", "-7.154674e+1", "145519512");
  setDefaultDecimalPlaces(52);
  t("9.52255374e+8", "-1e+0", "-952255374");
  setDefaultDecimalPlaces(26);
  t("-6.31e+0", "-1.7763e+4", "0.00035523278725440522434273");
  setDefaultDecimalPlaces(59);
  t("-1e+0", "7.4031689e+7", "-1.350772910233076000738008287234943403763218207813684e-8");
  setDefaultDecimalPlaces(4);
  t("-1e+0", "3.2049496903e+1", "-0.0312");
  setDefaultDecimalPlaces(4);
  t("5.1e+0", "-2.49e+0", "-2.0482");
  setDefaultDecimalPlaces(100);
  t("-2.02306653265e+11", "3e+0", "-67435551088.3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333");
  setDefaultDecimalPlaces(39);
  t("1.09e+0", "8.86e+0", "0.123024830699774266365688487584650112867");
  setDefaultDecimalPlaces(61);
  t("2.3668e+0", "-1e+0", "-2.3668");
  setDefaultDecimalPlaces(17);
  t("1.25521e+1", "1.317479e+5", "0.00009527362485474");
  setDefaultDecimalPlaces(37);
  t("1.07e+0", "-7.28041e-2", "-14.6969744835799082743966342554883584853");
  setDefaultDecimalPlaces(19);
  t("-1.499e+0", "2.36e+0", "-0.6351694915254237288");
  setDefaultDecimalPlaces(60);
  t("3e+0", "1.9215840695e-18", "1561211943633882212.51071315670063635485400239471541892900772718442855513067106");
  setDefaultDecimalPlaces(34);
  t("4.7103e+2", "3.05e+1", "15.4436065573770491803278688524590164");
  setDefaultDecimalPlaces(27);
  t("-9.57378169e+4", "-4.2103e+4", "2.27389537325131225803386932");
  setDefaultDecimalPlaces(22);
  t("-1.95e+1", "-9.6e+0", "2.03125");
  setDefaultDecimalPlaces(45);
  t("5.3397e+3", "1.2e+0", "4449.75");
  setDefaultDecimalPlaces(17);
  t("-1.465e+1", "-6.883798e+2", "0.02128185632408156");
  setDefaultDecimalPlaces(32);
  t("-5.257102672e-19", "2.047e+3", "-2.5681986673e-22");
  setDefaultDecimalPlaces(88);
  t("1.89186265485e-10", "-6.407e+3", "-2.95280576689558295614171999375682846886218198845013266739503667863274543468e-14");
  setDefaultDecimalPlaces(36);
  t("-4.8991418e+0", "-7.7684214899e-8", "63064829.919045301826420920704013202567668779");
  setDefaultDecimalPlaces(78);
  t("5.08e+0", "1.77679791e+0", "2.859075852920155674879198839219706196074937976486025920640575269474512157660068");
  setDefaultDecimalPlaces(76);
  t("1.61103976e+0", "-1e+0", "-1.61103976");
  setDefaultDecimalPlaces(3);
  t("4.12208e+1", "5.5e-6", "7494690.909");
  setDefaultDecimalPlaces(52);
  t("-7.1581e+0", "4.15922e+5", "-0.0000172101980659835257572333274027341665023730410991");
  setDefaultDecimalPlaces(84);
  t("1.680008e+1", "3.7e+0", "4.540562162162162162162162162162162162162162162162162162162162162162162162162162162162");
  setDefaultDecimalPlaces(36);
  t("2.9837e+2", "-2.1073195e+6", "-0.000141587452685746038984596308248464");
  setDefaultDecimalPlaces(50);
  t("6.2790148483e+2", "3.0859033e-6", "203474128.57363352895730724938788587445368103401036578171455");
  setDefaultDecimalPlaces(5);
  t("1.00791931111e-11", "6.60758e-6", "0");
  setDefaultDecimalPlaces(30);
  t("-5.1e+0", "1.6027e+1", "-0.318213015536282523242029075934");
  setDefaultDecimalPlaces(14);
  t("1.0519e-8", "1.76620128583e+9", "0");
  setDefaultDecimalPlaces(35);
  t("2.4920615e+3", "-8.3286e+2", "-2.99217335446533631102466200802055568");
  setDefaultDecimalPlaces(49);
  t("1e+0", "3e+0", "0.3333333333333333333333333333333333333333333333333");
  setDefaultDecimalPlaces(31);
  t("3.04e-15", "-1.768e+1", "-1.719457013574661e-16");
  setDefaultDecimalPlaces(93);
  t("3.60162758e+8", "-4.6868098e+5", "-768.460367220363838959285269054442960326659724915655847608750839430266617604153682532625923928042");
  setDefaultDecimalPlaces(88);
  t("-3.302e+0", "-4.86356082406e+11", "6.7892643259749729698130123810313879724470197602803083221774017440908138821201e-12");
  setDefaultDecimalPlaces(63);
  t("2.16006e+3", "-1.4e+0", "-1542.9");
  setDefaultDecimalPlaces(25);
  t("-1.95132693e+1", "-6e+0", "3.25221155");
  setDefaultDecimalPlaces(11);
  t("-1.3e+0", "9.0591087716e+1", "-0.01435019749");
  setDefaultDecimalPlaces(41);
  t("-1.8168e+4", "-8.1e+1", "224.2962962962962962962962962962962962962963");
  setDefaultDecimalPlaces(51);
  t("2.35216593e+1", "-5.9e+2", "-0.039867219152542372881355932203389830508474576271186");
  setDefaultDecimalPlaces(9);
  t("-8.1e+0", "-4.98895e+3", "0.001623588");
  setDefaultDecimalPlaces(32);
  t("5e+0", "-6.727e-10", "-7432733759.47673554333283781774936821763044");
  setDefaultDecimalPlaces(48);
  t("-9.758933e+4", "5.32330882e+3", "-18.332456992416231827782630878814954793473732752555");
  setDefaultDecimalPlaces(20);
  t("4.5857e+3", "-6e+0", "-764.28333333333333333333");
  setDefaultDecimalPlaces(5);
  t("0e+0", "5.740190541e+3", "0");
  setDefaultDecimalPlaces(13);
  t("0e+0", "5.4129e-7", "0");
  setDefaultDecimalPlaces(4);
  t("-1e+0", "-3.322547137e+6", "0");
  setDefaultDecimalPlaces(93);
  t("-2.748e+2", "-1.046391165521e-14", "26261689610421796.434959620532906580592503064101564641558383973691217040911154789504829539217280958280832408152");
  setDefaultDecimalPlaces(73);
  t("-3.0152498e+5", "1.63929432e-9", "-183935841368620.1267384370611373801380584299224559016345521163033127571624844036548604646");
  setDefaultDecimalPlaces(96);
  t("2.914802265e+7", "-5e+0", "-5829604.53");
  setDefaultDecimalPlaces(51);
  t("6.423638e+5", "-7.483460481e-15", "-85837802127895007988.617719273554883626036749829132958843509124959859596");
  setDefaultDecimalPlaces(28);
  t("2.51e+1", "1.3736692366e+4", "0.0018272229828867378160225154");
  setDefaultDecimalPlaces(76);
  t("1.24666453e+7", "2.083023e+3", "5984.881251911284704969652279403539951311147308503074617995096549582025738554015");
  setDefaultDecimalPlaces(42);
  t("2e+0", "1e+0", "2");
  setDefaultDecimalPlaces(21);
  t("1.723e+1", "-1.46072666927e+2", "-0.117954990228327345366");
  setDefaultDecimalPlaces(75);
  t("1.6219e+0", "-4.21e+0", "-0.385249406175771971496437054631828978622327790973871733966745843230403800475");
  setDefaultDecimalPlaces(17);
  t("2.1011539996e-12", "-2.16815816e-11", "-0.09690962764450726");
  setDefaultDecimalPlaces(20);
  t("3.632627e+6", "-9.280065e-1", "-3914441.33203808378497348887");
  setDefaultDecimalPlaces(81);
  t("4.5623815e+6", "1.1e+0", "4147619.545454545454545454545454545454545454545454545454545454545454545454545454545454545");
  setDefaultDecimalPlaces(85);
  t("5.18129985e+2", "-9.59464586081e+11", "-5.400199158119405428677623084545105378336336495440756938859334499660619996586e-10");
  setDefaultDecimalPlaces(12);
  t("-2.94e-8", "-1.536645e-19", "191325908065.948869127222");
  setDefaultDecimalPlaces(25);
  t("3e+0", "-1.649550455e-20", "-181867731957310757129.8872455526072404981392339");
  setDefaultDecimalPlaces(76);
  t("-8.3e+0", "-2.20342975e+8", "3.76685483165505957246878417612360911438179501751757685943924465937705e-8");
  setDefaultDecimalPlaces(5);
  t("-6.779e-14", "-8.4948e+1", "0");
  setDefaultDecimalPlaces(23);
  t("1.1268e+1", "-7.13826e+0", "-1.57853594573467483672492");
  setDefaultDecimalPlaces(75);
  t("-5e+0", "1.2842153e+3", "-0.003893428150248638215103028285054694489311877844781945831045619842716404329");
  setDefaultDecimalPlaces(22);
  t("-5.13766e+0", "1e+0", "-5.13766");
  setDefaultDecimalPlaces(51);
  t("-3.43e+2", "2.65987e-12", "-128953670668115.359021305552527003199404482173940831694782075815735");
  setDefaultDecimalPlaces(59);
  t("-2.220011655e-8", "1e+0", "-2.220011655e-8");
  setDefaultDecimalPlaces(10);
  t("2.064399e+6", "1.56895458e-11", "131577996349645762.2119309534");
  setDefaultDecimalPlaces(30);
  t("7.03815896039e-1", "2.97e+0", "0.236975049171380471380471380471");
  setDefaultDecimalPlaces(62);
  t("-1.54e-19", "-1.0310363e+2", "1.49364285234186226032972844894015855697806e-21");
  setDefaultDecimalPlaces(98);
  t("8e+0", "-3.883043e-13", "-20602398685772.98783454110603462284605140865038064219221883455836054352218092872007855694618885240261310523731002");
  setDefaultDecimalPlaces(98);
  t("-4.089860626e+4", "-6.7e+0", "6104.26959104477611940298507462686567164179104477611940298507462686567164179104477611940298507462686567");
  setDefaultDecimalPlaces(32);
  t("1.1737475573e+8", "1.5428e+4", "7607.90483082706766917293233082706767");
  setDefaultDecimalPlaces(68);
  t("-2.77351e+6", "-2.326e+2", "11923.94668959587274290627687016337059329320722269991401547721410146173689");
  setDefaultDecimalPlaces(57);
  t("7.5497094e+6", "1.3573e+3", "5562.299712664849333235099093789140204818389449642672953657997");
  setDefaultDecimalPlaces(64);
  t("-4.884e+2", "3.178e-13", "-1536815607300188.7979861548143486469477658904971680302076777847702957835116425425");
  setDefaultDecimalPlaces(43);
  t("-2e+0", "2.7531963e+1", "-0.0726428406140165160035991621810620623019143");
  setDefaultDecimalPlaces(77);
  t("-1.50866e-10", "-1.105719616e-20", "13644146112.35403822301367221109334104460709865890630993381960585566748234301018315297754");
  setDefaultDecimalPlaces(76);
  t("9.0981951e-10", "-1e+0", "-9.0981951e-10");
  setDefaultDecimalPlaces(55);
  t("4.222635553e-3", "-1.3e+0", "-0.0032481811946153846153846153846153846153846153846153846");
  setDefaultDecimalPlaces(58);
  t("-6.09820142e+4", "-4.6784e+4", "1.3034801256839945280437756497948016415868673050615595075239");
  setDefaultDecimalPlaces(72);
  t("-1.492e+3", "6.111135483e-6", "-244144480.866191917152755423537383879008332566532300524354125172649195543943727683");
  setDefaultDecimalPlaces(82);
  t("7e+0", "-5.2e+0", "-1.3461538461538461538461538461538461538461538461538461538461538461538461538461538462");
  setDefaultDecimalPlaces(37);
  t("-1.323e+3", "5e+0", "-264.6");
  setDefaultDecimalPlaces(18);
  t("1.737804036e-17", "-1e+0", "-1.7e-17");
  setDefaultDecimalPlaces(3);
  t("2.52328e+2", "-1.02e-3", "-247380.392");
  setDefaultDecimalPlaces(39);
  t("-7.9116e-14", "5.48e+0", "-1.4437226277372262773722628e-14");
  setDefaultDecimalPlaces(53);
  t("1.377107e+4", "1.251e+2", "110.08049560351718625099920063948840927258193445243804956");
  setDefaultDecimalPlaces(8);
  t("1.8666924381e+10", "-5.355847e+3", "-3485335.63057346");
  setDefaultDecimalPlaces(83);
  t("6.9680597422e+7", "-2.3480802418e+8", "-0.29675560562863895565530157513716701808840202472845491663810481623550110484133115114");
  setDefaultDecimalPlaces(78);
  t("4.9764e-3", "-1.4237974e-4", "-34.951601962470222238079659367266719267783464136119366421093338139260543670047438");
  setDefaultDecimalPlaces(93);
  t("1e+0", "4e+0", "0.25");
  setDefaultDecimalPlaces(1);
  t("-1.9740183193e+6", "-1.252e+2", "15766.9");
  setDefaultDecimalPlaces(19);
  t("0e+0", "-5.36518613405e-13", "0");
  setDefaultDecimalPlaces(59);
  t("-2.6490259358e+1", "-8.75781871e+8", "3.024755391174339574791221043670130961183141458291274e-8");
  setDefaultDecimalPlaces(72);
  t("-1.010653585e+3", "-6.34395e+5", "0.001593098282615720489600327871436565546701975898296802465340994175553086");
  setDefaultDecimalPlaces(71);
  t("-3.032e+0", "-6.57e+1", "0.04614916286149162861491628614916286149162861491628614916286149162861492");
  setDefaultDecimalPlaces(9);
  t("7e+0", "-9.50232972e+6", "-7.37e-7");
  setDefaultDecimalPlaces(65);
  t("-1.947324343e-18", "9.155e+3", "-2.1270609972692517749863462588749317312943747e-22");
  setDefaultDecimalPlaces(41);
  t("0e+0", "3.60162e-17", "0");
  setDefaultDecimalPlaces(57);
  t("-7.609e+1", "-1.454e+1", "5.233149931224209078404401650618982118294360385144429160935");
  setDefaultDecimalPlaces(23);
  t("-7.68e+0", "4.3323026e+6", "-0.00000177272935643969099");
  setDefaultDecimalPlaces(55);
  t("-2.216822e+1", "3.6119150523e+8", "-6.13752529586311611052835612669926467639145921893e-8");
  setDefaultDecimalPlaces(65);
  t("9e+0", "-1.0047e-5", "-895789.78799641684084801433263660794266945356822932218572708271125709167");
  setDefaultDecimalPlaces(12);
  t("-9.557102056e+2", "-1.3612339e-2", "70209.109955313337");
  setDefaultDecimalPlaces(4);
  t("1.028183906e-1", "-8.43023143e+2", "-0.0001");
  setDefaultDecimalPlaces(86);
  t("5.80855e+4", "1.71e+1", "3396.81286549707602339181286549707602339181286549707602339181286549707602339181286549707602");
  setDefaultDecimalPlaces(85);
  t("1.6129442e+7", "-1.93805516743e-18", "-8.3224885808533487995561583599600660414106631063683311880985365103993602162142555289954086856661569248113939382e+24");
  setDefaultDecimalPlaces(5);
  t("1.3e+1", "-1.7449395556e+5", "-0.00007");
  setDefaultDecimalPlaces(83);
  t("-4e+0", "-4.3e+1", "0.09302325581395348837209302325581395348837209302325581395348837209302325581395348837");
  setDefaultDecimalPlaces(94);
  t("0e+0", "1.1597e-7", "0");
  setDefaultDecimalPlaces(17);
  t("-4.81e+1", "-3.101958806e-7", "155063310.01869532886375797");
  setDefaultDecimalPlaces(79);
  t("8e+0", "-9.5408e+4", "-0.0000838504108670132483649169880932416568841187321817876907596847224551400301861");
  setDefaultDecimalPlaces(51);
  t("-8.18273e+0", "3.5080164097e+4", "-0.000233258030873914130083038647765308371043108236575");
  setDefaultDecimalPlaces(83);
  t("1.4120285e-8", "9.754e+3", "1.44764045519786754152142710682796801312282140660241952019684232109903629e-12");
  setDefaultDecimalPlaces(62);
  t("3.89067e+2", "1.15111101e-14", "33799259725610651.57390858419467293601856870433373754282829768086398548129602201");
  setDefaultDecimalPlaces(37);
  t("-5e+0", "-7e+0", "0.7142857142857142857142857142857142857");
  setDefaultDecimalPlaces(90);
  t("-1.903676583e-8", "-3.045227e+5", "6.2513454103749901074698208048201332774206980300647537933953692122130796817446e-14");
  setDefaultDecimalPlaces(40);
  t("-5.0163e+4", "5.407469261e+0", "-9276.6130658916379922441504563922106408068216");
  setDefaultDecimalPlaces(79);
  t("8.674366612e+6", "1e+0", "8674366.612");
  setDefaultDecimalPlaces(81);
  t("-1.43e+0", "5.5140749e-15", "-259336339446531.638516553338802126173512804477864455558991409420281904404309052820446816926625353");
  setDefaultDecimalPlaces(98);
  t("-2.19e+0", "6.1604643e+2", "-0.00355492685835384193363477489837900691998166436903140563609791554185290871663682881824345609794379");
  setDefaultDecimalPlaces(24);
  t("2.24542849071e+9", "-8.6486051972e+3", "-259628.973633454921282991826196");
  setDefaultDecimalPlaces(50);
  t("-5.74499612e+8", "-8.8e+0", "65284046.81818181818181818181818181818181818181818181818182");
  setDefaultDecimalPlaces(8);
  t("2.624039731e+9", "3.649560983e-12", "719001475307036950531.75660279");
  setDefaultDecimalPlaces(54);
  t("1.480391e+6", "6.8899e+2", "2148.639312617019114936356115473374069289830041074616467583");
  setDefaultDecimalPlaces(14);
  t("3.79263823506e+11", "2.0203e-17", "1.87726487900806810869672820868187892887195e+28");
  setDefaultDecimalPlaces(66);
  t("1.844e-1", "8.26e+0", "0.022324455205811138014527845036319612590799031476997578692493946731");
  setDefaultDecimalPlaces(78);
  t("1.49e+2", "1.3744542e+7", "0.000010840666789770077460565801319534692389168005743661738601402651321520935365");
  setDefaultDecimalPlaces(29);
  t("0e+0", "-2e+0", "0");
  setDefaultDecimalPlaces(92);
  t("-3.713628318e+4", "2.04278276976e+10", "-0.00000181792619997294293215205956711515355894040405194219303722937036958415744259493523446097");
  setDefaultDecimalPlaces(6);
  t("-1.794193168e+7", "1.2621170387e+6", "-14.215743");
  setDefaultDecimalPlaces(66);
  t("-6.65993e-9", "1.3386613e+0", "-4.975067255623211039267363596751471040508902438578003263409e-9");
  setDefaultDecimalPlaces(59);
  t("-2.32086026455e+9", "2.801833e+4", "-82833.64014022249006275534623227008890251488935992973171491662779");
  setDefaultDecimalPlaces(41);
  t("-6.1069407654e+10", "7.856e+0", "-7773600770.62118126272912423625254582484725050916497");
  setDefaultDecimalPlaces(51);
  t("1.108248829e-17", "-6.5574e+1", "-1.69007354896757861347485283801507e-19");
  setDefaultDecimalPlaces(32);
  t("4.40627364219e+7", "-9.20817268e+5", "-47.85177032746523167938679447093079");
  setDefaultDecimalPlaces(79);
  t("7.274375507e-6", "3.613e+0", "0.0000020133892906172156102961527816219208414060337669526709106006089122612787157");
  setDefaultDecimalPlaces(43);
  t("1.35522e+3", "8.81791223e+8", "0.0000015368944083944459946161201470702322924");
  setDefaultDecimalPlaces(33);
  t("-6.8583996054e+2", "2.26469e-18", "-302840547951375243410.79794585572418300076390146112713");
  setDefaultDecimalPlaces(88);
  t("-3.8135307e+7", "1.31463064677e+9", "-0.0290083812466239634886006971373900735950207289872002867335071840514506523076923597923465");
  setDefaultDecimalPlaces(66);
  t("2.4e+1", "1e+0", "24");
  setDefaultDecimalPlaces(77);
  t("-5.560073e-14", "-4.6205197e+7", "1.20334364119256974491419222820324735332261433708420288739e-21");
  setDefaultDecimalPlaces(43);
  t("2.8396e+3", "-8.67e+2", "-3.2752018454440599769319492502883506343713956");
  setDefaultDecimalPlaces(13);
  t("-3.6759905e+0", "2.56483693e+2", "-0.0143322581526");
  setDefaultDecimalPlaces(60);
  t("-2.38e-4", "-6.79092883979e-2", "0.00350467521623094813572048843741106004165644041835488479185");
  setDefaultDecimalPlaces(20);
  t("-1.0287e+6", "-1.08e+0", "952500");
  setDefaultDecimalPlaces(84);
  t("-2e+0", "5.2e-11", "-38461538461.538461538461538461538461538461538461538461538461538461538461538461538461538461538462");
  setDefaultDecimalPlaces(70);
  t("-2.95424e+4", "-8.06457187e+8", "0.0000366323228017806728282030921996110873521175526457302190302136894466");
  setDefaultDecimalPlaces(95);
  t("-1.6e+0", "-8.62341e+5", "0.00000185541450539867639367721121922766051944648346767693986485624596302390817553612781950527691");
  setDefaultDecimalPlaces(46);
  t("-8.2055186162e+7", "-8.2409903e+4", "995.6957013042473791044263211910345289449011971292");
  setDefaultDecimalPlaces(78);
  t("-4.8740475e+2", "8.631e+2", "-0.564714111922141119221411192214111922141119221411192214111922141119221411192214");
  setDefaultDecimalPlaces(65);
  t("4.7248e+3", "-3.871727154e-16", "-12203339264541573633.83256629142106122698128536564743683898547774578022343771799783183");
  setDefaultDecimalPlaces(38);
  t("0e+0", "-2.9719741e-3", "0");
  setDefaultDecimalPlaces(67);
  t("3e+0", "-2.8843654222e+4", "-0.0001040090127592710399119969037049427710338885922871191185506370199");
  setDefaultDecimalPlaces(44);
  t("-3.0004817819e+6", "-4e+0", "750120.445475");
  setDefaultDecimalPlaces(46);
  t("-3.63249898155e+0", "2.323e-2", "-156.371028047783039173482565647869134739560912613");
  setDefaultDecimalPlaces(91);
  t("1.394e-11", "-2e+0", "-6.97e-12");
  setDefaultDecimalPlaces(72);
  t("-6.453833754e+3", "-2.2675730029e+8", "0.00002846141555639527145827442502226131967325513795920135753879414825344");
  setDefaultDecimalPlaces(12);
  t("0e+0", "3.10028e-4", "0");
  setDefaultDecimalPlaces(41);
  t("-1.355217e+6", "-3.237e+0", "418664.50417052826691380908248378127896200185357");
  setDefaultDecimalPlaces(27);
  t("-4.367e+0", "-1.5e+0", "2.911333333333333333333333333");
  setDefaultDecimalPlaces(89);
  t("7.643222e+3", "2e+0", "3821.611");
  setDefaultDecimalPlaces(95);
  t("-1.457918157e+9", "-9.21162e-12", "158269463677398763735.36902303829293870133592136887974102275169839832733004618080207390231034280615136099839116246654");
  setDefaultDecimalPlaces(27);
  t("1.1096738733e+8", "3.1579255e+2", "351393.303388569489685554646555151");
  setDefaultDecimalPlaces(32);
  t("2.5572030071e+3", "-5e+0", "-511.44060142");
  setDefaultDecimalPlaces(67);
  t("-3e+0", "-6.09243e+5", "0.0000049241435683298782259295552021114727620998517832785932706653995");
  setDefaultDecimalPlaces(86);
  t("-5.806125e+1", "-1.7742e+2", "0.3272531281704430165708488332769699019276293540750760906323977003719986472776462631045");
  setDefaultDecimalPlaces(20);
  t("7.25e+0", "-1.1335e-8", "-639611821.79091310101455668284");
  setDefaultDecimalPlaces(19);
  t("-7e+0", "-1.47e+0", "4.7619047619047619048");
  setDefaultDecimalPlaces(31);
  t("3.2216e+3", "-1.055e+1", "-305.3649289099526066350710900473934");
  setDefaultDecimalPlaces(71);
  t("-5.74853629e+3", "-5.17526743e+6", "0.00111077086696561302147046727592973876521005214990406785606439665669606");
  setDefaultDecimalPlaces(62);
  t("1.129e-8", "1.93e+2", "5.849740932642487046632124352331606217616580310880829e-11");
  setDefaultDecimalPlaces(94);
  t("1.950363671e+4", "5.051779e+1", "386.0746226230403190638386991988366870363885672750134160659047040656370755727833699771902135861446");
  setDefaultDecimalPlaces(13);
  t("-2.49203240145e-1", "-9.4370003e+6", "2.6407e-8");
  setDefaultDecimalPlaces(29);
  t("-4e+0", "1.069233e+2", "-0.03740999389281849699738036518");
  setDefaultDecimalPlaces(70);
  t("1.134e+3", "-9.7334e+2", "-1.1650605132841555879754248258573571413894425380648077752892103478743296");
  setDefaultDecimalPlaces(52);
  t("-3.991469027e+9", "-2.2731e-5", "175595839470326.8663939113985306409748801196603756983854647837754608");
  setDefaultDecimalPlaces(87);
  t("1.20626e-11", "8.629212e-2", "1.39787966734390115806634487598635889348876815171535940941073182580286589320091e-10");
  setDefaultDecimalPlaces(20);
  t("1.72302828822e+4", "-1.4e+0", "-12307.34491585714285714286");
  setDefaultDecimalPlaces(16);
  t("5.69e+0", "3e+0", "1.8966666666666667");
  setDefaultDecimalPlaces(79);
  t("-1.636e+3", "-2.3e+0", "711.304347826086956521739130434782608695652173913043478260869565217391304347826087");
  setDefaultDecimalPlaces(12);
  t("1.401733118e-19", "2.7e+0", "0");
  setDefaultDecimalPlaces(7);
  t("-4.803e-2", "-6.095308e+3", "0.0000079");
  setDefaultDecimalPlaces(11);
  t("6.25052562e+5", "2.6274e+4", "23.78977551953");
  setDefaultDecimalPlaces(21);
  t("1.0784770908e+7", "-9.81192e+3", "-1099.149902159821930875914");
  setDefaultDecimalPlaces(63);
  t("1.864e+3", "-1.0852292878e-3", "-1717609.37615196566205315418322052402684888173177443433166437622565608");
  setDefaultDecimalPlaces(21);
  t("9e+0", "1.5e+0", "6");
  setDefaultDecimalPlaces(92);
  t("9.245e+1", "-7.434e+0", "-12.43610438525692762980898574118913101963949421576540220608017218186709712133440947000269034167");
  setDefaultDecimalPlaces(73);
  t("-4.02e-3", "2.697811137e+9", "-1.4900968955411351317288301341903756845525988352386284926215723e-12");
  setDefaultDecimalPlaces(7);
  t("2.362977e+4", "-4.0579e+2", "-58.2315237");
  setDefaultDecimalPlaces(18);
  t("9.82007199e+8", "4.538668604e+1", "21636459.602592302418738127");
  setDefaultDecimalPlaces(20);
  t("1.913837769e+6", "-9.425524e-3", "-203048421.39280532307805910844");
  setDefaultDecimalPlaces(67);
  t("-8.278968e+6", "1.46424882399e+10", "-0.0005654071810991968888280916719986936569463735738465334329942172003");
  setDefaultDecimalPlaces(0);
  t("4.58047916987e-14", "1.4875579176e-20", "3079194");
  setDefaultDecimalPlaces(5);
  t("1e+0", "4.123646222e+8", "0");
  setDefaultDecimalPlaces(10);
  t("-1.176061e+6", "1.67643499256e-15", "-701524965309925969038.9721102518");
  setDefaultDecimalPlaces(63);
  t("2.21241562e+7", "1.59969497e+5", "138.302342727251308416628952705902425885604928794643893891846143643");
  setDefaultDecimalPlaces(25);
  t("1.17991420619e+2", "-1.34987e+2", "-0.8740946951854623037774008");
  setDefaultDecimalPlaces(40);
  t("-2.977565694e+5", "-2.8119599561e+0", "105889.3348584410163322240063815395240862548213");
  setDefaultDecimalPlaces(95);
  t("3e+0", "-1.875649e+1", "-0.15994463782935933109019864590869613664390299037826373697850717271728345761920273995827577547825");
  setDefaultDecimalPlaces(10);
  t("2.511409e-20", "-3.70907e+4", "0");
  setDefaultDecimalPlaces(14);
  t("-5.4261e+4", "-4.440275e+0", "12220.18906486647786");
  setDefaultDecimalPlaces(12);
  t("-7.3519e+0", "-2.9116e+4", "0.000252503778");
  setDefaultDecimalPlaces(85);
  t("-5.8638256141e+10", "2.168413e+6", "-27042.0146627971700962870080561221501623537582554614826603603649304814165936101655911489186");
  setDefaultDecimalPlaces(70);
  t("-2.9868658e+3", "-6.479e+3", "0.4610072233369347121469362555949992282759685136595153573082265781756444");
  setDefaultDecimalPlaces(84);
  t("2.87091e+4", "-1.332e+1", "-2155.337837837837837837837837837837837837837837837837837837837837837837837837837837837838");
  setDefaultDecimalPlaces(39);
  t("0e+0", "4.5776e-6", "0");
  setDefaultDecimalPlaces(31);
  t("2.53769e-17", "2.7216393572e+3", "9.3241229529e-21");
  setDefaultDecimalPlaces(36);
  t("2.86678279e+4", "-6.781918803e+2", "-42.270968928909484025858809740161378927");
  setDefaultDecimalPlaces(8);
  t("-3.684252e+5", "7e+0", "-52632.17142857");
  setDefaultDecimalPlaces(46);
  t("-1e+0", "-7.208768443e+9", "1.387199502809720087439906689204221399e-10");
  setDefaultDecimalPlaces(90);
  t("3.9430711201e+4", "-7.658817e-1", "-51484.075413996704713012466546726472247606908482080195936265352730062619331418938460078103446002");
  setDefaultDecimalPlaces(51);
  t("9.917e+1", "5.5e-5", "1803090.909090909090909090909090909090909090909090909090909");
  setDefaultDecimalPlaces(20);
  t("1.9e+0", "1.539939e-20", "123381510566327627263.15782638143458929217");
  setDefaultDecimalPlaces(92);
  t("-1.8823e+1", "1.70891e-3", "-11014.62335640847089665342235694097407119157825748576578052676852496620652930815549092696514152296");
  setDefaultDecimalPlaces(81);
  t("3.1525492687e+8", "1e+0", "315254926.87");
  setDefaultDecimalPlaces(51);
  t("1.4294e+1", "-2.929469532e+3", "-0.004879381691415386258401952889810768648062525744678");
  setDefaultDecimalPlaces(72);
  t("-8.19857914e+3", "2.3863e+3", "-3.435686686502116246909441394627666261576499182835351799857520010057411055");
  setDefaultDecimalPlaces(49);
  t("0e+0", "-8.608940306e-3", "0");
  setDefaultDecimalPlaces(6);
  t("-2.49848e+0", "1.79205404e-10", "-13941990276.141449");
  setDefaultDecimalPlaces(11);
  t("0e+0", "-1.0570458e+2", "0");
  setDefaultDecimalPlaces(65);
  t("-9.6007e+1", "-6.639348601e+4", "0.0014460304130670243142426616499331483136865040775707267309972658");
  setDefaultDecimalPlaces(54);
  t("-7.8288669e+4", "1.1e-2", "-7117151.727272727272727272727272727272727272727272727272727273");
  setDefaultDecimalPlaces(37);
  t("9.357249502e+4", "9.8367441e+2", "95.1254745154954269878790483123374125388");
  setDefaultDecimalPlaces(92);
  t("-7.1816e+2", "-3.255829203e+4", "0.02205766811533817426724518509701443942727606279781869749388079310743868894525669011268463642");
  setDefaultDecimalPlaces(72);
  t("-3.6815e+0", "-2.9620866464e+5", "0.000012428738384389753818917861078812228495653232353736726936550697114678");
  setDefaultDecimalPlaces(10);
  t("1.4135964e+6", "1.184047488e+5", "11.9386799459");
  setDefaultDecimalPlaces(65);
  t("3.1747436e+4", "-1.562706e+5", "-0.20315680620666971266508223555806402483896523082396816803672603804");
  setDefaultDecimalPlaces(44);
  t("-4.492e+2", "-3.35998e+4", "0.01336912719718569753391389234459728926957899");
  setDefaultDecimalPlaces(71);
  t("1.35468356e+8", "2.40003e+2", "564444.42777798610850697699612088182231055445140269079969833710411953183918534");
  setDefaultDecimalPlaces(54);
  t("-1.92994345e+1", "1.3327447725e-15", "-14480968072977378.720125499498066873865753617127768550298328031896294682");
  setDefaultDecimalPlaces(48);
  t("-2.343e+0", "3.616e+1", "-0.064795353982300884955752212389380530973451327434");
  setDefaultDecimalPlaces(62);
  t("7e+0", "-2.4533006e+7", "-2.8532989393961750957057606393607045137477241883852309008e-7");
  setDefaultDecimalPlaces(89);
  t("5.1e+0", "4.442856389e+2", "0.01147910162621283863424917919398452111435105853474391922326886627619959291013671340165391");
  setDefaultDecimalPlaces(45);
  t("8.3093e-4", "-9.58826e+4", "-8.666118774417881868034450463379174115e-9");
  setDefaultDecimalPlaces(81);
  t("1.28329e+0", "-2.3e+1", "-0.055795217391304347826086956521739130434782608695652173913043478260869565217391304");
  setDefaultDecimalPlaces(36);
  t("-1.0143e+4", "-1.0372945216e-2", "977832.215324408014303350582739643768306585");
  setDefaultDecimalPlaces(57);
  t("3.802e-20", "-2.02e+0", "-1.8821782178217821782178217821782178218e-20");
  setDefaultDecimalPlaces(11);
  t("-1.8e+0", "-6.23e+1", "0.02889245586");
  setDefaultDecimalPlaces(62);
  t("1.2841959e+5", "1.14e+1", "11264.87631578947368421052631578947368421052631578947368421052631579");
  setDefaultDecimalPlaces(56);
  t("-6.532904e-8", "1.3268465173e+8", "-4.9236320213537632503683702437525326276108e-16");
  setDefaultDecimalPlaces(87);
  t("8.64085e+5", "-2.8436e-1", "-3038700.942467294978196652131101420734280489520326346884231256154170769447179631453087635391757");
  setDefaultDecimalPlaces(22);
  t("-2.539007867e+5", "-1.074842499296e-16", "2.3622138766033149685918948477462455874357005e+21");
  setDefaultDecimalPlaces(54);
  t("1.19657168422e+2", "9.29e+1", "1.288021188611410118406889128094725511302475780409041981");
  setDefaultDecimalPlaces(22);
  t("-3.148695973e-1", "-4.7664439e-15", "66059646123182.1064756473898706748652");
  setDefaultDecimalPlaces(13);
  t("-9.04195788e-16", "2.4e+0", "0");
  setDefaultDecimalPlaces(43);
  t("8.9419244e+0", "-1.598e+2", "-0.0559569737171464330413016270337922403003755");
  setDefaultDecimalPlaces(15);
  t("3.6582e+4", "-9.128e-19", "-4.0076687116564417177914110429447852761e+22");
  setDefaultDecimalPlaces(5);
  t("-1.15274e+3", "-4.4e+0", "261.98636");
  setDefaultDecimalPlaces(100);
  t("-8.66008938e+2", "-5.173594243e+7", "0.0000167390192837741643512958424327672965519804874268722198282375040906353505852236970644858512921459");
  setDefaultDecimalPlaces(70);
  t("1.02071e+5", "2.0936307e+3", "48.7531062665445247817583110526608154914808996639187608397221152708545972");
  setDefaultDecimalPlaces(93);
  t("-2.33993753515e+0", "1.8583531e+7", "-1.25914581849380507934686900998523908077533812061873494332158942237618889542574013517668e-7");
  setDefaultDecimalPlaces(4);
  t("1.66365395e+7", "2.28876e+5", "72.688");
  setDefaultDecimalPlaces(80);
  t("-6e+0", "5.1373041e+4", "-0.0001167927746383555530613809682786736335113975440932141821232657805871371328787");
  setDefaultDecimalPlaces(37);
  t("-1.643309e+0", "-6.555156e-7", "2506895.3355190936722177168628786256192835075");
  setDefaultDecimalPlaces(16);
  t("2.6e-19", "-1.75908e+3", "0");
  setDefaultDecimalPlaces(93);
  t("-1.124769e+3", "-5.1234e+4", "0.021953565991333879845415153999297341609087715189132216887223328258578287855720810399344185502");
  setDefaultDecimalPlaces(15);
  t("0e+0", "3.020456e+6", "0");
  setDefaultDecimalPlaces(12);
  t("2.1294e-10", "8.43975080019e+4", "0");
  setDefaultDecimalPlaces(75);
  t("3.83e+0", "-1e+1", "-0.383");
  setDefaultDecimalPlaces(69);
  t("-8.64e+2", "-4.1422008e+7", "0.000020858476971951721896244141520131037587554905595112627084616467652");
  setDefaultDecimalPlaces(0);
  t("-3.75921003e-15", "-1.26045768e+2", "0");
  setDefaultDecimalPlaces(100);
  t("3.2187662e-9", "-1.27e+1", "-2.534461574803149606299212598425196850393700787401574803149606299212598425196850393700787402e-10");
  setDefaultDecimalPlaces(79);
  t("-1.96097654239e+4", "-1e+0", "19609.7654239");
  setDefaultDecimalPlaces(79);
  t("1.8e+0", "5e+0", "0.36");
  setDefaultDecimalPlaces(25);
  t("-1e+0", "1.94e+3", "-0.0005154639175257731958763");
  setDefaultDecimalPlaces(38);
  t("2.8e+1", "6.1151412e-18", "4578798605664248603.12301537697935740224608386802254050978");
  setDefaultDecimalPlaces(36);
  t("-4.6267596e+0", "3.3186356792e+0", "-1.394175211518047732559314310164787793");
  setDefaultDecimalPlaces(67);
  t("-1.23217039505e+10", "-7.24837e+5", "16999.2756309349550312690991215956139104377949801127701814338947928982654");
  setDefaultDecimalPlaces(100);
  t("1.493671e+3", "-2.05819805e+7", "-0.0000725717819040786672594505664797418304812794861991050861213283143475915740956027045113564265596306");
  setDefaultDecimalPlaces(18);
  t("-1.4925886855e+9", "1.1e+1", "-135689880.5");
  setDefaultDecimalPlaces(81);
  t("-5.5929e-16", "5.06615e+1", "-1.1039744184439860643684059887685915340051123634317973214373834174e-17");
  setDefaultDecimalPlaces(55);
  t("-9.5e+0", "-2e+0", "4.75");
  setDefaultDecimalPlaces(77);
  t("5.5222624238e+10", "-2.1947803e+8", "-251.60889332750070701837445871005858764086774425668027000242347719268302162179969");
  setDefaultDecimalPlaces(89);
  t("5.025069812e+6", "2.3540906e+6", "2.13461190151305136684204082884490511962453781515460789826865627006879004571871617855319587");
  setDefaultDecimalPlaces(14);
  t("-5.3494583e-14", "7.53e-10", "-0.0000710419429");
  setDefaultDecimalPlaces(99);
  t("2.0648540479e-6", "7.755824096e+3", "2.66232707490739872499552883103448869142583503998025692201052209113949455926391861273074443e-10");
  setDefaultDecimalPlaces(72);
  t("9.8708558e-19", "2.921e+1", "3.3792727832933926737418692228688805203697363916466963e-20");
  setDefaultDecimalPlaces(70);
  t("4e+1", "1e-5", "4000000");
  setDefaultDecimalPlaces(24);
  t("-4.801e+1", "-1.40218026e+8", "3.42395349368275945e-7");
  setDefaultDecimalPlaces(61);
  t("-9.435e-11", "1.1783e+0", "-8.00729865059831961300178222863447339387252821862005e-11");
  setDefaultDecimalPlaces(93);
  t("2.4655164e+2", "5.0450884e-14", "4886963724956732.175396569859905725338727464121342254379526828509090147954592827352638657431651742712773873298");
  setDefaultDecimalPlaces(78);
  t("2e+0", "-4.5874542051e+4", "-0.000043597165455658272550414303862235191427655130315842463427581126917700072672");
  setDefaultDecimalPlaces(82);
  t("-5.36251e+5", "4e+1", "-13406.275");
  setDefaultDecimalPlaces(50);
  t("-1e+0", "-1.037533250412e+6", "9.6382453246959005181041561670829225561318983e-7");
  setDefaultDecimalPlaces(6);
  t("5.27e+1", "3.55e+0", "14.84507");
  setDefaultDecimalPlaces(60);
  t("-1.83e+1", "-1.5371643e+3", "0.011905038387893864045632597634488388781862810631238313301968");
  setDefaultDecimalPlaces(69);
  t("0e+0", "-2.4870038e+6", "0");
  setDefaultDecimalPlaces(40);
  t("2.410382e-19", "6.10587481228e+11", "3.947643989e-31");
  setDefaultDecimalPlaces(3);
  t("1.1361953e-17", "-5.52814e+4", "0");
  setDefaultDecimalPlaces(59);
  t("1e+0", "-2.5827279031e+4", "-0.00003871875154946514892128514132054563777558933827124144644");
  setDefaultDecimalPlaces(71);
  t("-2.8e+0", "-3.8343561529e+9", "7.3023993816596931907816882755487134393889652179993767318150161e-10");
  setDefaultDecimalPlaces(79);
  t("-1.1401e+2", "-4.45273585608e-1", "256.0448310544285772507871200837602594123650121245841983378663870451179732042004519");
  setDefaultDecimalPlaces(76);
  t("1.31e+1", "-3e+0", "-4.3666666666666666666666666666666666666666666666666666666666666666666666666667");
  setDefaultDecimalPlaces(39);
  t("1.33189307e+7", "-2e+0", "-6659465.35");
  setDefaultDecimalPlaces(72);
  t("-7.66698e+1", "1.857633e+6", "-0.000041272845605132983748673715421722159328564899525363729003522224249892");
  setDefaultDecimalPlaces(50);
  t("-9.849e+0", "-1.77373352e+0", "5.55269429649161729773252523298990256439422760641069");
  setDefaultDecimalPlaces(80);
  t("1.377158e+1", "-3.636e+0", "-3.78756325632563256325632563256325632563256325632563256325632563256325632563256326");
  setDefaultDecimalPlaces(93);
  t("-2.7866087909e+6", "-2.27684105373e-5", "122389254460.028327785154056916434885826438290836062172711392433734672089722588717967266130405588626218398");
  setDefaultDecimalPlaces(87);
  t("1.12334e+5", "2.946e+2", "381.310251188051595383570943652410047522063815342837746096401900882552613713509843856076035");
  setDefaultDecimalPlaces(60);
  t("1e-7", "-7.036103e+3", "-1.4212412751774668449282223412590748031971675229882e-11");
  setDefaultDecimalPlaces(86);
  t("6.6922051e+4", "7.66e+1", "873.65601827676240208877284595300261096605744125326370757180156657963446475195822454308094");
  setDefaultDecimalPlaces(62);
  t("0e+0", "2.5727e+3", "0");
  setDefaultDecimalPlaces(19);
  t("-4.67514594249e+11", "-4.144949742e-14", "1.12791378267331473955420519065005348380892383e+25");
  setDefaultDecimalPlaces(2);
  t("-3.13e+0", "-6.6e+0", "0.47");
  setDefaultDecimalPlaces(72);
  t("1.795e+0", "-1.01316122758e-15", "-1771682483633401.18175744926585182027085798087188582384855339728455580700479927854287738");
  setDefaultDecimalPlaces(19);
  t("-1.038614e+2", "3.834e+2", "-0.2708956703182055295");
  setDefaultDecimalPlaces(64);
  t("2e+0", "5.702e-12", "350754121360.9259908803928446159242371097860399859698351455629603647842862154");
  setDefaultDecimalPlaces(59);
  t("-4.06731452973e+9", "-5.9856e+0", "679516594.78247794707297514033680834001603849238171611868484362469928");
  setDefaultDecimalPlaces(39);
  t("-2.53122651e+6", "1.3241e+4", "-191.165811494600105732195453515595498829394");
  setDefaultDecimalPlaces(8);
  t("3.2e-11", "-2.13e+1", "0");
  setDefaultDecimalPlaces(19);
  t("-9.29e+0", "-6.5341e+3", "0.0014217719349260036");
  setDefaultDecimalPlaces(27);
  t("-1.401694e+1", "-3.48076123e+7", "4.02697544410421969679e-7");
  setDefaultDecimalPlaces(38);
  t("1.296246334e+9", "4.60460077e+6", "281.51112305877497388334928328650737727258");
  setDefaultDecimalPlaces(81);
  t("-4.799e+0", "-5.889687e+4", "0.000081481409793084080699025262293225429466795094544073394732181862975061323292732");
  setDefaultDecimalPlaces(17);
  t("-1.6308479e+7", "3.64168e+3", "-4478.28447310032732146");
  setDefaultDecimalPlaces(5);
  t("5.0061e+4", "1.844e+3", "27.14805");
  setDefaultDecimalPlaces(79);
  t("-1e+0", "1e+0", "-1");
  setDefaultDecimalPlaces(85);
  t("-4.4248e+1", "2.04e-19", "-216901960784313725490.1960784313725490196078431372549019607843137254901960784313725490196078431372549019608");
  setDefaultDecimalPlaces(72);
  t("-2.18245159406e-4", "6.89324538e-7", "-316.60726896392595848662506193853206484867654602482756823027820315312785224");
  setDefaultDecimalPlaces(100);
  t("9.26405e-8", "-6.21952209e+6", "-1.48951155184336679476284326534163013158459575468764031674980352067533214597843803140186e-14");
  setDefaultDecimalPlaces(84);
  t("1.261954e+5", "-1.996e+2", "-632.241482965931863727454909819639278557114228456913827655310621242484969939879759519038");
  setDefaultDecimalPlaces(9);
  t("-2.0042603776e+10", "-9e+0", "2226955975.111111111");
  setDefaultDecimalPlaces(53);
  t("-1.046949e+4", "1.726594578e-16", "-60636643560686543520.46737401488585005854223179426664456952789064069445954");
  setDefaultDecimalPlaces(30);
  t("-3.652402e+4", "-3.611073e+0", "10114.450746357107707321341883700496");
  setDefaultDecimalPlaces(53);
  t("0e+0", "5.0503568289e+5", "0");
  setDefaultDecimalPlaces(59);
  t("4.495459476e+0", "-1.4781583e+4", "-0.0003041257134638421338228794574978877431463193082905937747");
  setDefaultDecimalPlaces(5);
  t("-1.3075279e+2", "5.131e-5", "-2548290.58663");
  setDefaultDecimalPlaces(58);
  t("1.257085267e+9", "1.559308335e+3", "806181.3297496418500193548955793916153215457544514440115527247534");
  setDefaultDecimalPlaces(18);
  t("-1.658705993e-4", "7.035306447e+9", "-2.3577e-14");
  setDefaultDecimalPlaces(35);
  t("1.1424e+3", "-7.72668e+5", "-0.00147851341067573653884980353787138");
  setDefaultDecimalPlaces(65);
  t("8.4613856e+5", "-4.24e+0", "-199560.98113207547169811320754716981132075471698113207547169811320754717");
  setDefaultDecimalPlaces(26);
  t("-4e+1", "3.381558e+6", "-0.00001182886704885736101525");
  setDefaultDecimalPlaces(69);
  t("4e+0", "-4e+0", "-1");
  setDefaultDecimalPlaces(9);
  t("1.8e+1", "1.24427375e+3", "0.01446627");
  setDefaultDecimalPlaces(0);
  t("3e+0", "7.73924333e+0", "0");
  setDefaultDecimalPlaces(29);
  t("8.29642e+1", "-1.19074e-18", "-69674488133429631993.55022926919394662142869140199");
  setDefaultDecimalPlaces(73);
  t("-6.788387e-3", "-4e+0", "0.00169709675");
  setDefaultDecimalPlaces(80);
  t("-5e+0", "-5.6582125e+7", "8.836713007862465398745628588533923036648058021857609624947808163797312314e-8");
  setDefaultDecimalPlaces(98);
  t("-1.744761758e+6", "2.3e+0", "-758592.06869565217391304347826086956521739130434782608695652173913043478260869565217391304347826086956522");
  setDefaultDecimalPlaces(62);
  t("1e+0", "-5.7e-19", "-1754385964912280701.75438596491228070175438596491228070175438596491228070175438596");
  setDefaultDecimalPlaces(6);
  t("-6.8689e+4", "2.53766e+4", "-2.706785");
  setDefaultDecimalPlaces(42);
  t("-8.300128e-20", "2e+0", "-4.150064e-20");
  setDefaultDecimalPlaces(53);
  t("-1.58e+0", "3.69460316e-8", "-42765080.07966950366599047676882298774410185910196644773074898");
  setDefaultDecimalPlaces(91);
  t("-6.48271719e+5", "-1.11e+0", "584028.5756756756756756756756756756756756756756756756756756756756756756756756756756756756756756757");
  setDefaultDecimalPlaces(36);
  t("-1.115673e+4", "-1.50986e-16", "73892480097492482746.74473129959069052759858529929927278");
  setDefaultDecimalPlaces(4);
  t("1.0396857e+0", "-1.5e-14", "-69312380000000");
  setDefaultDecimalPlaces(10);
  t("-3.37672215e+4", "-3.47e-6", "9731187752.1613832853");
  setDefaultDecimalPlaces(18);
  t("-2.48e+1", "-9.1e-8", "272527472.527472527472527473");
  setDefaultDecimalPlaces(28);
  t("-8.159848e+6", "1.8e+2", "-45332.4888888888888888888888888889");
  setDefaultDecimalPlaces(89);
  t("-1.99513492e+6", "-6.049143e+5", "3.29821087053157777886884142100790144984173791229600622765902541897257181719790720768214605");
  setDefaultDecimalPlaces(61);
  t("3.2276e-20", "3.57675956e+7", "9.023810367616659141605817082096511e-28");
  setDefaultDecimalPlaces(3);
  t("-3.8715278e+2", "-1.46e+3", "0.265");
  setDefaultDecimalPlaces(30);
  t("-3.48163133e+6", "2.11809e+0", "-1643759.863839591329924601881884150343");
  setDefaultDecimalPlaces(17);
  t("-2.44304e+5", "-2.8e+0", "87251.42857142857142857");
  setDefaultDecimalPlaces(70);
  t("-2.54e+2", "6.6922423383e-5", "-3795439.3633707303728230262554716667110865314851773738254675241637012790959827");
  setDefaultDecimalPlaces(57);
  t("-3.4e+0", "-1.01e+0", "3.366336633663366336633663366336633663366336633663366336634");
  setDefaultDecimalPlaces(53);
  t("2.2916e+1", "-2.39828215e+1", "-0.95551726472216790672440271466808023401249932164987343");
  setDefaultDecimalPlaces(61);
  t("-4.88656e+6", "1.11e+0", "-4402306.3063063063063063063063063063063063063063063063063063063063063");
  setDefaultDecimalPlaces(5);
  t("-6.0274e+3", "1.49e+0", "-4045.2349");
  setDefaultDecimalPlaces(39);
  t("3.38757933952e+8", "2.83e+2", "1197024.501597173144876325088339222614840989399");
  setDefaultDecimalPlaces(57);
  t("7.350255e+6", "-1.164739095e-4", "-63106450462.195570073141573392451465707863098731136864603999576402988");
  setDefaultDecimalPlaces(36);
  t("-2.366818715e-12", "-8.2705e+0", "2.86176012937549120367571e-13");
  setDefaultDecimalPlaces(71);
  t("-8.94216e+0", "-8.914893635e+9", "1.00305851826352160397929413994629224760234618323631855648045542e-9");
  setDefaultDecimalPlaces(78);
  t("-1.2115e-15", "3.263156013e+7", "-3.7126634312718654558549297287306869565846896576195053044e-23");
  setDefaultDecimalPlaces(68);
  t("-7.4214648057e+0", "5.3380952139e-15", "-1390283332971480.47709910107416639835668106159705305439306562834180772310858612053053");
  setDefaultDecimalPlaces(71);
  t("-6.8181e+1", "1.25048277e+3", "-0.05452374205843715863434087940292052164781126892296164944359849116513617");
  setDefaultDecimalPlaces(40);
  t("-1.3e-6", "2.9e+0", "-4.482758620689655172413793103448276e-7");
  setDefaultDecimalPlaces(26);
  t("-2.0926664e+1", "9.21046689427e+6", "-0.00000227205246381362714822");
  setDefaultDecimalPlaces(20);
  t("-2.9066525848e+3", "7.661725e+6", "-0.0003793731287405904");
  setDefaultDecimalPlaces(88);
  t("-3.1705207785e+10", "-7.198182999e-1", "44046126348.0028399316887108776879819362314047775989308381849879112805256425518114283218155787817308");
  setDefaultDecimalPlaces(22);
  t("1.15977624e+4", "1.89e+1", "613.6382222222222222222222");
  setDefaultDecimalPlaces(40);
  t("1.649229757e+8", "-1.4e+0", "-117802125.5");
  setDefaultDecimalPlaces(79);
  t("4.5213756e+2", "-4.45751e+4", "-0.0101432764031937112872433264311241029184454998418399510040358855055849566237653");
  setDefaultDecimalPlaces(50);
  t("2.6e+0", "-9.22318e+5", "-0.00000281898434162620701319935206729132468411112003");
  setDefaultDecimalPlaces(91);
  t("2.280148843e+8", "4.4079e+1", "5172868.8105447038272193107829124980149277433698586628553279339367952993488962998253136414165475623");
  setDefaultDecimalPlaces(89);
  t("-2.1142e+3", "3.7365886822e-9", "-565810202785.07549133634744059119603999318670312275025495446007696522482390984104447866327694032964601");
  setDefaultDecimalPlaces(99);
  t("-8.67000377e+7", "-4.5907e-6", "18886016881957.000021783170322608752477835624196745594353802252379811357745006208203541943494456183152896072494391");
  setDefaultDecimalPlaces(53);
  t("3.2522913e+2", "-1.9588e+0", "-166.03488360220543189707984480294057586277312640392076782");
  setDefaultDecimalPlaces(41);
  t("-1.02965e+4", "-3.29373e+5", "0.03126091088219131501367750240608671627608");
  setDefaultDecimalPlaces(4);
  t("9.32222e+5", "5.836789e+3", "159.7149");
  setDefaultDecimalPlaces(37);
  t("-3.018e+1", "2.51377742e+6", "-0.0000120058362207740731476536216161891");
  setDefaultDecimalPlaces(84);
  t("-1.09918878976e-16", "-6.162577803e+5", "1.78365097350155110082266980832793552318579952539383785529141497e-22");
  setDefaultDecimalPlaces(85);
  t("-1.3626961638e+3", "-7.2072408471e-7", "1890732102.214000951060294142671096250896926682781953565499016914350399300394707632275762247296");
  setDefaultDecimalPlaces(34);
  t("-1.76914e+2", "-4.89016e+3", "0.036177548382874997955077134490487");
  setDefaultDecimalPlaces(17);
  t("-1.8709e+5", "4.6e+0", "-40671.7391304347826087");
  setDefaultDecimalPlaces(47);
  t("4e+0", "-2.458759908e+9", "-1.62683635233570759849887710142376373903e-9");
  setDefaultDecimalPlaces(18);
  t("-4.40831e-19", "-8.716173e+6", "0");
  setDefaultDecimalPlaces(12);
  t("6.2790456e+0", "-7.49776524e+8", "-8.375e-9");
  setDefaultDecimalPlaces(2);
  t("3.04842511142e+2", "1.7686524183e+1", "17.24");
  setDefaultDecimalPlaces(20);
  t("-7.267478e+6", "-3e+0", "2422492.66666666666666666667");
  setDefaultDecimalPlaces(70);
  t("-1.5018834783e+0", "-1.2207016e+1", "0.1230344482468115057766779366882127458504191360116182365944306126902758");
  setDefaultDecimalPlaces(90);
  t("7.55124e+2", "1.3e+0", "580.864615384615384615384615384615384615384615384615384615384615384615384615384615384615384615");
  setDefaultDecimalPlaces(43);
  t("2e+0", "-8.3628785e+2", "-0.0023915210534267596976328186520944911491898");
  setDefaultDecimalPlaces(20);
  t("-1.8e+0", "9.85764e+3", "-0.00018259948628677858");
  setDefaultDecimalPlaces(53);
  t("-3e+0", "-3.39e-8", "88495575.22123893805309734513274336283185840707964601769911504");
  setDefaultDecimalPlaces(81);
  t("1.428087e+6", "-4.1e-8", "-34831390243902.439024390243902439024390243902439024390243902439024390243902439024390243902439024");
  setDefaultDecimalPlaces(78);
  t("-9.92705831e-12", "5.2e+1", "-1.909049675e-13");
  setDefaultDecimalPlaces(27);
  t("1.665189e+2", "-3.62e+1", "-4.599969613259668508287292818");
  setDefaultDecimalPlaces(61);
  t("-2.32e+2", "7.4112e-10", "-313039723661.4853195164075993091537132987910189982728842832469775474956822");
  setDefaultDecimalPlaces(100);
  t("7.46633e+3", "-8.145330683e-15", "-916639273538994267.0053780062105306670457249009886514879999992260596597806660221016345445284115053773072211069616558132");
  setDefaultDecimalPlaces(52);
  t("-1.587713e-19", "1.912623e+0", "-8.30123343701293982138665068860931e-20");
  setDefaultDecimalPlaces(87);
  t("9e+0", "4.83345366132e+11", "1.8620226096348113442515240801104500946543068492056909384021047925613549119697e-11");
  setDefaultDecimalPlaces(48);
  t("-1.9e+0", "-1.291566e+1", "0.147108239145347585798944846798382738474069462962");
  setDefaultDecimalPlaces(40);
  t("3.44078778e+4", "-2.4e-2", "-1433661.575");
  setDefaultDecimalPlaces(6);
  t("1.676452e+1", "-8e+0", "-2.095565");
  setDefaultDecimalPlaces(69);
  t("-5.361604e+6", "5.01e+1", "-107018.043912175648702594810379241516966067864271457085828343313373253493014");
  setDefaultDecimalPlaces(85);
  t("-2.391338e+6", "-3.7e-12", "646307567567567567.5675675675675675675675675675675675675675675675675675675675675675675675675675675675676");
  setDefaultDecimalPlaces(5);
  t("8.8900272491e+9", "-3.523e-10", "-25234252764973034345.72807");

  setDefaultDecimalPlaces(41);
  t("1.4971331060129142964611812380247462503340453e+43", "5.711026e+2", "2.621478357851836598994963843667926306646205602986223491190549649047299031732651891e+40");
  setDefaultDecimalPlaces(32);
  t("9.788939862371188750295638887039683247851408608819e+48", "1.156105088415556956390583517996066772318905562052066448e+47", "84.67171332830079891480566216007338");
  setDefaultDecimalPlaces(81);
  t(
    "8.2899512178676843134104298550520733025910522821071826674e-10",
    "-1.14637e-18",
    "-723147955.535096374940937904433304544134184624694224610500972635362055880736585919031377304",
  );
  setDefaultDecimalPlaces(95);
  t(
    "1.904348746684149415303122861563e+23",
    "-7.6730630086564847579918463528971e+16",
    "-2481862.51635849843911650372801155119759524010981502903990700485212826506826618609728186806669788527865",
  );
  setDefaultDecimalPlaces(97);
  t(
    "-3.56652787375713031516035152541918040707080586668753394e+20",
    "-8.373736664108669e-15",
    "4.25918322586367661891309451616296217966798313563171770416137806418203924631363377408715986956474016295077860729252828095910232749068e+34",
  );
  setDefaultDecimalPlaces(9);
  t("2.93205231795e+6", "1.478589964451557136566359796424474550499838230595811003212e+35", "0");
  setDefaultDecimalPlaces(86);
  t("1.325453375254213909569856252653782489795807439554167854127e-4", "5.51750577288e+10", "2.4022691227060744917544631748133126020266461999014706033653617116757013e-15");
  setDefaultDecimalPlaces(49);
  t("-8.551094424630788e+6", "7.968756788127554595985e+8", "-0.0107307760193796392974118842663169503481491325513");
  setDefaultDecimalPlaces(78);
  t(
    "1.2786629141067549129764705930813171664e+1",
    "2.14915295272157338686007305e-15",
    "5949613369711653.012248658468631472569126677264338766562074704308730222583394398942392580357037",
  );
  setDefaultDecimalPlaces(89);
  t("4.81866257539341265220971414778393e+11", "1.82017144486390445285768179340496207575e+25", "2.647367416399452178655260106796405859609647275388598996453639310100683342002e-14");
  setDefaultDecimalPlaces(5);
  t("-1.9406e-7", "-3.1428524e+9", "0");
  setDefaultDecimalPlaces(60);
  t("7.20265700724484004691319907452262261816712512831117e-16", "-1.31182364361921863325669627313659e-16", "-5.490568067040836214473771119863194723373807208803247037935778");
  setDefaultDecimalPlaces(27);
  t("-1.732433600648909e+1", "5.9489139473734845e+16", "-2.91218467097e-16");
  setDefaultDecimalPlaces(93);
  t(
    "-4.0333680066613702543573052111399163983015905e+32",
    "-4.97975491725073157993487342812741209993188171133433e+9",
    "8.0995311489910607385529697834434291955557260993076320024692237988648291683293300719966154924910446692238324614211397e+22",
  );
  setDefaultDecimalPlaces(4);
  t("-3.2102268436369611823448522142129315459484e+40", "1.03713662e+5", "-3.095278656380835518414972382532333634067e+35");
  setDefaultDecimalPlaces(67);
  t("1.23081229053503916825849319003066631384968760356256900681e-19", "-2.1802012148037403347842486539298322285006596355467462598137e+44", "-5.645e-64");
  setDefaultDecimalPlaces(59);
  t("1.9673677130965072772106710945692343778438e-19", "5.6717482393343883439e+7", "3.46871481257318462764527599485805e-27");
  setDefaultDecimalPlaces(99);
  t("-1.9337095842e+10", "-1.28779744364162870953371e+8", "150.156345918179756426353581348299493571563914568917748402517706133330675019923868707703113740308447567");
  setDefaultDecimalPlaces(80);
  t("2.31093052637862418414e+3", "1.182266567307658360206e-13", "19546611485777186.32561316906762984360630571768599775473072644028556626206158725407311225813448549");
  setDefaultDecimalPlaces(6);
  t("0e+0", "-4.4e+0", "0");
  setDefaultDecimalPlaces(17);
  t("8.34e+0", "1.69907479735006611816335364006015115909533709e+40", "0");
  setDefaultDecimalPlaces(48);
  t("1.0619406211229683e-4", "2.610245255977776015535827356381e+30", "4.0683557174982e-35");
  setDefaultDecimalPlaces(75);
  t("-5.09e+1", "-1.4777400435988783847335041906194822091034162e+43", "3.444448854213794918387599814014331e-42");
  setDefaultDecimalPlaces(49);
  t("-1.38246056821792108340068523570308713036498456073e+23", "-2.167205e+3", "63790023012032598826.6308556736943265803181775941823685345871756478967");
  setDefaultDecimalPlaces(28);
  t("-2.87234151566076262386161053630949339727403358e-7", "-4.636316652722013257229785735760050568884328947526724183101e-11", "6195.3091878968000377031016707168");
  setDefaultDecimalPlaces(13);
  t("2.58116586462499607538805506574e-14", "7.665537563208908728600378247790492119601870786941428e+25", "0");
  setDefaultDecimalPlaces(5);
  t("8.48275039470241828009815156461325906126950808243328e-8", "-9.13623925388988184031677580809014511301654536695191511e+24", "0");
  setDefaultDecimalPlaces(95);
  t(
    "3.69020924610994258941701863e+4",
    "1.33106662017250847257707404e-3",
    "27723700.60359326916999857288505426692518225235536591691474024385732750243783557465932061656941487718559",
  );
  setDefaultDecimalPlaces(59);
  t("3.1673274370875956956209566041833857626354468350070016047e+11", "-1.79038124318332425506818133120849117685759158206379484e+35", "-1.76907988125257657440405909990442711e-24");
  setDefaultDecimalPlaces(58);
  t("0e+0", "-1.44967466690555396772370633685474762892028e+40", "0");
  setDefaultDecimalPlaces(96);
  t("1.604139697802321205774451495862612608691648014979622995e-15", "-4.02715508e+0", "-3.98330748614309932602459276503107153422968756142269791855147530102068977189723719e-16");
  setDefaultDecimalPlaces(55);
  t("5.78693793000386454473e+7", "-7.638129386001963e+15", "-7.5763811236417530111677387129874259148752269752e-9");
  setDefaultDecimalPlaces(0);
  t("-5.66681900910313353316227602358865075562823e+13", "3.6367629789370401143374603436427e-12", "-1.5582041067629438947725745e+25");
  setDefaultDecimalPlaces(52);
  t("7.791897792796976363596191523889089774058386164371741864e-6", "-2.7210267336485e+13", "-2.863587371796666561080071997597924e-19");
  setDefaultDecimalPlaces(47);
  t(
    "2.55028658038157582081358839318252756e+31",
    "-5.92058775921005896536137795047283161751943517404350860034e-1",
    "-4.307488857697199376211855329139188441422891133704380494294854507443191434966031e+31",
  );
  setDefaultDecimalPlaces(34);
  t("3.574306242234801877256e+20", "9.56483611371074082e+0", "37369236647047226393.8416739429725894051603629989611942");
  setDefaultDecimalPlaces(86);
  t("1.190935572906693384529838e+20", "7.3799080774486798271760184e+8", "161375393894.93502775056267912100730984358577753529536587598216638604670580938434762941828610628726");
  setDefaultDecimalPlaces(53);
  t("2.689789026260722889452732203e-3", "-8.9141053804659093563535393740022555668860639166363826699225e-12", "-301745257.81970696767769417327920844922014556679080485112024242");
  setDefaultDecimalPlaces(30);
  t("7.827452539696619791609939338e+18", "-2.618245595058718e+9", "-2989579187.861128696315866267392583912477");
  setDefaultDecimalPlaces(22);
  t("1.134e-4", "7.4482508617752622795804483666886959e+6", "1.52250511032e-11");
  setDefaultDecimalPlaces(83);
  t(
    "-3.16423813081682584412077861796075302458189760084143551812e+2",
    "3.781792779e-4",
    "-836703.20287975404273751156209523055535505257276325121411947145716415256818067979075804354",
  );
  setDefaultDecimalPlaces(30);
  t("-1.1617791501885994280152717864450601600954258666766320831e+55", "-1.3390313546165498987175521e+26", "8.6762654674452407818321779442841320340574386928470029993553e+28");
  setDefaultDecimalPlaces(74);
  t("-1.823440174020667117185834937078e+26", "7.766365e+6", "-23478682421192760283.42519231426800053821832993942468580861187956012883762223382496187083661404");
  setDefaultDecimalPlaces(93);
  t(
    "-1.0124366318854322947191952042534e+1",
    "-7.9706026599445091066725154460315554251e-6",
    "1270213.401771153929729671962478546857669763727314300147753219110368966840951042134804380593696465339",
  );
  setDefaultDecimalPlaces(16);
  t("-5.26605246498e-9", "-3.36088752602505462403487488792596611186953391350147004776e+56", "0");
  setDefaultDecimalPlaces(97);
  t(
    "-1.0213165917925084031986923013994156887979035e+2",
    "2.3049177977375843739687e+7",
    "-0.0000044310326068677683174726527305168871538537736938916530090764363203422083419722153549476700635",
  );
  setDefaultDecimalPlaces(35);
  t("1.89e+0", "-9.055923473994708728893699375861129724874267922234811119e+7", "-2.087031770340580845206945104e-8");
  setDefaultDecimalPlaces(30);
  t("-5.788694040481936484354093142105737230722145331053617e+12", "4.71084064685410278076659e-8", "-122880277097626380220.579743177024915310569241336903");
  setDefaultDecimalPlaces(49);
  t("-8.7860037831460002983036873496104e+1", "1.932434067645957805e+18", "-4.54659950900621793853521061874478e-17");
  setDefaultDecimalPlaces(97);
  t(
    "-3.06878224696254330289e+6",
    "1.019196526591383103786070140211492378e+4",
    "-301.0981853741031598434916218456613301383451549657438803610008245877840630725606636986034398481971755",
  );
  setDefaultDecimalPlaces(89);
  t("-3.212903e+6", "2.88035919906461331398e+9", "-0.00111545219812979545572731130657357782038460175338691349187909144179142987661602390574241");
  setDefaultDecimalPlaces(21);
  t("-8.46491244e+8", "-7.3488254011951180574180940415676414e+34", "0");
  setDefaultDecimalPlaces(43);
  t("-2.7773945974695728971201687940574364299133e-7", "1e+0", "-2.77739459746957289712016879405743643e-7");
  setDefaultDecimalPlaces(65);
  t("-6.372513428170466483920605061596130831558e+3", "-3.9533307042580976405765870436159086732335353e+9", "0.0000016119353286854268134166321626792519051683859527066280821823");
  setDefaultDecimalPlaces(20);
  t("3.2777954177214598483502882307056358734e+2", "3.0092e+1", "10.89258081125036504171");
  setDefaultDecimalPlaces(73);
  t(
    "1.246908770404519849872114780571447157537754753916434197e+50",
    "-2.493235966652438333582032015479980972514013e+38",
    "-500116630388.0539275619738282722151589636395650579417649372330660116460111987904876565",
  );
  setDefaultDecimalPlaces(14);
  t("-2.8e+0", "1.4961608786431053562662951556982227685208244145112e+32", "0");
  setDefaultDecimalPlaces(86);
  t(
    "-3.9933258588134993419376516089832093928540652849190938173471e+5",
    "-1.743757e-11",
    "22900701524429718.94557356104654036882922371227710680913307932240558747577787501354833270920202757609002",
  );
  setDefaultDecimalPlaces(59);
  t("1.8468175721359830333733068514383082781e-14", "2.288584812715553144560205579124582179051351398472653488e+54", "0");
  setDefaultDecimalPlaces(81);
  t("6.0614553035274630884826836991133e+21", "9.478502576e+0", "639495031512186729238.768706023644382876200845166072991738774413769806417574370240905444893978367158488");
  setDefaultDecimalPlaces(17);
  t("1.2282673544107959161363434208951897672192686e-14", "3e+0", "4.09e-15");
  setDefaultDecimalPlaces(6);
  t("3.163674286210313668163780185315401257138437905334012e+1", "5.40321e+2", "0.058552");
  setDefaultDecimalPlaces(12);
  t("-3.6928747e+4", "2.009597681926369e-5", "-1837618909.104268024278");
  setDefaultDecimalPlaces(56);
  t("-3.20674e-1", "-6.2908665237179610778962321712651646290099051706774035e+18", "5.097453566865358644107946798942105036e-20");
  setDefaultDecimalPlaces(6);
  t("-1.0866278959621574e+4", "-5.8218492079333319819172565653154315053748054959698e+24", "0");
  setDefaultDecimalPlaces(56);
  t("-4.16535e+0", "-9.1087221148944263334200406590335832587734126667e-11", "45729246621.64071345542259182071029488084267380729729161257821304846");
  setDefaultDecimalPlaces(35);
  t("-7e+0", "-2.176361508036905585819244620477751980133e+28", "3.2163774e-28");
  setDefaultDecimalPlaces(6);
  t("-4.1118568372308756219206921848571761396143729798812242536984e+16", "1.11036173e-11", "-3.703168729735376976582840427017578e+27");
  setDefaultDecimalPlaces(88);
  t(
    "-1.49197384109318468936229841e+18",
    "-4.8655675644665251503323177144164311136864e+1",
    "30663921964400241.5772454288697420400005986339592070925073850333037017724029844967556569517663392680262197",
  );
  setDefaultDecimalPlaces(48);
  t("3.591279e+2", "-1.41131444765015622e+18", "-2.54463419259931252730730318432518e-16");
  setDefaultDecimalPlaces(17);
  t("0e+0", "2.5887407357219248e+10", "0");
  setDefaultDecimalPlaces(24);
  t("5.00718987530503e-20", "-5.878849224694651621263724267212e+2", "-8.5e-23");
  setDefaultDecimalPlaces(63);
  t("5.8847293426e+10", "9.6759243060774292933961185e+12", "0.006081826558837188206812279459484626385938731971876150998182753");
  setDefaultDecimalPlaces(99);
  t(
    "7.952389254781e-16",
    "4.341093699026155090682805277816104923641242e-13",
    "0.001831886111226987098635367795801761630539779467956643644662814539117215441533705343326729900488679",
  );
  setDefaultDecimalPlaces(49);
  t(
    "-7.7973080260722209113619783267961621026602742186259277e+34",
    "-2.361715822499071999882747e+2",
    "3.301543713172665058992260896779227729010358065164084364004435078261614390181458339e+32",
  );
  setDefaultDecimalPlaces(99);
  t("6.9880491929280150992283561e+7", "9.288449310511336719594525746225351749793673105798949951224e+50", "7.523375495003177537542140591504009970817413925330945914e-44");
  setDefaultDecimalPlaces(34);
  t("4.75900706e+7", "-8.73662602342597622e+12", "-0.0000054471909948296096558698313571");
  setDefaultDecimalPlaces(4);
  t("-1.644249618176114417428e+20", "-2.1139618764108371577700948458034820473141874e-9", "7.77804763900370036250896089167516e+28");
  setDefaultDecimalPlaces(66);
  t("3.32022109499065e+4", "1.222917e+1", "2715.001177504810220153943399265853692441923695557425401723910944078789");
  setDefaultDecimalPlaces(16);
  t("-9.131396099023294438931601805260654404958699080514499714851e+57", "7.218951124642335085604694e+24", "-1.2649200612887806418511191613644596410838657910849e+33");
  setDefaultDecimalPlaces(69);
  t("4.4864067281212484754173933398111616493673005549208901522e-20", "-3.2095308e+6", "-1.3978388143591731462484776091917116512380254e-26");
  setDefaultDecimalPlaces(31);
  t("7.0437325007582691759279748406364752598472551459327239598285e-18", "-1.62076340371954203000013018781940854e+10", "-4.346e-28");
  setDefaultDecimalPlaces(82);
  t("4.79447742943229999863485636541424400397533109e+0", "3.878658499011179e+4", "0.0001236117443867409024433904563746460779829848434651344159069527977963331838752414");
  setDefaultDecimalPlaces(17);
  t(
    "-2.40493948535811242380902592178069239711403571177e+47",
    "9.59002919685078404170990996438137e-9",
    "-2.507749909820772002810832795962805138089779726768255454948623516516688953e+55",
  );
  setDefaultDecimalPlaces(48);
  t("-1.1e+1", "1.8513605269936020380436893346024152176547102846019153e+41", "-5.9415764e-41");
  setDefaultDecimalPlaces(14);
  t("-8.027921067274157452441629264734565893308001668633785613e+33", "2.3042609351e+11", "-3.483946173364156275602187231097743351e+22");
  setDefaultDecimalPlaces(15);
  t("-6.1045626682798697939154267021025914e+33", "5.243935267474e+10", "-1.16411861644135691610973952243231893167e+23");
  setDefaultDecimalPlaces(23);
  t("5.498369371769760911573792217395740210118694932095083419223e+57", "-7.8854395963786276147707e+16", "-6.972812745017888493866672424843380110856391822655137362151946794e+40");
  setDefaultDecimalPlaces(40);
  t("1.446141863455069e-18", "6.6067241889384e+3", "2.188893954247909935e-22");
  setDefaultDecimalPlaces(13);
  t("-4.77916764194882e-12", "-5.3849884e-19", "8874982.241278031351");
  setDefaultDecimalPlaces(71);
  t(
    "-1.077922631934892034842283576739215743322150672795e+48",
    "4.6882445111598354113212158260280081175872238469346304835e-13",
    "-2.29920310122268413295816111138666859981475858593688307316216832533619055645260314146576279286243541902649816614961550565831857787733e+60",
  );
  setDefaultDecimalPlaces(13);
  t("4.444284217494639277845462540281218967611806e+3", "8.084878541924268624588380475225359114288398302489e-5", "54970327.5621115578532");
  setDefaultDecimalPlaces(80);
  t(
    "8.002720570616686212911969821803396728894571586e+45",
    "-6.9301450056e+10",
    "-1.1547695703553066521583967679920657977775361292506574792008418462348602606561309381442475945874456407925525961667044e+35",
  );
  setDefaultDecimalPlaces(40);
  t("1.69087e-10", "1.0480758049716696617044222459995487893919292766038e+13", "1.61330887706706061e-23");
  setDefaultDecimalPlaces(62);
  t("-1.89861396920496012299e+19", "-3.37081469029056e-15", "5.63250769813543793270040814800014100108157503927507137943208478778529751929528465202979226707542e+33");
  setDefaultDecimalPlaces(30);
  t("7.015704761875716808165177517183193083227858022e+5", "5.6600889608979e-13", "1239504327642717098.279455635029112664076434897752");
  setDefaultDecimalPlaces(72);
  t(
    "-2.03019481116934867605000474886576e+29",
    "-5.12752956654256285825794513342508176069629942169e+28",
    "3.959401471649215368181327983424365980674787049216723015180670594395232475",
  );
  setDefaultDecimalPlaces(46);
  t("7.9717115166e-7", "-6.46339452701182917729128400335739167760229208328e+30", "-1.233362977e-37");
  setDefaultDecimalPlaces(43);
  t("3.252776281057860507185529235240612907e+4", "1.411457992080526228759132788e+16", "2.3045505422822982202014563180475e-12");
  setDefaultDecimalPlaces(17);
  t("-9.1e-7", "-1.6258950472584187330388479310737655e-8", "55.9691722743383924");
  setDefaultDecimalPlaces(80);
  t("-6.7712081377033792133574e+3", "-7.13658243564864559794058146098524553950880327693896e+44", "9.48802623491021521187749576308159769058e-42");
  setDefaultDecimalPlaces(12);
  t("3.249999329629046159096517816415e-16", "8.3651689260643897153543665065462852687358399e+10", "0");
  setDefaultDecimalPlaces(67);
  t("-9.169167727267014862696499962043570931805381987509e+5", "1.818570403e-3", "-504196467.2987705531627141499257959127692557079138277386778739959510932390336");
  setDefaultDecimalPlaces(84);
  t(
    "-5.48522554331637209810715766977406035510452943e+7",
    "3.12790757709650308414847903623198037347084139503556746188e+16",
    "-1.75364054343576929069147848402784531778257337389897019405043935157853383177e-9",
  );
  setDefaultDecimalPlaces(82);
  t(
    "6.748548929817858938424451778120944463e+28",
    "-5.73545379324e+1",
    "-1.1766373112049001531787383264440584544089318881453424947582203982822719088746139152916531325510067182556340033e+27",
  );
  setDefaultDecimalPlaces(68);
  t("0e+0", "5.228911225107002264197763530652612519635945267331594e-14", "0");
  setDefaultDecimalPlaces(39);
  t("4.0713827695644793127410091348162894045917972671654219e+2", "3.41153208122216299997409622023925871726896965492e+0", "119.341769991678587890884625184372646865625");
  setDefaultDecimalPlaces(2);
  t("-4.1185e+1", "-5.0530416223977943757548707898108315252e+17", "0");
  setDefaultDecimalPlaces(28);
  t("1.4990975825806369054623000148835089959e+30", "-1.44e-14", "-1.041039987903220073237708343669103469375e+44");
  setDefaultDecimalPlaces(78);
  t(
    "-1.5105897776733762302166334250705044772353848168485803478e+55",
    "-1.030417026755080928438199650431e-18",
    "1.4659984631954526239922953274859187909468878022072997337387273201557058239419336356966023382676223659074726350588666085559944792777843382100312243980844e+73",
  );
  setDefaultDecimalPlaces(97);
  t("2.019324240764287e+4", "3.388144918979953251430963107001971e+8", "0.000059599700988357717948162944791556164720331776062922533165233683071169282191808634082318090473");
  setDefaultDecimalPlaces(11);
  t("-3.1604120719341297800991e-3", "1.3387453428143657838211860500325235e+16", "0");
  setDefaultDecimalPlaces(88);
  t(
    "3.59900194632e+11",
    "-3.8613875179978585475956969236238665552498e-2",
    "-9320488890444.4734840373310675749726553616781224916103456098024351061382369787531172360846824140664629",
  );
  setDefaultDecimalPlaces(20);
  t("1.99273e+4", "2.9876916474379755e+16", "6.6697981e-13");
  setDefaultDecimalPlaces(45);
  t("-4.7055222875639595736717542873377877e+1", "3.14200283364893e-16", "-149761872814712062.750557147525353526712231432259383852905621501");
  setDefaultDecimalPlaces(27);
  t("5.64613740073486856943802217021417120048223e+28", "2.34e+2", "2.41287923108327716642650520094622700875308974358974359e+26");
  setDefaultDecimalPlaces(68);
  t(
    "1.1781277452003225269567454031265167895894325858e+37",
    "9.416746517556467479501831034209457e+15",
    "1.25109850095660482353107105538568237336966997809039858728507561055819800480438103845076711e+21",
  );
  setDefaultDecimalPlaces(34);
  t("1.30325177313e+0", "1e+0", "1.30325177313");
  setDefaultDecimalPlaces(80);
  t("6.829e+0", "-1.31940107720766400137543687744149433925680831621215e+24", "-5.17583327615031630857346098300208531665615736292341870789e-24");
  setDefaultDecimalPlaces(51);
  t("1.113419464726975655231130904771802242565681678464958925467e-19", "-5.20042274499922466512511500887670621022426829406373973127358e+59", "0");
  setDefaultDecimalPlaces(67);
  t("6.282604951659246881326282586345156668607273500849e-10", "8.30317545611195297804941e+9", "7.56650872291832919064540611627117338420205646397e-20");
  setDefaultDecimalPlaces(49);
  t("3.0818770546373450243378360149376172e-8", "2.898381985e+8", "1.063309484597609043011573926456632e-16");
  setDefaultDecimalPlaces(96);
  t(
    "3.3638770940969877905174495955974e+13",
    "1.9915148740740485619802639019e+13",
    "1.689104680004469812425304933012834611626108139499445909269015533039004798306003108779604336338529",
  );
  setDefaultDecimalPlaces(69);
  t("-5.49917228329572412466369721832965852598720697e+21", "-6.722e+1", "81808573092765904859.620607234895247336911737131806010116036893781612615293067539422790836");
  setDefaultDecimalPlaces(96);
  t(
    "3.743288108766083001829171932243630367614086e+5",
    "-1.2e-17",
    "-3.1194067573050691681909766102030253063450716666666666666666666666666666666666666666666666666666666666666666666666666667e+22",
  );
  setDefaultDecimalPlaces(59);
  t(
    "1.03004592899429044724341075424874190958504596537552706275e+56",
    "-1.30600864954183927e+4",
    "-7.88697631792592438016988719211840758926755923193283270407174251308778354735118596966138695193620570484856047405e+51",
  );
  setDefaultDecimalPlaces(69);
  t(
    "1.807745724312185e+15",
    "-6.6119374252964801368765041516029903546210729e-20",
    "-2.7340635702267334235199774979281243960115145848991423604004334207025552290256477422540317419823568186494e+34",
  );
  setDefaultDecimalPlaces(28);
  t("-1.79070993135559973226997916060178546039393963e+12", "3.15759761671047747636203838961e+8", "-5671.1150334003792285643381104831");
  setDefaultDecimalPlaces(68);
  t(
    "7.252621244797407936789592217e+21",
    "1.49963120170920317797208697041165516275644222690091747e+14",
    "48362699.01914043966881560566920492333369956682197070003581403091132696952854",
  );
  setDefaultDecimalPlaces(52);
  t("1.5706894e+3", "-2.79124658012692836198838599451e+27", "-5.627196863161315228399760515e-25");
  setDefaultDecimalPlaces(14);
  t("2.460037979798871373696394377046322363542141753426602413e+20", "4.20065029656544611719608849306e+21", "0.05856326535466");
  setDefaultDecimalPlaces(49);
  t("1.963636265210493798072178898e+28", "-2.730662342603261890663879987178e+7", "-719106216310315390299.0577014697009763104053232147852362124609453945294");
  setDefaultDecimalPlaces(29);
  t(
    "6.15221204214457954015187445031985624e+24",
    "1.179236972139851849554374254492070883026032888616922024823e-4",
    "5.217112579993766254223542894529973252017290980497245322551e+28",
  );
  setDefaultDecimalPlaces(77);
  t(
    "6.8327131838964580112320204769414724438648465181e+45",
    "6.7411338067944807672742348106453586994830659556e+46",
    "0.10135851593703233037587488064289553990884563591079546757191938720994143267249",
  );
  setDefaultDecimalPlaces(76);
  t("4.541e-20", "-1.04084598715480354002841702185000783e+29", "-4.362797239976891550262920854e-49");
  setDefaultDecimalPlaces(7);
  t("-8.55076164579475782961862462411404944522483582344e+28", "-2e+0", "4.27538082289737891480931231205702472e+28");
  setDefaultDecimalPlaces(97);
  t(
    "6.23929300155879464979116960856976603466e+21",
    "-8.6426034475431815076662e+17",
    "-7219.2286033121513669488214827334463331502160114854590137208600261130038145019894126753606904329053074",
  );
  setDefaultDecimalPlaces(85);
  t("2.3844262990233995856817350567735686166e-9", "1.7241465370642325202065913918274367400589662435e+29", "1.38296035039077920151884666649249813442265864253e-38");
  setDefaultDecimalPlaces(42);
  t("-7.099345203925399603793e+8", "-5.3667632840641712e+14", "0.000001322835539440668138070321678972390796");
  setDefaultDecimalPlaces(35);
  t("-9.55068120261002380313706715271972225543675715794318593e+0", "1.31e+0", "-7.29059633787024717796722683413719256");
  setDefaultDecimalPlaces(51);
  t("3.64957489877081837175943532369348767e+35", "5.96297822e+9", "6.1203894499061550685312335816203730323200811556880045085926877660136749585512e+25");
  setDefaultDecimalPlaces(51);
  t("3.80731542e+1", "1.1807640122404446284807598426852064220898988133793547272786e+42", "3.2244507628e-41");
  setDefaultDecimalPlaces(2);
  t("5.48018991627536679855241921740298369867630724474803e+50", "9.6516478830671353367e+5", "5.6779836797505011755728840139675043305861675871e+44");
  setDefaultDecimalPlaces(26);
  t("3.5477549123128067546057e-8", "-4.722324158148e+1", "-7.5127305824430411e-10");
  setDefaultDecimalPlaces(12);
  t("3.25887040484592509354133272703238492479838146892676376223903e+59", "-4.28898025399232635791321e+19", "-7.598240634967856187881478314897832283083609044690661e+39");
  setDefaultDecimalPlaces(72);
  t(
    "-1.08612540441516143306756170682494810505895501033663711966e+19",
    "2.5867746281532017811034630549502155753512999e+23",
    "-0.000041987631724631081135772767768226308487674010427383656496771503817964",
  );
  setDefaultDecimalPlaces(67);
  t("3.7596856311367008527464915140228191947e+6", "-3.4e+0", "-1105789.8915107943684548504453008291749117647058823529411764705882352941176");
  setDefaultDecimalPlaces(59);
  t("8.01e+0", "-1.17694829165360823e+17", "-6.805736544930090376436026580982235317397856e-17");
  setDefaultDecimalPlaces(18);
  t("-1.88004430874512853917264052287349436434679495356e+38", "2.853196817977894561025655695427989274207409688259e+31", "-6589255.59182960780208537");
  setDefaultDecimalPlaces(3);
  t("-3.88498563677249024945156249588661408002373461225644e+22", "-1.8633926106262501026465231e+25", "0.002");
  setDefaultDecimalPlaces(77);
  t("-1.53694337539775154113397806325558070651082354194e+2", "-2.2009163177290275432101431e+6", "0.00006983197693693399953541143135540583036086772033217636395401191443999656537");
  setDefaultDecimalPlaces(44);
  t("-5.159e+2", "3.9277763641609228714324625344030467037447329e+25", "-1.313465819254223026033e-23");
  setDefaultDecimalPlaces(62);
  t("-2.25751414e+6", "-8.46098236390851483005122365762119755683201149377408300104095e+36", "2.6681466086370034000864403049811e-31");
  setDefaultDecimalPlaces(95);
  t(
    "3.2318722133615557172167944438938434155039246953963082171116e+38",
    "-1.893164795147981670597943859166217177284566168061920799e+40",
    "-0.01707126723275525653742197517741230003432800417853258091827048792536141517833969054709636416881",
  );
  setDefaultDecimalPlaces(68);
  t("-1.441e+2", "9.1938498875341515822239536509e-9", "-15673521077.97449879302988383088177175898038405760723230274526950840804126744856");
  setDefaultDecimalPlaces(44);
  t("3.1512236987333e-16", "1.755905092008822415289189892145e+13", "1.79464352206427e-29");
  setDefaultDecimalPlaces(16);
  t("4.09e+1", "-2.25382641445007838503423268532154519219280564871619165e+12", "-1.81469e-11");
  setDefaultDecimalPlaces(84);
  t("5.541713e+4", "1.7176540765083579685581358068697552387171503146924539e-3", "32263265.786701228510705876361265675333342001743896382864080086603971869450068129763473422959");
  setDefaultDecimalPlaces(68);
  t(
    "7.4033098988484926348023597268819228552218e+39",
    "-5.36008721093086281e+7",
    "-1.3811920604110454972053419556797679594744570838980138078123339178731405186503111379943972901724928416e+32",
  );
  setDefaultDecimalPlaces(47);
  t(
    "-4.32642312492038463608870073005006570935822259258e+47",
    "7.4914234541120441464937e+15",
    "-5.775168299351186637370496537711828468286787245641125805352887608038776560823762e+31",
  );
  setDefaultDecimalPlaces(64);
  t("5.54325918789054e-9", "-2.432711041897339910076434269372582e+33", "-2.278634450381413123696e-42");
  setDefaultDecimalPlaces(59);
  t("5.259061105541391529626692380608884718528471556301921526e+9", "-4.1330480922773538558166061905184293652784226e+19", "-1.272441304365174327993447289114418895009717959186e-10");
  setDefaultDecimalPlaces(91);
  t("-5.0147040366349582e+8", "-1.924198117470588687477055617242284678498e+5", "2606.126672250841034320859391409028455554295102870455952988571847835003645321565111778792407282");
  setDefaultDecimalPlaces(20);
  t("-3.4392912734453409630523647414714684748e+1", "-1.26168843475734241674707031797e+7", "0.00000272594340940187");
  setDefaultDecimalPlaces(67);
  t("1.775096e-3", "-8.34008e+4", "-2.12839205379324898562124104325138367977285589586670631456773e-8");
  setDefaultDecimalPlaces(16);
  t("-1.70203927309719976858256243706811513338022819e-9", "-2.80230927877111706583707643039131671591385244827e+47", "0");
  setDefaultDecimalPlaces(19);
  t("-4.5259309574214136414827069705902868558669237340946837e+42", "9.41682847e-7", "-4.8062157783165117389917870836934623020343958055494704152766626745193e+48");
  setDefaultDecimalPlaces(47);
  t("2.6e+0", "-3.8994892435565e+12", "-6.6675398689616321280163233215409375e-13");
  setDefaultDecimalPlaces(39);
  t("-7.749165020875413109923e+10", "7.14698409837067830852430635870035603861563931114e+48", "-1.1e-38");
  setDefaultDecimalPlaces(93);
  t(
    "3.7368232988575538202927041171e+8",
    "-2.75858709346217194267970173100835006552888436042700349032e+16",
    "-1.3546149431764519607363687262818468338470795612317619958809419733783499676425070357688e-8",
  );
  setDefaultDecimalPlaces(100);
  t(
    "-4.70144683503972560602681822988600860766986396339979168443e+2",
    "4.94255432813381296060137925671484176e-14",
    "-9512180388748253.5408309627842715125802600689820750011606730826836149060758909130422140394674299622551957599166248507",
  );
  setDefaultDecimalPlaces(31);
  t(
    "4.833274921671943531847631640359337795987482548892871241e+50",
    "2.243867086959452009094940877673e+13",
    "2.15399341153546838271714847053661536098468431852351695385005352949481e+37",
  );
  setDefaultDecimalPlaces(34);
  t("3.10322602612e-14", "-9.7502010491943022288061457815667185332054e+14", "-3.18273e-29");
  setDefaultDecimalPlaces(4);
  t("-1.46954509290221435467582840611935e-19", "-4.852091074002833179924142957628084719413788004523375e+21", "0");
  setDefaultDecimalPlaces(48);
  t("9.10767700893292854253128375036e+9", "1.3712549968095477867729e+0", "6641855110.919157910889686358076504662928589137005524488208");
  setDefaultDecimalPlaces(81);
  t("-1.301782e+4", "4.061256953387934936735556528028621387474424507651e+5", "-0.032053672420653966096725165911416229856731913185062558847174327478369661302241083");
  setDefaultDecimalPlaces(97);
  t(
    "1.5241545880477397929308732069403903169129580649169052024032e+41",
    "7.4844581872673787976022566465379297523e+36",
    "20364.2608444341901317704283602732856269273488603497031417459903923899792942382568649340629408773845416",
  );
  setDefaultDecimalPlaces(61);
  t(
    "2.3702481476211643345346173340727596507031097451603e+44",
    "-2.5515772072278866955156725324935e+1",
    "-9.2893451975779172120366725078100324555089480913273592283669127142601495879243411256172561983696299007055e+42",
  );
  setDefaultDecimalPlaces(88);
  t(
    "2.5217120482524e+3",
    "-4.5709667042016792368271615357261554749379833814823706e-15",
    "-551680248717282616.3001689150325794811557248129964332212556742553965159438102199716381368517583701487866903",
  );
  setDefaultDecimalPlaces(63);
  t("-1.4435036196366327768546465626559056e+26", "2.4898428342115480800317254e+21", "-57975.692272710989635365277030052279321919047863056846634176995045869");
  setDefaultDecimalPlaces(0);
  t("-4.710154042877820733780478697990056965611237618e-6", "-2.133372246070006738122101127984e+0", "0");
  setDefaultDecimalPlaces(53);
  t("-5.300585345138353865964890032561375309848625e-17", "-1.2372972657223420250545202932992887844e+37", "0");
  setDefaultDecimalPlaces(34);
  t("-4.580723182315381073614307e+12", "-3.998171149836207872438801079e+2", "11457046261.0212133412054693368514276463406248");
  setDefaultDecimalPlaces(67);
  t("2.58720826390596e+5", "-1.77649151779706478475603768656535589178e+38", "-1.4563583546485057837314916603166214e-33");
  setDefaultDecimalPlaces(34);
  t("-3.59349037837352426937998662339444880168e+27", "1.983369422187848e-16", "-1.81181092043334890720041709802797637900139043948482674990219460219366664631735e+43");
  setDefaultDecimalPlaces(64);
  t("3.236e+2", "8.959859087925596679365e+21", "3.61166394275203357867344708386471077293146508e-20");
  setDefaultDecimalPlaces(8);
  t("-3.280825049e+9", "1.0019227421636820157311759488766774650290589072821456e+53", "0");
  setDefaultDecimalPlaces(61);
  t(
    "1.7852162486170823947009990462494170178866977986445964815888e+58",
    "-9.595e+1",
    "-1.86056930548940322532673167925942367679697529822261227888358520062532569046378322042730588848358520062532569046378322e+56",
  );
  setDefaultDecimalPlaces(88);
  t("-3.03779422189910372366173387406768998994511773589e+3", "3e+0", "-1012.59807396636790788724462468922999664837257863");
  setDefaultDecimalPlaces(1);
  t("2.08230298735108e+8", "-2.43770740471742271860171990691884497332e+3", "-85420.5");
  setDefaultDecimalPlaces(90);
  t("3.225927663302111958748716663e+6", "-1.064250516493486838e+13", "-3.03117321843635157020894338223769630850570701937178683788001298649553463584637990576e-7");
  setDefaultDecimalPlaces(46);
  t("4.36037406844673921424706943740698077948048416719196031160895e+1", "-4.656250848904408001283916990082727491367e+15", "-9.3645600504378171990511734653226e-15");
  setDefaultDecimalPlaces(65);
  t("-1.6570863433e+1", "-1.92314775643179537770342245243769044644329652579968168088e+56", "8.616531609e-56");
  setDefaultDecimalPlaces(40);
  t("5.5075124e+7", "-2.8693076264926310601142301200773306536823404149e+42", "-1.91946e-35");
  setDefaultDecimalPlaces(15);
  t("-7.9724672380635013520948e+22", "-1.8550274156203318613864283069930689433934e+40", "0");
  setDefaultDecimalPlaces(59);
  t("2.70340455671e+2", "1.55610090575645523901993565618716429e+30", "1.7372938648832769326047355185215e-28");
  setDefaultDecimalPlaces(17);
  t("1.2416838903939e-3", "4.509496117029056761254471253355481028123589329301440475685e+11", "2.75e-15");
  setDefaultDecimalPlaces(69);
  t(
    "-1.988455386391767666386252390718261766281367e+42",
    "-5.13051463742614896111e+15",
    "3.87574254614996296799199463196227052643067074334219404864827258399273013097056345829002264013195e+26",
  );
  setDefaultDecimalPlaces(38);
  t("6.655472272415205750584901362e-4", "-6.82081479878453e-19", "-975759123910124.5928747311099696548603305893004287437");
  setDefaultDecimalPlaces(9);
  t("-2.3977750246607900781778711537648662980400454487760206318326e-11", "-5.675772510438411089505639630459362199287983718005889e-14", "422.457915685");
  setDefaultDecimalPlaces(89);
  t("1.511432080117204223760545975173882777e+23", "3.2e+0", "4.723225250366263199251706172418383678125e+22");
  setDefaultDecimalPlaces(57);
  t(
    "-2.454439266626048643805792094903856661690111014162401020316e+57",
    "2.853492122325709599315571e+24",
    "-8.60152809752838216103206255180435049053587308462198270509330144257250618942644105575100217e+32",
  );
  setDefaultDecimalPlaces(35);
  t("3.4066677729615174676501761578461374441068423e+16", "2.11937497846920083090649851594309377558494e+18", "0.01607392654707149939027249826996042");
  setDefaultDecimalPlaces(52);
  t("2.8492335787546331435655473549531411553919091616473553e+22", "4.508853776016525032437211730937e+30", "6.3191971181462209605931945301837898671476806e-9");
  setDefaultDecimalPlaces(51);
  t("-2.5789533e-8", "4.2866630261e+6", "-6.01622587149409803243316336121930655e-15");
  setDefaultDecimalPlaces(45);
  t("-2.9851543664993054664610953168396e+4", "3.49158482e+5", "-0.085495685208624130358691825130560626048316936");
  setDefaultDecimalPlaces(11);
  t("-1.4610486979742973697173368202892016869e+4", "1.4638349865412470994789524489255812774e+19", "0");
  setDefaultDecimalPlaces(12);
  t("5.8546935e+0", "-2.4043219564791e+13", "0");
  setDefaultDecimalPlaces(55);
  t(
    "-7.53272177026986218958899012546827963530061755827838195161441e+59",
    "-5.146067e-4",
    "1.4637822963186958486139006984301369638795253847799459182351123683387721147042974761113681574686066077258613228315915825e+63",
  );
  setDefaultDecimalPlaces(13);
  t("5.5249989493214976468445142770881446493502691130491053e+50", "2.487951404802024151447277037855074978761231559e+16", "2.22070211606932211469627390136489886759528813708e+34");
  setDefaultDecimalPlaces(44);
  t("5.827214824259527993589956775761207092682054144001851748e+12", "-3.88270636e+7", "-150081.26507561926453768594480477805415813247705917");
  setDefaultDecimalPlaces(95);
  t("-6.0811063226e+6", "1.7463395762422438931011921275885265e+3", "-3482.20151757956721002504860001667363602145128316947242113216259855753999143748634581575464809494316");
  setDefaultDecimalPlaces(77);
  t("-8.26143778e-11", "-2.468642876776884751861368779865229e+28", "3.34655038917023007718266604569747631499e-39");
  setDefaultDecimalPlaces(43);
  t("2.670129869859190211360498620184212005728394465388008644174e+36", "-5.3e-4", "-5.0379808865267739836990540003475698221290461611094502720264150943396226415094339623e+39");
  setDefaultDecimalPlaces(74);
  t("5.644e+1", "3.3625827156387946363862310732374407662e+29", "1.6784717216771279533763640978673942967878581971e-28");
  setDefaultDecimalPlaces(90);
  t(
    "1.70191841192805632291155832714489467053342e+39",
    "2.70078099830698e+14",
    "6.301578739612453607624705401226432444436840549855934186339837882507716224248916784433058842749877639820628863195172e+24",
  );
  setDefaultDecimalPlaces(91);
  t(
    "-6.0836080751992827805323607916267756086725e+16",
    "-1.46292772975009311105e+20",
    "0.0004158515797795783477430516890878299657811751576101154635392480205043215832860593987847625",
  );
  setDefaultDecimalPlaces(61);
  t("-1.58e+2", "-3.16864631307525605353219596830380810101028295e+1", "4.9863564560052387555998771332479948705464410466561170981327763");
  setDefaultDecimalPlaces(60);
  t("7.8785300490435273137936995486102657735703652016367628462e+1", "-2.952801569115018391483787523734392454479403940050661e+26", "-2.66815424763025805070636359049590437e-25");
  setDefaultDecimalPlaces(95);
  t(
    "-4.947308489820310030877825856076984874216e+35",
    "1.8276683070265940722463721682846311669408475e+43",
    "-2.706896251798014373728523286959856375723201394794953079343784653367335977363479680898307e-8",
  );
  setDefaultDecimalPlaces(50);
  t("1.936219057608711e+1", "2.44786051747062542533720387203949571e+4", "0.00079098422634366699581109857012031667098288330093");
  setDefaultDecimalPlaces(72);
  t("-2.5214449769609e-1", "1.12467039615900279022690737223333020153e+38", "-2.241941270591090656262956026184921e-39");
  setDefaultDecimalPlaces(94);
  t("1.31799923036828615068e+7", "1.463358554367143433644223388926006517594642e+42", "9.0066732205510588588771857164913630877235551193249391422658e-36");
  setDefaultDecimalPlaces(89);
  t("1.445036555006734142425956e+24", "8.61408916e+3", "167752681469428178338.70156969677801663246308910970222648589348940521066071714539810962439585429134332294280548");
  setDefaultDecimalPlaces(18);
  t("2.91981868598759530307400517756518258769535652839974072391e+45", "-1.712391112881918957805619813383619838554537e+26", "-17051120296189815069.36604483185121176");
  setDefaultDecimalPlaces(14);
  t("2.44545283409603686595689958173e+25", "-7.314891344019059515334837e+11", "-33431157334900.59957612462271");
  setDefaultDecimalPlaces(18);
  t(
    "1.210509201409025103368327754443648590642528642584619152342e+49",
    "-2.312591123589183748004393549919782661976446999029916e+9",
    "-5.234428122902645533320199676620459270290821247220874285639e+39",
  );
  setDefaultDecimalPlaces(72);
  t(
    "-5.0563469355100710159480758627726585983440031242079905192449e+19",
    "-9.1826704243427024800963180657397641986236e+40",
    "5.50640140814158144509976377461567949818422496245913e-22",
  );
  setDefaultDecimalPlaces(69);
  t("8.065884655963527144034e+9", "-1.4313252e+3", "-5635256.513309153743701291642178870322411706298470815716791683678873256755348");
  setDefaultDecimalPlaces(51);
  t("1.22042e+2", "1.19180691968741288093839627e+8", "0.000001024008150850551998615660135997329052149011503");
  setDefaultDecimalPlaces(37);
  t("-8.00541187833212685703633343844540612493001218e+4", "2.037257838e+4", "-3.9295035360821750128597779572982092633");
  setDefaultDecimalPlaces(28);
  t("1.0022441023238058520964432545430711936087e+7", "5.4017229576055829247e-15", "1.8554155964490073194867938427083964235586948345182e+21");
  setDefaultDecimalPlaces(86);
  t("6.1470990574360165672958e+11", "1.8319732e+5", "3355452.50194490649060575776981890346430832066757308458442514333724969339071117415909796060335");
  setDefaultDecimalPlaces(27);
  t("-2.497251183908550550394985915285506202506e-4", "-1.082910794038041467095693967e-3", "0.230605438384874466255520865");
  setDefaultDecimalPlaces(90);
  t(
    "-2.399558272735522834067410167891e+7",
    "-3.51055237299431764581524862952140622741555484934e+2",
    "68352.726801475548819542009018293724474617745332794189637180942944541624030353565688691528801373",
  );
  setDefaultDecimalPlaces(35);
  t("-6.6709834661737e+2", "-1.53079393755942742921714658136498878652912078936128949e+14", "4.35785856116556750396589e-12");
  setDefaultDecimalPlaces(77);
  t("-3.971100584525773299648508e+15", "4.2557739410440013558393048566650948e+22", "-9.331089102800432891814753056268699280266190186937527352876732088044632e-8");
  setDefaultDecimalPlaces(16);
  t("5.145647151928981105729910990371365029e-19", "8.4776551316079409151973896624127521806e+23", "0");
  setDefaultDecimalPlaces(65);
  t("5.08678934791363123482228249492450171576766882208029e-11", "9.321928325682839668974984091623003062e+37", "5.4567994627238451e-49");
  setDefaultDecimalPlaces(69);
  t("-2.27e+1", "5.74227696834955604937579111e+26", "-3.9531356855683728676436528189713288242502932e-26");
  setDefaultDecimalPlaces(30);
  t("-1.600648404340035e-14", "-1.1357458441956498326718575128378702382568428539556123848664e+58", "0");
  setDefaultDecimalPlaces(83);
  t("5.4238490988935856169e+3", "-1.821972716987196367e+2", "-29.7691016354099493472708728799208719479108203975707750738505763780715991241614722834");
  setDefaultDecimalPlaces(77);
  t(
    "-7.7004950204184616166051064324336848593033691614303351e+53",
    "-3e+0",
    "2.5668316734728205388683688108112282864344563871434450333333333333333333333333333333333333333333333333333333333333333333333333333333e+53",
  );
  setDefaultDecimalPlaces(74);
  t("-4.7626401782627769163506536e-14", "-1.937e+2", "2.4587713878486199877907349509550851832731027361899845121322e-16");
  setDefaultDecimalPlaces(39);
  t("-8.2811726145606532063138e+6", "-2.60578217773499657231825035419178756e-4", "31779987925.770646588232149031940605901497709515733");
  setDefaultDecimalPlaces(34);
  t("-1.570545450214771774294195555241139447e+3", "-1.24271965749388151497069463097060148099564e+41", "0");
  setDefaultDecimalPlaces(8);
  t("7.24128450445690096135730470618028203265861207314189988915e+56", "-5.05574662182767523686750688909e+17", "-1.43228785896694006185330708436905360095737462279e+39");
  setDefaultDecimalPlaces(65);
  t(
    "2.2276141284031121913623741299814477550690186679485919e+29",
    "1.6401318697168312270479816e+13",
    "13581920878031043.79831799276804011417418869180511189358613489895771382841127421871",
  );
  setDefaultDecimalPlaces(46);
  t("-5.630472636914136101e+11", "1.722938108809247492601539449741434575012431431e+18", "-3.267948284460115467971963372868690037506e-7");
  setDefaultDecimalPlaces(98);
  t("3.20796464055e-13", "2.206642e+3", "1.4537766618010533652490979506417443336979899775314708955961139142642984226711899801e-16");
  setDefaultDecimalPlaces(66);
  t("-7.516092e+2", "-2.0359134821011104974873537352286369756569453309566952e-4", "3691754.127117040675703037893981697185001396700976385311060156739921225034");
  setDefaultDecimalPlaces(30);
  t("-1.472183680784395343812145174496032124893864306050614e-10", "5.5e+0", "-2.6766976014261733524e-11");
  setDefaultDecimalPlaces(79);
  t("-4.6118190589190824203890086267338e+9", "2.79287899091202958905200181462007226393938e+41", "-1.65127779396309190343766157771998966415224297363e-32");
  setDefaultDecimalPlaces(49);
  t("-8.91393439461328756e+10", "-7.8419478021407822144572877491583966016156654938405223e+35", "1.136699021661412042456627e-25");
  setDefaultDecimalPlaces(81);
  t("0e+0", "7.54885106574473483963677998e-16", "0");
  setDefaultDecimalPlaces(91);
  t("-9.90671655510311389968075650407224464e+11", "3e+0", "-330223885170.1037966560252168024081546666666666666666666666666666666666666666666666666666666666666666667");
  setDefaultDecimalPlaces(10);
  t("-4.89374976833268254481884316552813e+6", "3.60085784610467e+14", "-1.36e-8");
  setDefaultDecimalPlaces(19);
  t("9.9943195369307e-14", "-4.92461408e-1", "-2.029462e-13");
  setDefaultDecimalPlaces(29);
  t("-2.11465768345189550548018227198063303652e-20", "-5.33739652082994653789335157733866325606759866539677e+4", "3.962e-25");
  setDefaultDecimalPlaces(100);
  t(
    "1.780907607930086969484359589883288322877732273e+45",
    "2.6775375787095198562934788733571850264e+38",
    "6651288.9383551531701921988714134092171601712735797947586954461469366986980282640872923761008978364407194566",
  );
  setDefaultDecimalPlaces(5);
  t("4.006801060853298212037100397717114791e+5", "-3.0707399227508493168237142705194309e+31", "0");
  setDefaultDecimalPlaces(41);
  t("-5.34065048819370515810143746075521925325751888512598e+24", "1.58488116957966457610852947667764790325006886029529e+48", "-3.36974821248594284e-24");
  setDefaultDecimalPlaces(30);
  t("-1.43624914570314629698511107165834833032412294953947274195e-7", "-2.2912524e+3", "6.2684021441860630325e-11");
  setDefaultDecimalPlaces(86);
  t("-1.780331010951301268735e+4", "-2.28269353703306026e+15", "7.799255493864031242016184287505967570997305522467627076883332152376964937e-12");
  setDefaultDecimalPlaces(65);
  t("8.127060577320773499602522423538930421927887e-1", "2.52427823352079974787187262304752625896e+38", "3.21955815702033525524105763e-39");
  setDefaultDecimalPlaces(60);
  t("-5.131975425063449918209402763285180961304033794699713e-18", "3.626500771659666584865e+2", "-1.4151314857475691307033146673384861550235e-20");
  setDefaultDecimalPlaces(30);
  t("-9.77056675e+6", "8.83029496364992693007341029701720944614900299782226e+33", "-1.106e-27");
  setDefaultDecimalPlaces(36);
  t("1.6764597e+7", "-2.760161492844951e+4", "-607.377395976943751192615145898879397835");
  setDefaultDecimalPlaces(47);
  t("2.7125097781175597106e+14", "3.935686318e+2", "689208833974.34411860056170259044511585488607529823976180004");
  setDefaultDecimalPlaces(13);
  t("-2.52823e+2", "-1.21980698224669983006210365951644558111335e+38", "0");
  setDefaultDecimalPlaces(46);
  t(
    "5.6810808021411841668830171755844828521897e+40",
    "1.20674097768774397711640761341060877503758796015e+8",
    "4.707788089724768882721423831129300393512324612800075799797472664745486848229197e+32",
  );
  setDefaultDecimalPlaces(46);
  t("2.0318542809683876291e+18", "-4.94e+0", "-411306534608985350.020242914979757085020242914979757085020242915");
  setDefaultDecimalPlaces(96);
  t("3.2732975741145707065852752119311781041717782e-5", "1.087237976790322e+15", "3.0106541934616754622083371168850348336995209043000970744897331289457508188302e-20");
  setDefaultDecimalPlaces(58);
  t("-4.3812153181327548094659471637127595232638502909e-10", "-2.48290909171421602898139532289793005960216e+23", "1.7645492268538660998121045e-33");
  setDefaultDecimalPlaces(24);
  t("7.9171320493278402186e+19", "1.06010519924693658145392723e+26", "7.46825131595610236e-7");
  setDefaultDecimalPlaces(23);
  t("-1.812e+0", "-6.294e+1", "0.02878932316491897044805");
  setDefaultDecimalPlaces(31);
  t("-1.143703936322538519545152702247e+12", "-2.59302676095409193659285444286960376446596e+35", "4.4106908e-24");
  setDefaultDecimalPlaces(31);
  t("-3.38997272244824e+14", "1.8247696261379668626452503e+25", "-1.85775380842070830013e-11");
  setDefaultDecimalPlaces(27);
  t("-1.3757302352499904903e-11", "-5.8516761142421549660285e+5", "2.3510020179e-17");
  setDefaultDecimalPlaces(80);
  t("-4.586164131e+2", "-1.145325164353974956751277005482206e+33", "4.004246369271772207927814689259055050359534622702e-31");
  setDefaultDecimalPlaces(89);
  t(
    "8.6817237621477175705886139105463e+28",
    "2.96339885788041697396234405217733452074293947745015797006e+14",
    "292965077551435.50357534037927004661839519571186531048878400826643062015648745311891389074636684895902761",
  );
  setDefaultDecimalPlaces(44);
  t("-7.08343758202000245920509e+4", "-1.2310242379978541167150960543e+0", "57541.00823831504516633735077661309035968777966638");
  setDefaultDecimalPlaces(91);
  t(
    "-2.427436536295844237315413317281746939002949676e+28",
    "2.1632850586296419783571007248445832315781358021569707141e-4",
    "-1.122106643603193042675494089689259883365233577456402720210777976452023034757454896179596861580582885326876039300479967394787e+32",
  );
  setDefaultDecimalPlaces(69);
  t("1.5784564894653167173172e+3", "1.850876642487776e-7", "8528156081.453934795717588131453688598438774608625661329461528435756537850198025");
  setDefaultDecimalPlaces(64);
  t("2.3e+0", "-9.76130959732035212571407723e+3", "-0.0002356241216477130975032061353967045694261077763768886013435295");
  setDefaultDecimalPlaces(13);
  t("4.26873613048067e+9", "-7.699630433085369901983e-18", "-5.544079248450521378156877401043113324589e+26");
  setDefaultDecimalPlaces(58);
  t(
    "5.3458126001497496016295295738038667473004634170411e+41",
    "4.56535896258030043615942994291e-7",
    "1.1709512097441607711839726624571617173985473141486718027118869151594501628570062804431808656523340336300428e+48",
  );
  setDefaultDecimalPlaces(81);
  t("-6.85888519878e+2", "1.5768023552892115e-3", "-434986.996041236099241125274628553746443868057363694927591454380120382361772800647915157");
  setDefaultDecimalPlaces(9);
  t("-2.76942952958678475432773469781e+24", "1.441838934111137463392312195278632524940880129629899855212e+50", "0");
  setDefaultDecimalPlaces(46);
  t("-5.175343717154348079e+18", "2.01953667266412220880571208351981861335441e+41", "-2.56263913758355486528944e-23");
  setDefaultDecimalPlaces(33);
  t("-8.164825355042564107626826226809e+30", "1.1600383725509e+7", "-7.03840971836844048274090399215435262405454906745821759656e+23");
  setDefaultDecimalPlaces(3);
  t("-3.396785256561391205707980293178282334799893673063799265139e-11", "1.955325174080252200251209708e-15", "-17371.971");
  setDefaultDecimalPlaces(8);
  t("4.3040124338608108131294860541096603438313960520331763e+0", "-1.6202911722844801005909531593903086405769e-10", "-26563203623.41109225");
  setDefaultDecimalPlaces(9);
  t("2.277716316868940966538288935534443804634160609563e+18", "8.814547008305608455670850297705474616860273295e+45", "0");
  setDefaultDecimalPlaces(1);
  t("1.50761829185622167391e+20", "2.52926335e+8", "596070113401.3");
  setDefaultDecimalPlaces(94);
  t("-3.92075648420481e-3", "-1.04501e-7", "37518.8417738089587659448234945120142390981904479382972411747256007119549095223969148620587362800356");
  setDefaultDecimalPlaces(27);
  t("-1.4421579e-7", "-1.36607851026784567e+13", "1.0556918e-20");
  setDefaultDecimalPlaces(68);
  t("-2.9333e+0", "-2.5780506480758045e-2", "113.77976620394735616256708725443732369769215096341982158850644975163966");
  setDefaultDecimalPlaces(1);
  t("-1.26487710083915540709602256951265727e-2", "-1.491905277807284107187180479826091833e+24", "0");
  setDefaultDecimalPlaces(72);
  t("1.29e+2", "3.409387060956936821927336709416386459e+15", "3.7836713078799758228154025980246306570935142135700672295646e-14");
  setDefaultDecimalPlaces(33);
  t("3.5976448359285947e+8", "2.43753683745981553832546199927313637e+31", "1.4759345503e-23");
  setDefaultDecimalPlaces(47);
  t("9.56134654273128855414e+20", "-5.9072311366610803e+7", "-16185834482406.26777906062956104012946000268422619286984861653");
  setDefaultDecimalPlaces(57);
  t(
    "4.914299030429498449561833698171120520680516986e+45",
    "-1.000230369732143635e-13",
    "-4.913167185421016113004035329188025608828894014793631448895996174412265444741470340921120611719120385018563260910057e+58",
  );
  setDefaultDecimalPlaces(45);
  t("4.91077002940565983e+17", "-9.7010628302110189262590444839165728015944744951e+0", "-50620948604853433.856091163208512483207523224858284798232188517");
  setDefaultDecimalPlaces(80);
  t("-9.047828251e+0", "3.54481958541972245888790816256966801076129847185982335684e+22", "-2.5524086721408409156152373364027048980223351011548395959582e-22");
  setDefaultDecimalPlaces(53);
  t("8.75495024044859e+3", "-5.1971155230170613405612247398006140498370353905e-10", "-16845787248088.94117913923031709708763977909312645400096130512132431");
  setDefaultDecimalPlaces(98);
  t(
    "-5.31358586069858963044934070543963687376931625804461e+50",
    "2.68166358888e+7",
    "-1.981451321012944472272093799201853625821646151732571977807432816412413890581220725546326716026258134022474127750368204492201942836262387399836e+43",
  );
  setDefaultDecimalPlaces(14);
  t("6.542e+0", "-2.6618511473135798434733128e+4", "-0.00024576881418");
  setDefaultDecimalPlaces(83);
  t("-3.2026014229045373e+16", "3.2088806418796935307503272694816049915600270570838565e+37", "-9.9804317465311579840969691827686162841731176775451748060014286e-22");
  setDefaultDecimalPlaces(63);
  t("3.33878754852528489843711831875224e+2", "-2.23015648362964151238e+13", "-1.4971090921347884920896473836277858870012265606196603e-11");
  setDefaultDecimalPlaces(17);
  t("5.24547340333516247616018475633493719522527094256e+13", "-1.51985172844061169945768139074446637152007e+14", "-0.3451306009117803");
  setDefaultDecimalPlaces(84);
  t("-6.8708413380661052775342386943858186094564007e+0", "3.219738014255e+11", "-2.1339752823510135382507957810917300569157455478259557814148232980235329355e-11");
  setDefaultDecimalPlaces(75);
  t(
    "-3.17583318022588743980960666478372985581064488543e+37",
    "-5.7413175608167163e+0",
    "5.531540707485473933300276822396469162166157453779922234284396715817181582014014215564374349242033873784215184594e+36",
  );
  setDefaultDecimalPlaces(62);
  t("-1.7913243533976793305110667048178805544621257295409749726e+7", "5.84749013772197606609850816670643777711562994427198888821029e+38", "-3.063407224651653415554776414195e-32");
  setDefaultDecimalPlaces(5);
  t("1.06019160744844100000620969309095665182705e+8", "-3.6322926611232737948791991496649263561554784372210177384432e+58", "0");
  setDefaultDecimalPlaces(22);
  t("1.540588117423307e+14", "-1.5293377078538303e+7", "-10073563.9323590913629154749624");
  setDefaultDecimalPlaces(100);
  t(
    "1.4944057662157449886e+12",
    "-6.39956510965166117754234781601221733221385297953075263e-2",
    "-23351676881323.0801689978682742075890231684717874568906474558462568542672195863565379996478954664368055077878165369",
  );
  setDefaultDecimalPlaces(37);
  t(
    "-1.1052988032546252078178061894077897399513868970767e+27",
    "-1.6160665854862096973728184471228698787400039411939459191e+1",
    "6.83943850569798815073120360255119252666641234039746352916638354e+25",
  );
  setDefaultDecimalPlaces(23);
  t("-2.5445777993977439893431498734e+8", "-1.330927382569460016703285678860301110742325646853191e+51", "0");
  setDefaultDecimalPlaces(23);
  t("-9.6009143255333933e+8", "1.375e-6", "-698248314584246.78545454545454545454545");
  setDefaultDecimalPlaces(66);
  t(
    "8.02068765396201924723563851525806713384549474239668395474e+56",
    "3.88904e-9",
    "2.0623824013026400467044922436534638712498443683779760441497130397218850924649785036924279513710324398823360006582601361775656717339e+65",
  );
  setDefaultDecimalPlaces(89);
  t("5.89609117179496950939e-17", "-1.856084935301990255038e+19", "-3.17662789005701338915875565912470844672321178250749847e-36");
  setDefaultDecimalPlaces(1);
  t("3.17152027999253351511900340221538749120561852233208e+50", "8.771e-13", "3.615916406330559246515794552748133042076865263176467905597993387e+62");
  setDefaultDecimalPlaces(78);
  t(
    "-1.12138599998462688206128810986477659e+14",
    "-7.03733080920029079562986277851744044150309489e-1",
    "159348200388502.001458673823000761523144480293858320309503683646171029957069854167957524413372",
  );
  setDefaultDecimalPlaces(31);
  t("1.8703277241783163701663429765246e-4", "1.9830919301907118520713263110242217229336335045518e-9", "94313.7176700854676182561660488977863");
  setDefaultDecimalPlaces(77);
  t("-6.3731180012476792916829534829292978498345e-19", "1.14668942119266641326695617698314051e+35", "-5.55784145511609277593513e-54");
  setDefaultDecimalPlaces(66);
  t(
    "3.26882576995423742887628695048389160287309874795699007890926e+59",
    "3.904041597700124923e+10",
    "8.372927613988299158927926206031543195973654776588096847730712458329882957795915611903794562079651414333064375305943e+48",
  );
  setDefaultDecimalPlaces(39);
  t("-3.94e-18", "-1.5e+0", "2.626666666666666666667e-18");
  setDefaultDecimalPlaces(35);
  t("1.4239376558e-13", "-3.304893554579487423285418e+8", "-4.3085734299276e-22");
  setDefaultDecimalPlaces(3);
  t("1.29233936168642992097256920092959937207015873646554e+18", "-2.574223e+0", "-502030850352292680.538");
  setDefaultDecimalPlaces(47);
  t(
    "-7.630979835368676786259259241281105143269772914554211e+51",
    "-3.102302e+6",
    "2.45977981362506834803937825565696219880262234771283098808562158036193768369423737598725075766e+45",
  );
  setDefaultDecimalPlaces(34);
  t(
    "-4.09576530452997710305010929304648199600453725604113800549e+56",
    "7.7080390617962751879782328383862137191482214193797712172558e-17",
    "-5.3136281117593393066179095502116161314650902269802313042040845262679321160279610812254006955769426830215395e+72",
  );
  setDefaultDecimalPlaces(8);
  t("-1.17390585725433809510949496132274564e+0", "-3.00652613510221430288349800620134849516e-17", "39045257034309075.04227652");
  setDefaultDecimalPlaces(62);
  t("-2.11241089382356338e+0", "-1.243843307338814173e+19", "1.6982934115254740059172484305952456811767239e-19");
  setDefaultDecimalPlaces(2);
  t("6.87796567879042143032337504943486743854160122116e+24", "1.288268105367801951209662077857678804e-1", "5.338924133984326745777490425e+25");
  setDefaultDecimalPlaces(82);
  t("-7.45854683527526303599886079542478061879465034408644e-17", "2.954911780919933241e+11", "-2.524118277721727018228264792199240178568245380536787223e-28");
  setDefaultDecimalPlaces(28);
  t("-7.3e+0", "4.809122211942143549336295215436637902520979752555705768021e-12", "-1517948531620.2696481462865458661785669152");
  setDefaultDecimalPlaces(94);
  t(
    "1.884216424287310106695876747601000810006578322904e+35",
    "5.319615400790114838245368921384602786e+31",
    "3542.0162593097428553146498709263566211362279618900876229506975330677035141225275006629066508443193",
  );
  setDefaultDecimalPlaces(58);
  t(
    "-1.250779009200020958791021061455160351870438626981719301e+27",
    "-2.966705453e-19",
    "4.2160538988971917961112840596351590414204784453932754509957075944337100323521736554410816327171122100607e+45",
  );
  setDefaultDecimalPlaces(35);
  t("-3.6212094318383245433035823486782741289302757085e-1", "4.1271927090286737564713500115722427755070560151845e+17", "-8.7740255595929483e-19");
  setDefaultDecimalPlaces(69);
  t("-1.760826678270304533668282933e+25", "2.034812245575039752971e+21", "-8653.509345146944238345337133297222510610089172516432294093978666403175535");
  setDefaultDecimalPlaces(29);
  t("-7.508694159630209228545177515581271788018e-15", "-2.7352712080446093695492070302e+20", "0");
  setDefaultDecimalPlaces(92);
  t(
    "7.8421248798067371263362e+22",
    "-5.962968246252405344010287366676073497558909966817912e+8",
    "-131513778976356.95912256912652333250938147335808574502325998018750055194411853254035872252329224585392345284",
  );
  setDefaultDecimalPlaces(94);
  t(
    "-1.457718829514469265375082332428510841210570781482e+12",
    "-4.324475977907346246707469402940519514791150114113e-18",
    "3.370856577679205498290691726217365781657316008686682520047777708046473027986167252887141571949842739690640513100966766973606e+29",
  );
  setDefaultDecimalPlaces(13);
  t("-6.7795714910624e+13", "-1.43134144850696763717106532654533549229839616011120591e+51", "0");
  setDefaultDecimalPlaces(99);
  t("1.792534612e-6", "4.7528677376661949143007e+3", "3.77148010619834741129561481240435203696823705393513495904919193047166735789261487954999069e-10");
  setDefaultDecimalPlaces(89);
  t("9.784779465956546252482e+20", "-3e+0", "-326159315531884875082.73333333333333333333333333333333333333333333333333333333333333333333333333333333333333333");
  setDefaultDecimalPlaces(71);
  t("-6.940597011610061397569335044935736237210741724104481e+11", "-8.352596361e+9", "83.09508458971086388846193934901359035288765971896676691330421635347596081");
  setDefaultDecimalPlaces(12);
  t("5.29059066645847007570591e+19", "-2.302486572414940853650742e+5", "-229777264712101.449424400425");
  setDefaultDecimalPlaces(32);
  t("-5.8e+0", "-2.59463016929367066347254580372543895446868375185943726e+12", "2.23538601710582850516e-12");
  setDefaultDecimalPlaces(33);
  t("6.182219224857168026963043425263603e+33", "-6.223256156437030198340952400851e+17", "-9934058745858603.960957890498888160144013332424541");
  setDefaultDecimalPlaces(80);
  t("-3.43611295960683787724232358407300193489e+10", "-8.110920410108309023e+7", "423.64032512568494153483603174076167809751213097767506787348194168597007392997579771");
  setDefaultDecimalPlaces(32);
  t("8.75892437022975881e+4", "1.003059902220770878734611e+24", "8.732204677744e-20");
  setDefaultDecimalPlaces(11);
  t("3.48524718918338143e-5", "-1.6521145640284097122992771949231097382724920652150528071e+55", "0");
  setDefaultDecimalPlaces(56);
  t("-1.9645816929306625969373738553516e+3", "1.020543313076671702896e+15", "-1.92503509430477927997796255877703531948578376e-12");
  setDefaultDecimalPlaces(88);
  t(
    "-3.28006679572848468931980526919234199146410844265246e-15",
    "-2.362586849255441e-9",
    "0.0000013883370242080977957390909696674405111281848886010477085622936912729505916281963643",
  );
  setDefaultDecimalPlaces(18);
  t("-2.610728901866139970131601018263421179748796103476883877652e+57", "2.43e+1", "-1.07437403368976953503358066595202517685135642118390283030946502057613168724e+56");
  setDefaultDecimalPlaces(94);
  t("2.61889507e-17", "-1.78410352355e+2", "-1.467905329164383959887281060013912330014690643314154896255543578711632324773e-19");
  setDefaultDecimalPlaces(38);
  t("-1.82143e-9", "1.3076252406698304102059053075e-12", "-1392.92967384674629344050902556719884465542");
  setDefaultDecimalPlaces(1);
  t("8.10516150219905473858727514207521047e+27", "-1.61945482954356070380687818722542243861333412e-11", "-5.004870376337371663957129179479619395796e+38");
  setDefaultDecimalPlaces(18);
  t("-1e+0", "-1.449643298086950251398292718765502187116258906076230984362674e+30", "0");
  setDefaultDecimalPlaces(71);
  t("-1.23384917881196622636086228802797004399375e-14", "2.05754e+1", "-5.9967202523983311447692987160782781573809014648560902826e-16");
  setDefaultDecimalPlaces(54);
  t("2.45443909125795672588e-8", "-2.881225216956582e+5", "-8.5187338942235259656966264329272029019816e-14");
  setDefaultDecimalPlaces(3);
  t("3.1313377639472711665647519524016132881e-13", "-2.36051380418e-11", "-0.013");
  setDefaultDecimalPlaces(56);
  t("-9.4648595e-19", "-6.177708e-9", "1.5320988787427311229342662359567658426069992301e-10");
  setDefaultDecimalPlaces(71);
  t("-2.599682431564209055162131383382631949e+10", "3.20423718995774532276663424009633048e+4", "-811326.46475478033917371526662725763887008140423560334348808685723558946567966");
  setDefaultDecimalPlaces(42);
  t("-5.85491067630981044846519617414443933517753977e+4", "-2.03294353543064331404671233834184472303003447e+44", "2.88e-40");
  setDefaultDecimalPlaces(66);
  t("-6.13506537192268721e+9", "2.008473532384252928786907330458653787220508990838e+46", "-3.05459109766797346795938115295e-37");
  setDefaultDecimalPlaces(21);
  t("-6.718999549520652884745560929501831843392905705e+21", "1.6529003333814224484647279547124962690377916858223123733018e+43", "0");
  setDefaultDecimalPlaces(67);
  t(
    "-1.14858105660607909701352393675023554510609e+41",
    "1.374893096867073621019298438272244715e+21",
    "-83539662772568662169.2150814840777722328965889108911743546466514473544373870864433603212",
  );
  setDefaultDecimalPlaces(91);
  t(
    "-3.5511016763271023981890305910004350255731e+37",
    "8.26203944421971e+13",
    "-4.298093346445501415684449834970349698864214774579396618513306721142112400244051229506860667605044133304248571858031e+23",
  );
  setDefaultDecimalPlaces(24);
  t("8.9160042e+7", "-4.785947669574783710065057e+25", "-1.862955e-18");
  setDefaultDecimalPlaces(14);
  t("1.818841640708457713663778580878411151217480493538348e-5", "1.56102501857108662256054433471349087846613522e-12", "11651585.45872229739597");
  setDefaultDecimalPlaces(38);
  t("-2.4584788213097488e+2", "-2.7159516169067123330764514e+14", "9.0519978559477879539038686e-13");
  setDefaultDecimalPlaces(42);
  t("-1.018221e+6", "-4.40261482346239172e+18", "2.31276421133573169236704483001e-13");
  setDefaultDecimalPlaces(31);
  t("-1.981119487114920398942202147461598905538943e-17", "3e+0", "-6.6037316237164e-18");
  setDefaultDecimalPlaces(9);
  t("-1.209927352433696724201876518724322518194e+17", "1.17047289490632409221867044223343993e+1", "-10337081342926187.727420054");
  setDefaultDecimalPlaces(80);
  t(
    "-7.912685295369656789526275660754624712628e+39",
    "-2.51218562972058686495704909538708707520551790643067781294e-11",
    "3.1497215817804555992162072166124978106521855427860978727233357143390222858695667793562183092684736240068698618178479119611909906303e+50",
  );
  setDefaultDecimalPlaces(81);
  t("3.523193011003571862639667397e+4", "-2.621477381622186406613433463506799684e-1", "-134397.230954683967222632394857834362570059658335580533815307502566489896223135488205924");
  setDefaultDecimalPlaces(62);
  t(
    "1.3969723808858760967500375e+19",
    "5.965047421658581834085558700835950596e-13",
    "2.341930050402596519375792579025392383692030488977346836693008235610159191843817304674401033079e+31",
  );
  setDefaultDecimalPlaces(27);
  t("-1.73531217337180542307035398926871092905809837617917193e+8", "2.017377e+5", "-860.182391973243188095410024635");
  setDefaultDecimalPlaces(87);
  t("-2.5919e+4", "-6.45816256045242124333e-12", "4013370638688950.230713955415747215557427135695469904098043466056600364185674851003159973250044338794613");
  setDefaultDecimalPlaces(95);
  t("3.540786637223841526214613494968628139025512194e-17", "-9.131804729591284e+14", "-3.877422636677775295849819223795955622030488790140151546621050249e-32");
  setDefaultDecimalPlaces(30);
  t("-2.54690893688068481258095924024378867400259904094134e+16", "3.629601997574950976e+6", "-7017047429.945082724541044345133545544975");
  setDefaultDecimalPlaces(69);
  t(
    "1.7989011250152816199601303532896507175409891604058768969484e+47",
    "-6.39506188e-8",
    "-2.812953429960057900112344735106223424910767494255859955726339273514582473438083448224585435911372291521907838052069012974117e+54",
  );
  setDefaultDecimalPlaces(81);
  t("5.853724579581100416855532452134e+10", "3.250196555151215730733603857298519873787e+17", "1.80103710044968504239667506390248914690325080483607952013232599372758325608e-7");
  setDefaultDecimalPlaces(22);
  t("-7.930083105120790966e+10", "-1.5616187598e+1", "5078117213.5357892400749321479815");
  setDefaultDecimalPlaces(31);
  t("8.9977432682443503443e-6", "-1.59959448934489606162647990338297645e-2", "-0.0005625015169894289855617434977");
  setDefaultDecimalPlaces(66);
  t("-3.946918e+1", "6.69999200555641317922688241638724044952667026381963982088e+56", "-5.8909294171e-56");
  setDefaultDecimalPlaces(67);
  t("-6.436576795314637594462e+7", "4.0969704084514199091640942e-20", "-1.5710576727713164587075091938112878321952974497702262454815784987659614829562151469106239320976e+27");
  setDefaultDecimalPlaces(14);
  t("6.728e+0", "2.870289528e+1", "0.23440144049468");
  setDefaultDecimalPlaces(30);
  t("2.20623339815064916511836642e+17", "2.8370607853673182936e-15", "7.7764756029540092855234916617984820018843386480341247758072178e+31");
  setDefaultDecimalPlaces(31);
  t("8.7790840064907429224006593571261749205224e+12", "-1.064833709650919e+3", "-8244558682.6592498765859252927808477322263");
  setDefaultDecimalPlaces(84);
  t(
    "2.74662659666248102595451163505507164201745519293685e+34",
    "-3.7684250541354016349913398042513295688957677861919588e-6",
    "-7.288526525553115551308367692428122733994261558399299594463794989308350660694481706727925925461796030497098139994150021162621e+39",
  );
  setDefaultDecimalPlaces(91);
  t("2.1700308094827624763329e+4", "2.88389439672599e+2", "75.2465420351848454374423473379055140187435545325468869370195501266174577370263012423761010565");
  setDefaultDecimalPlaces(33);
  t("1.4267027799053745144124555673121541497e+32", "-1.3537835771199e+5", "-1.053863264422667988243868078421603106134629809868389240916889e+27");
  setDefaultDecimalPlaces(37);
  t("-2.80368057908861291066236891829805820228637055e+44", "-2.53095163174023843350601650065867913973242270436695e+50", "0.0000011077574711140768756715518316034");
  setDefaultDecimalPlaces(5);
  t("3.198241e+3", "4.10253692727398104808100633908262974817358884032603967974e+32", "0");
  setDefaultDecimalPlaces(20);
  t("1.782014098201572582241541132138370090297739692768802468028e+12", "-1.344730195211972330303933050715852788930657e+25", "-1.3251834e-13");
  setDefaultDecimalPlaces(93);
  t("1.5841896428698472767455406002943843662355713840242486e-13", "-1.1361773e+0", "-1.39431552000717429994908417928644091572289939609271246661942638706124475466989175e-13");
  setDefaultDecimalPlaces(36);
  t("-7.1830669157824179918191e-6", "-7.3008594894558981056214e+18", "9.83865930601e-25");
  setDefaultDecimalPlaces(10);
  t("-4.33157711215734e-14", "8.45905493779488893216715417605887306026467370637e-4", "-1e-10");
  setDefaultDecimalPlaces(10);
  t("-1.31162175e+4", "-1.1205e+3", "11.7056827309");
  setDefaultDecimalPlaces(8);
  t("-5.33661156383002275837766e+8", "-3.79647993826023794814456791144140381047102476377895e+23", "0");
  setDefaultDecimalPlaces(19);
  t("-1.0366217358404813265045069673790946e+31", "-1.618334222941841557379579135608e+31", "0.6405486092706417641");
  setDefaultDecimalPlaces(15);
  t("-4.119566715652988258609362456965e+9", "-2.7275479148252841420913179711866052124e+33", "0");
  setDefaultDecimalPlaces(32);
  t("6.221e+1", "-6.99575765169303917514655654317008561115887e+24", "-8.89253217e-24");
  setDefaultDecimalPlaces(38);
  t("4.47003000482126242589e+20", "-2.7503e+2", "-1625288152136589617.81987419554230447587535905173981020252");
  setDefaultDecimalPlaces(23);
  t("4.948070859e+7", "1.4602060387260969990573552920630633389351582675071261113e-19", "3.3886114204244506874572479010028097655615394225846e+26");
  setDefaultDecimalPlaces(38);
  t("-2.3117868159481241114682e-16", "8.828057942423278949892593643555306611517157e+42", "0");
  setDefaultDecimalPlaces(95);
  t("3.66133e+0", "3.5670174259419957287355292145722990606971983531482e+49", "1.0264401775478003831022591053711277350731530648e-49");
  setDefaultDecimalPlaces(18);
  t("4.6128161060713491745073836145434207614777298e+16", "-2.07184186205017859585036271580586967080274508e+25", "-2.226432524e-9");
  setDefaultDecimalPlaces(38);
  t("-2.166441301474e+9", "4.617681929797204848277786898642831909211025751458782401e+51", "0");
  setDefaultDecimalPlaces(17);
  t("1.1364191643532733493171506988734487e-16", "-3.8391179250211195191846184496924934718686278124790126e+52", "0");
  setDefaultDecimalPlaces(85);
  t(
    "-1.47100302296828871235e+2",
    "2.45374306191868087021651270637166528956e-9",
    "-59949350272.1532708831830295124143449691030367921616186770940264094713744253730615377222493063476",
  );
  setDefaultDecimalPlaces(69);
  t("-3.810041645e+3", "3.508119098056171177819730194376703533022497e+38", "-1.0860639386818772449146490530642764e-35");
  setDefaultDecimalPlaces(62);
  t("1.39535404532341529847299143300161506320864185e-6", "-1.0947413578249161146e+15", "-1.27459699530834450554369387410496171841451e-21");
  setDefaultDecimalPlaces(19);
  t("-8.13048156848185041404474809761144441961748421e+29", "1.2418566258576029348631929815552621281036690403e+11", "-6547037233760452876.5252456316135955351");
  setDefaultDecimalPlaces(23);
  t("1.7917942971627299904186068054570514e-9", "-4.79448185695328369151346e+24", "0");
  setDefaultDecimalPlaces(0);
  t("-5.33707684485533034517080758331299e+25", "5.45691977180793053967719928462356e+0", "-9.78038356442082147669815e+24");
  setDefaultDecimalPlaces(16);
  t("-8.72035001841036954798505083057127263195653e-15", "6.71452480731708202989454e+22", "0");
  setDefaultDecimalPlaces(46);
  t("-2.572311614164077e+6", "5.6958070068047801358735092621645690975953e+13", "-4.51614953085829020923304438503992428517e-8");
  setDefaultDecimalPlaces(68);
  t(
    "9.57755467624042210495844855575912968578136076780994781995166e+59",
    "1.31157659345892659e+4",
    "7.302322048140723679660399670856530836852202570241751912998173884719343556368803354084554247858106558448214356990072705237355e+55",
  );
  setDefaultDecimalPlaces(24);
  t("-8.3339382641883963507e-19", "1.2309968e+5", "-7e-24");
  setDefaultDecimalPlaces(61);
  t(
    "-1.584066416665455198261008221382775868e+23",
    "-6.84930010894608548630368506557296945899172446571910488e-12",
    "2.31274201957723595257645355481175200827050424680913014802119895825066010051538361087995588094391e+34",
  );
  setDefaultDecimalPlaces(46);
  t("3.86285901892501705086134464228627835881101656567232756812e+4", "1.73049271552962628602779747433048708787840186255232537774e+22", "2.2322307307388861093142434754e-18");
  setDefaultDecimalPlaces(69);
  t("-2.8233079934489293727215038054694e+5", "-4.86e+1", "5809.275706685039861566880258167489711934156378600823045267489711934156379");
  setDefaultDecimalPlaces(4);
  t("-2e+0", "-2.489965996327759534e+1", "0.0803");
  setDefaultDecimalPlaces(57);
  t("1.29142425582128565247521298838142e+29", "-7.2843473304866532404e+18", "-17728757254.83847954861168655822470143184822926021411165597381087055");
  setDefaultDecimalPlaces(40);
  t(
    "1.585966540040407285055785702279484547847799388812676056968e+33",
    "1.34143613205597919763177707916131499019e-17",
    "1.182290011533865287924162948480094530731030897573296945137379994626461856812282339861398832e+50",
  );
  setDefaultDecimalPlaces(8);
  t("-4.613587322e+2", "-2.859207090829233263848754905427820108434514088081119475e+6", "0.00016136");
  setDefaultDecimalPlaces(45);
  t("-3.20144149663611218414791078992196868168274e+3", "9.28672450421220143e-14", "-34473311824680777.926602086334772946593598198765682349930136139");
  setDefaultDecimalPlaces(58);
  t("1.802334914938070102870902828293847092436e+20", "-3.4606467978945890349638e+0", "-52080868698723788372.1603591043629275253792129121676469915294659373027806611425");
  setDefaultDecimalPlaces(100);
  t(
    "-1.61091139498040923127e+10",
    "8.691389789419018e-9",
    "-1853456620875004761.1440979931172803078524986678588212738586602616667307652926771534752752307499917517922748357072338161",
  );
  setDefaultDecimalPlaces(69);
  t("1.4614976809502e+7", "-5.078884961788290858411513163257787906711e+39", "-2.877595558761390446626976802003796315e-33");
  setDefaultDecimalPlaces(73);
  t("5e+0", "-7.08863503873247e+14", "-7.0535441205251524388098906091749788607889116203414767910144e-15");
  setDefaultDecimalPlaces(41);
  t("4.865194255778807870163426650422998577674e-6", "1.021780681871810961866952438257494e+21", "4.7614858473016e-27");
  setDefaultDecimalPlaces(17);
  t("6.2086873600273579623694913701120934e+4", "6.008825028562838337457301691314889054992997279e+37", "0");
  setDefaultDecimalPlaces(15);
  t("1.0662597321579316231092019745145199701893698262419613e-5", "-1.9380156096057366710198794257014088938256343591e+41", "0");
  setDefaultDecimalPlaces(20);
  t("8.85820954254e+0", "1.3250028820237697310421019e+23", "0");
  setDefaultDecimalPlaces(90);
  t("1.53417737e-16", "4.2856e+2", "3.57984265913757700205338809034907597535934291581108829568788501026694045e-19");
  setDefaultDecimalPlaces(24);
  t("1.7283448327494265841758162e-7", "-1.25789452132473836974640619013311146688113788229906e+21", "0");
  setDefaultDecimalPlaces(76);
  t(
    "2.048092514024482822008660241162169251258302156227225432392e+20",
    "7.9e+0",
    "25925221696512440784.9197498881287246994721791927496890176202531645569620253164556962025316455696",
  );
  setDefaultDecimalPlaces(97);
  t("-3.83730686e+2", "2.3692184383e+9", "-1.61965093550150090438792614557713574417440831884479767177405391206388367064566753924878063e-7");
  setDefaultDecimalPlaces(65);
  t("-1.2278817918e+4", "1.020250328364460259453546992671751593e+29", "-1.2035103127762663352464440270133247592001e-25");
  setDefaultDecimalPlaces(6);
  t("1.936266130818e-3", "4.836838872918964720917266115764e+30", "0");
  setDefaultDecimalPlaces(7);
  t("1.8119989433898940052963861565613203767559790872487e+31", "-5.85688222323660490056379580427645607e+2", "-3.0937944017398304333591139821212022e+28");
  setDefaultDecimalPlaces(36);
  t("1.77888518562093058651144585211820213076434121213915119145e+4", "7.0379036923732545618186757e+12", "2.527578187164808929357798192e-9");
  setDefaultDecimalPlaces(61);
  t("1.587613e-11", "-4.5799647134e+1", "-3.466430637238280343297633582156585180471316423396e-13");
  setDefaultDecimalPlaces(7);
  t("3.95765237924501527582872467280322041e-1", "4.641581034822444538531059547671923680674879261e+17", "0");
  setDefaultDecimalPlaces(41);
  t(
    "3.665757901985695992490411429647115870141544706440204791e+47",
    "1.834035175886262441e+4",
    "1.99873914643664811807505884758391179420164615293289793380513030126699113111396625608e+43",
  );
  setDefaultDecimalPlaces(80);
  t("-2.102863658722674e+15", "-2.364796640678173411244072920187515e+8", "8892365.72206740534113566910291366645966719590395148301481944912043572524830985291189979");
  setDefaultDecimalPlaces(67);
  t("0e+0", "-2.633204745849215907117408283306645114767994625715e+40", "0");
  setDefaultDecimalPlaces(44);
  t("-1.60852341158629528204458829863702055e+2", "-6.5305654693760548900909e+22", "2.46306911572846887799025e-21");
  setDefaultDecimalPlaces(68);
  t("-1.658824612646798154345741045591e+23", "1.8078238411072092703273801211290657631819e+36", "-9.175808919694543271881484393567864719419439647013754715e-14");
  setDefaultDecimalPlaces(63);
  t("-1.4682881e+7", "-1.8593012493175460106435574639820254019298e+40", "7.89698872379574394329980005281e-34");
  setDefaultDecimalPlaces(47);
  t("-4.286962282556455e+9", "9.23636139701161986334277e+10", "-0.04641397297363744286768203346710530423301879065");
  setDefaultDecimalPlaces(27);
  t("4.6e+1", "1.4568827837941632376797673243733e+5", "0.000315742628794075612082634");
  setDefaultDecimalPlaces(51);
  t("-9.47722739311497238054342564912775983580160037192892658e+8", "1.826602945765796975641927766644711e+7", "-51.88444163568168084715264131626135681613246480247179");
  setDefaultDecimalPlaces(56);
  t("3.570733545776e+13", "-4.3176354830682043577608776125767455341884444665e-11", "-8.2701134910040163343581873126652114769528559245966264868890572736348483545142442e+23");
  setDefaultDecimalPlaces(95);
  t(
    "2.9034594611806745660858031107265965525481159e+11",
    "-1.6697215247770673854e-9",
    "-173888844223190421708.81055015319479160246660618155473819219197050131088972395160886101220046693832844527407192481303",
  );
  setDefaultDecimalPlaces(27);
  t("2.482524029847315786936719922320057849476411773758e+26", "-3.052972396277764807994195912827934376167826649203e+5", "-813149844680564670411.292067212703238357528161381");
  setDefaultDecimalPlaces(100);
  t("-4.02e+0", "-5.36711533381365635778116e-4", "7490.0570417657666287797912165285525575273040313583022379175620413773578632579261874516373018065419796592");
  setDefaultDecimalPlaces(20);
  t("-4.92935589951716169e+0", "9.077110416195082037779410233763603622511927179427390228e-3", "-543.05342487873309585304");
  setDefaultDecimalPlaces(4);
  t("7.3324196344353575351994958591851804999722665e+27", "2.90057570041793045589291582775259221767934657955006558819e+12", "2527918727781820.4534");
  setDefaultDecimalPlaces(43);
  t("-5.84423792250538e+14", "5.8148894549342336761173291532478646185219865460725612203214e+58", "0");
  setDefaultDecimalPlaces(40);
  t("-6.0005067213318855e+16", "1.93189943215989405489312768729864506e+16", "-3.1060140199033157145225326843253968634526");
  setDefaultDecimalPlaces(78);
  t("-3.14594211104469811897622711557231245999822928644353321e-15", "-3.47329189275483871420606687670893969478e+28", "9.0575229729669988228435220526203984e-44");
  setDefaultDecimalPlaces(81);
  t(
    "1.323803704130338530669712053196385916103e+27",
    "-1.1635764497586274437210244296717319421810851698702872063e+48",
    "-1.13770238681347380660683884875914168586130023133758155184317e-21",
  );
  setDefaultDecimalPlaces(59);
  t("-3.6779617833741197521359391305e+1", "-5.11174132386887405737001393556480013068184931362243e-12", "7195125007989.28632766092850271245775922788822556799199638288195128270501");
  setDefaultDecimalPlaces(90);
  t("-8.970903e+5", "1.439037421250635e-12", "-623396088769087764.59911092758143211111507833598628311227222626350010016205662826601570146002975600491034215");
  setDefaultDecimalPlaces(94);
  t("2.79558e-8", "6.9422085923576365616863332063e+23", "4.02693172181188501874758588250517986849403662776328247152401007e-32");
  setDefaultDecimalPlaces(46);
  t("-2.1083254605959987312015898e+21", "5.88090003e+6", "-358503876930551.8582674478484545842551926528837797638944051222");
  setDefaultDecimalPlaces(100);
  t("0e+0", "3.83915062083385e+5", "0");
  setDefaultDecimalPlaces(29);
  t("-4.03456445139427330068233e+0", "-4.3174914065305895020007e+8", "9.34469596231653400767e-9");
  setDefaultDecimalPlaces(70);
  t("-1.544602376194824e+2", "1.113637281622797953531660214738557287758452e+42", "-1.386988745513280142893208743441e-40");
  setDefaultDecimalPlaces(0);
  t("-4.91988055e-6", "-1.33138498728239067090607e+4", "0");
  setDefaultDecimalPlaces(84);
  t("1.16430181e+4", "2.8574461571118e-10", "40746237933555.075067343969766871426715062954900415280735641022128892325345743982124085854751777638");
  setDefaultDecimalPlaces(68);
  t("-2.8340285527043046684435972692e-11", "-3.704679698e+2", "7.649861212655649855437508511970688592576944556139060851e-14");
  setDefaultDecimalPlaces(43);
  t("1.639121937741843309432224895934e+1", "-1.5e+1", "-1.0927479584945622062881499306226666666666667");
  setDefaultDecimalPlaces(69);
  t(
    "2.177616619299353130561658584714849280947918e+24",
    "-4.549753025742415941101018e-11",
    "-4.7862303887231675761667050446501900767847841385004605449230205042843096821552057785566370601824660796464e+34",
  );
  setDefaultDecimalPlaces(38);
  t("-1.09024114477e+11", "-1.72349554938680093161600874215898748870726e+16", "0.00000632575549822507367561031744043304");
  setDefaultDecimalPlaces(89);
  t("-3.0741022367121522850294780626075e+4", "-2.9201103881651834943770676104651678e+34", "1.05273494083342778370670860429982456628327649083339986945217e-30");
  setDefaultDecimalPlaces(42);
  t("-7.277056162621046397205e+6", "-1.008394526875541503626e+10", "0.000721647725039586446000856486893702809511");
  setDefaultDecimalPlaces(58);
  t("-3.0341259590621541404648282941e-19", "9.41092655e+5", "-3.224045945892707175006937328716055e-25");
  setDefaultDecimalPlaces(71);
  t(
    "-1.14326209257378439620745668937783516961896473286911424194117e+50",
    "6.10352545089107124574739640695712704190071274456e+41",
    "-187311759.69895829190805929429268278531220001713902414780023390340227928350861112",
  );
  setDefaultDecimalPlaces(39);
  t(
    "-1.228258317138628391248553532380104929917959951332666295e+48",
    "-2.8607656623359064632e-13",
    "4.293460080668460890487927680631440335598279160089423619951187430078869449783653641347657821600735845e+60",
  );

  setDefaultDecimalPlaces(11);
  t(
    "2.36471751919574617258824577991948673363262599593856657089075790315657422259328059722093721e+89",
    "-1.617941126584980414465034329782629289554957144072042379159e-14",
    "-1.461559682450869589789234472589033841050645616387152444760139429236971979008400169590917213984123142931649341928813e+103",
  );
  setDefaultDecimalPlaces(15);
  t(
    "-2.036809058159882601142042374613652815015e+2",
    "2.734650295864230632536938790835540137530007644451417190622602623144458384422963087009929976722155643363635493000114327e+95",
    "0",
  );
  setDefaultDecimalPlaces(52);
  t(
    "2.340554341923926922164559577736809073479876368237438646944603841437885328789434462799278228191060961997483034914204307268843e+28",
    "1.92746533609855915411742546e+18",
    "12143172165.4798405384726654884187520227229727169917440596711593",
  );
  setDefaultDecimalPlaces(90);
  t(
    "5.865024994189876079447430768020997527677165730862126507993913530724612836713834e+25",
    "1.97473501834931358643e+20",
    "297003.139139775145381485261991296943406585437043058275328397347831914742535910747935493866636981",
  );
  setDefaultDecimalPlaces(7);
  t(
    "1.9972353974996788758305414744475742181712046803721942135764920412182212437228386259645747637471636887590089265375672558472801837e-15",
    "3.11212266147896954424315457963412739816331471294904774444360989283974008626129656667851465560846111359627364e+84",
    "0",
  );
  setDefaultDecimalPlaces(27);
  t("4.016285750366246068755114321877818999450146457813e+24", "1.101022675081826280596951715773543407e+9", "3647777508367629.215992463832167345530152569");
  setDefaultDecimalPlaces(77);
  t(
    "2.7196622703758904624794906644425843740345542520362841257740110855509424334316218352930745424404299943e-17",
    "1.34052319609426337106570211458164946103569650882645330411588255456409641471849641934022617087345663732961651562231653488027e+122",
    "0",
  );
  setDefaultDecimalPlaces(83);
  t(
    "-6.552889156927684364105846065451322980819262478950104220314687268901557421178127e+29",
    "6.3135722001799484521936662669814e-3",
    "-1.0379051587848975477398804963653265989004596292783859372868317869527527699733166114584142605298553765195226560659556e+32",
  );
  setDefaultDecimalPlaces(30);
  t(
    "-3.829717874649806008758720781894423232256095385335112399832223471670729651972949418798008649797988347373192523158521137283081195617945351330629e+53",
    "-4.1741e+0",
    "9.1749547798323135736056174550068834772911415283177508920059976322338459835005136887e+52",
  );
  setDefaultDecimalPlaces(52);
  t("4.528393264187125232885772476602022888155849131583697749032552728e+12", "3.1594011989015589853e+13", "0.1433307446284925421488113539329937428740051741100949");
  setDefaultDecimalPlaces(9);
  t(
    "1.3599974765058863939277853516312235165187578806885758347053659632e+42",
    "1.3901510721168603232159914337129754136797997251956027094930824719593245002197227226131567667623907910844883210732589921032164407e+127",
    "0",
  );
  setDefaultDecimalPlaces(18);
  t(
    "6.24385792113256753316255906184858993570960108954149405289546359046688037342617377974083210546155648149e+102",
    "1.6842328669062907193736732465335460073403903643914061334218278585636426447867648922177821501180411732405605916850803508800764084348e+11",
    "3.7072414651316565620543350996475404573391793766589621390734548847213534713884160993465986388677414723637577057e+91",
  );
  setDefaultDecimalPlaces(61);
  t("1.009746523623459342e-19", "1.4189228954879042107554296488522356282525563379664080809502e+1", "7.1162888895118759119431047594945937233699e-21");
  setDefaultDecimalPlaces(88);
  t(
    "1.0037669581744148634338396241321131504343860396168935985592953646451799e+70",
    "1.360432929033586065237904289629618981359475926639750875678374423671e-16",
    "7.37829066580638528685040577118551470634764091050561571551793432158041326090604632787071254406464776057083770252195352782708544034924142787379972921297435163634094836698338197e+85",
  );
  setDefaultDecimalPlaces(27);
  t(
    "-1.02371565150295038911084375679377017085593033787738559425253704360751193863315262e+35",
    "-2.58434361243398266256744837045980985136641550911272e+37",
    "0.003961221126237141642032397",
  );
  setDefaultDecimalPlaces(75);
  t(
    "8.2860761719479547525885638072e+29",
    "-3.5945869964444422845124802011125369e+5",
    "-2.305153882808807361178191777675019609490332747770757535240687067850763959880004150259313618481803566e+24",
  );
  setDefaultDecimalPlaces(4);
  t(
    "-2.518778228547026917156600641699256390576857033861978914444664019753918147823476175776405868788591481103586311233190813681e+91",
    "-2.085849986441095439092430215235125050318712134593115924266047921915653e+70",
    "1.2075548313254297419090256e+21",
  );
  setDefaultDecimalPlaces(98);
  t(
    "-3.222286186695735245915901195001514953083e+12",
    "1.46087099496685008920926644146371574981975056099740496041205670731541894e+71",
    "-2.205729457150906730576129285364961932908e-59",
  );
  setDefaultDecimalPlaces(93);
  t("3.441897974105285e-8", "9.58778965628549667712028687540257339333317e-8", "0.35898763922598879570932087262669465365976325541912010924258797768115791809678032228025625682");
  setDefaultDecimalPlaces(67);
  t(
    "-2.02846795379781936799615856196347691777959e+39",
    "-6.56876827194558308986293791401089010039358801858706440974510790260911540781393e+12",
    "3.088049189467013637896167135835031089353437324859703541016673473442556992980874610932109166688e+26",
  );
  setDefaultDecimalPlaces(5);
  t(
    "6.5541404266834758447476151452385099857747349924667809480417492516001358186806907706836421827e+91",
    "-1.52858649624513128248586686953e-2",
    "-4.28771315380796300088676710744623197682893193204045987167603356430062383544426489182296192643222146e+93",
  );
  setDefaultDecimalPlaces(1);
  t(
    "-6.64615555672182449199381050722121894749608696438620754880778986839119093146659540744442457477602805693811974121e+84",
    "1.103267712408641017604298433856182454424417378335316409935e+19",
    "-6.024064224821749117814300476410470348143029197524177680880846146151e+65",
  );
  setDefaultDecimalPlaces(15);
  t(
    "1.65587569726884966e+6",
    "-5.0742458878249730385908570120589791810714122429709758969508582823171252253607296100200573353792294785964666997487742095185081246554318041e-11",
    "-32632941601074537.957092805736945",
  );
  setDefaultDecimalPlaces(88);
  t(
    "-5.689992306769014273352331564526807807890981e+39",
    "-2.53908253431e+11",
    "2.24096390325306198311389051907105188530234477031626618294163630495364304903070577177247488826628775692938967511006052e+28",
  );
  setDefaultDecimalPlaces(73);
  t(
    "-1.121014691963543e-6",
    "-2.7074972946589331352713975009709554490676987515186557351945350940098446914159437359810881995472567758370680498060623814181184959765965644e+111",
    "0",
  );
  setDefaultDecimalPlaces(25);
  t(
    "-1.75368808502345094401121976592193905922856827280973082579294960545646817644786029e+80",
    "-6.09480784356850616175020072948270398986746866519641492170409434794409814677604703230330986202028225138243935182111186593138158536300975e+9",
    "2.87734762117892739411418636056087489046098659492306413944970137525044418476032192316108364339172e+70",
  );
  setDefaultDecimalPlaces(65);
  t(
    "-3.575866908172197775532960340563873512988907095770555905e+30",
    "-5.519990518249842028633647208529433480698909301392164801735973608447385174030797234897870728747710159400305812985150879875504996891e+10",
    "64780308885493439495.40278385296915632340277605157234492386277199336479977237010102553",
  );
  setDefaultDecimalPlaces(58);
  t(
    "3.91101641187804212692361716238931746170172094377943339480906392286183917057459644223121110390991e+17",
    "2.7880657896932643526222129725144222750202723424505875864861922294575465116e+73",
    "1.4e-56",
  );
  setDefaultDecimalPlaces(30);
  t("-6.6628344983539469833155935106707e+25", "3.643401460344e+12", "-18287401404633.735792037018614535622872753569");
  setDefaultDecimalPlaces(36);
  t(
    "4.09812215889402518519267106107542861771409353916899914016335344448427721349709156061941918783364038710881012954543461068577228343797696419627145637019e+135",
    "-5.37330514363180868092852591326471877553985630134524108227012146438858573195438767546341285464013087052e+65",
    "-7.626818223325598668790457811805427266968523388974989985787711660997061915646107218065836469834429181817769e+69",
  );
  setDefaultDecimalPlaces(12);
  t(
    "-1.1109964387282820005182793747592782293169016078771597245974715235120765325788622391724926698695540674407119091e+2",
    "-5.1315829799166549708623920972514618608407494e+38",
    "0",
  );
  setDefaultDecimalPlaces(83);
  t("-7.47671135272454852873468248200570636861985652326804180542937579e+62", "1e+0", "-7.47671135272454852873468248200570636861985652326804180542937579e+62");
  setDefaultDecimalPlaces(49);
  t(
    "7.355874149870868087868529076744921122599622e-2",
    "1.021727967561930857732363108356705971222378208340721933346696201594829203444546416045364898108980663830909201773460463018679869e+53",
    "0",
  );
  setDefaultDecimalPlaces(28);
  t(
    "4.7585721091973033931649597211059621959834654584006254e+52",
    "1.717009501603645688791991471456773861686622444438612144439646562707e-6",
    "2.77143027149990211847198472555407816868453340410095221898201460612550888653438682658068e+58",
  );
  setDefaultDecimalPlaces(96);
  t(
    "1.2997071911057464096642788451766569397433394574156427092640329930269159688162233310541e+85",
    "-2.713045607716685513623058820713975600679783474598408916774e+57",
    "-4.790583643006235021209004190636041331305557490667704796169052065777546385034701257400810831317994178432473235213853584355161e+27",
  );
  setDefaultDecimalPlaces(49);
  t("1.496438032290262722045304826007757151448e-15", "1.310798082286487109750437576043119969559592882839008565972e+19", "1.141623605124563e-34");
  setDefaultDecimalPlaces(66);
  t(
    "1.354079645164173112726342439856505448936651032097088700078758665250424804076291058033002338845e+43",
    "-1.260617482229092032243897503280225e+7",
    "-1.074139986357968182085835272261401231746258775388100841801414149915888029417169504922186356536125218575e+36",
  );
  setDefaultDecimalPlaces(62);
  t(
    "2.302014546164678997395884802872487223489658674e+45",
    "-9.154109300450837209564237064437624931342383555460108947071974903558225512593475994918714344559452808029749376947651130654509724e+108",
    "0",
  );
  setDefaultDecimalPlaces(38);
  t(
    "6.2909944821874258483445105266865987267829922437234371316686636980665e+45",
    "4.009586061908024222748305180611e+29",
    "15689885152867270.68270866786436931648762898004596320375",
  );
  setDefaultDecimalPlaces(44);
  t(
    "-2.013103766782580441116708180178564824171102117453457961356590074064067650108155096190831121750028051168e+102",
    "1.177347136918994524945858858054469838838223545566512634520021038564664133319212412619249104516414e+22",
    "-1.709864239404090729196485292114304708742892264776335814124458462099981639787653518002081354906699176924109856641377264976445e+80",
  );
  setDefaultDecimalPlaces(15);
  t(
    "-4.943735083419084119812136143657920847826148757019236544438065e+59",
    "1.90098157917231854043406517943863332044467007829453888862522308554339109188514308301930031e+12",
    "-2.60062229828211748344978442647257315704428663302617289874418474e+47",
  );
  setDefaultDecimalPlaces(57);
  t(
    "1.7760447051891049115651436464956362513597202988341241207662920805854649183067858281358931458705456676436204463192408361723613980476076078775335098e+121",
    "1.6022772520439217154780580192669273650475200810508184761e+27",
    "1.1084503027946750583613906720151267818784143958462243221450903713183775777053853432991583000072010091310149320742115027500197810564039584002537053400572e+94",
  );
  setDefaultDecimalPlaces(60);
  t(
    "-3.969425974025140787983452717086084107e+36",
    "5.745790342172042770102813225012434287104361738833617346141168286317950060904334362e+19",
    "-69084072645167299.696520445376486716920978484037195122885353871925309424718052",
  );
  setDefaultDecimalPlaces(66);
  t(
    "-1.586143959637365634031815661511253773e+28",
    "1.32651620972651522011513017525667547689417103e+25",
    "-1195.721505705819657359013252249418037589360371786529498856673741022533",
  );
  setDefaultDecimalPlaces(93);
  t(
    "-5.666102158414439554107858851658946716387935748705458211878462948811589e-5",
    "2.6144226230765425101638720408175250429294310077106116623672538012693404845203422786427433288e+64",
    "-2.167247983704642596067191e-69",
  );
  setDefaultDecimalPlaces(13);
  t("7.263187e+1", "1.600210536974683354599331569678405988977103423514172021467760417680195178e-1", "453.8894621786202");
  setDefaultDecimalPlaces(95);
  t(
    "1.5911067353469858380807390654504387646021056e-7",
    "2.51508725534199882863453095755e-14",
    "6326248.64989278026176999448307476543707839119360518340610433825362272920755057604932915503159875027172",
  );
  setDefaultDecimalPlaces(42);
  t(
    "-8.3355664837095730113321867672851687196650961704574506596341636917459068422126414192163068e+78",
    "2.736398849309636589089726508421403032020186385630045768e+54",
    "-3.046181109823425409114000009692114086325426820547101429138927623246e+24",
  );
  setDefaultDecimalPlaces(71);
  t("2.33365097e-9", "6.52692e+5", "3.57542450344113303058716822023251395757876609488089328504e-15");
  setDefaultDecimalPlaces(80);
  t(
    "-8.6174633222983730256699789822635450281323511629585829876245089945705463939057773215872378583413568812399397311466593542412175e+19",
    "4.068654002559849171984903731530034821866775256238678097723785953146075574255692197746487033216427449376583340904606050731995482e+36",
    "-2.118013307810538427061668343976464405102652923616231558125474553e-17",
  );
  setDefaultDecimalPlaces(7);
  t("6.9024229112669736447831082877491210572e+25", "9.0072980356258591251653501408453256157932294069736487034224300237001035839398531034783553926278048600334335351554e+71", "0");
  setDefaultDecimalPlaces(94);
  t(
    "-2.716598139992495485522137265556792901422146731004341735526924971e-14",
    "-1.3692148453494295777996523131623591055923298927498725287926500514858e-11",
    "0.0019840554236024280298550447822420413513234528713644220398998818034040451650168214584507746221",
  );
  setDefaultDecimalPlaces(14);
  t(
    "8.0135554763425145467010027150981522229363601206763728863655914969503556877566216517164441151366380125547685355006906916298159388561e+130",
    "-1.921982996985856107850548129398864953396691646396348765219421914403596e+0",
    "-4.169420587440028420717323723376052432204598962191835390806852722173247799176585168666629793548308926037906127055393214253152986425576305555159238e+130",
  );
  setDefaultDecimalPlaces(49);
  t(
    "6.370039964545588294070845388015180195919189307034715061786265937644396e-4",
    "2.8385839582676262950488076414361146566372535830342567210272193356096189676646604148350971037093581189037501149535737263016779953194565761446707280381e+84",
    "0",
  );
  setDefaultDecimalPlaces(62);
  t(
    "1.882180706676508250582845912606002391013717205350064355593713634643852752783111973529246654005614859306045873742134251161894321262979e+40",
    "-2.715128879619836615256243116979110506366503247025520138017130275049510854490536949256618012269229892286e+102",
    "-1e-62",
  );
  setDefaultDecimalPlaces(37);
  t(
    "-3.03862358521302591436719387523284975251888431773497371093533460563619e+54",
    "-1.658593424317650103551551362553693271775473867054423063956661141302142511644982519002363094162084243548705501501808239366310693084359574426918e+98",
    "0",
  );
  setDefaultDecimalPlaces(98);
  t(
    "-9.4726841925112760719397939500477584758099858113835497167331541345134588393660408623645247722646749589342922701141e+88",
    "1.779188352004879267839428251133180747245799364102525020990716998423723355297530444949165408012923796171673436849446719613037227083e+58",
    "-5.32416041384093889754769642775456211303133208983504396365549595650248822675643574123725024539286319784099186604567308615605361916e+30",
  );
  setDefaultDecimalPlaces(21);
  t("-7.3288294210120791143412966467342767e+17", "-3.4363567605054137642510289566369700621015101745456658293208014396681302833266269047031931905361101945023932371416e+112", "0");
  setDefaultDecimalPlaces(22);
  t("-3.8570665809824132894455106151e-8", "-7.821035701929176573721345381977680727920023148616646022893310760203314533287085942800359392028e+93", "0");
  setDefaultDecimalPlaces(59);
  t("5.8532911078911007e+6", "-7.47147509852946432413006138700816598460178491476748619572239521919351098423920839113457475546535027385538980507780860614558552484403e+131", "0");
  setDefaultDecimalPlaces(33);
  t(
    "7.525686755515337839350955241179439789177178851940542938408808871824594627167948264271874765153665663265928631528851026883980771886436968598653583e+98",
    "1.2740722208039290900166814301002797955531707055163024448517636658881116893623121717620463657968718185406207348466563536932684602251887471993643423328e+143",
    "0",
  );
  setDefaultDecimalPlaces(85);
  t(
    "1.0838576434500786925946928652559266924882591531282989388434944930539842797391598742374525325296301751878454350271272417803335649894348590407637168648e+33",
    "4.717747043354999202425297383216108192621e+12",
    "229740516710556707225.6590101029191119527579776765307415033473742931574663834634111535484665098659994859712",
  );
  setDefaultDecimalPlaces(25);
  t(
    "-2.64339371067374761503656767890086142605621173553247645204989197948234468985274681763441972715847607313005217e+54",
    "5.333938152434728780771073951314154036479148048613480307620629628507430548780226444524e-1",
    "-4.9558012019077207208150827604094673089788949033854976714857192929692989053202898e+54",
  );
  setDefaultDecimalPlaces(19);
  t(
    "-1.103785459289937752552737795062815981827195495959636620385979808240345883255396013463080192565984137427684926241e-9",
    "9.818738492514418409373373797059671027511347169128496984763570957751389e+30",
    "0",
  );
  setDefaultDecimalPlaces(91);
  t(
    "-9.319054891607168852537283636026446792844087106342000369736381166162996469942767187e-15",
    "3.4046075417618138714482113620959641386992261668292758090972059569061860224137127818886353230309550548549004130359198303351929414e+127",
    "0",
  );
  setDefaultDecimalPlaces(12);
  t(
    "-8.9563451110480919438742791498547644302257350138522021001784518569762610632018264097483135984771312301421445881e+103",
    "8.3118248645660050734630767738062340888087031e+42",
    "-1.0775425682066196845454729927880686425559106090918905118449539972922920888e+61",
  );
  setDefaultDecimalPlaces(9);
  t("6.886217576485e+10", "-3.9645270676645878458821158111547066109895407981649661405665e-18", "-1.736958143797341547782230445312502005e+28");
  setDefaultDecimalPlaces(4);
  t(
    "3.92357344475699637570710447533243519424928399475380620026557809561951911050140197029716676705344321975820096671791637988e+100",
    "-4.859825615253564129609378404473130217242137692843451169200780032266498882182614489992930576840961376887561253059117e+114",
    "0",
  );
  setDefaultDecimalPlaces(7);
  t("-2.6430929303892793050348212827273101217639821559133154233326953582e-20", "-2.2052224656523158765976451964314825148026434302498179300908017748555524e+15", "0");
  setDefaultDecimalPlaces(8);
  t("1.3904358603902838912880401151637465689527337089388569e-14", "2.104138340158741441560145071979206473960472203281988669369391440272004e+67", "0");
  setDefaultDecimalPlaces(92);
  t(
    "5.064776203138020055535531273162849798115449790042711300147409650059831240000883882290745149760638e+59",
    "-1.9102374363148519052935061122662051463779484025814954567503879105883586279222809871700892937929558415359533732031278549723330704251e-13",
    "-2.65138568999504531716896679460855034250077639583053203463804105949617876072153925820100686676403062053315574616274428182280954949660634511539511253159619193021330942e+72",
  );
  setDefaultDecimalPlaces(75);
  t(
    "-1.24736892235472405863599450730075810251799370025912679346494422114883471448109002263335222959986839140685653585065957638380819260008559628312554258e+124",
    "-3.480411113304075565689266108705212586316233150860001075811398125767049395945762e+78",
    "3.583970059130610201340433506099794653093688514220527047977754424121232025635853877050702825166686202343696825554162314102e+45",
  );
  setDefaultDecimalPlaces(83);
  t(
    "4.477403004349654368379434798032991056194262778519044082767566152347520497032513773150650110221252194654335188241142320678446201975634470011420573e+144",
    "-1.00139926758310667289507005324163128188310223787828502710593841818156204970862669389981835789431940999507290805793599204082e+29",
    "-4.471146673749761100457598348357650562351861731322720436079858139468316076249374727175147761989038024331731098046073584658644771655921494797253009557410573532293292072204109499502897799851118728724427e+115",
  );
  setDefaultDecimalPlaces(69);
  t("5.395086811351e+7", "-5.06725391121504e+6", "-10.646963633320974300056277106204772964470800054550532499706319431614358");
  setDefaultDecimalPlaces(78);
  t("4.027252290661749740673184854097e+30", "8.373716221e+2", "4.809396669739078014395951255029997749908224409602905744326393503656803704812341526327442043847117374148713e+27");
  setDefaultDecimalPlaces(25);
  t("1.9950523303706248662421101131704802559301704428187533253380607435578957e-20", "-2.6916574811659793109904972783688174401447092826998882121104663e+61", "0");
  setDefaultDecimalPlaces(100);
  t(
    "3.8094568911375615248453771177660716552e-18",
    "-4.2933522225152096138938896718231901158278657658311073530662498899133081177982393848560615589474980001533665e+5",
    "-8.8729195595926119168623198045820821431808241533346812322941275147973114740371e-24",
  );
  setDefaultDecimalPlaces(15);
  t(
    "-2.5914279752727877189666184556225454269512692937102241113374808338451311683977656115540203056430456682971209833435093217236687450790124364050312348284e+148",
    "3.383416356539931238205423985533094486539112221462717810030662427e-4",
    "-7.6592050820577262427945419569038338377434410206381067316579128546370873744154442645468057880044207726256403519605419953005987484573843272119571797423676267438816814362e+151",
  );
  setDefaultDecimalPlaces(51);
  t(
    "-1.81145132492911e+14",
    "-8.8233099170478479071061508996416726225441539970223464141977738926249719628304256901992200383403481725942876125356574112412131833e+22",
    "2.053029239547776710795084084443189055111116e-9",
  );
  setDefaultDecimalPlaces(68);
  t(
    "-1.0921569291934714106793745135492223514383394111881664983902968682382909920486437040207686226e-13",
    "-1.9370208695233832341907184333568690376674648779294908682263744748245755138755126009544911974998764738798951357943291024e+44",
    "5.6383333106e-58",
  );
  setDefaultDecimalPlaces(39);
  t(
    "-2.518700247818210860160544526386990547926245374175856441263688210425673166740363571889634491675654702347e+81",
    "-1.28792086315e+5",
    "1.955632772077290236697525250728360753572940033303828417187550402968773560658631506143122215851694274455779088370613e+76",
  );
  setDefaultDecimalPlaces(29);
  t(
    "3.918153912700964679122323975973910704417928554929357384589247868069501212247759248228155094532576962783703054066845598529593223485505430630213504127e-4",
    "1.076397090577554406794523820478490026261768790830318248017767186795103621788534687701e+45",
    "0",
  );
  setDefaultDecimalPlaces(1);
  t("1.13162581497816220969113041775260438235300283366258437730737128657605439586445423273352905461e+4", "1.55319479758738313761064406848116875252e+22", "0");
  setDefaultDecimalPlaces(84);
  t(
    "3.35845828332107611502199921530005789260136858454521140776803630116615179049952166490478476826120720765037469770943183245856665116032813622291481925291e+68",
    "-2.51437877935908179183692867051661239542815993768605717210076222074e-6",
    "-1.33570101326465665411206728678095803519363632751842563854650042363675973368692494811775535522724002826662835738935362115235844071933665965897141538589629927762e+74",
  );
  setDefaultDecimalPlaces(43);
  t("-3.41782537938533440165375095092622209732984e+18", "1.054660407346e+8", "-32406880504.6557165029962403805545739062019395864683568");
  setDefaultDecimalPlaces(48);
  t("-2.099662e-10", "-6.49939798918002935759438660562046732517551006043674216162473583561681309347199763364401958259314927057516604215981146267213625406099350822e+54", "0");
  setDefaultDecimalPlaces(47);
  t("-3.9265617637455e+11", "-1.402156311847470358100237819927731992757e-8", "28003737747126726973.94960097171274290066079224524700383430708662983");
  setDefaultDecimalPlaces(35);
  t(
    "-1.37890034410121561444242168848318211479287046067597301760473651451081773455725027181341650710298019642601826031610543681585731097311e+85",
    "-1.61404669453555266798771442098209696e+35",
    "8.543125479390165958224125414353733011140737113101332654971379377920118013382871519239e+49",
  );
  setDefaultDecimalPlaces(59);
  t(
    "9.540203977477834959933953668888994926944551765246036635763494143504699452868635754280852301797232242991581610778e+111",
    "-4.9219705282765998312216718825862695938224692726742773230663656152981581470972044560628605692997273e+81",
    "-1.93828953722286579304754757980600820816810202360612830587889878279246145913195289775480333e+30",
  );
  setDefaultDecimalPlaces(31);
  t(
    "-9.1559133412991793783615672830183770143001102879212468e-2",
    "5.5928130658637703062648515351992198378040710589591247128328948272500504536232079999472498645673387344981966725331e+68",
    "0",
  );
  setDefaultDecimalPlaces(21);
  t(
    "-1.14279046443383571358550913729177394279670241274505279736618645689399079261811758336645872198352e+73",
    "1.22861417303706127730862939894e+10",
    "-9.30145923360891684571459019258368239968273770062584210067930494095849813074950051004e+62",
  );
  setDefaultDecimalPlaces(54);
  t(
    "9.443880888192805242176484967219945999999961238317016549815546033187775885545989715258839411345217493964397385838776405105255654e+37",
    "-1.76742618983976324800804234195856809126762824609297153374434330776754300355362394281682899645335347e+78",
    "-5.343295772396e-41",
  );
  setDefaultDecimalPlaces(78);
  t(
    "1.3413347741590722071017088937315882825205925090922231553288915184082130278376015e+42",
    "3.452256129003811175092833867341637170608750650738651795458511414006911288819967975392667929040501525562250348989925669545e+120",
    "0",
  );
  setDefaultDecimalPlaces(54);
  t(
    "6.92727260717423817349594382271567781133015707323727218631680928976e+39",
    "4.2395440773694300295386308318605286953546084255226112204817451028877390338553e+76",
    "1.63396640788612844e-37",
  );
  setDefaultDecimalPlaces(92);
  t(
    "1.13092153128435173621597639622679484443392664647603627937590894681217598759744809201762677923985774146443636534538894602168811639411642349468746e-13",
    "5.1161674011736744559405605974356e+1",
    "2.21048578477888089849152859968312763852537143377584049966955094603913266954254e-15",
  );
  setDefaultDecimalPlaces(54);
  t(
    "-5.7548173042732098254537507371444261061095882692575115e+48",
    "6.685532076239177649911302395098266233404253019100540404767225885957663997683441139896e+66",
    "-8.60786731504319668742804834512526617e-19",
  );
  setDefaultDecimalPlaces(89);
  t(
    "-2.212537128784678890980878052234521685423584e+34",
    "2.18732122184604230321368880034830389256833892757658643479054368416948749056020026100257050185563942292607007076146568697833006e+100",
    "-1.01152821391151456812824e-66",
  );
  setDefaultDecimalPlaces(74);
  t(
    "3.3598827424917686311645669573012831194663599976548024805344843399669713576199194528201286164985759987288171500684630697044929369194581183e-14",
    "-5.21236328620577018665747691e+3",
    "-6.44598727679536769465837371833139210204835802308597358935e-18",
  );
  setDefaultDecimalPlaces(87);
  t("-1.0171053586438323348611648705e+21", "3.6987791323905093570283679961567004638589308258652719012369e+59", "-2.749840750795196387814002583449185190872975838905e-39");
  setDefaultDecimalPlaces(69);
  t(
    "1.12797815945663898378398060397666318779501157770412087041729325276963656978361035603011694248e+0",
    "4.594090602514165594007121098995641037855883293854949088020462737306302315399664062787173103053181791625806094936866291608203e+12",
    "2.4552806138375694625823670730489639374979678743478319099e-13",
  );
  setDefaultDecimalPlaces(34);
  t(
    "-3.0135182986878737014825868059058330316595193760088969243042374764e+40",
    "-1.11179096077569408794589426270247803599176814612934e-14",
    "2.7105080046570523175868320513146049466907530514780406375862004936356575895375465837324436e+54",
  );
  setDefaultDecimalPlaces(43);
  t(
    "-8.57408589270105202217891186747573931668607374190597631729511105278361578715389808392748440254934322859073255468947452189022e+117",
    "6.8692447727635516161109052383145605726240852434784728995855034535965949604985289407808434839260238533229834158331638135965914198266119403644221753873e+73",
    "-1.2481846514914083213466570612053043096681618102382652208239551988634103003042209448554e+44",
  );
  setDefaultDecimalPlaces(67);
  t(
    "1.076001464478887666410869439090298521585681263307999977168197185263025522980184e-3",
    "-1.872079427702118781007531388877251838918965828093116102356250839677192642866217403410402e+28",
    "-5.74762720297409670677973559130171116e-32",
  );
  setDefaultDecimalPlaces(48);
  t(
    "1.5505807996589548090716280156312695362269511483943126019099399417745543884564307513107314914564471483210543e-12",
    "5.899577218911181139710339717504951606702573989465669706124815387868672636810948556495146547364e+4",
    "2.6282913878786862161243955590335e-17",
  );
  setDefaultDecimalPlaces(34);
  t(
    "4.82291035838012320651180976989946974007746870117623794446343059303458428125058370575816990413755046979709e-5",
    "-3.34125522346306269643928130252718348825170386417752588640107264883671333390176591796e-19",
    "-144344266924374.3297228596159139969003770787937003",
  );
  setDefaultDecimalPlaces(23);
  t(
    "-5.337376359981300055711866973754828581708734218420064631244057561828998275370561e+79",
    "-1.8699731585207206717484578515892017931610881373599297629255591727628916e+70",
    "2854252926.39148756943883894226963",
  );
  setDefaultDecimalPlaces(1);
  t("-5.19452831e+8", "-6.4188527561223636381126912445924648013170910593059769849e+25", "0");
  setDefaultDecimalPlaces(71);
  t(
    "2.62350401542445e+11",
    "1.33179182312804678512133866527973398047292852683587160311038987695238938698132205314650951132051259304683e-6",
    "196990548362317879.75388073105663785343037456171331879989075568442545180153100139652116361",
  );
  setDefaultDecimalPlaces(70);
  t(
    "-1.140852407559396009273314609432755590795621102360638e+37",
    "-4.111e+0",
    "2.7751214000471807571717699086177465113004648561436098272926295305278521041109219168085623935782048163463877e+36",
  );
  setDefaultDecimalPlaces(95);
  t(
    "1.0119450664629727965936661565675475422139426829472225660029676308808932484172908117068085494236843765610574363159353384569e+119",
    "3.8290258120585715387634920712419440533193233179709315993012052418691116984401174503801324563143144301050965e+59",
    "2.6428264423710637431770185625279610126690989156229284283985651141456726735369533637745554987218852409398080714143318163329389407227916389812031512495998887e+59",
  );
  setDefaultDecimalPlaces(58);
  t(
    "8.14925364796068767385162180540657091968883743350400461615347147254331422297727683779063262798244596760907748312562319756199925148e+107",
    "2.54e+0",
    "3.208367577937278611752607010002586976255447808466143549666721052182407174400502692043556152748994475436644678395914644709448524204724409448818897637795275590551181102e+107",
  );
  setDefaultDecimalPlaces(32);
  t("-9.41054031147878263287869730268679762358681184763594537555341e+5", "-1.46125213156708882723257455842278970810287492054118060808476266929553802248508125e+73", "0");
  setDefaultDecimalPlaces(77);
  t(
    "9.71143665635399027775474804740074654539441855024882270445542e+8",
    "-6.40960382476784628407815872296633454859926861271166818262617078552684492052174164250774797834105733077637887791152074e+103",
    "0",
  );
  setDefaultDecimalPlaces(67);
  t("2.6375e+4", "2.659469500557859069377673967767307268943646759701476617329389217719092459925757e+68", "9.92e-65");
  setDefaultDecimalPlaces(45);
  t(
    "1.219766132007413063789424496826557812780092107381259217115669198983825826657248291354978926800644675582843142272633269504093629121273553e+88",
    "-3.38115166022320451273794867064599329157763750545143080690171035533041849314311458852e+28",
    "-3.60754634687664676164217853293969797225477324876775945870978635184041435456463940938755472202122514700635e+59",
  );
  setDefaultDecimalPlaces(53);
  t("4.7619468e+2", "-2.98978602665541070906547029520307102983122021701819556636161183340932869794462531e+18", "-1.5927383289455852993775487222568448823e-16");
  setDefaultDecimalPlaces(44);
  t(
    "3.04661406311835470529994676298997559365899378971079153144388990829183412e+49",
    "5.321048877392337914e-20",
    "5.7255893214260323138562484974115756661653844644418266249749740178013402585122736313047916812241439092467795822899e+68",
  );
  setDefaultDecimalPlaces(46);
  t(
    "1.6765301256498797229563247731614021240280571860700447744787e+44",
    "1.7117040816487445608906535647612364266563744209071541475954825144444874755431426169159189395800470365936133670727150346691226521110526197883971954e+120",
    "0",
  );
  setDefaultDecimalPlaces(100);
  t(
    "-9.84701478259971895144466786093686716223666073703801501798967593035346520560002695396e+8",
    "8.1842200961717537766632121315862434224028824477665985008041081655964402311197322616978774958038098e+97",
    "-1.20317081736e-89",
  );
  setDefaultDecimalPlaces(5);
  t(
    "-1.694338507493750143999665750092550256539624547171643561475854883595373264213935286606045578954270529418717845132019516666305959321627140111969299452e+1",
    "1.03341609357782195334360301304567447120299263997401926867741864781497256319458867e-20",
    "-1.63955111404132305947903216e+21",
  );
  setDefaultDecimalPlaces(64);
  t(
    "-1.58206218859659381085748444366221406868914847082551983988879612771590797333771101191347896925663643357921522770306908585558858192093196e+122",
    "-1.2347641122477358377269498414280837275842015672945794915663615170967170305162120578445164781607517930177359008e+43",
    "1.28126673986065617179714960018537501031629874511648287233783398127508972386099324212664171733578356656703043152052242598959278169863976722467396e+79",
  );
  setDefaultDecimalPlaces(70);
  t(
    "7.3323803034714939579223036444982860953198979401453190698074252995427440536e+73",
    "-1.346347374120881178317617437246813931822070445239331673166809104130189887154e+63",
    "-54461281274.1532451833015560419759038248903053053203982719309125829829679383402196",
  );
  setDefaultDecimalPlaces(36);
  t("-1.68050135555630114344576286477574247826968041e+25", "4.03243311208899294e-3", "-4.167462444741510370565693861865177101241268675045008868401991246e+27");
  setDefaultDecimalPlaces(47);
  t("1.54044289400471220553508125214583352427321643127899795795183e-13", "-7.18332e+4", "-2.14447204635838610215761131642e-18");
  setDefaultDecimalPlaces(93);
  t(
    "-4.1598684274037398827877672164941042280282404340382362771709318113869793831281e+8",
    "9.3209527333779127e+11",
    "-0.000446292192053226282088476494425227811863153200215025703721056608765913675753485863624653103",
  );
  setDefaultDecimalPlaces(73);
  t(
    "1.272794034084149345467861517502072680657276811427805627978141144968873180777925889983435749459412205606864002238928369e+96",
    "3.03455643310429351212483748415471448628765e-15",
    "4.194333050455434298336324512451784155317222004938301814587550714297059262111421709897097950772402326989907879769599977094208654615053260259454857701061407534364319897264371910027710823e+110",
  );
  setDefaultDecimalPlaces(7);
  t("0e+0", "9.0485805302312764147954168985173872712862718716075376987440660307272641212074043489746964486316860963714509e+5", "0");
  setDefaultDecimalPlaces(75);
  t(
    "-7.81586973161048355077754411818902304801210943805959887875e+41",
    "2.9388669849213217672140340706393389004941512412926061100284055279638401632316484299573838146291889955119745734253201665721084164e+13",
    "-2.6594840024104483422919345727592438087632741493100310848680594733652854060927490751099999541985248795037e+28",
  );
  setDefaultDecimalPlaces(99);
  t(
    "8.54931725810169825642689100093798385602339859577449805761006541415539892611095528396537185310173642796163e-4",
    "-1.1622233526166754960644785154309796351122082647665790228448050198918751216884050912467247723238180675618152589440892745824e+98",
    "0",
  );
  setDefaultDecimalPlaces(80);
  t(
    "-5.10976341383686221149694164179206424621317265983873e-8",
    "-4.3836056730834752013084708809534812768795334751639841464889225171701828322963549384841873489691878630354407090698417559029741446471424707846125276e+88",
    "0",
  );
  setDefaultDecimalPlaces(92);
  t(
    "-9.31677660181600899993265484855165348165813922142e+20",
    "1.905242967324011597e+18",
    "-489.00726897324737576561018863338016104443710493637777887858627768929399284516890888264869165014",
  );
  setDefaultDecimalPlaces(73);
  t(
    "-1.1889701158684968256013897268515023564065397763834478285448472230372982827121426577449450337768722014111756210106710724780285305e+56",
    "-4.66297457715676232695401354156512396639233308224405197622514942529686400216422493889353e+26",
    "2.549810418639401053182365942881159267894617177917162421194061664671115864053198405577420705557043858921e+29",
  );
  setDefaultDecimalPlaces(100);
  t(
    "-6.9446305907914370341841037545975507038605537962623035139352212946e+11",
    "-1.900922753675180544692886938908302884362730811367887611021904852790221708553153103706e+10",
    "36.5329447362599046209522320189722844896837606980059824949428604363507382673939487643935358017590984974",
  );
  setDefaultDecimalPlaces(23);
  t("-2.58916103769513915590087781635241918116267845680466788656765858971420475548101e-10", "-2.88278242888468285889e+12", "9e-23");
  setDefaultDecimalPlaces(7);
  t("2.80268062336229491691285605522e+29", "-7.3219374915776850876886192292216291453901160905105370328029400780964698536994813e+79", "0");
  setDefaultDecimalPlaces(95);
  t(
    "1.42592649102910165584167747961341487444354176088e+14",
    "4.184120954203553979844243951169332947180221690332524e-6",
    "34079475871665528491.19293048910900274490761186302794341050012214287369373767533834247056265741043151053273370134582",
  );
  setDefaultDecimalPlaces(16);
  t("-1.68572303314854545667172194716448704450536e+5", "8.0836599635451625943284366941688893690579784290529456884e-11", "-2085346292088783.3703215990171166");
  setDefaultDecimalPlaces(20);
  t("1.541740975837714623502246454485640926555546118140395028166506909866702288262111e-5", "-9.9833196315579182335222596574195333e+5", "-1.544316953e-11");
  setDefaultDecimalPlaces(31);
  t(
    "-4.848552666634303753941476650449830071119238018456645455655206965968921063450364100602311448892940281672e+9",
    "-3.762576094200378235020057092080154577441728812366018059197102384615279849485714617213003792952e+40",
    "1e-31",
  );
  setDefaultDecimalPlaces(72);
  t("2.394222611688504769e-18", "-3.796786e+3", "-6.30591930039908693563450771257584704536942561419053e-22");
  setDefaultDecimalPlaces(82);
  t("-1.48206391755262606515842651154643449974066e-14", "-7.40001568180701176072230549634843755307809634e+44", "2.00278483354608309467396e-59");
  setDefaultDecimalPlaces(0);
  t(
    "-4.98567e+3",
    "-3.05234629513658244526409899341379629913925086635426144636699920224435550300410552435218127998470397856822171041057561748208164186296746423114016e-5",
    "163338937",
  );
  setDefaultDecimalPlaces(79);
  t(
    "-1.80561309947268454925690880925764865496815792569e+44",
    "1.074710186998782187562488063175554182001283067491891768910046884307335996434820720669367e+26",
    "-1680093034676641236.1649226618165323571690204387547566119207043376003543169814903048014801254388353",
  );
  setDefaultDecimalPlaces(58);
  t(
    "3.155516600046234588298861877190776820421695032940835475832908552477010165767333755e+81",
    "-3.61029919313e+2",
    "-8.740318824685869860475980692508187565658879160343512413012477138228825909305625291923075449123864397577061871036731541259058442704618914e+78",
  );
  setDefaultDecimalPlaces(18);
  t(
    "-2.73251267609853928790095925649633862116693879220042243789667327315873635027530301017646301929175566971256170919e+74",
    "7.87230471929207480683847918299967068348860968464458908015313354991863248096079e+29",
    "-3.47104535905752303440977446556972758853737783572210284848698373e+44",
  );
  setDefaultDecimalPlaces(28);
  t("-1.56090200305416006079948360237e+13", "-5.8750599149513441629010201438207042146691761034061973790809546490155830048874130634836812e+30", "2.6568273782e-18");
  setDefaultDecimalPlaces(85);
  t("1.081615699999837e+8", "4.608717082252099796920614848184417228949e+16", "2.3468910777037624276360556537097655199294750263957136674755709506413938698459e-9");
  setDefaultDecimalPlaces(34);
  t("-3.1e+0", "8.398732653e+7", "-3.69103307377296987524434301e-8");
  setDefaultDecimalPlaces(93);
  t(
    "-1.2216615845048569106521598352618275733431951263312876278563842878921156839329980269735866143597257833728202383037217685147702406e-8",
    "-1.008e-13",
    "121196.585764370725263111094768038449736428087929691232922260346021043222612400597914046291107115653",
  );
  setDefaultDecimalPlaces(69);
  t(
    "-7.29488453980602317962490144939867983850861234814728000403311203188572292709702777381695700155802582994821e+104",
    "1.131887376884346439879894811992268858002975992536860339945994262859030319e+34",
    "-6.4448854972533165125567805587592179681723472806744407434796353364285409419768621993463181253852660289331920061816122228128929705007238549327e+70",
  );
  setDefaultDecimalPlaces(11);
  t(
    "1.570700384003528800016764881484078381177835489959283630643066712421232739528080101878006095434495575257145081530943467295048e-16",
    "-1.8852214897223452616595281069972082123582992672989294751826677566005754719271147e+6",
    "0",
  );
  setDefaultDecimalPlaces(79);
  t(
    "-8.12845528410775297780514293879517829889829674118563313357535831934782233477908654e+23",
    "-2.28690328188498407e+12",
    "355435026417.3769233754956274893697925509615434286298897660225087437776455655142881630304127",
  );
  setDefaultDecimalPlaces(56);
  t(
    "-1.085518634247632083798716867800544922896263132221690170974320742722164261298665131548771018257079096238781365859414872818218831944163e-5",
    "-1.542499723802252682580003416771614020951505176975342306936004988677284360184125480218799148045155409614743e+82",
    "0",
  );
  setDefaultDecimalPlaces(43);
  t(
    "-1.471875829113987414896781397030519565689607099147324835758415446906646734717101195e-1",
    "7.3672706301773435579523670661216363258316402167309668783392284103e-12",
    "-19978576911.305302432931291025253116523942693010352874",
  );
  setDefaultDecimalPlaces(41);
  t("-2.142959832641351892992315e-11", "-4.549982612143514666408941669735760135760212e+24", "4.70982e-36");
  setDefaultDecimalPlaces(45);
  t(
    "5.6943204690695553818333147060858642301738309789894823849135517998609713e-14",
    "1.3153424368024164258046739221222370548999769947119546425345426551494612623887217324638564729613462e+79",
    "0",
  );
  setDefaultDecimalPlaces(69);
  t("-1.3216057116316e+4", "1.37047691667731793078238049474407438034330472358707788376e+56", "-9.6434000131559693e-53");
  setDefaultDecimalPlaces(82);
  t(
    "4.6546502176641422179852389899446976658620629453024974753083179829907404697360624621607716112300258871624902938905e+86",
    "-9.859678550738127207379549534680506594556135320202394848196411850875761206489903224847922531072844726252325652022013759940315280716362760461125e+49",
    "-4.7208944933764398953070275310024011214747480051368701561901982472699885967308472168134783848313415467100093744149869499e+36",
  );
  setDefaultDecimalPlaces(81);
  t(
    "8.88661104614580581118353240861792534899799642581771196700094740396003750214585896295176502059205037573415278374210414618e+49",
    "9.6558061764725629938717211309520182552943990857843371035272711539820030759927818442187365078088289000943103971285576793230035348e+10",
    "9.20338590453380684295873650783384556355023629923669173031141815727789060785025857740591503474973392407510704125149797672e+38",
  );
  setDefaultDecimalPlaces(34);
  t(
    "-6.27925786952863583982833348223076179126513599594745977298960377124829314416561699563178988708205577684980179002882228702929107938575342e+134",
    "8.4691658369393485131e+19",
    "-7.4142577798404308370955034113017890916345786195416113298415490498394060119675765108242656768266047387823970828656193367813176663295409002869103602129e+114",
  );
  setDefaultDecimalPlaces(65);
  t(
    "7.93761711296409878271869511782819558470010173732304542511600951903405817337679387067634927577292672504033968776753316028e+38",
    "-5.766931135195881102630194643288537102288285720506301024562793433686475771621001018268597592328401216665431e+105",
    "0",
  );
  setDefaultDecimalPlaces(6);
  t(
    "4.0051102702089695514719263902564331466967940399847023241395088406263000578397597737138375220051883198163991867174750405605212386e+10",
    "-8.840436760943729841135195741768277195934388765e+19",
    "0",
  );
  setDefaultDecimalPlaces(4);
  t(
    "-5.78265710123861365211872046399206233766225752984611357322536488581950345576683125991858007822597448808029681388886619659071e+122",
    "-1.117874840454040267208703452688193791701948315908095043985297998083480791040432770043743e-6",
    "5.172902092411264756469381324525383718547050318514973023050492378520065836431896695082883527089161818547276656993373755634325469935201e+128",
  );
  setDefaultDecimalPlaces(82);
  t(
    "-8.8295930815690760458592324231511040383194049693899756893068469627987e+41",
    "-3.06634205001969161022933270296143932279501539466893755356670529507050260276091105796022493675780363842409418974745248141988095570194057542295667e-13",
    "2.8795199418513579271160256610588464315613103478798220432001842063937738261553860129498990833393199863490648448970297402160848774963522296e+54",
  );
  setDefaultDecimalPlaces(74);
  t(
    "-2.4057178087631039262221469817437018822268839553347189149655193418552092774211071594741970569922060050839723363017761206649616172788706e+134",
    "-5.23134497680039609587433878834957234876268155260857870040390419888051765105505757818274010287310465e-3",
    "4.59866022874005347738423305838960261411182988879585472920146361744463782881873864457523122094520117607902696033960273799021930014972213728031103471923187061742296977461352699464877839731603008161833111131166846e+136",
  );
  setDefaultDecimalPlaces(96);
  t(
    "-4.0505782289593713090534503785249834447801797908951687552515151950568986587287249346841523532e+75",
    "-2.183772522904690834e-14",
    "1.85485355570441704586818492068867554640662250097730451327621923428024148721333341966820544408347455775376819982166726826351063858847420217128306336028589087563769378049090798656503450785e+89",
  );
  setDefaultDecimalPlaces(57);
  t(
    "1.9269102688145437582098944827181170581658723941612895002879655954574424088982187568237411518418266494379099e+88",
    "-1.55909e+2",
    "-1.23591984350777938297974746981772512052920126109543996837127144389191285230372765961153054143239110598997485712819657620791615621933307249741837e+86",
  );
  setDefaultDecimalPlaces(81);
  t(
    "-2.85302865986907818001531537588087490777750150671557071515465093620894543277358258101896143941386362505644773922303199512354595129678990045489844e+56",
    "5.07722039041208074773088343235405716313902984609333382879252900735455780889528614226708321e-19",
    "-5.61927283136416846582875414121127950671395051031537250479515077403463761672505628841700098822678573579227691551931380934741816268040016446445275553812794888e+74",
  );
  setDefaultDecimalPlaces(19);
  t("7.8847836220007631490792464768951474516453e+23", "5.2730654278e-3", "1.495294099790908562388015980706080980527237296e+26");
  setDefaultDecimalPlaces(60);
  t("-7.55299100644983200665e+20", "1.08615868796941711223242407125979056963368015637165e+16", "-69538.559053191507513442369953360469651652685248295129330986685823");
  setDefaultDecimalPlaces(3);
  t("6.048e-9", "7.781615578973997046598277213330942771335226857232887436309924437949325113460286878888472996811683496380880619040415830568527295740979041756e+44", "0");
  setDefaultDecimalPlaces(91);
  t(
    "5.726314653183487581058675532176163739374588e-3",
    "1.6585889196300714470135592507563806829977527137740198067621702801359540637563230563901297694403480062895584930559473623119607483447663755290348192705e+10",
    "3.452521951286563538994362062674037352264909493831397441497749284291207876967324e-13",
  );
  setDefaultDecimalPlaces(92);
  t(
    "1.1579409375393556837453692652652103368065983984439948397590505019209e+30",
    "1.3205705184571161240313370152361997507320220693815349317057361556530197762178376253343444578609304367933240040629452567842571233031037124092053e+73",
    "8.768489992433208840199972262477854408758020901174e-44",
  );
  setDefaultDecimalPlaces(17);
  t("-2.87037180722880325536743120114269066722373902511583474913080269019864326177999734741147e+4", "1.25799469634661317489722e-7", "-228170421987.05220228859574092");
  setDefaultDecimalPlaces(7);
  t("3.224887989355257160500780282607886959512195166847052923559846817432046e+26", "-4.3962342e+7", "-7335569131770225436.3536417");
  setDefaultDecimalPlaces(19);
  t("-2.564302783978227875087837336957563448078937198482817840137585590543809109824684771776378721903591786739067746646766071910607056111331049e-18", "1.0466e+1", "-2e-19");
  setDefaultDecimalPlaces(63);
  t(
    "-1.374054942564649673039535166890548185532308478404230797271018050077292516396367989686968482039970231007277798335286664349596846832370426e+51",
    "4.08779849284448276107447447476240638794017295433762432108414047212511101920527417e+33",
    "-336135684028915406.355392224695589017303827096267863021620907595852678804566748511",
  );
  setDefaultDecimalPlaces(12);
  t(
    "4.77586697783017614940598602054704265958282912962012385387547618887330902518606e-5",
    "-4.781688174487553939472142614203217592672523342089415690420137098330318353018418814324833e+7",
    "-1e-12",
  );
  setDefaultDecimalPlaces(34);
  t("-3.3455524567605157650146055250341729383429597e+42", "1.8729737522236855491099980577211849367237438072088578955858e+58", "-1.786224955255519809e-16");
  setDefaultDecimalPlaces(86);
  t(
    "-2.8666099802524070180411368327507850101669057033631126349893273551878770085592913269307216185481981419111663663831640841415864472830187e+133",
    "-1.909597314691945813580546659834116741448131801e-10",
    "1.5011594110430792363655571787009702669046229563725760645620675526804841269248345220697435128514511281801586431368942352486190210650913696355989101967832242040879621723897593790452808604992521287763482164313802734920618512756908313e+143",
  );
  setDefaultDecimalPlaces(62);
  t("-4.314589060951226036063495298035e+30", "-7.91e+1", "5.454600582744912814239564220018963337547408343868520859671302149178255372945638432364096081e+28");
  setDefaultDecimalPlaces(48);
  t(
    "7.873450536970765383866233954159448903808812871834697193568625386467593081648087516855413032403551047e+59",
    "-2.0910921244662936545423564628592762664720632750943e+21",
    "-3.76523370006010352208622704937530026300606087091983589369744263353518710260487369785036e+38",
  );
  setDefaultDecimalPlaces(70);
  t(
    "-7.265887659100861078544508241620372783233960596879562853040607819385102929931288948560039684390809922130863181176e-11",
    "-1.254479904788447176548751447496377605890704869568069624599030712601082757357344927627776910628599132246607437144107675429735675895e+129",
    "0",
  );
  setDefaultDecimalPlaces(11);
  t(
    "-1.1277185437697363246101888885995706793897757310535013515193168944312126612179865951256201427224059185349962768350696643237407641057e+68",
    "-2.57116541965061257331478813465978430351695151680135003134475051581820932185381354992525603763112619659740018285526531328511834e+26",
    "4.3860209660216198088132227987480244423865174465722147e+41",
  );
  setDefaultDecimalPlaces(16);
  t("-2.132933527126e+0", "-5.11239117364056672492270850753012106e+22", "0");
  setDefaultDecimalPlaces(74);
  t(
    "-1.93071606685451169067e-17",
    "1.725788074333340362327871950657639424051571245820152241966036015681466472460866471911419511594416828691708211664832004364456310392631787744646e+1",
    "-1.11874458722304797003292053391798137343376583813681977075e-18",
  );
  setDefaultDecimalPlaces(57);
  t("-1.14070908183304158294078307e+9", "-9.598764428523582863301435685723245148726019839831898933886988673709842944285e+75", "0");
  setDefaultDecimalPlaces(90);
  t(
    "9.10957014728436318363356356023136292230521573240164560827462428536381687399100585967773419008839963659753550387306e+4",
    "-1.429424778023696362968105699801077994439475315661962681e+54",
    "-6.3728922901974131126810530615352637005736e-50",
  );
  setDefaultDecimalPlaces(37);
  t(
    "-1.7079546326536472375801316910675966552163295260806533739341822372763595089147438356930099031210154344081441945798153074037e-19",
    "3.838041834719385550200526782329084742962462859777059143874805785210706376307306254223897969803920591408031444910634177149871046147542447e-4",
    "-4.45006778509625747706e-16",
  );
  setDefaultDecimalPlaces(34);
  t(
    "-1.3879313688014452256196834015375827266471291486795893936991279364732855605e+71",
    "5.784660900784708612622421628819809592083693468187794030740513311903413388554802117103467767366e+89",
    "-2.399330561646522e-19",
  );
  setDefaultDecimalPlaces(29);
  t(
    "-5.47153877315511636223784461227020851163213200472367606147117842024772266007028656449105935824537395305355665211048382e+85",
    "3.330422902807419661442343090734626279612861123027080050444341680755262145e-10",
    "-1.6428960924280269543692498564838636321375322248404372141982110735206643480826828951388370751803788303052880771880712910830559e+95",
  );
  setDefaultDecimalPlaces(17);
  t(
    "-1.94506026891199660267737457942270279461222813011940042668219216101e+64",
    "8.141302654e+4",
    "-2.3891265950619658693717623084236990885515704230683185048462296866847323570831e+59",
  );
  setDefaultDecimalPlaces(89);
  t("2.859852081056952984862607365443688874608e-8", "9.8446526872287920844589406442477445740486676e+14", "2.90498016732166037264212008761567779870156022986601629957634403429e-23");
  setDefaultDecimalPlaces(35);
  t(
    "4.9937052600610041105939316471087890656456545427068257269564773333441205087505917691134835503e-17",
    "3.197224831396193352309076395495038594331759366351942885616189529030057795702170973217857008840747857265250996664494833749320668060936689897454979e+86",
    "0",
  );
  setDefaultDecimalPlaces(100);
  t("-2.817136e+5", "1.080895141701813879150286501514131743076630591317935916372919314409286316266074049778353026985033338e+78", "-2.606299067608504626570340504e-73");
  setDefaultDecimalPlaces(33);
  t(
    "7.2103342606186561042032956746312511450667605531899883003522792710417479972984404780529555839035827942191995763564104e-5",
    "7.6472189952494688165811322883351586022783187856964773849322238067962110839489063895744168312376089699312601890056888077e-13",
    "94287011.593335956402693361879013199280305",
  );
  setDefaultDecimalPlaces(80);
  t(
    "1.35939808371739557624915957979479990734780825503887328e+38",
    "2.53696232313021244503905460817964169090746809894226544190566390021390815792296943166659656378180302064374688e+61",
    "5.35836922497182446500447711524244983781329058939428882974e-24",
  );
  setDefaultDecimalPlaces(46);
  t("1.006120468214239879282392786e+7", "-4.9275245739554533058621745416285249518702849579111144228e+56", "0");
  setDefaultDecimalPlaces(42);
  t(
    "-4.675793310524172951e-5",
    "-1.6331544858141813754092510207153250523045961091348888689152535674267223715057816046038356898788918738802587919118096e-19",
    "286304409726011.668151247844041468256928208669497033948158",
  );
  setDefaultDecimalPlaces(58);
  t(
    "-1.177745064476850659291924467160081166495674973741660106980615371140415439024841827132022718516722456841883449188347011266066933479091234660393729e-7",
    "3.373675612425304751659756915605e+17",
    "-3.490984907200904330429206811829756e-25",
  );
  setDefaultDecimalPlaces(75);
  t(
    "3.427579398959317912207837158018292584360225697e+35",
    "-2.954512380974557226364085926476621664218940217e+4",
    "-1.1601167830708895922242996463201366577402444405471426217581826859537857527417507951152614665989725270287095e+31",
  );
  setDefaultDecimalPlaces(47);
  t(
    "5.63600501463848480746827180470530041739566114242069402574265967469428367815804e+77",
    "-7.43866634592275763645045023814886844591724264487065148060309646808903920200612007944413617655394116e+6",
    "-7.576633703604224698707609869051801338443015908363186586071996707394896555159685320845679051957507205930639531863223484e+70",
  );
  setDefaultDecimalPlaces(85);
  t(
    "-3.9174381645029787283794459929607080918998619117317479497488921938644594935745562182e+7",
    "-8.69950977899069614190005192055739149075777083208289833085e+1",
    "450305.6222735200983088276660955479927420657314882040900436443395441932747912290580525493204",
  );
  setDefaultDecimalPlaces(85);
  t(
    "5.7209938494429540758327521047308069099197662045302676e+16",
    "1.42156285765794131996975e+8",
    "402443959.3806233625690006492993631089425747784836439631956960869681209798998212649529037243372",
  );
  setDefaultDecimalPlaces(26);
  t(
    "2.80982936235365586268885889923248451538654349484628952414426827758940470896270385294796856494535460795782234413553986410855392674e-15",
    "5.29384184052334595135315435424301927799613242136281505329571653127964372375893861810170649770608858992472927145021004630697096408449135312e+50",
    "0",
  );
  setDefaultDecimalPlaces(83);
  t(
    "-5.8718829764572368769675720985686003148815928898389019806828338e+54",
    "-7.06492078435216459678184762947706428565501354855990230138455953965122747209378780216589572204784180428373845600788198496058617e-13",
    "8.31132174823906921494548328080826276164240500654474918724115777751300778965455755467443998331403260133328867630810617976446866922787105487801479859386e+66",
  );
  setDefaultDecimalPlaces(87);
  t(
    "7.71352107451696e+4",
    "5.5356024536667500895309963107838049646773449686212017633033045240608486246341901e-18",
    "1.3934384087512587884549752672754368766039176823912540684066444942625271928855986862605750835855696386117353386e+22",
  );
  setDefaultDecimalPlaces(28);
  t(
    "-2.57829189032480222154481521678179658546184637804100290805771962144756397e+2",
    "-5.34969979334923737048663792500956729630727647186611412198172966319067171870374944242966973631263321342435094567e-6",
    "48195076.1710057513281692012443584158",
  );
  setDefaultDecimalPlaces(2);
  t(
    "6.987791323751796323712021392903305835561847696580057966995185528015404724004817011021965125610687309e-9",
    "-6.68731847857354920244165395545074131802960056510300989896059677379978153670727436541448596087808474787791542476526669836300983659681443009e+57",
    "0",
  );
  setDefaultDecimalPlaces(48);
  t(
    "-5.427698401308562375216190783114785700309086595525881573997702077539302932746996027168081648214684087576473515809025460799263772471e+119",
    "5.3836603823305758205699268539727e+3",
    "-1.00817994001302931078245046449306859242709099063913385418022430143522924655441913631248157023440655743360611487336747068423826456392332115711861709550633549133000053e+116",
  );
  setDefaultDecimalPlaces(89);
  t(
    "7.734409088327295038420656920501658101366796286914e+20",
    "5.1233016918500551041205e+22",
    "0.01509653257513779814888306725131574398252069563269008917357303771242034819892417843868501",
  );
  setDefaultDecimalPlaces(19);
  t(
    "5.3635177466589494381103695927711388809257351672027260940866530930152430382e+73",
    "5.7e+0",
    "9.4096802572964025230006484083704190893433950301802212176958826193249877863157894736842105263e+72",
  );
  setDefaultDecimalPlaces(94);
  t(
    "3.17787999891601447560033175837419199800703038524313981e+53",
    "4.462991640266274807787870627295429035679150378965760086214e-18",
    "7.12051523969785677868806566330823351503875510664577446955721444247578550400859310324479039518311290910164069361074005169275467501585495990062165822167943024202799398e+70",
  );
  setDefaultDecimalPlaces(54);
  t(
    "-1.4509290673597818014978182086755979060483349522885494298126099773272271802270962116812708840589947337482572835197478090432041635074e-16",
    "-1.384763916141236575841578360127221e+25",
    "1.0477808169662e-41",
  );
  setDefaultDecimalPlaces(45);
  t("2.44035639262393e+3", "-1.2704502217698881138054772654604106133249671066932646613329782117524999e-16", "-19208595116967460416.967270494124876669960536573948166189959237067");
  setDefaultDecimalPlaces(50);
  t(
    "-4.51218053266349832536947455713142692637144932852953592690441200451189113133559692475281819297733425e+53",
    "-4.11426742721625894635573597193575607760268054622e+32",
    "1.09671542078548599996446408356704502594782834662563249017869805548185507e+21",
  );
  setDefaultDecimalPlaces(87);
  t(
    "4.881166922420206407477531263913945647370335486682300634949921230692145959645523217844486905126058525799566157124202448304638363e+126",
    "1.642734494032896160082616694633206717955979840407613338888057340952252609961437135920116056128735564431748868042101039721993659557913e+132",
    "0.000002971366913004299431142980087836559955933142037858808115034997711767338040475849344",
  );
  setDefaultDecimalPlaces(26);
  t("-6.8209401745079986307815735154419e-11", "-2.87975322e+0", "2.36858496316153e-11");
  setDefaultDecimalPlaces(92);
  t(
    "2.6768759576130220013748382853880186209544129e+35",
    "-9.658145072739422337694123779386217852e+2",
    "-2.7716253353541279597242908117797227094299856473180889824796203358144281906210250766290638731287394457327164415562550274350662e+32",
  );
  setDefaultDecimalPlaces(96);
  t(
    "-1.0285939627617664626207050539160602e+34",
    "-9.3649225044518067401902752777439335600506480904127524375595e+58",
    "1.09834754347705852654781179143832958384305915914163315370429518087539255e-25",
  );
  setDefaultDecimalPlaces(85);
  t(
    "1.330816127599597e+11",
    "-6.109780236658398662679513375026185304555176340174219899430844950543442582758987597827156667706026912e+3",
    "-21781734.793254294546328678412002671390615925523740502902249541717992904745723458183621013611",
  );
  setDefaultDecimalPlaces(7);
  t("4.506264366236342428726509919e+13", "-3.63237551786631640717515086080316605463787149806034140345148822581141361421717865975974769130932e+95", "0");
  setDefaultDecimalPlaces(52);
  t(
    "-6.141830260002194448043278966962259524621123935379151267157e-17",
    "-2.8370847950993297301597415305406469793938632856668010499366699650469712074498943373315892610988744231953685139044245094926713764256885609664e+33",
    "2.16e-50",
  );
  setDefaultDecimalPlaces(88);
  t(
    "7.6617217951382525286065319984915049907233774041285291647508170010296818948692041015887280478912230304258e+60",
    "-5.002430873675639791519951015767901588941551149273282127719540753227296856442485600105963235975962340710985898392042279181354666618636872321e+15",
    "-1.5315997339326837317958158852230746605713650203096150590647186035643203060236755873642545215789713002814790034203683435393467904911625e+45",
  );
  setDefaultDecimalPlaces(71);
  t(
    "2.0340627967012272081888567782670425689446309872411028739445419618959978386416641003928735378e+91",
    "3.35702788152707013716488286251332164843774073811966424798190796237433897262912867634798932836229225742260519765428210004980002310276e+36",
    "6.05911797126914953426135407135900401318234195271358436043856359298813326036680285207586354013980311447303631731607360943037031e+54",
  );
  setDefaultDecimalPlaces(88);
  t(
    "-5.31084575489892764552547240777026700607738318055215429e-16",
    "-2.32209322406097645439554865234993422605236750946727489246247453533158487008536244014121280678024490291128302732781383031821597666797943091121e+37",
    "2.28709411830206036350007421993934574e-53",
  );
  setDefaultDecimalPlaces(81);
  t(
    "5.20894790940374983312633386832827296345275539503924327585579180622894183522003034202543607055e+81",
    "7.5691714794493003838141705569285760282707095650964028703003008607466830308916147854159498374227609225729175e+23",
    "6.881794029302041874452275699183521107766191288727046695138051829441431170891854010660008098926441745546153889836714144608120225646169099652e+57",
  );
  setDefaultDecimalPlaces(81);
  t("-1.18279724526102392056e-2", "3.4697886649135117336082289e-4", "-34.088452049586323488017889842451666308417450355317753189978260574355589853060538243");
  setDefaultDecimalPlaces(11);
  t(
    "-3.56930886476388749886862386963513571969332862642676234653005931e+62",
    "1.435453894413684124645216717146647797042568038706714850939016098417389728892953097123220897316946542141222414084218614683623783651178989523570677e+82",
    "0",
  );
  setDefaultDecimalPlaces(80);
  t("-2.314391206841230035617e+21", "-8.5774250060983757e+4", "26982354321905988.06007613528884735878245286740390126955685726340193145337920901571818451963419155");
  setDefaultDecimalPlaces(69);
  t("-7.2622955954868502473028996989095223468924091591738282751177586656e-15", "1.87147753716076698e-5", "-3.88051443380107835135308408012118614365460483154098968661974e-10");
  setDefaultDecimalPlaces(30);
  t(
    "-1.146055088964239852631626066338973134664492489512611002235009265420670251431699145174099470311761572140175323074752145990884077368e-5",
    "-2.3050623398811207543812470486753124687079910985333924823481475506183262561222125114447466219734174037076669583189634286e+113",
    "0",
  );
  setDefaultDecimalPlaces(62);
  t(
    "-2.950503231841388267889585445351953554836956715889436429648089765873493606543020468487352579940091059366557856e-11",
    "9.065748003957698024092386186878851408963736247663485390847077843600546895164441219981562509486961355811e-3",
    "-3.25456126792111494600962289469258936145796744071225067e-9",
  );
  setDefaultDecimalPlaces(10);
  t("4.90091793335517274936e+16", "-9.79887513434988e+2", "-50015107511422.8503363132");
  setDefaultDecimalPlaces(63);
  t("-1.86091050804713406508442e-8", "-5.3385489628295780314554e+11", "3.4857983339742569791748821895016304620079323e-20");
  setDefaultDecimalPlaces(11);
  t("6.31738431544986144581926065195420902469344539127e+47", "-1.584632372454728344413593654638011937094216031327317538503269310475618992063999e+61", "0");
  setDefaultDecimalPlaces(8);
  t(
    "2.100404305353e+0",
    "-2.92429577193879503890752552840235498571366925559447699051679068441298990683078328048338834984801793064083606940002544e-17",
    "-71825987149050977.30616499",
  );
  setDefaultDecimalPlaces(69);
  t(
    "-9.88139595234403689342044332e+7",
    "1.2348095419122150679399415268030337237212345144655999e-20",
    "-8.002364427020700744606235223691028842579724278861096420827333070262808741223524059848466085083025e+27",
  );
  setDefaultDecimalPlaces(77);
  t(
    "7.4305346284229181297120018574138106892013254559444431728543324051621722e+19",
    "-3.844589154902569021948403856743836879364456093656575739028154178309057083366147e-4",
    "-1.932725274155132824193272152721082789144199675042891273137780467293394369692989557281603295663143531e+23",
  );
  setDefaultDecimalPlaces(73);
  t(
    "9.017418528734841165246235e-20",
    "-5.034479993055053011202436456267565447352773869378128272742064733429197323706566360009173195741989561054570271893591596979456e-9",
    "-1.79113206153846243953030938644319799708332547042749036629360586e-11",
  );
  setDefaultDecimalPlaces(63);
  t(
    "1.08256159604699628104546410956700468811441194394536315593243590268672549839234025312127845105833314681573142632561376993357371300147e+66",
    "-6.683504033370113235644858132645760939006371956662363289883067820745750605579267171257206927301315639481e-9",
    "-1.61975154146966478332348106686126367282618679249956620232651562720059201766076249033184967858557754201100901195629749742474189770885787896e+74",
  );
  setDefaultDecimalPlaces(74);
  t(
    "-1.768081873975524959913320299734306106827206590866810037836629767589249359666455989436844853762e+0",
    "-3.2742424836121379386034935060058943942643149883154025035834330162951011499025507515420072723214834315598589062200244663711057179209255386038361e+89",
    "0",
  );
  setDefaultDecimalPlaces(12);
  t(
    "3.5826647238043088927728598258744331620456904495975350753915358148838340086466233220218e+84",
    "5.946516564327551845256058614340839173456984755132178922327528511113365871946829473405386542227626361019338855202064819e+117",
    "0",
  );
  setDefaultDecimalPlaces(85);
  t(
    "-4.6840543290062278783045975115430689790596871331117706948816222232351090576845544452198588022768549513568351653747723023519069671287917684465651416992e+136",
    "-1.163026516910010142856148449086251238088107669393952240014502200655242409293883204322196506e-13",
    "4.027469933747571915674299951116158845620859967192052266159327750259236147092278127540712925090638483376396418882111767797069212420183346489008430958391398304382879027634029247093599484661203305187031153453813170551507999169240690545321e+149",
  );
  setDefaultDecimalPlaces(47);
  t(
    "-3.585280915422033175299305555022995324590608699496281621309080789088442487349746929765256535514541438920374724638014794463731259158553552502470537e+115",
    "2.78712366300165793487568133131887314283039511622379509706725522655333413067e-12",
    "-1.286373103215944549378376620533732556318873382887197513809087539591494023559512753388447420892031027731980037806040765969560600754255217120443147478780265695292360194959900099e+127",
  );
  setDefaultDecimalPlaces(25);
  t("3.1e-10", "2.364102733938486767600798147962242518223050191219787079062231321415831894457918465054621177973589205e+94", "0");
  setDefaultDecimalPlaces(12);
  t(
    "-3.14894654783304671862630530602209992e-17",
    "-3.639565790780328640017212193072495795050668863144599586855426380846495623084191277906665346207578212823476204254678664e+95",
    "0",
  );
  setDefaultDecimalPlaces(11);
  t(
    "-2.2079411398537220370137802617673138636164894139442813131531808e+33",
    "3.80636260189882043021753115655069559927556489121631326004001173889783613799873305006598769740545662323030474448101e+19",
    "-58006589775558.45729156236",
  );
  setDefaultDecimalPlaces(68);
  t(
    "1.12087422469044051573221998139076937033877337420538455180786987772826366401293248103016754324923578564206809526732821938750128908472292e-20",
    "-3.311008142379376312534956704009061014373706266712804170017032939539047288964e-14",
    "-3.3852958872065812294804113215084709096032382264532005562918093e-7",
  );
  setDefaultDecimalPlaces(9);
  t(
    "-1.08152346821528724302781527710852936642345039150885408628789108440295784361128901e+79",
    "-6.32609997472413493463874663811931354694007799042028999506169711999817302181647e+45",
    "1.709621208227032042222615666010661599394918e+33",
  );
  setDefaultDecimalPlaces(44);
  t(
    "7.5686274493104976975738985874004108369462e+20",
    "-8.282657017079684274347654153954288350100819179e-8",
    "-9.13792208672074103889134179412067059746233081587102612562842917501304888e+27",
  );
  setDefaultDecimalPlaces(13);
  t("-2.77422289771718e+2", "3.6907627532728674079356322304876092899280284041466e+11", "-7.517e-10");
  setDefaultDecimalPlaces(97);
  t(
    "1.73233198094648329807089465588279630011130038342901095470114460668203160057703776514670267490965385234044367813424674776708161946819630706251493e-15",
    "-5.5984272744882458465216219842597036118652295005829408635328554428696476945130069725213849474186164214908985477768587458012459e-20",
    "-30943.1898640647494598194362278454853202759408951534201348258030394947501450926388098215751959526577912",
  );
  setDefaultDecimalPlaces(57);
  t(
    "-5.28467085303996283449818531588747756484472942557317035727897867354874207481564391891591780465615230383836797958e+16",
    "1.135068610023970495517307e+17",
    "-0.465581622676391395627189067046763979660277564287439784498",
  );
  setDefaultDecimalPlaces(90);
  t(
    "3.641391192759786428016729824129928289634416872028211780582391026427937678748123774592429084237910954112218e+88",
    "4.12501502320159353696517948968476546713317236756041231465603875146417682821750644117695474998272554942961665881785684902987e+36",
    "8.827582862797801894939349553395746619164199444708238639349465670234185613581001495333519063152635868580420804656539039578681424834123521233978e+51",
  );
  setDefaultDecimalPlaces(10);
  t(
    "-2.6702300851748415904466772838214157453683412753843179995045836230998335478837686039725408154160493194370302494340744673e+24",
    "-8.381541968422418945956443946031085186845607463767606611432558583701131832404209731343874556895115790789775318613783645644141854903246799880009e-2",
    "3.18584586849886596555615912289537238e+25",
  );
  setDefaultDecimalPlaces(11);
  t("4.4113750043957477227251002691475038614515997150048157484154462e+8", "9.5246619362382358493969e+11", "0.00046315292");
  setDefaultDecimalPlaces(93);
  t(
    "7.35864215974677123842999337373890410342322747661545e+16",
    "1.0955828875748043496373151442430144970679e+34",
    "6.716645762910692524294498540258760018757837123717868312969926218260725795345e-18",
  );
  setDefaultDecimalPlaces(45);
  t("1.39401515762399606258080256350604391735028450988080550921149209e+13", "-4.2835006436950517960455847799115e+15", "-0.003254382976866987689329605420286566549847314");
  setDefaultDecimalPlaces(69);
  t(
    "-1.369936296211007699479280071252529610383104011498055310094e+21",
    "-1.3792824256660779073687281900507160047625749190672228118230748103583419048794508e-9",
    "9.93223918987761473123493683794136589401941798972424481919751380433070511809438041778979630331631366e+29",
  );
  setDefaultDecimalPlaces(30);
  t("1.9244e-8", "-4.78755211529177207333877298230722883882916552827044297637487120436663192251767773978032903117438382523198158807569922e+33", "0");
  setDefaultDecimalPlaces(42);
  t(
    "1.17179223154514206365325986066479957318344315298816597995886004629587056685718208846315875754436071e-20",
    "-5.6837951617091042790548337550675464337978174140141572242615175999254044202611e+20",
    "-2.1e-41",
  );
  setDefaultDecimalPlaces(22);
  t("1.411329266986583038668088127412452253304975695632459167e+11", "-4.427180468982368584105e+13", "-0.0031878738101475928597");
  setDefaultDecimalPlaces(81);
  t(
    "-1.9540029388652306604521155392940972414e+31",
    "-2.7981819963981474998024715364280746582324724723788450222619699228622322913244950088127216583738e-5",
    "6.98311597094272650014563254391303345217050001614650756454993803253090733466837509665338549956404112539825835340301277e+35",
  );
  setDefaultDecimalPlaces(68);
  t(
    "-6.970133937153758197206945245045877865817325202913895599374639481630865e+69",
    "3.0853172783718347419139946551100958125135886908460661427434743480159474664091267272261245327222587313767132499469136e+65",
    "-22591.30361086233492529119418640233963288899642145203777420340483099980167",
  );
  setDefaultDecimalPlaces(6);
  t("0e+0", "4.5470003581879289547051902169713154414870120486955154713293572591696450424710442188721038232095521614382207188478914765060892683576403388082652912886e+46", "0");
  setDefaultDecimalPlaces(99);
  t(
    "-1.00570961801836132625216736676304973926564620428495902629437449370204954361297e+34",
    "-3e+0",
    "3.352365393394537754173891222543499130885487347616530087647914979006831812043233333333333333333333333333333333333333333333333333333333e+33",
  );
  setDefaultDecimalPlaces(13);
  t("2.193634641699978529051398537772798907832009494e+17", "2.413309386770599985098952397192805882956196042022198820135797615333751320059762689140480436079114962e+73", "0");
  setDefaultDecimalPlaces(73);
  t(
    "-2.59420436852374307658129151661536402783809504e+24",
    "-5.739087452676335471381436676222456188118654477907120230682012210131666949431482782e+22",
    "45.2023843496926611620161960420330655579199955782491733141140234722659451559",
  );
  setDefaultDecimalPlaces(20);
  t("-1.09537186550171182788490126674470155065568767e-4", "6.42085252760998056668051159407061960446353817205327131071e-1", "-0.00017059601677371644");
  setDefaultDecimalPlaces(27);
  t(
    "2.379982004518479863277911715006909115970511412656556404211165431838810558220023990318415137170666107000979e+101",
    "2.38770415981930773945793421897190265791641e+7",
    "9.967658659599553325020742021781673872866878194260760767648235036771374714740402405172147012085586140028182102183150276914e+93",
  );
  setDefaultDecimalPlaces(77);
  t(
    "-4.1763942134311064743722977032678619301828617918e+40",
    "-2.1700343765700533565334845851804660156489131905264328699183793067863273436971174782098394708547049e+46",
    "0.00000192457513969538884212037077243202089498313189148078201429465445297829284",
  );
  setDefaultDecimalPlaces(99);
  t(
    "5.19150300196854347474859e-4",
    "5.49412570097531993358347820044139394741950025510769154958245642897178873485024325098323543919069081735323626867640460479124554944062604013771876933e+5",
    "9.44918861439035745681627527397418400489108690653992909781796658645933378858889257979541264e-10",
  );
  setDefaultDecimalPlaces(70);
  t(
    "-9.12523832560649213656292174656929370030958932208489276529746288e-16",
    "1.130920643051571305753301533550506338497526964344636640974290528137296227625899325966624571779317e-14",
    "-0.0806885821889659377477307704891983193296082429529424356113421845317076",
  );
  setDefaultDecimalPlaces(25);
  t("-1.5860382532284141232019749885530780259654164e+17", "-3.273581705910398905915364418954329112116733804588370587929e+49", "0");
  setDefaultDecimalPlaces(86);
  t(
    "-1.66165411796234857422405142965046354889550794979554642420687897545511488885550161909707300471104754789809048944210074107658898119538131833e+119",
    "-4.926708141710452917069629038310164804935423211665295922539487161549167725363083376345764975495585820000826346199972511340636e-8",
    "3.37274721815661693010417547492326886260386607278612014558341311676866710534356403980504949709210238800971003190035679393030725439880065150288058975507051666378022283334081804035790118114445529065329416748303134539e+126",
  );
  setDefaultDecimalPlaces(63);
  t("2e+0", "1.5288000442220001772020510774e+28", "1.3082155560884951902381514305636435e-28");
  setDefaultDecimalPlaces(87);
  t(
    "7.941803872860375429322058174909126710311698152341953400003317328059388472020289263869597563086990507e+39",
    "4.091e+1",
    "1.94128669588373879963873335979201337333456322472303920801841049329244401662681233533844966098435358274260571987289171351747739e+38",
  );
  setDefaultDecimalPlaces(3);
  t(
    "8.268648916386638244351880298057670528774315195280116618688205940103539531377535803866975964009261231532920056e+28",
    "-1.61740108774073964412540346920537467386371767611876103232119673e+51",
    "0",
  );
  setDefaultDecimalPlaces(72);
  t(
    "-2.088493372600992833934789785056420324388860060546234641432471708153829887136988936589192208535639374986207348516505269759686157658e-9",
    "-6.46258915948543520627127109291076636473912953885492679403307262974936055615103164041332186619e+11",
    "3.231666629365749471824308469535728299493403814760062e-21",
  );
  setDefaultDecimalPlaces(32);
  t("-1.169084439862029221519931609673086848108073143e+6", "1.76715414031556312162857838810305692710822202e+28", "-6.615633652e-23");
  setDefaultDecimalPlaces(16);
  t("9.056715917468643e-8", "-1.0807806957875430797654675709992238390225920917462407900030517484e+64", "0");
  setDefaultDecimalPlaces(77);
  t(
    "-5.1899963276895638859350807857700879934579419953606968663316522888797346726658820211423554112260288813156751384519049734720549563646462e+25",
    "6.9096931589726e+13",
    "-751118205726.70157910437429440671749648741327773400943145145009286533274917170488184765718",
  );
  setDefaultDecimalPlaces(51);
  t(
    "7.49218042204527700856595574358227907325611075390434231e+53",
    "2.269542809866744065043463970777006691e+7",
    "3.3011848859926019580187102604892544151401618762000293010784255688021601316817234218478262458448016e+46",
  );
  setDefaultDecimalPlaces(31);
  t("-5.681945272015318201443890080418094789271377922826738423831879e+37", "-2.9373371198200556739220629600240336608353050387989183988084914605e+64", "1.9344e-27");
  setDefaultDecimalPlaces(7);
  t(
    "1.28996679234986276503743432e-19",
    "-6.8281272800807962416506367540514004964526077761818171950242555542061746554300060267861120272321313371192321878955351073951590447586161508231e+108",
    "0",
  );
  setDefaultDecimalPlaces(44);
  t("-3.131209925899144553832285909240735564797925277815351963e+6", "-7.3159363099359e+0", "427998.52175402265893655910758995781957462688382126");
  setDefaultDecimalPlaces(57);
  t("6.928462007093941e+0", "-1.04085455815743460848765714707329046297509485023967335e+50", "-6.6565131e-50");
  setDefaultDecimalPlaces(68);
  t(
    "-8.59095382823651521094370204966302841373180505092444873803753068285064970400918853473800229047410292391051603033687206885016496707109277565809593e+143",
    "2.09041e+2",
    "-4.10969801533503724673327340075058405467434859712900758130583506721200611555110649812142225232088581852866950997023170997563395079008078590233300165996144297051774532268789376246764988686429934797479920207040724e+141",
  );
  setDefaultDecimalPlaces(80);
  t(
    "1.605029881123800464318578179270296051432952745413089199788280739504665312238068574e-7",
    "1.5605989348274290197124866845932715512237465983803825932774523624907669301735002054162270933292487668939897104786843e+36",
    "1.0284704450995185494126569042795181387e-43",
  );
  setDefaultDecimalPlaces(92);
  t(
    "5.7414671500722277798810955043155185867773998765398157349313086820418452541823534972465048179725181431926611357725403590285868416655480013674959598e+27",
    "-5.4520432847329330176652100002099212452580839733869356859044104274337892866333888090115343585165e+85",
    "-1.053085393901723602726545941261205e-58",
  );
  setDefaultDecimalPlaces(40);
  t(
    "-4.0099064536107544151515046228815276926413889755726154810692183978670299050951209790555285071981945e+44",
    "2.4745278980139804495391246374310013739680481275335491348732208093975503948881162700035007231745668178103985478197533e+6",
    "-1.620473326176296546075715105786548422255221641881783834003646120812779845168556e+38",
  );
  setDefaultDecimalPlaces(20);
  t(
    "-1.8930358057737845900518929969256351525408166587835108116418091050196709703974859514191492255544321205371897625119999768708458835389037e+133",
    "1.822149422770966996e+11",
    "-1.03890261803832735265458835954063406078297242793647312142593317122550229411482743325444593548808393717424338412622278703451895976956431473237e+122",
  );
  setDefaultDecimalPlaces(8);
  t(
    "8.75511194806730555944303839370450191233177099666006978866853179768045839467858897957183366983259318e+98",
    "1.2131013397807035265437122439209060746054035013423745376686315332329836625684512922924228520481691929894030168757034008956508558889697347623817283049e-12",
    "7.2171315461987677435048859770808343127374824302292693053710661052287463559639880047629076206029585112897791098716068248e+110",
  );
  setDefaultDecimalPlaces(45);
  t(
    "1.87055613056007789759041535333621619039159930183111e+35",
    "-4.59433501837307547557526984187419436607360459042258725662644652372564417253317172121985932248212758391852710928085156883644436715030546382198e+140",
    "0",
  );
  setDefaultDecimalPlaces(30);
  t(
    "-4.64136724101844171550569199755037877732490514163394564621592467052878080143151945569854311e+49",
    "-7.3197134080530212099583790101234163589689127145e+2",
    "6.3409138886668572459548832967361014101520895122666651448850196909211304718893e+46",
  );
  setDefaultDecimalPlaces(18);
  t("-2.4903368535770523694852e-20", "-1.860512991206396932040884715217616426853293972051942104819165430642412e+69", "0");
  setDefaultDecimalPlaces(0);
  t(
    "-8.2901498534009843021208920309708582094005411209509111912294559255664392844733582903340482026250147057055587351108993048558487565484133605133e+55",
    "-1.8865872794658671587977e+17",
    "4.39425726211198742870067892143547784185e+38",
  );
  setDefaultDecimalPlaces(66);
  t("-5.98166092685023022957724081538475052899560935297936459334823338383e-10", "2.446575245647326379585257923741e+30", "-2.44491189776081228288354235e-40");
  setDefaultDecimalPlaces(100);
  t(
    "3.6172853490268620160138116206535357510913107934369276762916558954476836717095836857860268456337857988272686563079461780317988871646529287448198e+61",
    "-4.6430301252286355560310370421973930653728724433507173582153353532838645719680070321690989245821403294309025923716307406509535937711545504e+108",
    "-7.7907858692791422500186197368735765040684445430116932e-48",
  );
  setDefaultDecimalPlaces(74);
  t(
    "2.340405674450563958846719808488736578133705087903280225609506657588593029481760294e+3",
    "2.09332392736296978468966596e+24",
    "1.11803321208813168291808046297163424200814451642294905e-21",
  );
  setDefaultDecimalPlaces(56);
  t(
    "7.8895701700496529705429460637910677850395316973878333812930326365577928e+70",
    "-4.414632998785855483e+12",
    "-1.787140668821054890565023800013868981589381324640339222315263239402213889021319858528779629549258901910651208643676e+58",
  );
  setDefaultDecimalPlaces(82);
  t(
    "8.07880686227814941282880522652630872307329904576762821657558844348224734862817017542565233659409898208872917926449407437642824025697294357097543851158e-3",
    "-1.09943752220230798211835953588425101010695761098776e+40",
    "-7.348127291576614581034004219110267329469e-43",
  );
  setDefaultDecimalPlaces(83);
  t("7.8677e+1", "2.84872514807175036995175952079e+29", "2.7618319041152500610196313610916686816114833996802174176e-28");
  setDefaultDecimalPlaces(54);
  t(
    "1.7226730774486413622398850705227933249095585943998643464502337571603354354071883089259e-3",
    "4.5740647279537711786303841453514566e-15",
    "376617555698.492937449951200214645318212020473631000981058565602891",
  );
  setDefaultDecimalPlaces(49);
  t(
    "-4.6810327028616444672905010581991159709217220991090352328161409557973699341693086507394954428228400587588656220225541518770601865416143340978e+140",
    "3.6324051e+0",
    "-1.288686854575125573766676260365099688611747103622620514660146511686532411863783764299718509596531526386984100981070132259493905715971584253584491443424082848028156330911439365614809867985264e+140",
  );
  setDefaultDecimalPlaces(71);
  t("-2.87881815653766e-6", "2.854218815526582259362461e+10", "-1.008618589744157139605129608368339321545394442017684683e-16");
  setDefaultDecimalPlaces(68);
  t("-6.312e+0", "1.048995615620225470652780427031203271664007039770162937229196104320267462872645134333455474050082209181079992672584421910673771331025561367070215e+112", "0");
  setDefaultDecimalPlaces(35);
  t("4.8102814166906333974388152947070568038140857218519000716e+26", "4.544422264162531922661715226400864052999561687864667e+48", "1.0585022995386e-22");
  setDefaultDecimalPlaces(16);
  t("1.018647620939934156466027738583443107488103135206067252289e-16", "1.047918583970255704e-14", "0.0097206752177309");
  setDefaultDecimalPlaces(94);
  t(
    "-8.7489634709019179164438091221995459787181440829398495315394041575638252709415993685132068606438825629733452323293563786732668933799575e-18",
    "4.3425849e+4",
    "-2.014690253010808819522171949292124600423619601067523062482763240291243418e-22",
  );
  setDefaultDecimalPlaces(1);
  t(
    "-2.1793563466827160831503775510090127943342673177409636066897821780362597e+49",
    "2.6833236196028001939128634577479303208750908247696932816506189124680518962460916973626217667725225867e+92",
    "0",
  );
  setDefaultDecimalPlaces(9);
  t(
    "1.40012764617860973520821507355364751692200874624680728696979311323487387915450578124588218873766683611054123264974350325579890041796252768e+84",
    "1.613299548165863427255693948e-3",
    "8.67865888743596501957795985204315148140487271588061254319567622039284317968473798089774849593489e+86",
  );
  setDefaultDecimalPlaces(33);
  t(
    "-8.543677127895887891277026170426567505997742931605191230352127626962437861010212470493152890876576760120950630190126200809915e+43",
    "-1.646026841865123932e-15",
    "5.1904846935636788708935768886734672114160419778913372570950177296448480120076903380232768704e+58",
  );
  setDefaultDecimalPlaces(13);
  t(
    "7.925754494559347902542885084963394800377499485500315814263635920599250386170298565838599191106026058476038651370478525605375916841235055107693519e+13",
    "1.0662843457585199575423505645588813001894702451905209474221e+9",
    "74330.5903916391483",
  );
  setDefaultDecimalPlaces(23);
  t(
    "5.68601609587657636790320018557851653572595780264e+47",
    "-1.09121313831637272719012146815756812624678027023680377786551681551082007601047641779e+18",
    "-5.2107291382593707186313693045765630880953863517275878e+29",
  );
  setDefaultDecimalPlaces(52);
  t(
    "-1.87198782462859844263626811874352182572859368580616638277811768874868491959e+64",
    "3.11355001575215221682054410299098447385673882731060322919986697061157397247006923115276797687152622438461759893366165e-9",
    "-6.0123904069560134088227076044436635334995855549064122947729781207293016347805115197024610553388335894268074879456811355890367e+72",
  );
  setDefaultDecimalPlaces(11);
  t(
    "-1.46281098046838600072409728029266388151386977140409693145910737414441132815565616e-12",
    "-2.88545353753385949993168282712266288913032814887459862478335194276519872585293954743855598537376519e+98",
    "0",
  );
  setDefaultDecimalPlaces(60);
  t(
    "2.0528068023077789715673044178523076536228235080955369293654016139436069348790059e+34",
    "1.9582603168087332534836100393137706028185114539337819476507717534036867369566099e-12",
    "1.0482808565784158922117770870944917685721812102598693240236597376276154097014381353605761619522157390816733e+46",
  );
  setDefaultDecimalPlaces(34);
  t("1.59120698505167952806188619564656e-2", "-7.417568863995181190327290484e+21", "-2.14518667e-24");
  setDefaultDecimalPlaces(76);
  t(
    "1.19466671179700425069e+9",
    "7.25712792423888432175832433562142475004551593348210944826179728567968748945416727519096910753126472320957441694e-2",
    "16461976752.6324670196961641115325657540430210983385713034986042091350074881816277929456",
  );
  setDefaultDecimalPlaces(26);
  t(
    "1.6966472471731796570950808846079333946908506660712811693444429573884952938388179102140697718953509866156108783017617507381665476047731573186e+117",
    "-1.26091333845920132867741695343103314419281657459664057517243871872535790629547046860603125064725520596185761162364456024875651784906539864511278941e+146",
    "0",
  );
  setDefaultDecimalPlaces(56);
  t(
    "-4.455288690251688495429266497002910578379327e+42",
    "-2.82248802693346370793645354107826644684007180648714135357291120747865300817070362217840889081053508816549763627861753041818080471218e-15",
    "1.57849693169193232092237776935656898240806247659685717173789180641915832235297988756247678022614286090862568571144e+57",
  );
  setDefaultDecimalPlaces(31);
  t(
    "1.387448374352883345024400645301128208973797246565049849948166988023524663616851e+78",
    "1.160233647313660219591992e-9",
    "1.1958353195197392651619758706190963447045484640244893752265029553241538234984851789973311490309914045221871907092679858e+87",
  );
  setDefaultDecimalPlaces(7);
  t("1.613750244055133774349792374818103900884112497192809815232624856098454378242456609070658145136617207752422934649396479899935669631e-15", "-2.74311586608035e+10", "0");
  setDefaultDecimalPlaces(1);
  t("6.6523773090981645203616255727e+20", "3.681288886633721859e-20", "1.80707831250410036220203994771269084008075e+40");
  setDefaultDecimalPlaces(92);
  t(
    "1.5511054891120469646574358249981546404488146938459615086120866540633330973185318660268378893746e+94",
    "-2.27648098373197660985886988894728559327840585741207076068664029674907820864715815e+31",
    "-6.813610569104001200129088155164580697479200266678996178364216801956372162850530760513259978385195183215319990821232985826167231321901826094721922827944205e+62",
  );
  setDefaultDecimalPlaces(60);
  t(
    "-5.1899174917256765607854423209177610651834703612584393527344349317117e+34",
    "2.7494555661504005249282694440142625897674681405638210831376595732867985546512518499787029221933221095055845962378960442597e-15",
    "-1.8876164269103805765286176405326009755611913100217351277282701186072986394829807101157004664712778216764233073e+49",
  );
  setDefaultDecimalPlaces(90);
  t(
    "6.4676605234750828069803595096251508552270123444615948286892706120296049186751028092017373818541281838555140499426007515407851813521020751879845520779e+28",
    "1.655932072683322941065945665857054384619961010831684640040793161577742795641340471e+11",
    "390575231325442475.590401226747139213502929791410760215750741741225993453475199508524533624020526774695696551",
  );
  setDefaultDecimalPlaces(34);
  t(
    "3.793977438587741892549768834532622355704705401296242900225258315609625799914865696685254281963295160320868849577226092204576476326306e-15",
    "-1.43573533116193023995915379011968818404775913769064869679774988807865809157281942442444941637451907270388860439258413921430288e+23",
    "0",
  );
  setDefaultDecimalPlaces(99);
  t(
    "-1.004964437474837804716568881889954857111406938093245102876812190833143286977203286235951543055620966588734142845540528650158213820922e+132",
    "2.2354985812689059058490755048285682060720186689836e+34",
    "-4.4954823317508141592140522913845894699271729810000354860320517401997962049122399980992475916324755929326720113829551130077950369241572593159787860333185134565278805860697898035864331466566445943491e+97",
  );
  setDefaultDecimalPlaces(6);
  t(
    "2.125498122602033623973706876041445353251306019660697953221276327575997081673429715839196272561439651344e+102",
    "6.189516175606290288532705299749358402357841893507905039519392863253712555512249306988504656593343634451609935536809029641e+51",
    "3.43402951425978259030992504760295936172135758444785058762e+50",
  );
  setDefaultDecimalPlaces(39);
  t("-1.56953e-7", "-2.97585448658893928441922087935756273747345443115181686941641934700952436574047349377877559524e-6", "0.052742162194868176339396405600236160816");
  setDefaultDecimalPlaces(78);
  t(
    "-5.767423663692867321449088704608248212400938860640752235691938322633303e+8",
    "3.13674319511704173e-18",
    "-1.83866619131301459618701826967867804382887641469100396539166025132223263071843887603883453106500140484099e+26",
  );
  setDefaultDecimalPlaces(86);
  t(
    "-1.12363882242073585710662012186354408953708400122179514178822942019271589869295445001103852231784598371682e+104",
    "5.884819565967722970092847609168131786629594552230164041532004844198584537229516233992787432259917040785e+87",
    "-19093853427874134.85649022698222121473959896792762636635818642311412445766729307825382591390547522507134",
  );
  setDefaultDecimalPlaces(56);
  t("1.80232601876e-14", "-6.37099736357192365575958779062798529041463914842113280318084497007544984131380288316760283968901015064069438091593640940399450236426e+103", "0");
  setDefaultDecimalPlaces(19);
  t(
    "-1.327720887983607131240512064572263887331824155904008646688661937e+19",
    "1.13841431693799824788661467591950773295976464551266288138919071313685572802094560673757459281074525951289721e-1",
    "-116628969631617794901.985862722052409842",
  );
  setDefaultDecimalPlaces(16);
  t("1.6971488432184569466028895173172047474885925127991245399e-7", "2.9390741511650322478181614842e-17", "5774433566.2498233154356521");
  setDefaultDecimalPlaces(33);
  t("6.710959058533804396078735079518856345116e+36", "6.30893158806132258636184498802376750031946850848964278717487162092550720970711856897839787e+68", "1.1e-32");
  setDefaultDecimalPlaces(56);
  t(
    "1.03293048147587283265909918373356043664773562555803069441313525892308691003608619232812352178152808632506375e+94",
    "4.08263845319482153292023517672291089748396167161813908531384864900865500495080570307120718961082555722163499020184393023e+42",
    "2.53005622054915252994831607904650481647912437478917735581943919843351534342705794571560917549057251466312563e+51",
  );
  setDefaultDecimalPlaces(28);
  t(
    "1e+0",
    "-1.869924990944680581628659310962442333618192077955669932741176580618680911805306328611996301904015700981301756640083170251e-8",
    "-53478080.9306582374740289780292935698",
  );
  setDefaultDecimalPlaces(27);
  t("1.974052206861571e-7", "-1.73252948758111588385867062355500638239e+34", "0");
  setDefaultDecimalPlaces(72);
  t("-3.48866456e+1", "-6.08869255084764564068717346838124488223894810325e+15", "5.729743341227372046327459617179569182259817914823775115895e-15");
  setDefaultDecimalPlaces(82);
  t(
    "-2.037057434152e+7",
    "1.09150506655150482433952701698802074214147323524577686383847481096382118117109205107234565430471e+26",
    "-1.866283076988243570330590434191033890710189452905467684979006359e-19",
  );
  setDefaultDecimalPlaces(10);
  t(
    "-6.2282266710006991152052998058179181625411093231957912982019280242174024550665820458690641893520022230073611526919260365337320144e+67",
    "-4.22241968696664512630078172278648714786657965445670594363148247904254430575395e-4",
    "1.475037332320466418649132454379695860874367884286887350554131855643673790030192555e+71",
  );
  setDefaultDecimalPlaces(78);
  t(
    "5.073072925404455706378269356791503177742294365321483475815660500877860619921e+35",
    "-1.002e+1",
    "-5.062947031341772162054161034722059059623048268783915644526607286305250119681636726546906187624750499001996007984e+34",
  );
  setDefaultDecimalPlaces(89);
  t(
    "3.9716065550144282647412575819210058558972707239172442438986005751683528209305489e+37",
    "7.3809213701869514090165918596151987587804634391104844063731169733506328308232764763817854907767945951144638777671967755245597966269992501007546299e-19",
    "5.380908908007824251523029354146827817117281489462857150864543295039621731867220572554496343632327010393477301613371086227762799013355281191884507e+55",
  );
  setDefaultDecimalPlaces(62);
  t(
    "-5.93513045336328877446506706034661747542138020548344565114686991059662777054492121758499067458987806741217064886233695945658555026432e+32",
    "-7.24374606913480220690737602110073329567213856655577112472195704222081026899631173536184021181111e-7",
    "8.1934545975493929179457030484115440371967936103570182495160336858238508643296842965236914195652150516e+38",
  );
  setDefaultDecimalPlaces(24);
  t(
    "4.422075210836773257831584018534771934616e+39",
    "4.1394375468570930033204323365238667113538543140477662556196098818189432652560940281150845248655608573961875127118864537407416696686700984304095502e+50",
    "1.0682792434432e-11",
  );
  setDefaultDecimalPlaces(95);
  t(
    "-2.7153345018067146425127137721165258111731441349628328617956941450547975469198399244594334477871302662977503400743864e-6",
    "-1.493532837886151517e+2",
    "1.818061466696521461081438747607631210346171730764582236926166776962146859392976863910466e-8",
  );
  setDefaultDecimalPlaces(21);
  t("2.51409375029059338032142361e+26", "1.99385388174e+1", "1.2609217622790841192213228998279944939090970802e+25");
  setDefaultDecimalPlaces(95);
  t(
    "-1.34264586814493919728366107231972e+32",
    "-3.679788372360299620672715139855415280777207700777788992859636467555993e+12",
    "36487040348022397884.65302131021915326546816646509345592090152370876289030677611972640371794198381072895617821203232",
  );
  setDefaultDecimalPlaces(90);
  t(
    "3.505603947092677963776318621281328010207692759921882792206398443470504965390979314254791141763856023396466495603430482057895207978673e+61",
    "-1.5512653309334366315741581867710187353808548587471130878057722898073963833535581832815409975968828390523515130352851619228647394811e+111",
    "-2.2598351662918071135129839876344339436718e-50",
  );
  setDefaultDecimalPlaces(24);
  t(
    "2.61129494355382425953530235995474725895292224521809022171131893298777929890654693059171541264551583461423915737513265213995837383336070429305e+73",
    "-1.1898160361550686104026931002415710508311371e+26",
    "-2.19470478141504426558016666373097720510599025691062473270175339690698366e+47",
  );
  setDefaultDecimalPlaces(86);
  t(
    "1.2613425997627636846228415141591154348422876196630474346711797383487321579230912363632746215726732054540188772059e+95",
    "2.60550493385391910342417067576972294380043868686182801560255458087883203137e+10",
    "4.84106778449678589960868956305952883380773378651473596307413283694159191632339117601779831616913567377704090536690886372777559255504866351578266044195412271217757627829602e+84",
  );
  setDefaultDecimalPlaces(77);
  t(
    "7.0674492182260081462317570165781499507787565986826e+14",
    "-1.2141246195346498923e-18",
    "-5.8210245509516334064137862221620406972940210734052619780292473331301240561467578242851665429014362020363445122e+32",
  );
  setDefaultDecimalPlaces(74);
  t("7.2563084202447255638433392059940356449e+0", "1.8647267054995e+11", "3.891352228100897566062872935444784448263334206978316730662325551e-11");
  setDefaultDecimalPlaces(37);
  t(
    "-2.45411224610918866489497204379829395728847152127268415982488986345386128312977033392117988313549951065326208542091215500670622982395e+21",
    "-7.154011669966598717883e+21",
    "0.3430400115800547248896473212762639915",
  );
  setDefaultDecimalPlaces(78);
  t(
    "6.5398585257388136089790384250093777044338348656313255876645950261387614236720295896365846130570464706156e+76",
    "3.2420819268032205882394164791895673861376480016257300816478638755462009131065678e+79",
    "0.002017178675119813788124888614356297190335863462204427568991626071826374986161",
  );
  setDefaultDecimalPlaces(81);
  t(
    "-1.25316431949960742140440099552743274325e-6",
    "-1.21842313852898254002399171993062075342834361578049683651882018193996840722478234295925063619218048312663241627168e+21",
    "1.028513231464537305738530984971226926150490220022161511e-27",
  );
  setDefaultDecimalPlaces(16);
  t(
    "-2.918024522644804011709576445400598755653738289420221751520300399159365617956759432342297366627304655874764452960058666618e+103",
    "6.686503804e+2",
    "-4.36405124139641334706339523290967196113740263628543918124465094398287074982834995533982555201923976333800714750936926e+100",
  );
  setDefaultDecimalPlaces(72);
  t(
    "1.08771457276143195103669101997735929059932840574875771845563955619811271504340384197745815139775848533949403147e+41",
    "1.18297839915997092647035825e+21",
    "91947120381387732397.620006454504660865973177168639546647353449285114708786042686380287764874",
  );
  setDefaultDecimalPlaces(44);
  t(
    "1.930074794864614463201230299301316568845753077156837219254028102633046926172734218825e+84",
    "7.3027618188e+7",
    "2.642938168811545661855661860712302393194071560641595464948382444200888396873445923846128547105669435146222983645859557881e+76",
  );
  setDefaultDecimalPlaces(61);
  t("2.698900777626962657260832557035164122592258566115289e+4", "-1.19784249360043726838418033451e+19", "-2.253134942236597100954025220340036495832992103e-15");
  setDefaultDecimalPlaces(18);
  t(
    "-3.5689890359338674500101733695891943121528403433945807918129587692690209531398188611172227791082139e+94",
    "1.24254516095571540494778393067659434655411716457632566299306825473786040066015399421172460667792113993217850009590061443017229747e+103",
    "-2.872321384e-9",
  );
  setDefaultDecimalPlaces(46);
  t("1.92217e+5", "1.158013343125e+1", "16598.8588250015895083471428631514543283687087955721");
  setDefaultDecimalPlaces(90);
  t(
    "2.55971636951463739321584336020404461552622025404026220288030984707403638393337067806893925605427707182106508920818906110839815e-6",
    "2.62766537655296949994967359674525702068443390966762203823573945399946177143327e+49",
    "9.7414092081714409869785208347896309e-56",
  );
  setDefaultDecimalPlaces(43);
  t("-5e+0", "-7.8069760210465510271004351759923283711794434424560170885293660336443496765762900432356932228835455006721127444549801662176223072201833607188e+139", "0");
  setDefaultDecimalPlaces(56);
  t(
    "-6.6348681409380409305525473347500199172536220739617134407393254005092670574506323252622366459199800282099414e-11",
    "-4.91468671859e+6",
    "1.350008356756776699203240869160952245349e-17",
  );
  setDefaultDecimalPlaces(20);
  t(
    "-1.43946321157387221791467948883242531498629929394758716127337441920110589705370774805785565576178041839913576407805795685540841859347297480480262397567e+149",
    "7.7000105093e-3",
    "-1.869430190822859449931165938535331857207779998149810007394212140781481539703004192181376579984014565972347982803106999462557757672271044525965974418504551118197523834644515e+151",
  );
  setDefaultDecimalPlaces(42);
  t(
    "-3.55951192323690223304732221022094768299511684547009287319596943201056923802748045115618157809604937951795636865660451e-17",
    "3.65873466488429153937688154185527688619615451692334958688101954650322051e+71",
    "0",
  );
  setDefaultDecimalPlaces(24);
  t(
    "1.812887499741819654896703305070403020804636805000540788793e+27",
    "-2.86012004548265254445399251868046689147235973790502781905287109494797892022090267224837030405941164e-6",
    "-6.33850142970446637525485506598501697228062364147720134971e+32",
  );
  setDefaultDecimalPlaces(99);
  t(
    "1.1562076022828818487930123734570304148421506620101272639879754055873655380012140584194331166091777129948909772751479389205440227527821221291067711e-14",
    "-8.35290530274933120373137202667829949740057932474304944847632678748042162650606334782102277e+6",
    "-1.384198144689034046224550145079490271929776821068987725834580528678652445160583e-21",
  );
  setDefaultDecimalPlaces(41);
  t("-4.848398048671880694391769168585e+5", "1.360197915300111430914301748e+6", "-0.35644798408635551752665530595520312967737");
  setDefaultDecimalPlaces(20);
  t(
    "9.3168033417793180868844958052711377966357745731015661367279046704668550665968192822979801833e+72",
    "2.910446132792530597783345118122618510777961490021163900758899469828604222540153581048638981036404477544637410025194142198558953419601648870701289e-20",
    "3.201159862333538955734654845373013052118662304313383085628432148380775467957221600890875719050666454297698278162e+92",
  );
  setDefaultDecimalPlaces(35);
  t(
    "7.287417359460791815350463385250514684736377393335519219945839923915957934490426e+16",
    "1.355469386947939934318569413068325669104064392837911665792846344550853554070032e-15",
    "5.376305381466119844308234687752021186915124699888419142659023338653e+31",
  );
  setDefaultDecimalPlaces(97);
  t(
    "-1.457736271393922736423261606031323e+27",
    "3.0992866945541542089228175689840375857548505330143616279030567436981811710015908270768513652267251069099331889571027e+115",
    "-4.70345733e-89",
  );
  setDefaultDecimalPlaces(40);
  t("-1.09531107721561037839102241906950034114158534949215641201806482e+9", "-7.2970113504464280354410816496684573736329003e+30", "1.501040665297306568e-22");
  setDefaultDecimalPlaces(70);
  t("0e+0", "-3.9e+0", "0");
  setDefaultDecimalPlaces(25);
  t(
    "2.40531325299352503515933340718e+15",
    "-5.49106562911506828986266587717244118502161541736612249164298228452579204555108937600904658108555091187458683982e+15",
    "-0.4380412501791863718429271",
  );
  setDefaultDecimalPlaces(1);
  t(
    "6.96070806159789731e+10",
    "-5.20329042862123545209485677266279211612808665315190978712809149695534620387160961722713036342734180652449741674827311557643784e-18",
    "-1.33775120898687587786030015921e+28",
  );
  setDefaultDecimalPlaces(21);
  t(
    "7.1283286004382941457260995842331000259151081472650885670140142e+10",
    "-1.2112869161241958241834452512532440554038241676439646371068962099909282169124529871485173926246191869399773712167057358650175288507964408582964969e+118",
    "0",
  );
  setDefaultDecimalPlaces(48);
  t(
    "-9.2211403828322221406491672721155282947492574598298236256749147106025345656803956079743567223993292514812882431347541813793291187091052920031e+68",
    "-3.5514683231404581877168709928572295e+1",
    "2.5964304180188325530508425340691272491411426788259530676866591995130242335694666649242126084364358780378108227027609e+67",
  );
  setDefaultDecimalPlaces(5);
  t(
    "6.3398472230831633674986019851029474101229805453138812998681288040343426890403442522246679e+42",
    "-3.01720247662591658389522059338941796008135044737690928795926942239241718881365358835221238102638542501986091363373789756787338428186900285269255011314e+102",
    "0",
  );
  setDefaultDecimalPlaces(29);
  t(
    "-1.168094232948102760328789097975548864439610692490206186847377799503e-5",
    "4.23671815271182245455264145334409965529979194717604762174143450520804895122875562687364884293586e+53",
    "0",
  );
  setDefaultDecimalPlaces(78);
  t(
    "-1.266203949873322371424157946885425776695069416652549992703114454106992342631378323356e-16",
    "2.967827427218210633340502548411505108853804435527810183883056690712062546897507621721615534554e+88",
    "0",
  );
  setDefaultDecimalPlaces(19);
  t(
    "-2.8709864273306046284809098411253690508867356043897986289067105429371552809294911821762282881049838313480170710846e+78",
    "5.352756669531004877206727874995617271828464524661324965771448505297685857385028031612461603960489288320329713e+105",
    "0",
  );
  setDefaultDecimalPlaces(84);
  t(
    "4.1591664445355665344461427945597867106434189551708358870077293635935464732206074435027717764795199196450743012532674620825289058e-1",
    "2.09e+1",
    "0.019900317916438117389694463131865008184896741412300650177070475423892566857514868151",
  );
  setDefaultDecimalPlaces(65);
  t("-3.016030753376253080415660680069120209415e-10", "-2.9994450863275999680392844713716842113550141465557187059e+35", "1.00552957849578767805e-45");
  setDefaultDecimalPlaces(56);
  t(
    "-3.9563271871879163234230510531386416969458156878125112112438850105746097345766822767763258943096978083734742885421431809055789563684083275906583e+42",
    "-8.64412348992889732732724768216480115813945816701926652583584257941877596310787764004042508670537183757461624e+107",
    "0",
  );
  setDefaultDecimalPlaces(97);
  t(
    "2.7367453968691411086575e+22",
    "-3.115449678717530628179549012726552720043533587280306277023813919585377235113135629615373777229875438440454602735029259976594600346741153e+70",
    "-8.784431395456586318577951137003147821960946689109e-49",
  );
  setDefaultDecimalPlaces(34);
  t(
    "5.01088271144264830740957983272598011888466858989123346544687569221e+9",
    "-5.09103134770467895685092548980500260831640603855770196317677948295302362053919705608653931571710342162818249764e-14",
    "-9.84256895943458268535939883646107834740314463005343359625e+22",
  );
  setDefaultDecimalPlaces(33);
  t("-3.3218688679322218058317833636015018375289872680314713e+3", "-4.85423986313187690866287629747143085778708111735e+47", "0");
  setDefaultDecimalPlaces(91);
  t(
    "1.12487929836896659069938051636345993966744585e+23",
    "-1.4503405728437872785370795519938862145498231433671404100924002e-19",
    "-7.755966560070333598064347497968084154709785412732946224078284835831523519546815522040406581785616219935969246300477739631895450878986e+41",
  );
  setDefaultDecimalPlaces(94);
  t(
    "-1.3704994086988801374885094076250670026644422653069449989883445226026640678869787825293366559343848142021473e+83",
    "-1.077743832981577299840883802968000723240450396273085757e-9",
    "1.271637439953977572661172131895572835314701525567856692739286059766026828023243613198357129594275979918585477636199152434122197919600055123952994409969291987005365400688268295080147376013e+92",
  );
  setDefaultDecimalPlaces(5);
  t(
    "9.81239996965477087990421104633099143699392492118921070800265806010093722363372576745236999862399852061268922244418964699e+119",
    "3.11156227161958846571076526886410040627263946199225921516153084e+22",
    "3.153528392844072077195660593501771267491055343113730175703070332308600010019457922877808664696638164244e+97",
  );
  setDefaultDecimalPlaces(44);
  t("9.15123256731335102e+12", "1.0261747693804312638713274081506481881381138392031971190307270955090129126e+73", "0");
  setDefaultDecimalPlaces(20);
  t(
    "8.1481896329361591480724035420707735251810871703143955170618882676063731813351974750319790987536149e+59",
    "2.231874194749306189072494590840810218753769802e+41",
    "3650828372004811510.30672234680670316127",
  );
  setDefaultDecimalPlaces(15);
  t(
    "-9.837865890274007763437371554198991156487910771333569966139452667677982233171978480865148488846049156761795976e+43",
    "7.97409178811960024420398716828763467013924485955702057843057520819754906445451380413857030056286947762118e-16",
    "-1.23372869935247019628529872308819284423434641670833422909645144443459206016e+59",
  );
  setDefaultDecimalPlaces(77);
  t("2.21644551301837115852e+6", "7.304964356137537581950805637e+24", "3.0341633510588480816197992997355509023757017664204554016841e-19");
  setDefaultDecimalPlaces(97);
  t(
    "-3.2329355905310895237201430966719491130792536629570965862860952235079886094125490843981772308665668938809863453407113883359123165e-13",
    "-6.772090187570240843337962331902343254922631690895221026357467010655130665326783821503440384401654629263375e+63",
    "4.77391100972775869457e-77",
  );
  setDefaultDecimalPlaces(11);
  t(
    "7.39185510085531064937102893830668283062909076383997358555016536438620611140342631033605628616e-4",
    "-2.28211865133921309967316513724691993769449278501048941971570485176205486337098411705250671854571e+70",
    "0",
  );
  setDefaultDecimalPlaces(58);
  t(
    "-5.5993037238057469969701222675941510391746438797569017129713275783226684695196356029813936939227012604647653311448554e+92",
    "-1.7934199031799189511527812100554399157113361952221541711597800049285943657729e+23",
    "3.1221376064119743815901127542869518328327611973463640123906073497753170198449658722393513706268580909699226873797267663664874102e+69",
  );
  setDefaultDecimalPlaces(65);
  t(
    "6.459904227265166092901034463727073259551068887512873678513461751e+20",
    "1.7543620003220217883016368726541103826604914377178538094108986036573715498578823090442e+85",
    "4e-65",
  );
  setDefaultDecimalPlaces(39);
  t(
    "-9.328072097476670273155083420886471718305040783982204695925390517125548299826893704e-15",
    "-2.93079264198617527894046420919655841254781278034790378431227681715045284929287057690830955892333187062682313538583852809238231759e+85",
    "0",
  );
  setDefaultDecimalPlaces(12);
  t(
    "-7.0890221380611391503004466814686404344468758405814113022008822857018339272209046270304643495906118210973077110275e+78",
    "1.5772041219240243395901391400586227621825968524350240761748022400847825556295815429868037288851016787549629e-5",
    "-4.49467639573073925671283701571363153712679607985889568465157490969108965581283604738128919288015e+83",
  );
  setDefaultDecimalPlaces(20);
  t("3.4285004775327125343047660194271643077398328562372334e+3", "4.8187116e-11", "71149733832020.83590777182057185502");
  setDefaultDecimalPlaces(32);
  t(
    "9.95143662580157241068162258078624038064857317819479846142197678497520323579824011647818449567680827879941265496e-5",
    "1.234152130591619169053911102e-14",
    "8063379205.14800935081266772829765092845676",
  );
  setDefaultDecimalPlaces(62);
  t("1.26348294e+5", "2.003745805272795681034525143857604709468533373327775585441e+44", "6.3056049159288736290702e-40");
  setDefaultDecimalPlaces(27);
  t(
    "-1.01528189601345942618615685609659550130843380311134901982444824152538590061121639293744214161803850752774424607559323259616252e+27",
    "-7.87779963777559398581888214177862312403726438417413696174246271571876090633612398367344221080062484194208250711848e+113",
    "0",
  );
  setDefaultDecimalPlaces(78);
  t(
    "-6.51878616323941423322e+6",
    "5.21927594994900555669273889494363560632874966524018620061592160226e-8",
    "-124898285236347.877304256937880191633695651215078496078571702490455418920175995479149507862897",
  );
  setDefaultDecimalPlaces(2);
  t(
    "7.80178493044483655277089332510708995201298120865662550829792200560429247221e+22",
    "2.71299651862127675113800364746064149850451793351357089986228189208777110893417092950611787307469670676586705773543870689119751530327878130544161257e+89",
    "0",
  );
  setDefaultDecimalPlaces(80);
  t(
    "4.91702341529424258544020395953734165430449211457349814952818187850423006716764347771431505102687e+64",
    "-1.6809506093162287674832268715864302302870287865827585821016061594590122902066827970040767084910495515165658329871961354493837465732539724545764385321e+120",
    "-2.925144491481740941615366e-56",
  );
  setDefaultDecimalPlaces(39);
  t(
    "2.4436109760912072634981305630141272636795197491937258688212280073694182663350261628836815726300787560986434175173572907841228467258188353017610102e+18",
    "-1.003402005192531270406498233578049475660334853242410994912610195474579524567866339461836149533947149702e+14",
    "-24353.259844466135563070437525733694524628642",
  );
  setDefaultDecimalPlaces(60);
  t(
    "5.0136104452627376629612639231773127990248664734e+46",
    "5.17542100753950329284191712182613460303203585686195715504825193958711864617284486269440960095428619565693856422938330437769940762218e+39",
    "9687348.02049718937457811689171738849763166783112860014218080506599",
  );
  setDefaultDecimalPlaces(64);
  t(
    "2.412488862789959609918395769036682786933369806265022448875015854457712839721136241581330736547122280757e-4",
    "6.68021916623422718100303258941143880248145139723021681364263878565672552247634152579118239709162279023321515223299179755428416702816796811e+137",
    "0",
  );
  setDefaultDecimalPlaces(34);
  t(
    "-7.7714740021938259806597556549094721430055298134777982344477079169600928221e+55",
    "-4.375368691657966999137921234132649047585298300428066131923493834e+4",
    "1.776187231263696355365744525627610417250665720974237769007924774377313350904521935263e+51",
  );
  setDefaultDecimalPlaces(95);
  t(
    "3.4994610459541827480722854278800121033325520769812174089389498339954240107635690837289026188541804317e+49",
    "1.41865254541574065621583212173179395965959279105135809171953857392987443974459583991893155431978014826861183072172757e+102",
    "2.466749915095422127939132877569337113210923e-53",
  );
  setDefaultDecimalPlaces(97);
  t(
    "-7.605607525258296855783889161379157290888582573266600735560330525956775750915792460576205606036620356645676828181787525314439333652e+104",
    "-5.102293769895460838366001232265631619425524572835505402223426007343077764738555172675820007185576849223119600199173867156312817e+97",
    "14906251.7139504602878090710065143622989114907615356009016042772730395717462086073435131089118491843548997",
  );
  setDefaultDecimalPlaces(27);
  t("3.65362069864e+8", "-2.21313872106770499683709136077238432194821579028279799647022980098738913494092504e+13", "-0.000016508774004357711252683");
  setDefaultDecimalPlaces(15);
  t(
    "-1.70574793195577878070739199321413359543490250373726634990881828969642540079550157062945100393026e-12",
    "-3.170566096191805081235583631533869196256122168754532571914483555142882323127230636745389377637540291019508492322682e+50",
    "0",
  );
  setDefaultDecimalPlaces(29);
  t(
    "1.004505721762467926894327e-16",
    "2.990460992885694525630146694076960523024928046698930458336798516079285013594114670622422909589704188612847643876873e-2",
    "3.35903301916389e-15",
  );
  setDefaultDecimalPlaces(72);
  t(
    "7.0076668934211004036136023042408011703828364133684492463012864675562820718247906276582738033213730853698773994e+95",
    "1.299365943914866050874083228372182603010362178309397398e-2",
    "5.3931434221737921748591854774960802923658909954818516006381901880512598230301794564759329791023093636888732388359422764895351819716278702840287985813106593654806475929976e+97",
  );
  setDefaultDecimalPlaces(87);
  t("1.084659042177844392379133280992362066023962956362e-15", "9.45942701324556600036757013350823337019896e+25", "1.1466434918933780949972610802199259329826426901e-41");
  setDefaultDecimalPlaces(83);
  t(
    "1.6531493669365137327097174426536354e+34",
    "1.26121465820101886270449172455180205821770772518805164398403414666450688737177517247010274457082e+95",
    "1.3107597157921917407356e-61",
  );
  setDefaultDecimalPlaces(80);
  t("2.15848335260178108591629e+13", "6.52709561692390845289258985531631124663850972256172e+48", "3.30695837671676664795319612257288117485039839e-36");
  setDefaultDecimalPlaces(93);
  t(
    "8.0388582421993339486373530807337854279478353003154489896136632430890570180891213339093727513426e-4",
    "1.1250971289585794057688461794111548152439893301141648e+52",
    "7.1450348910234269557236340672025110924e-56",
  );
  setDefaultDecimalPlaces(47);
  t("-7.81894612624620860097e+10", "4.573494223183256469817e+8", "-170.96219530816513107742941116273433815230781628238");
  setDefaultDecimalPlaces(25);
  t(
    "-2.7907002487061722104686264511006401150165688279683805562038156115202194465423261792095967028312259725398310196036235249422779301656099e-2",
    "3.05936446306843320036334871893186726524819177861610192697849183570559005098167877827064e+12",
    "-9.1218299826e-15",
  );
  setDefaultDecimalPlaces(45);
  t("2.1139959024073351907416766219125665873055335158592821738e+29", "-6.4633412570341e+8", "-327074777323053846116.137464186506329132974271798665720851580512318");
  setDefaultDecimalPlaces(15);
  t("-2.6364016883709646e+1", "2.61544691650220697360700887066376676172220444388315900588718965526340042212032512380993048184622823653954735e+84", "0");
  setDefaultDecimalPlaces(24);
  t("-3.1089312928612677636724420777994642136e+26", "-3.5581697408e+6", "87374451454985173136.584560260657709137696684");
  setDefaultDecimalPlaces(30);
  t(
    "-4.5602928991648800280955388732893290868890370855899e+9",
    "9.887519346180582016144416031001104568860556345253483749699939793777490852119235966300480742194833158275165320677634215747874303e-1",
    "-4612170898.989402104904187837795832447102",
  );
  setDefaultDecimalPlaces(3);
  t("-2.622162659253978570306266435009852600293038477336541e-20", "9.009567027910977306436393725896322e+3", "0");
  setDefaultDecimalPlaces(1);
  t(
    "-3.25695877190603293881362763905390684352834569081767066215402114647592763212887131931806901418724021693738239552456135927551429195364050627298e+140",
    "-1.12216816701412597225084889604688727249244586434075066566456031873459006369980886e-4",
    "2.902380291692086463678642651219672998864891029021404203578246296535105836953019866459632369456474504950714278526681882885655395301512788338837035e+144",
  );
  setDefaultDecimalPlaces(82);
  t("1.090542340687878565229690601061e+28", "3.484377810233159672698822264493170005021821683960552081347834745486233025011533737039e+84", "3.129805090266328300902393e-57");
  setDefaultDecimalPlaces(43);
  t("-2.37319534852157479045999e+23", "3.864315587373615460643e+2", "-614130832449561531269.2311991627907736595340988007568794944255531");
  setDefaultDecimalPlaces(54);
  t(
    "1.5364871623754932740567434671147334240223599547750104653171782073751165869946719939044000694878550069250142930710210395125556584e+29",
    "-8.218860068825104175373321e-20",
    "-1.869465046866451811779823582835363217238464790443191513449176750437727343462450821810403738885247472084e+48",
  );
  setDefaultDecimalPlaces(39);
  t(
    "-1.7196478987213278497835954909970967335589907684839695912821349363177026238e+39",
    "1.74694652581897547918224522847076639266219771479470693609085389676794663211867744976299e+60",
    "-9.84373518768784337e-22",
  );
  setDefaultDecimalPlaces(31);
  t(
    "-1.130760758766270687077506869923660851392375953736355676518262502189724958763401e+78",
    "-1.808075793670835171930291337949007465338622404718999995257799611545263689104463697653699959321920079408579197379842915625649385960202157311514e+110",
    "0",
  );
  setDefaultDecimalPlaces(16);
  t("2.0691656438738382470292531917952982812e+37", "-1.794240433135717814296011706962588142869e+29", "-115322651.6168541200668982");
  setDefaultDecimalPlaces(70);
  t(
    "-1.82284114749020657885907949382631884584366226604314e+35",
    "-2.0212284552861861445427383131588867511018563514761303493027760217535220506408952942541056e+26",
    "901848152.1585891849270546874840679095745395518503398364124113616048375226878707",
  );
  setDefaultDecimalPlaces(96);
  t(
    "-5.82127943128111664608265362392859536194275221449174294445725697403607411532178938333162e+13",
    "-4.16999526055127066684868227254538988867755806150686147707832908236017543239873479429747335588023705497012505179143429004336185763672603001015834e+99",
    "1.3959918579e-86",
  );
  setDefaultDecimalPlaces(98);
  t(
    "-1.58748142663064953202997762905463904550348384385738683403166667504655178278499323683399064828258778261456905438492817950634769164694114469210045307e+77",
    "-5.179121621423647984305140807536483519430608450388201854026408207536558953494063207082095505433975419e-4",
    "3.0651557207383734998849514899294787327608741084274313248766079776361110634737504607342230775136942363764920197094765977776604808374152504382366019767365257338395771748315932050511e+80",
  );
  setDefaultDecimalPlaces(97);
  t(
    "6.9054000818869223959881219988788929023458507720606974218517e+58",
    "5.533958344487396429089161416052933480196663657387520713816059253281508582553801750471994515972611610728547647782944757291605759263e+59",
    "0.1247822923850822892780277554859831917188751954194929544646198871533509221523643524865022249297624",
  );
  setDefaultDecimalPlaces(100);
  t(
    "7.18318032174909407504143495743383578125151504556917879679141557428712405472020741957050769692093966048940701133661172275295960937597549013565857133628e+56",
    "1.46949488328820000524318812332051051845519825844882425944450789389713264261832441154961323693351188878407140189e+0",
    "4.888196892306099785887502888943020872414852294138814695997780325049822437267079859348487319513709564911107393229518644647449782098315796752305130646433896395e+56",
  );
  setDefaultDecimalPlaces(55);
  t(
    "4.83196675344783595845255093265714880387900902920111169291467872239769997695735582240520832232496783e-1",
    "-1.1299874377834736323271155534104345683801685342653965198729675611103285288641313217962125258534771106686878001720913487896795927352830396927271966899e+148",
    "0",
  );
  setDefaultDecimalPlaces(93);
  t(
    "1.13627277567772009982839654759874272654847609666471672981972137356553945108360491365545386776e+54",
    "1.149816451950996057049013448419751446740779025024926262128e+58",
    "0.000098822101018793460944026603211041877069752586827391749369885223441656526645945483182412706",
  );
  setDefaultDecimalPlaces(93);
  t(
    "3.11629571501373967458582681688e+14",
    "-6.0381178115327667677094828288110563704696675222245670422675937538595192694849342422489455646846835138534440158349346925761166262421e-3",
    "-51610382776262407.485282534865781761731872975486880501302372336700974932589977320686161128890738885907664771418",
  );
  setDefaultDecimalPlaces(0);
  t(
    "-1.7160694121277140793700701277707933383818543609548117207035901076805087848850484405e+72",
    "4.84527167721251072974906560227962318037126172695880749634558037e+34",
    "-3.54174033253584326744281566340019376e+37",
  );
  setDefaultDecimalPlaces(28);
  t("-5.109011671733401232752e-6", "2.82893679461e+1", "-1.805982969102614606383e-7");
  setDefaultDecimalPlaces(61);
  t(
    "5.80003641705846965072746911140445235252293e+12",
    "-1.5396869683254460225400228141944111048731161342956146152402380252282612910751279208589655081650180730102652576745205554629019838732615688635598321981e-9",
    "-3.7670231263738974229161641385279778919246383012327814182151127714751864179542860096e+21",
  );
  setDefaultDecimalPlaces(89);
  t(
    "4.63578007519934624050083490479514770895788368203522098092765162015553250910734256660005270767679858627024255118803958e-3",
    "-1.37376651222348173e+7",
    "-3.3745036248526680729916421552188842732313152323978719628419819463331849416285926e-10",
  );
  setDefaultDecimalPlaces(22);
  t(
    "-1.12820969472578906924118314461741500103183558564010944864002599921305731208722e+77",
    "1.574390421532229330452339560118591358045602399589431786725577717634667247370580783178197564547821925922232899766513660058938205520587502933624442e+29",
    "-7.166009645992333039296562892679542137908925960869623558170572678262613e+47",
  );
  setDefaultDecimalPlaces(2);
  t("9.7059424397113408817857605049667567585744357873469002277890186591778316843813775e-15", "-2.8629252718801180012e+4", "0");
  setDefaultDecimalPlaces(55);
  t(
    "8.4553572236741194619842207215970177583412635389750875898708391265576065590987957815390675e+88",
    "-1.361713947669750286824537147248667512663101703557079998262971008062226025041889031229473842e+91",
    "-0.0062093490619990001077052342960951998185491692915317241",
  );
  setDefaultDecimalPlaces(75);
  t(
    "-6.8774680897674471608525556418726581869044222655119575486638302139079648886653596764481821869822122733800287889321448447465962e+124",
    "-4.49907380254654603713915058769776213808796756328218267590955477519137531614768750535733054926951334659431200323413510155008e+122",
    "152.864086956624112550669853856324712812168262069463231901385235395404840539264",
  );
  setDefaultDecimalPlaces(54);
  t(
    "-2.6645792345414983223924697019577881697578617903721540387988820455748041984032323086632127800727826264725601292486502183914487108449841641041709e+132",
    "-1.08219197526365971327556120861531650641746833454114286664424219164282514098730719381365913806172308605874621910229376056699243139e+28",
    "2.46220568572624453001366185328470773295607829820576380764272823042309044163983703208173318549695219714565860085407378157766139392792468357779525904316100132808e+104",
  );
  setDefaultDecimalPlaces(62);
  t(
    "-4.890408905697843591330712648489430905193469319718548945984477004022184271537217185370260324246414487e-14",
    "-1.6632824416997592748519748734841872105617514751175618307e+8",
    "2.9402155539501667157863337178576569727254e-22",
  );
  setDefaultDecimalPlaces(32);
  t(
    "-7.032461460845740180454224364127593243674576625142932366302086879575784735151936056183e+21",
    "-6.895272069619543946225379486593759912705031640487539753086618245550891564776170330125012e-3",
    "1.01989615345718560547799529918885725030141605586350216384e+24",
  );
  setDefaultDecimalPlaces(1);
  t(
    "1.0473593327697631231519353345503642261883535421994305181322066552511584686e+73",
    "3.2104291918276371114108759787674110852963731449778854671070932357076603301058067419186090233037470598269860492852165724002044881729199140361511302585e+92",
    "0",
  );
  setDefaultDecimalPlaces(83);
  t(
    "-1.718930097138523740382139642e+19",
    "-3.21943315910630419101417697880095635106200025685900620735060028070689263937618078942842849847624840824118979186020716708956885472735710724654957e+138",
    "0",
  );
  setDefaultDecimalPlaces(34);
  t("4.98744e-14", "-1.386595316748045981586194670496944768242633565919165108438955082578057712815071959457061268781469308926965033267228842909758899383236278758165836e+104", "0");
  setDefaultDecimalPlaces(44);
  t("1.9963912578589894367796336074717699673e-7", "2.51504989238179314947651684e+14", "7.9377799379095992762319e-22");
  setDefaultDecimalPlaces(19);
  t(
    "-3.029150037539022337007594340637186492634171050489614088032884737017586376889964371411317574e-9",
    "-1.1198494361091207217006386552051235460894859381570665262253021774607060368e+50",
    "0",
  );
  setDefaultDecimalPlaces(10);
  t(
    "1.625352115327025341486044217878890332825842174230060705342434804274482097393020251716942374e+67",
    "4.60576176042181388340314927316236591584392961494165055896626740594721166713696565709859541504223854724967789972e-4",
    "3.52895394914688154543623557227705537409939531595611153908828281180530606989573068e+70",
  );
  setDefaultDecimalPlaces(75);
  t("0e+0", "5.39844698796827244818254925079336456012935167e+18", "0");
  setDefaultDecimalPlaces(5);
  t("-1.9840503563139376615820707253053024046705721083395554990423915878754558097330326418502784283054424457408862076582909210605e+7", "5.39851e+6", "-3.67518");
  setDefaultDecimalPlaces(63);
  t("3.921987146e-16", "-1.075149755956561597620803913332900470042924827801937604401716542680496013757416290495464607837311697643288e+58", "0");
  setDefaultDecimalPlaces(46);
  t(
    "-6.5904711205846650880634442123420209059104179577968073410248655778939943613747108642454525331535747803590769327001600725903635806722e+130",
    "3.65465622877535818965338677482790583772267410068062721474942815219936357971091503795769434600762991310374483946239858072200320100369691764075708e+113",
    "-180330808372449070.6565987051383441528845261691273037143264040884",
  );
  setDefaultDecimalPlaces(49);
  t(
    "1.43425906956144267795679798770247260309079235763411233595719659115111974478037820776686664468709835881062401875e+92",
    "-1.224855972382900544651266624972038e+32",
    "-1.170961404361002632611043043924158650219529264286107662247904839191101910799197222408639076382573109621412397e+60",
  );
  setDefaultDecimalPlaces(17);
  t(
    "7.029641383361808630310763859126729532234323518465371256455917230909668622127e+27",
    "7.16949974651345479700813400641525832554283977572663379397848899669419289439046239318118487194133750468183914371247535971198e-19",
    "9.80492591101679077453819312685334063243673964485670448268218605e+45",
  );
  setDefaultDecimalPlaces(85);
  t(
    "8.8545284581533013129153986306475824561529668407910505598306093323002023386647962789419391757449744267723327294e+35",
    "-6.266457203917253007958003228707010365997682301745935e+51",
    "-1.413003898377891664485990232056159184889696973032324368999549717501287e-16",
  );
  setDefaultDecimalPlaces(87);
  t("1.33572821600572700272792e+21", "-4.661168879142e+1", "-28656507640881697431.368008360193495321938650501378821985566639512880335007739802690144269286407786848464903");
  setDefaultDecimalPlaces(96);
  t(
    "4.1127097871873650020339577e+22",
    "6.3010573964409356911820386046807632289357937600542200567377848559310963371340491695783874802763526559675401044937066021001558750847938977037863180589e+88",
    "6.52701527446864983753530301484e-67",
  );
  setDefaultDecimalPlaces(12);
  t(
    "4.282215109317997903980663643289930637588402668120859088366503006439967883455541012e+63",
    "7.653214424029485572325292840608266698744760401376657365449211605823850261208271470511405608033163410036455428041478650632579855751762926628e-3",
    "5.59531573540229322509931847917297860844599805443186230023547369298390146439172e+65",
  );
  setDefaultDecimalPlaces(35);
  t(
    "1.88946277901004057256680624754997076671826509156527990557768284192091333692621115646691422818970835476465127957e+7",
    "3.699803138323128458793674801254333601370417636833249155610519801725025507492138259612398539069654e+60",
    "0",
  );
  setDefaultDecimalPlaces(95);
  t(
    "-1.96615462765050979262130392301030582728664679295176387448702421786687849369088380216158535575410627408592211819989548465562608139421955749424525283157e+31",
    "-1.6573804818865439383903808066144901930811647534396000939091937e-17",
    "1.18630251118469669743457304317438004959923637663077831234669464245052541487767330733636238168003421366440180611361603609440069633745598374745414e+48",
  );
  setDefaultDecimalPlaces(3);
  t("4.302856294760492673310188536343358924712421380903254514086210552876997e+10", "2.7525508665980542351476687508591156398899450145885625303040403827e+31", "0");
  setDefaultDecimalPlaces(73);
  t(
    "-6.649495378702516203558529206529326222457251780321932767522052309569104950378e+39",
    "-9.658120897696470434005473189942377141695677161693868811882281068850213063655864149956277709387868241778334890758154405021218289482136487e+102",
    "6.884874862e-64",
  );
  setDefaultDecimalPlaces(68);
  t(
    "-1.6580676770720339444638525567323490913294774442935014988113647440027143955779571050723582573547265317389e-7",
    "-1.2866803874108562631899670840435821219462320896559802243e+48",
    "1.2886398932438e-55",
  );
  setDefaultDecimalPlaces(93);
  t(
    "5.80837951842318618412403603787246697438443955194015212e+54",
    "1.2592636024333765456567128952285167891648095231399626834258988237201e-7",
    "4.6125207678512952580223888321506136055534042133627691207019668291471794208958073732837179880835042338010150716095198893649008023580277571816538029041891954e+61",
  );
  setDefaultDecimalPlaces(99);
  t(
    "3.08481308339256746799778203340381166612099198820580089305808531469275952320378100555982124404986934917237605268367785021803517e+125",
    "-1.23870595935316038453347449130695272e-1",
    "-2.490351370395784154296896975687949147115131625486309827022053685951224118527631165239182877602049492077112462379875067019638568376153333380205798291690509445070966303629352792847520073930195102494028596783357743798372250618297e+126",
  );
  setDefaultDecimalPlaces(40);
  t(
    "4.10325998632912e+1",
    "2.54531890669670152683776305919645434563962304903809618810453069411739596538187152238582302766851029317235827144598789584743353622003e+4",
    "0.0016120808970276751551598415036492021433",
  );
  setDefaultDecimalPlaces(41);
  t(
    "-2.5402463162817960294623552044912420458978529547536991083554864848223248915116256498207605e+76",
    "4.01204568731736511415599028971203320207882375033981506116860634179116631454704405599283870556038740058114192787423969205806286891972e+93",
    "-6.33154882635526368036673e-18",
  );
  setDefaultDecimalPlaces(28);
  t(
    "-9.10846765809884024954182296644204222671756e+2",
    "-5.088057622236709583948498809661675267173526142099964350569360284147671845949783358636893332405e+7",
    "0.0000179016597970342144943725",
  );
  setDefaultDecimalPlaces(69);
  t(
    "-9.5178691512061704135923883397584573032305288022116723990173872309116961864009917060317768267912e+94",
    "-3.72840911947e+8",
    "2.55279633919550987295246412561700398635639559721401015818264402666961009915561118962831277413413412374956616498869364085345001775243176891724501455090847372e+86",
  );
  setDefaultDecimalPlaces(56);
  t(
    "-5.39989688147711563236890459488388679099151927906763604577078112909093485909190667959725e+57",
    "-2.07312781027838e+0",
    "2.60471006886546779930473059879189787478651919134911649913326572859114573624223560511791911770614551546291939010043e+57",
  );
  setDefaultDecimalPlaces(62);
  t(
    "-1.1697433443526007280350086569153258951711987168780909774859768780646603909062074814785441983593465970770782443406911360043085e+124",
    "-8.8003751602753201683473008417777386287435833066275732474e-1",
    "1.329197134268540944972227983454355852870859607350588146181119869787582911101877775438719373246913010656254699056386716425127769097298680772181427414116670400316802374070637934091795653832e+124",
  );

  setDefaultDecimalPlaces(250);
  t(
    "1.44107969e-11",
    "-6.173694e-5",
    "-2.334225975566654259184209648226815258417407795073743531830375784740869890862747651568088732612921858452978071151566630934413011075702812611055876757092269231354842011929972557758774568354051885305620913508184888982187973683178984899478335013041e-7",
  );
  setDefaultDecimalPlaces(432);
  t(
    "-3.71e+0",
    "-6.432e+1",
    "0.057680348258706467661691542288557213930348258706467661691542288557213930348258706467661691542288557213930348258706467661691542288557213930348258706467661691542288557213930348258706467661691542288557213930348258706467661691542288557213930348258706467661691542288557213930348258706467661691542288557213930348258706467661691542288557213930348258706467661691542288557213930348258706467661691542288557213930348258706467661691542288557214",
  );
  setDefaultDecimalPlaces(470);
  t(
    "4e+0",
    "1.5498884e-14",
    "258083098112096.32900020414373060666819623916147769090987454322517672885350971076369111479252312618121407967180088579280934033702039450066211218820658313205002373074087140725745156877101602928314064419089787367916296424955500021808021790472139800517250145236263462582209144864881884398902527433588121570559531899199968204162312589732267174849492389258478223335305948479903456274658227005247603633913254657561150854474425384434130870325889270479087397518427778412948958131437076372724643",
  );
  setDefaultDecimalPlaces(39);
  t("8.4423468512e+2", "-8.40392e+2", "-1.004572491313577473369570390960408952013");
  setDefaultDecimalPlaces(375);
  t(
    "2.82e-5",
    "-2.3892636e-12",
    "-11802799.825017214509106487873502111696675075952272490988436771899090581717312397008015356698189350057482146381839157470946278175417731220615423095216450792620789100039024576442716492227981876926430386333261846871981810629852645811035668061071202022246519806353723381547352079527767467767055924679051737949718063758222407941928215873711046365917933877199652646112383748699808593744114",
  );
  setDefaultDecimalPlaces(167);
  t(
    "-3e+0",
    "-2.88345655886e+9",
    "1.04041796321914295739202083607144882845797117347316206413021348000069866396766403060469098757268870588876328510154151412489367486860242116850435927222533554323e-9",
  );
  setDefaultDecimalPlaces(273);
  t(
    "-6.542e+3",
    "8.2578e+4",
    "-0.079222068831892271549323064254401898810821284119256944949017898229552665358812274455666158056625251277579984983894015355179345588413378866041802901499188645886313545980769696529341955484511613262612318050812565089975538278960497953450071447601055971324081474484729588994647",
  );
  setDefaultDecimalPlaces(445);
  t(
    "-1.46e+2",
    "-1.5816e+1",
    "9.2311583206879109762266059686393525543753161355589276681841173495194739504299443601416287303995953464845725847243297926150733434496712190187152250885179564997470915528578654527061203844208396560445118866970156803237228123419322205361659079413252402630247850278199291856348002023267577137076378351036924633282751643904906423874557410217501264542235710672736469398077895801719777440566514921598381385938290338897319170460293373798684876074860900354",
  );
  setDefaultDecimalPlaces(471);
  t("1.1e+0", "1e+0", "1.1");
  setDefaultDecimalPlaces(378);
  t(
    "2.7922e+1",
    "1.52e+1",
    "1.836973684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526316",
  );
  setDefaultDecimalPlaces(58);
  t("8.1515116201e-17", "5.1441e+1", "1.5846331953305728893295231430182150424758e-18");
  setDefaultDecimalPlaces(400);
  t("4.89e-18", "-1e+0", "-4.89e-18");
  setDefaultDecimalPlaces(419);
  t(
    "-1.311766e-6",
    "7.5694e-18",
    "-173298544138.24081168916955108727243903083467646048563954870927682511163368298676249108251644780299627447353819325177689116706740296456786535260390519724152508785372684757048114777921631833434618331703965968240547467434671176050941950484846883504637091447142441937273760139509076016593124950458424710016645969297434406954316062039263349803154807514466139984675139376965149153169339709884535101857478796205775887124474859301926176447",
  );
  setDefaultDecimalPlaces(384);
  t(
    "1.4541954661e-15",
    "-5.816753125e+0",
    "-2.50001235199405166434667966074286503262935024425675621225544104555752484338073055146207533090034657436144842402951388795617830179100131570393921437056003644644966774311914776338388953029530542436421521671508106165327413650549248641182446607616684780652436577321647976937305552227644180790292694431655116874158210040932414507449119219753717844093649754131519893239409228e-16",
  );
  setDefaultDecimalPlaces(407);
  t(
    "2.0432242455e+7",
    "6.87958802e-18",
    "2.96998052726418928789285263043992567450281710328346086049495737100838779587269529549532531455277462966452459169204728047072795501495742182538424735497460791264067582930641826427274928593761927040509033272024332643104986394228880002032447285993151665497551116440254513961433405717222003069887315723304024243009830696228231410868699082361620834382463501062960453262723136145004217854312735430340492976205862978405500508444690267950086e+24",
  );
  setDefaultDecimalPlaces(488);
  t(
    "9.59e-18",
    "2.327e+0",
    "4.12118607649333906317146540610227761065749892565535023635582294800171895143962183068328319724967769660507090674688440051568543188654920498495917490330898152127202406532015470562956596476149548775247099269445638160721959604641168886978942844864632574129780833691448216587881392350666093682853459389772238934250107434464976364417705199828104856037816931671680275032230339492909325311559948431456811345079501504082509669101847872797593467984529437043403523850451224752900731e-18",
  );
  setDefaultDecimalPlaces(344);
  t(
    "-2.40367e-3",
    "-2.681e-16",
    "8965572547556.881760537113017530772099962700484893696381947034688549048862364789257739649384558000745990302126072361059306229019022752704214845207012308839985080193957478552778813875419619544945915703095859753823200298396120850428944423722491607609101081685938082804923535994032077582991421111525550167847817978366281238343901529280119358448340171577769489",
  );
  setDefaultDecimalPlaces(198);
  t("0e+0", "7e+0", "0");
  setDefaultDecimalPlaces(188);
  t(
    "-2.398518e-9",
    "1.7585e-5",
    "-0.0001363956781347739550753483082172305942564685811771396076201307932897355700881433039522320159226613591128802957065680978106340631219789593403468865510378163207278930907023030992323002559",
  );
  setDefaultDecimalPlaces(150);
  t(
    "3.4e+1",
    "-6.22e-3",
    "-5466.237942122186495176848874598070739549839228295819935691318327974276527331189710610932475884244372990353697749196141479099678456591639871382636655948553",
  );
  setDefaultDecimalPlaces(317);
  t(
    "-2.6205859646e+2",
    "-3.44479e+3",
    "0.07607389607494215902856197329880776476940539191068250894829583225682842785772137053347228713506483704376754461084710533878697975783719762307716870984878613790680999422316019263873850075040858804165130530453235175438851134611979249823646724473770534633460965690216239596608211240743267368983305223250183610611967638085",
  );
  setDefaultDecimalPlaces(446);
  t(
    "5e+0",
    "1.132489e+5",
    "0.00004415053921053537826857479410396039166826344450144769618071345505342656749866886124280235834520246995776559419120185714828135196015148933013918898991513383352950889589214553077336733513526400697931723840143259669630345195405871491908530678885181224718297484567179018957358526219680720960645092358512974518957800031611786074743330840299552578435640434476626263036550465390833818253422329046904649846488575164968489760165440900529718169448003468",
  );
  setDefaultDecimalPlaces(332);
  t(
    "-3.85610812919e+5",
    "-4.14e-11",
    "9314270843454106.28019323671497584541062801932367149758454106280193236714975845410628019323671497584541062801932367149758454106280193236714975845410628019323671497584541062801932367149758454106280193236714975845410628019323671497584541062801932367149758454106280193236714975845410628019323671497584541062801932367149758454106280193236714975845410628",
  );
  setDefaultDecimalPlaces(407);
  t(
    "6.1568645e-3",
    "2.52658e+2",
    "0.00002436837345344299408686841501159670384472290606274093834353157232306121318145477285500558066635531034046022686794006126859232638586547823540121428967220511521503376105248992709512463488193526427027840005066136833189528928432901392396045246934591423980242066350560837179111684569655423536955093446477055941232812735001464430178343848205875135558739481829192030333494288722304458991997086971320916020866151",
  );
  setDefaultDecimalPlaces(348);
  t(
    "2.4e+0",
    "-3.7e-6",
    "-648648.648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648648649",
  );
  setDefaultDecimalPlaces(497);
  t(
    "-1e+0",
    "3.8e-6",
    "-263157.89473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684210526315789473684211",
  );
  setDefaultDecimalPlaces(334);
  t(
    "-1.248737e-2",
    "2.357118e+0",
    "-0.0052977279881618145548928819006939830759427402446547012071521239072460521704895554656152131543690218308968833974370396390846788323707171215017661398368685827353573304348785253856616427348991437849102166289511174239049551189206480116820625865993980785009490403110917654525568936302722222646469120341026626583819732402026542582933904879",
  );
  setDefaultDecimalPlaces(469);
  t(
    "-6e+0",
    "-8.3e+0",
    "0.7228915662650602409638554216867469879518072289156626506024096385542168674698795180722891566265060240963855421686746987951807228915662650602409638554216867469879518072289156626506024096385542168674698795180722891566265060240963855421686746987951807228915662650602409638554216867469879518072289156626506024096385542168674698795180722891566265060240963855421686746987951807228915662650602409638554216867469879518072289156626506024096385542168674698795180722891566265060241",
  );
  setDefaultDecimalPlaces(219);
  t(
    "-7.09136288249e+11",
    "-3e+0",
    "236378762749.666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666667",
  );
  setDefaultDecimalPlaces(309);
  t("-1.072196e+3", "-4e+0", "268.049");
  setDefaultDecimalPlaces(391);
  t(
    "-6.67149e-18",
    "-8.523669e+4",
    "7.82701674595763866475809888910514943740776419168787525653565383639369384240518959617038155751942033413075988755546467137567167378273370305674704167888265018268541399249548521886525626464378192067289332797883165101788912732298731919317843055613726905631835304726168977232691696498303723431775682514184912623894710130109463424729421097886367947887230252606008046534890081e-23",
  );
  setDefaultDecimalPlaces(421);
  t(
    "1.7555831816e+4",
    "3.762200929e+5",
    "0.0466637272897233926550869766158627196490174488498192596134995000422530595786794033828170372024274198460812723912864676239624627449024799281261354449046227429709935091029264907185397167818306070063702331300976615116879633304667657212202022716580962281719749158033340116694229863128078558825957910447371536439275596170584008699020764076792879873322682920426231174321205426505810104753179704506951919898374997185058639912956",
  );
  setDefaultDecimalPlaces(397);
  t(
    "-8.4e-9",
    "-3.8747098928e-17",
    "216790423.8613814809211772635242902436063380522928010627345721164025516434400345256217113401125389151869873379027185578201799356140947574995181585069196383579120068258442907289856443830018447465223866630534543951238444057171040653038693994066135572440191231237563582478899334850352335002560272194425177430666816501746641422774855543115359400307772120492416546473685458261155318874406131900538966719516359246",
  );
  setDefaultDecimalPlaces(33);
  t("-2.32148885e+5", "-3.36e+2", "690.919300595238095238095238095238095");
  setDefaultDecimalPlaces(466);
  t(
    "-1e+0",
    "-4.029e+1",
    "0.024820054604120129064283941424671134276495408289898237776123107470836435840158848349466368826011417225117895259369570613055348721767187887813353189377016629436584760486473070240754529659965251923554231819310002482005460412012906428394142467113427649540828989823777612310747083643584015884834946636882601141722511789525936957061305534872176718788781335318937701662943658476048647307024075452965996525192355423181931000248200546041201290642839414246711342764954082899",
  );
  setDefaultDecimalPlaces(455);
  t(
    "-3.88098e+2",
    "1.2406246909e+10",
    "-3.128246623227027699324342054330784075482404216915783132428063462782401084969410872781784001490728351261769974821641686544641056683970273866165563350549627530389819359994490014546590223759023205170033425134373165972590913553935620772997788158078645571473528376800097748239970967032766476435762511874412026503381273305915630314173364321198518232714950716123942653026236010405683277700111747792073545616066861401524924301343356409254582247328058558471e-8",
  );
  setDefaultDecimalPlaces(489);
  t(
    "1.773515e-6",
    "-7.94261404e+2",
    "-2.232910967432580923949818415197725004902793942131424530355248131885809221569577866583581341943187258284553381118340228452042471397741492170000998814742860147841201156993397100786229315506309053889265907222655376566680054870197368925659139796247735084455897846951153124393792147553477242864995111861182669276474121610471708127970423198355487508996471393440641111650944579953428027833516634027454266177587045385375417285163714186973134099312220891952090876116649374542691489010084141e-9",
  );
  setDefaultDecimalPlaces(141);
  t(
    "1.1948053482e+10",
    "-8.700768793e+9",
    "-1.373218133507067436908503080596684923311235952296382322683333024408524815744980341302122910002488558254463663921427914214890458818332606623029",
  );
  setDefaultDecimalPlaces(387);
  t(
    "-5.231612983e+9",
    "-1.023810464064e-10",
    "51099428718800081107.587502455058322047855400107472680014649419014985216231430260280274360764945689118336141460287406230829074629605406361333355148121112845473172247133544609076639741219811420643901593370304035126857759633018464034263687992357854987199170959849901532721203269422574480306303289805403463284444588710313812852903128735177881285015480753827311176763917197751076413440457968927157487998346851013",
  );
  setDefaultDecimalPlaces(170);
  t(
    "-1.2571e+2",
    "-2.94784e+2",
    "0.42644783977420755536257056013894919669995657837603126356925749023013460703430308293530178028658271819366044290056448111159357359965262700825010855405992184107685627442466",
  );
  setDefaultDecimalPlaces(40);
  t("4.78009e+1", "2.7828131e+1", "1.7177186638944598902455935686086859372625");
  setDefaultDecimalPlaces(490);
  t(
    "1.4e+0",
    "1.98110009009e+6",
    "7.066780759857514181230905765942001689104572120826357899527240841749973533261765881806830401303644009163954981787540099318819066360905714777650878643901036278307829835569940999194394721405774341806970645908845848302497363297164474563854669901737816643501135019424938720916294297436296372704083480434667229135747477240174537091856016049008891093225481505888835058540633777231993846433635038510837100882684156013822817987331445924642893669638942659243680696954624204410633196025468361045e-7",
  );
  setDefaultDecimalPlaces(232);
  t(
    "-1.938338e+3",
    "-4.491e-9",
    "431604987753.2843464707192162101981741260298374526831440659095969717212202182142061901580939657091961701180138053885548875528835448675128033845468715208194166109997773324426631039857492763304386550879536851480739256290358494767312402582943665108",
  );
  setDefaultDecimalPlaces(175);
  t("1.95384426074e-13", "1e+0", "1.95384426074e-13");
  setDefaultDecimalPlaces(271);
  t(
    "2.98e+2",
    "-1.4937956e+6",
    "-0.0001994918180238313729134026101027476583811064914102036449966782603992139219047103900962086111379629180859817768910284646708023507366068021622235331259511006726756994062641501956492575021642853948692846598289618740341717434433465997623771284371168317807335889863378898693",
  );
  setDefaultDecimalPlaces(456);
  t(
    "1e+0",
    "-9.11118059e-20",
    "-10975526059680483185.329992454907536850830875694452676851178514506866996475590656687883737797803873844629831884388102113120337130755960573052366641763600473207171936869709219538145495149273514729006156160493796117370120088904965937021340502263055242547881492490535740769462676186511631858676615255191643611138213648336872664270174453868442091761897565461382211501089344558804316269182850210633351083649193699057171250734697598612739164244795196184339926468299757408276768664071",
  );
  setDefaultDecimalPlaces(375);
  t(
    "-2.89781691306e+9",
    "-1.666182806e-16",
    "1.7391950646860774291293460868903000791138880591713416108796407781440039659129695760406256406897527425331023371513533671646831290131558349546430261266301892206658625188093556644228148396821230911201708799772598301557554303558213527741805301044500155524951444013400772063902812834572006740537688635829074808013593197528170867464827265778422634857030207524539777299802480376814067303488906606806024140427e+25",
  );
  setDefaultDecimalPlaces(488);
  t("1.5353555e+7", "1e+0", "15353555");
  setDefaultDecimalPlaces(497);
  t(
    "-5.53918e-3",
    "1.12116e+5",
    "-4.940579399907238931107067679902957651004316957436940311819900817010952941596203931642227692746797959256484355488957865068322094973063612686860037817974240964715116486496129009240429555103642655820757073031503086089407399479110920831995433301223732562702914838203289450212280138428056655606693067893966962788540440258303899532626922116379464126440472367904670163045417246423347247493667273181347889685682685789717792286560348210781690392093902743586999179421313639444860680009989653573085019e-8",
  );
  setDefaultDecimalPlaces(397);
  t("0e+0", "8.3e+0", "0");
  setDefaultDecimalPlaces(241);
  t("0e+0", "1e+1", "0");
  setDefaultDecimalPlaces(173);
  t(
    "-2.2583e-13",
    "1.020865e+0",
    "-2.212143623299848657755922673419110264334657373893707787023749467363461378340916771561371973767344359930059312445818007278141576016417449907676333305579092240404e-13",
  );
  setDefaultDecimalPlaces(232);
  t(
    "-1.65e-20",
    "-1.27774e+2",
    "1.291342526648613959021397154350650367054330301939361685475918418457589180897522187612503326185295913096561115719943024402460594487141358961917134941380875608496251193513547357052295459170097202873824095668915429e-22",
  );
  setDefaultDecimalPlaces(477);
  t("5.8601115821e-14", "-3.44e+1", "-1.70352080875e-15");
  setDefaultDecimalPlaces(263);
  t(
    "-1.11912964104e+7",
    "-2.08e+2",
    "53804.30966538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538461538462",
  );
  setDefaultDecimalPlaces(408);
  t(
    "5.541355682e+8",
    "2.9120914e+1",
    "19028783.51277023791217542141706129141413624586096439143359305274552852290281822885092136874550022708765253727956478289108645422324313034954878133289360354554805525678211885794518674791594796784194342251757619970307250658409966115761339084343300488439339506994869735201305838134064061313460147576411921686249270884835551521494139916075436368515081635143732095771444536390581696714601746360021529544024614062594326538",
  );
  setDefaultDecimalPlaces(172);
  t(
    "-1.9451316383e+5",
    "1.16686106e+7",
    "-0.0166697793334538046886233396116586494025261242328199725852536376524553831627563267900978716352056516480205449653106086169333648000902523904602661091458480926598064725889473",
  );
  setDefaultDecimalPlaces(40);
  t("1.516631159e+7", "-8.162342293e-1", "-18580832.6159104878891655175039839510930444141814");
  setDefaultDecimalPlaces(20);
  t("1.2386849e+0", "-1.84564111e+4", "-0.00006711407181431931");
  setDefaultDecimalPlaces(258);
  t(
    "-6.4e+0",
    "-4.39833624e+8",
    "1.4550956659011590255318906678221581349587770488415410459842424416374315211517344112827535895709510376132589626663012921449588856353556089199765227589785177497025557100200233895715076117054661559935672403254008611219773411411584122090674904836288732669e-8",
  );
  setDefaultDecimalPlaces(479);
  t(
    "2.88454e-8",
    "4.6895545748e+10",
    "6.1509892975774139187868354818660719171549921419628640164386130005295273912247637033299591658267441813842946558046739292208652430160007357635240116920282993696486962994624578518509919612930825935123308632574056721904086454603381450341832580137606462555672740520592949513572638165259976238372702006069423000843077852477836995957247687898258341002386493860235606442867150402780722533878634839594702225619997277699662863085441877519271299983507337687119563490190092e-19",
  );
  setDefaultDecimalPlaces(367);
  t(
    "-2.85116143e-15",
    "-2.748881e+2",
    "1.03720802391955126467824543878036189998766770915146927058683151435074854095175455030610637564885493406226024334993038985681810162025929823808305997967900392923520516166396435495025066563448908846908978598928072914033019254016452512858868754231267195633423200204010286367434603389524682952808797470679887561520487791213952149983938919145645082489929539e-17",
  );
  setDefaultDecimalPlaces(225);
  t(
    "-3.3244027e+0",
    "1.074e-10",
    "-30953470204.841713221601489757914338919925512104283054003724394785847299813780260707635009310986964618249534450651769087523277467411545623836126629422718808193668528864059590316573556797020484171322160148975791433891992551210428305400372",
  );
  setDefaultDecimalPlaces(292);
  t(
    "1.26800691e+1",
    "2.2947337893e+10",
    "5.52572553693385404668386298206673641540211751132207900155837043785844078519491733707221966516236019064052398576846109458209649939719916251289410514106992497754998739277944356889676971995419948209676192438327817845410936530370982845578653370465711998482402788402606801672548152598905e-10",
  );
  setDefaultDecimalPlaces(438);
  t(
    "-2.27162799e+2",
    "1.361530846e+2",
    "-1.668436669410573163026230843102029874980886037157031108496825050998514065247993654342811708872587672538121842889191509363718080611153483921876566871405276998035783024779153626314537423267456402526483781183463543799873631360974689221253236300163852475803548559486694141338609085026928578304130466978784849359189619123766807410252385864785615000308263306140329633046007391006990083278656765738820433598902099350601124757771371123236380940575",
  );
  setDefaultDecimalPlaces(221);
  t(
    "1.9e+0",
    "-5.718e+0",
    "-0.33228401538999650227352221056313396292409933543196922000699545295557887373207415180132913606155998600909408884225253585169639734172787688002798181182231549492829660720531654424623994403637635536901014340678558936691150752",
  );
  setDefaultDecimalPlaces(15);
  t("4.1e-9", "8.61996e+4", "4.8e-14");
  setDefaultDecimalPlaces(43);
  t("-6.75e+1", "3.2e+1", "-2.109375");
  setDefaultDecimalPlaces(310);
  t(
    "2.27491813169e+10",
    "-3.080683053e+9",
    "-7.3844601750727389741641169731847776682011046204174383141257212609466060512652159546904223516043732396251799681646770171653877046857634010557203529369368073061555547174946594546673737293415753405645783581359545979883052902943339559442825941367620461928772131950959253710673754272767118052504182746903305018440662",
  );
  setDefaultDecimalPlaces(222);
  t(
    "-8.88428e+5",
    "8.142207609e+8",
    "-0.001091138967051116370029665255616058315616452122818869282408148922452758352406192004775740667312183736778014155399068012145549800362502645687574483953446439319353887037443630970918417906924190785516483629126779736967033654",
  );
  setDefaultDecimalPlaces(26);
  t("3.6651465e+4", "-6.2211e-8", "-589147658774.17177026570863673626850557");
  setDefaultDecimalPlaces(484);
  t(
    "1.446626e+5",
    "-2.282e+1",
    "-6339.2900964066608238387379491673970201577563540753724802804557405784399649430324276950043821209465381244522348816827344434706397896581945661700262927256792287467134092900964066608238387379491673970201577563540753724802804557405784399649430324276950043821209465381244522348816827344434706397896581945661700262927256792287467134092900964066608238387379491673970201577563540753724802804557405784399649430324276950043821209465381244522348816827344434706397896581945661700262927256792287467134",
  );
  setDefaultDecimalPlaces(223);
  t("0e+0", "-2.934609e+3", "0");
  setDefaultDecimalPlaces(262);
  t(
    "-5.1967816e+5",
    "8.7652040681e+1",
    "-5928.8769087682936430092446121129002719288098122585682871946277168273382438170595454547600893864920785391748385413726246796451353917337554063694646269772453559380467654396880293438972101140600938931378671708395201829676383504484126478360456507761018662141192504838996",
  );
  setDefaultDecimalPlaces(160);
  t(
    "-1.0878798388e+1",
    "1.770912e+4",
    "-0.0006143048546737500225872318895574709528197900290923546737500225872318895574709528197900290923546737500225872318895574709528197900290923546737500225872318895575",
  );
  setDefaultDecimalPlaces(418);
  t(
    "7.58e+1",
    "2.23372661139e-20",
    "3.3934322854680632215772332684919063379901492019176387075115169069678547184942574244987761416096937499269553347898434556600091703400476807801173679511463842694279072341333700387598532687596016758846570174137499959293977814313350924401819350256776098102301437702710181526302741085418322473791245098445672952412253617799255868317311375468163128566236336009325462146434118728816403797484061275295079565417291332742803761238938176000811458014046e+21",
  );
  setDefaultDecimalPlaces(307);
  t(
    "-3.78e+1",
    "1.5614e+3",
    "-0.024209043166389137953118995773024209043166389137953118995773024209043166389137953118995773024209043166389137953118995773024209043166389137953118995773024209043166389137953118995773024209043166389137953118995773024209043166389137953118995773024209043166389137953118995773024209043166389137953118995773024209",
  );
  setDefaultDecimalPlaces(347);
  t(
    "4.479e+0",
    "3.16777e-19",
    "14139284102065490865.81412160605094435517730138236046177594964280866350776729371134899314028480603074086818171773834590263813345034519551608860491765500651878135091878513907259681100584954084419007693109032537084447418846696572036479921206400717223788343219362516849392474832453113704593452176136525063372656474428383373792920571884953768739523387114594809597919040839",
  );
  setDefaultDecimalPlaces(411);
  t(
    "-1.4e+0",
    "-8.943971035e+3",
    "0.000156530023914595559733943167896227427798238615382546350117959656384329961104351899323877897598759385964402332168330864904237695801079928251355299698821084118146409001647666896765615475855574480849154494159204306949100042562917356317221123469347192491215396696552472679155987450042094193790062961669687473445624815800848576876009527461534316115995784863361870223230211970381230108713114811646972199748408509912",
  );
  setDefaultDecimalPlaces(273);
  t(
    "3.7996796e+8",
    "6e+0",
    "63327993.333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333",
  );
  setDefaultDecimalPlaces(401);
  t(
    "3.9110997111e+7",
    "-5.42967802e+2",
    "-72031.89022799550828614327300387509902474843250465890424935362925995379740767759190258578168876393153051090127071660135014783068112757080207124325946679247105705910716230646766785629767416669027457359248716556492975986815512865346663778785173710908183833707325429952474419468431021256026522176723841904717583971949776867247829918283073440881490796023297160445620677890583279927158553685288322124117407610111",
  );
  setDefaultDecimalPlaces(427);
  t(
    "5.5651e-1",
    "-3.6e+0",
    "-0.1545861111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
  );
  setDefaultDecimalPlaces(235);
  t(
    "-8.17704e-8",
    "-6.239e+4",
    "1.3106331142811347972431479403750601057861836832825773361115563391569161724635358230485654752364160923224875781375220387882673505369450232409039910242025965699631351178073409200192338515787786504247475556980285302131751883315e-12",
  );
  setDefaultDecimalPlaces(415);
  t(
    "-3e+0",
    "7.77e+1",
    "-0.03861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861003861",
  );
  setDefaultDecimalPlaces(299);
  t(
    "1.1918e-3",
    "-1.6432459e+1",
    "-0.00007252718537134338810764718780068156567437654948659844518705325843198513381350898243531293764372088194469251376193909870701639967578802417824380392490253588948556025607609914012260733466610201187783276988550526734921413770148460434314791231184571949943705929830708842784880826418005972204160071235",
  );
  setDefaultDecimalPlaces(438);
  t(
    "2.7e-9",
    "4.6333178474e+1",
    "5.8273576062024602469537885560948188015735913486037521700286017809191235672272562252103783869580593971317884941873025363211346690654840654996847605219185162004346716945245071856582683363092600423267046334948576962158186514575356607122459163581534520734853050047196293714818283761500959356781986007636657955563163162756948397824264492094598621039123490028149282716096875387440098893138586881571340047841847095465035373778445174406e-11",
  );
  setDefaultDecimalPlaces(235);
  t(
    "2.0586e+0",
    "3.53514199e+5",
    "0.0000058232455890689697586941903852637047826189295440435760262065173795183259385855672518545711936170348846440535759074276957118771911054129964380864939458909824439611830131892382631001477821828593651481591549877180463690512187885273598",
  );
  setDefaultDecimalPlaces(37);
  t("1.163357e+1", "5.21014103e+5", "0.0000223287046032226118071126377936069");
  setDefaultDecimalPlaces(428);
  t(
    "4.79976471e+4",
    "3.77259597e+0",
    "12722.71069621059898444412535382101889908979571963016225137938638046098533048053910739877082570281174318277183549024466566452913853905219540379247131518300381368429442498715281191375497334266621718307142230234636019080516591868171878474439445472874212925589272683234086156329112550051311219526113208460009037225367125650616649521575987899918156356404102292459375128898311366218206504631345402195295246524901525566757152635138927956815",
  );
  setDefaultDecimalPlaces(10);
  t("0e+0", "1.10988884e-2", "0");
  setDefaultDecimalPlaces(310);
  t(
    "5.16e+0",
    "6.3442278e-1",
    "8.1333775562094412814117424976448670396103998661586521215395197505360699689881879714344431327008781115961819655971369754408881723950706814153174008032939800806017715820355630987903681516606323625390626736322425244566407278124533926729427969153314450657020859181632790676274266192017884351504528257954419606433426",
  );
  setDefaultDecimalPlaces(456);
  t(
    "1.26838339421e+8",
    "4.046994e+6",
    "31.341370760865966196144595223022322247080178522626917657896206418887697881439903296125469916683839906854321998006421556345277507206583454287305590272681402542232580527670661236463409631939162746473061240021606160028900462911484425230183192759860775676959244318128467697258755510880421369539959782495353341270088366822387184166816160340242659119336475418545221465611266040918271685107514367453967067902744605008062774493858898728290676981483046429028557986496",
  );
  setDefaultDecimalPlaces(134);
  t(
    "-1.16640321e+8",
    "1.0691602057e+9",
    "-0.10909526970622079149087432220355411980331994879820282484350230993637514131433408623730635357297604665235063377929835721344599610363145",
  );
  setDefaultDecimalPlaces(226);
  t(
    "1.0690768964e-10",
    "1.02932136e+4",
    "1.03862305587440641472746664851101506336174739441917342510020388579131399740893359096327312201118608866719719097250639003546958357106278256967289593601749408950378723317273820102207924646584619598295327321294488633e-14",
  );
  setDefaultDecimalPlaces(13);
  t("-2.0765e+4", "-2.3524e+1", "882.7155245706512");
  setDefaultDecimalPlaces(230);
  t(
    "3.458248554e+3",
    "-1.4e+0",
    "-2470.17753857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857142857",
  );

  // Invalid 'Big.DP's
  setDefaultDecimalRoundingMode(0);

  isException(function () {
    setDefaultDecimalPlaces(undefined as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces(undefined)");
  setDefaultDecimalPlaces(2);
  t("2.71", "1.151", "2.35");
  isException(function () {
    setDefaultDecimalPlaces(null as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces(null)");
  setDefaultDecimalPlaces(2);
  t("-0.01071", "0.00151", "-7.09");
  isException(function () {
    setDefaultDecimalPlaces(NaN);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces(NaN)");
  setDefaultDecimalPlaces(2);
  t("-0.0001271", "61", "0");
  isException(function () {
    setDefaultDecimalPlaces("NaN" as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces('NaN')");
  setDefaultDecimalPlaces(2);
  t("-161", "-0.00000391", "41176470.58");
  isException(function () {
    setDefaultDecimalPlaces([] as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces([])");
  setDefaultDecimalPlaces(2);
  t("61", "1.921", "31.75");
  isException(function () {
    setDefaultDecimalPlaces({} as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces({})");
  setDefaultDecimalPlaces(2);
  t("-1.71", "71", "-0.02");
  isException(function () {
    setDefaultDecimalPlaces("" as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces('')");
  setDefaultDecimalPlaces(2);
  t("1", "-81", "-0.01");
  isException(function () {
    setDefaultDecimalPlaces(" " as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces(' ')");
  setDefaultDecimalPlaces(2);
  t("-61", "31", "-1.96");
  isException(function () {
    setDefaultDecimalPlaces("hello" as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces('hello')");
  setDefaultDecimalPlaces(2);
  t("-2.21", "-81", "0.02");
  isException(function () {
    setDefaultDecimalPlaces("\t" as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces('\t')");
  setDefaultDecimalPlaces(2);
  t("21", "-2.51", "-8.36");
  isException(function () {
    setDefaultDecimalPlaces(new Date() as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces(new Date)");
  setDefaultDecimalPlaces(2);
  t("0.0000000541", "131", "0");
  isException(function () {
    setDefaultDecimalPlaces(new RegExp("") as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces(new RegExp(''))");
  setDefaultDecimalPlaces(2);
  t("-11", "-22.41", "0.49");
  isException(function () {
    setDefaultDecimalPlaces(function () {} as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces(function () {} )");
  setDefaultDecimalPlaces(2);
  t("1.51", "-21", "-0.07");
  isException(function () {
    setDefaultDecimalPlaces(-1);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces(-1)");
  setDefaultDecimalPlaces(2);
  t("2.71", "0.0000151", "179470.19");
  isException(function () {
    setDefaultDecimalPlaces(1.5);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces(1.5)");
  setDefaultDecimalPlaces(2);
  t("11", "-1.21", "-9.09");
  isException(function () {
    setDefaultDecimalPlaces(7.5);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces(7.5)");
  setDefaultDecimalPlaces(2);
  t("10", "10", "1");
  isException(function () {
    setDefaultDecimalPlaces(0.1);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces(0.1)");
  setDefaultDecimalPlaces(2);
  t("-1.51", "1", "-1.51");
  isException(function () {
    setDefaultDecimalPlaces("0" as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces('0')");
  setDefaultDecimalPlaces(2);
  t("51", "-11", "-4.63");
  isException(function () {
    setDefaultDecimalPlaces("1" as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces('1')");
  setDefaultDecimalPlaces(2);
  t("-0.0261", "-0.0181", "1.44");
  isException(function () {
    setDefaultDecimalPlaces("1.2" as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces('1.2')");
  setDefaultDecimalPlaces(2);
  t("23.31", "-1", "-23.31");
  isException(function () {
    setDefaultDecimalPlaces("99" as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces('99')");
  setDefaultDecimalPlaces(2);
  t("131", "25.41", "5.15");
  isException(function () {
    setDefaultDecimalPlaces("-1" as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces('-1')");
  setDefaultDecimalPlaces(2);
  t("6.91", "21", "0.32");
  isException(function () {
    setDefaultDecimalPlaces(-23);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces(-23)");
  setDefaultDecimalPlaces(2);
  t("-3.51", "-141", "0.02");
  isException(function () {
    setDefaultDecimalPlaces(1e9 + 1);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces(1e9 + 1)");
  setDefaultDecimalPlaces(2);
  t("1", "11", "0.09");
  isException(function () {
    setDefaultDecimalPlaces(1e99);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces(1e+99)");
  setDefaultDecimalPlaces(2);
  t("-0.00000151", "-5.61", "0");
  isException(function () {
    setDefaultDecimalPlaces("-0.01" as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces('-0.01')");
  setDefaultDecimalPlaces(2);
  t("0.00261", "13.91", "0");
  isException(function () {
    setDefaultDecimalPlaces("-1e-1" as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces('-1e-1')");
  setDefaultDecimalPlaces(2);
  t("-1", "1", "-1");
  isException(function () {
    setDefaultDecimalPlaces(Infinity);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces(Infinity)");
  setDefaultDecimalPlaces(2);
  t("-1", "-111", "0");
  isException(function () {
    setDefaultDecimalPlaces("-Infinity" as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces('-Infinity')");
  setDefaultDecimalPlaces(2);
  t("-11", "-11", "1");
  isException(function () {
    setDefaultDecimalPlaces(decimal("2") as any);
    t(4, 2, 2);
  }, "setDefaultDecimalPlaces(decimal('2'))");
  setDefaultDecimalPlaces(2);
  t("1", "10.41", "0.09");

  // Invalid 'Big.RM's
  isException(function () {
    setDefaultDecimalRoundingMode(undefined as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode(undefined)");
  setDefaultDecimalRoundingMode(0);
  t("1", "21", "0.04");
  isException(function () {
    setDefaultDecimalRoundingMode(null as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode(null)");
  setDefaultDecimalRoundingMode(0);
  t("1.31", "-1.001", "-1.3");
  isException(function () {
    setDefaultDecimalRoundingMode(NaN);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode(NaN)");
  setDefaultDecimalRoundingMode(0);
  t("-31", "2.81", "-11.03");
  isException(function () {
    setDefaultDecimalRoundingMode("NaN" as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode('NaN')");
  setDefaultDecimalRoundingMode(0);
  t("25.31", "-0.00000551", "-4593466.42");
  isException(function () {
    setDefaultDecimalRoundingMode([] as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode([])");
  setDefaultDecimalRoundingMode(0);
  t("131", "61", "2.14");
  isException(function () {
    setDefaultDecimalRoundingMode({} as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode({})");
  setDefaultDecimalRoundingMode(0);
  t("0.0000271", "1.51", "0");
  isException(function () {
    setDefaultDecimalRoundingMode("" as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode('')");
  setDefaultDecimalRoundingMode(0);
  t("1.81", "91", "0.01");
  isException(function () {
    setDefaultDecimalRoundingMode(" " as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode(' ')");
  setDefaultDecimalRoundingMode(0);
  t("-31", "1", "-31");
  isException(function () {
    setDefaultDecimalRoundingMode("hello" as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode('hello')");
  setDefaultDecimalRoundingMode(0);
  t("601", "-31", "-19.38");
  isException(function () {
    setDefaultDecimalRoundingMode("\t" as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode('\t')");
  setDefaultDecimalRoundingMode(0);
  t("41", "-1", "-41");
  isException(function () {
    setDefaultDecimalRoundingMode(new Date() as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode(new Date)");
  setDefaultDecimalRoundingMode(0);
  t("1", "-11", "-0.09");
  isException(function () {
    setDefaultDecimalRoundingMode(new RegExp("") as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode(new RegExp(''))");
  setDefaultDecimalRoundingMode(0);
  t("31", "-1.51", "-20.52");
  isException(function () {
    setDefaultDecimalRoundingMode(function () {} as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode(function () {} )");
  setDefaultDecimalRoundingMode(0);
  t("-81", "-301", "0.26");
  isException(function () {
    setDefaultDecimalRoundingMode(-1 as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode(-1)");
  setDefaultDecimalRoundingMode(0);
  t("1", "71", "0.01");
  isException(function () {
    setDefaultDecimalRoundingMode(3.1 as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode(3.1)");
  setDefaultDecimalRoundingMode(0);
  t("1", "1061", "0");
  isException(function () {
    setDefaultDecimalRoundingMode(1.5 as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode(1.5)");
  setDefaultDecimalRoundingMode(0);
  t("-11", "-1", "11");
  isException(function () {
    setDefaultDecimalRoundingMode(0.1 as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode(0.1)");
  setDefaultDecimalRoundingMode(0);
  t("-1.91", "-0.0001331", "14350.11");
  isException(function () {
    setDefaultDecimalRoundingMode(7.5 as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode(7.5)");
  setDefaultDecimalRoundingMode(0);
  t("-1.11", "0.291", "-3.81");
  isException(function () {
    setDefaultDecimalRoundingMode("0" as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode('0')");
  setDefaultDecimalRoundingMode(0);
  t("-1", "2.21", "-0.45");
  isException(function () {
    setDefaultDecimalRoundingMode("1" as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode('1')");
  setDefaultDecimalRoundingMode(0);
  t("1.321", "1.01", "1.3");
  isException(function () {
    setDefaultDecimalRoundingMode("1.2" as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode('1.2')");
  setDefaultDecimalRoundingMode(0);
  t("1", "-1.01", "-0.99");
  isException(function () {
    setDefaultDecimalRoundingMode("99" as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode('99')");
  setDefaultDecimalRoundingMode(0);
  t("11", "1", "11");
  isException(function () {
    setDefaultDecimalRoundingMode("1.1e1" as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode('1.1e1')");
  setDefaultDecimalRoundingMode(0);
  t("-81", "8.91", "-9.09");
  isException(function () {
    setDefaultDecimalRoundingMode("-1" as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode('-1')");
  setDefaultDecimalRoundingMode(0);
  t("-21", "21", "-1");
  isException(function () {
    setDefaultDecimalRoundingMode(-23 as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode(-23)");
  setDefaultDecimalRoundingMode(0);
  t("8.31", "-21", "-0.39");
  isException(function () {
    setDefaultDecimalRoundingMode(1e9 as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode(1e9 + 1)");
  setDefaultDecimalRoundingMode(0);
  t("1.31", "11", "0.11");
  isException(function () {
    setDefaultDecimalRoundingMode(1e9 as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode(1e9 + 1)");
  setDefaultDecimalRoundingMode(0);
  t("11", "-61", "-0.18");
  isException(function () {
    setDefaultDecimalRoundingMode("-0.01" as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode('-0.01')");
  setDefaultDecimalRoundingMode(0);
  t("7.71", "-31", "-0.24");
  isException(function () {
    setDefaultDecimalRoundingMode("-1e-1" as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode('-1e-1')");
  setDefaultDecimalRoundingMode(0);
  t("0.321", "-51", "0");
  isException(function () {
    setDefaultDecimalRoundingMode(Infinity);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode(Infinity)");
  setDefaultDecimalRoundingMode(0);
  t("0.00111", "-11", "0");
  isException(function () {
    setDefaultDecimalRoundingMode("-Infinity" as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode('-Infinity')");
  setDefaultDecimalRoundingMode(0);
  t("-21", "0.000271", "-77490.77");
  isException(function () {
    setDefaultDecimalRoundingMode(decimal("2") as any);
    t(1, 3, 0.3);
  }, "setDefaultDecimalRoundingMode(decimal('2'))");
  setDefaultDecimalRoundingMode(0);
  t("3.91", "0.0481", "81.28");

  t("1", ".1", "10");
  t("10", "1.", "10");
  t("144", "12.", "12");
  t("121", "1.e1", "12.1");

  // Division by zero.
  isException(function () {
    decimal_div(decimal(0), 0);
  }, "decimal(0).div(0)");
  isException(function () {
    decimal_div(decimal("0"), "-0");
  }, "decimal('0').div('-0')");
  isException(function () {
    decimal_div(decimal("0.0"), "-0.00");
  }, "decimal('0.0').div('-0.00')");
  isException(function () {
    decimal_div(decimal("-0.00000000"), "0.000000");
  }, "decimal('-0.00000000').div('0.000000')");
  isException(function () {
    decimal_div(decimal(1), 0);
  }, "decimal(1).div(0)");
  isException(function () {
    decimal_div(decimal(1), "-0");
  }, "decimal(1).div('-0')");
  isException(function () {
    decimal_div(decimal(9.99), 0);
  }, "decimal(9.99).div(0)");
  isException(function () {
    decimal_div(decimal("-9.99"), 0);
  }, "decimal('-9.99').div(0)");

  // Invalid divisors.
  isException(function () {
    decimal_div(decimal("12.345"), undefined as any);
  }, ".div(undefined)");
  isException(function () {
    decimal_div(decimal("12.345"), null as any);
  }, ".div(null)");
  isException(function () {
    decimal_div(decimal("12.345"), NaN as any);
  }, ".div(NaN)");
  isException(function () {
    decimal_div(decimal("12.345"), "NaN");
  }, ".div('NaN')");
  isException(function () {
    decimal_div(decimal("12.345"), [] as any);
  }, ".div([])");
  isException(function () {
    decimal_div(decimal("12.345"), {} as any);
  }, ".div({})");
  isException(function () {
    decimal_div(decimal("12.345"), "");
  }, ".div('')");
  isException(function () {
    decimal_div(decimal("12.345"), " ");
  }, ".div(' ')");
  isException(function () {
    decimal_div(decimal("12.345"), "hello");
  }, ".div('hello')");
  isException(function () {
    decimal_div(decimal("12.345"), "\t");
  }, ".div('\t')");
  isException(function () {
    decimal_div(decimal("12.345"), new Date() as any);
  }, ".div(new Date)");
  isException(function () {
    decimal_div(decimal("12.345"), new RegExp("") as any);
  }, ".div(new RegExp(''))");
  isException(function () {
    decimal_div(decimal("12.345"), function () {} as any);
  }, ".div(function () {})");
  isException(function () {
    decimal_div(decimal("12.345"), " 0.1");
  }, ".div(' 0.1')");
  isException(function () {
    decimal_div(decimal("12.345"), "7.5 ");
  }, ".div('7.5 ')");
  isException(function () {
    decimal_div(decimal("12.345"), " 0 ");
  }, ".div(' 0 ')");
  isException(function () {
    decimal_div(decimal("12.345"), "+1");
  }, ".div('+1')");
  isException(function () {
    decimal_div(decimal("12.345"), " +1.2");
  }, ".div(' +1.2')");
  isException(function () {
    decimal_div(decimal("12.345"), "- 99");
  }, ".div('- 99')");
  isException(function () {
    decimal_div(decimal("12.345"), "9.9.9");
  }, ".div('9.9.9')");
  isException(function () {
    decimal_div(decimal("12.345"), "10.1.0");
  }, ".div('10.1.0')");
  isException(function () {
    decimal_div(decimal("12.345"), "0x16");
  }, ".div('0x16')");
  isException(function () {
    decimal_div(decimal("12.345"), "1e");
  }, ".div('1e')");
  isException(function () {
    decimal_div(decimal("12.345"), "8 e");
  }, ".div('8 e')");
  isException(function () {
    decimal_div(decimal("12.345"), "77-e");
  }, ".div('77-e')");
  isException(function () {
    decimal_div(decimal("12.345"), "123e.0");
  }, ".div('123e.0')");
  isException(function () {
    decimal_div(decimal("12.345"), "4e1.");
  }, ".div('4e1.')");
  isException(function () {
    decimal_div(decimal("12.345"), Infinity);
  }, ".div(Infinity)");
  isException(function () {
    decimal_div(decimal("12.345"), "-Infinity");
  }, ".div('-Infinity')");

  // ROUND_UP
  setDefaultDecimalPlaces(0);
  setDefaultDecimalRoundingMode(3);
  t(0, 1, "0");
  t("0.0", 1, "0");
  t("0.1", 1, "1");
  t("-0.1", 1, "-1");
  t("1e-50", 1, "1");
  t("1e-50", -1, "-1");
  t("999.5", 1, "1000");
  t("-999.5", 1, "-1000");
  t("999.4", 1, "1000");
  t("-999.4", 1, "-1000");
  t("999.000001", 1, "1000");
  t("-999.000001", 1, "-1000");
  t("998.5", 1, "999");
  t("-998.5", 1, "-999");
  t("998.6", 1, "999");
  t("-998.6", 1, "-999");
  t("998.000001", 1, "999");
  t("-998.000001", 1, "-999");

  setDefaultDecimalPlaces(1);
  t("0.100000000000000000000000000000000", 1, "0.1");
  t("0.100000000000000000000000000000000", -1, "-0.1");
  t("0.1000000000000000000000000000000001", 1, "0.2");
  t("-0.1000000000000000000000000000000001", 1, "-0.2");
  t(1, 3, "0.4");
  t(-1, 3, "-0.4");
  t(1, 4, "0.3");
  setDefaultDecimalPlaces(2);
  t(1, 4, "0.25");
  t(0.25, 1, "0.25");

  endCheck();
});
