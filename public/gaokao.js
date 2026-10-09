// Selected exam transcriptions from OpenLMLab/GAOKAO-Bench (Apache-2.0).
// Whitespace normalized, options split, the table reconstructed; explanations are original.
export const gaokaoQuestions = [
  {
    "id": "gaokao-47",
    "topic": "cell",
    "text": "下列与细胞相关的叙述，正确的是（ ）",
    "options": [
      "核糖体、溶酶体都是具有膜结构的细胞器",
      "酵母菌的细胞核内含有 DNA和RNA两类核酸",
      "蓝藻细胞的能量来源于其线粒体有氧呼吸过程",
      "在叶绿体中可进行 CO 2的固定但不能合成 ATP"
    ],
    "answer": 1,
    "difficulty": 3,
    "explain": "先判断细胞类型：酵母菌是真核生物，蓝细菌是原核生物。 核糖体没有膜；蓝细菌没有线粒体；叶绿体光反应能合成 ATP。 酵母菌细胞核既含 DNA，也会转录形成 RNA，因此 B 正确。",
    "steps": [
      "先判断细胞类型：酵母菌是真核生物，蓝细菌是原核生物。",
      "核糖体没有膜；蓝细菌没有线粒体；叶绿体光反应能合成 ATP。",
      "酵母菌细胞核既含 DNA，也会转录形成 RNA，因此 B 正确。"
    ],
    "hint": "先判断细胞类型：酵母菌是真核生物，蓝细菌是原核生物。",
    "source": {
      "year": 2016,
      "paper": "新课标Ⅰ卷",
      "number": 1,
      "datasetIndex": 47,
      "url": "https://github.com/OpenLMLab/GAOKAO-Bench/blob/main/Data/Objective_Questions/2010-2022_Biology_MCQs.json",
      "publisher": "OpenLMLab · GAOKAO-Bench",
      "license": "Apache-2.0",
      "note": "公开数据集转录版；合并断行、拆分选项；表格按数据重排。解析由本站编写。"
    }
  },
  {
    "id": "gaokao-78",
    "topic": "cell",
    "text": "生物膜的结构与功能存在密切的联系 ，下列有关叙述错误的是 （ ）",
    "options": [
      "叶绿体的类囊体膜上存在催化 ATP合成的酶",
      "溶酶体膜破裂后释放出的酶会造成细胞结构的破坏",
      "细胞的核膜是双层膜结构，核孔是物质进出细胞核的通道",
      "线粒体 DNA位于线粒体外膜上，编码参与呼吸作用的酶"
    ],
    "answer": 3,
    "difficulty": 3,
    "explain": "把“结构在哪里”与“能做什么”分开核对。 类囊体膜可合成 ATP；核膜由双层膜构成；溶酶体释放水解酶可能损伤结构。 线粒体 DNA 位于线粒体内部，并非在线粒体外膜上，所以错误项为 D。",
    "steps": [
      "把“结构在哪里”与“能做什么”分开核对。",
      "类囊体膜可合成 ATP；核膜由双层膜构成；溶酶体释放水解酶可能损伤结构。",
      "线粒体 DNA 位于线粒体内部，并非在线粒体外膜上，所以错误项为 D。"
    ],
    "hint": "把“结构在哪里”与“能做什么”分开核对。",
    "source": {
      "year": 2018,
      "paper": "新课标Ⅰ卷",
      "number": 1,
      "datasetIndex": 78,
      "url": "https://github.com/OpenLMLab/GAOKAO-Bench/blob/main/Data/Objective_Questions/2010-2022_Biology_MCQs.json",
      "publisher": "OpenLMLab · GAOKAO-Bench",
      "license": "Apache-2.0",
      "note": "公开数据集转录版；合并断行、拆分选项；表格按数据重排。解析由本站编写。"
    }
  },
  {
    "id": "gaokao-48",
    "topic": "membrane",
    "text": "离子泵是一种具有 ATP水解酶活性的载体蛋白， 能利用水解 ATP释放的能量跨膜运输离子．下列叙述正确的是（ ）",
    "options": [
      "离子通过离子泵的跨膜运输属于协助扩散",
      "离子通过离子泵的跨膜运输是顺着浓度阶梯进行的",
      "动物一氧化碳中毒会降低离子泵跨膜运输离子的速率",
      "加入蛋白质变性剂会提高离子泵跨膜运输离子的速率"
    ],
    "answer": 2,
    "difficulty": 3,
    "explain": "题干明确给出：离子泵水解 ATP，使用释放的能量运输。 这属于主动运输，不能按协助扩散处理；蛋白质变性也不利于泵的功能。 一氧化碳中毒会影响供氧与 ATP 供应，从而降低泵的运输速率，选 C。",
    "steps": [
      "题干明确给出：离子泵水解 ATP，使用释放的能量运输。",
      "这属于主动运输，不能按协助扩散处理；蛋白质变性也不利于泵的功能。",
      "一氧化碳中毒会影响供氧与 ATP 供应，从而降低泵的运输速率，选 C。"
    ],
    "hint": "题干明确给出：离子泵水解 ATP，使用释放的能量运输。",
    "source": {
      "year": 2016,
      "paper": "新课标Ⅰ卷",
      "number": 2,
      "datasetIndex": 48,
      "url": "https://github.com/OpenLMLab/GAOKAO-Bench/blob/main/Data/Objective_Questions/2010-2022_Biology_MCQs.json",
      "publisher": "OpenLMLab · GAOKAO-Bench",
      "license": "Apache-2.0",
      "note": "公开数据集转录版；合并断行、拆分选项；表格按数据重排。解析由本站编写。"
    }
  },
  {
    "id": "gaokao-84",
    "topic": "membrane",
    "text": "下列有关物质跨膜运输的叙述，正确的是（ ）",
    "options": [
      "巨噬细胞摄入病原体的过程属于协助扩散",
      "固醇类激素进入靶细胞的过程属于主动运输",
      "神经细胞受到刺激时产生的 Na+内流属于被动运输",
      "护肤品中的甘油进入皮肤细胞的过程属于主动运输"
    ],
    "answer": 2,
    "difficulty": 3,
    "explain": "先区分跨膜运输与胞吞：摄入病原体属于胞吞。 固醇类激素和甘油可通过简单扩散进入细胞；是否借助蛋白不是判断主动运输的唯一依据。 神经细胞兴奋时 Na⁺ 顺电化学梯度经通道进入，属于被动运输，因此选 C。",
    "steps": [
      "先区分跨膜运输与胞吞：摄入病原体属于胞吞。",
      "固醇类激素和甘油可通过简单扩散进入细胞；是否借助蛋白不是判断主动运输的唯一依据。",
      "神经细胞兴奋时 Na⁺ 顺电化学梯度经通道进入，属于被动运输，因此选 C。"
    ],
    "hint": "先区分跨膜运输与胞吞：摄入病原体属于胞吞。",
    "source": {
      "year": 2018,
      "paper": "新课标Ⅱ卷",
      "number": 2,
      "datasetIndex": 84,
      "url": "https://github.com/OpenLMLab/GAOKAO-Bench/blob/main/Data/Objective_Questions/2010-2022_Biology_MCQs.json",
      "publisher": "OpenLMLab · GAOKAO-Bench",
      "license": "Apache-2.0",
      "note": "公开数据集转录版；合并断行、拆分选项；表格按数据重排。解析由本站编写。"
    }
  },
  {
    "id": "gaokao-122",
    "topic": "osmosis",
    "text": "取某植物的成熟叶片，用打孔器获取叶圆片，等分成两份，分别放入浓度（单位为g/mL）相同的甲糖溶液和乙糖溶液中，得到甲、乙两个实验组（甲糖的相对分子质量约为乙糖的2倍）。水分交换达到平衡时，检测甲、乙两组的溶液浓度，发现甲组中甲糖溶液浓度升高。在此期间叶细胞和溶液之间没有溶质交换。据此判断下列说法错误的是（）",
    "options": [
      "甲组叶细胞吸收了甲糖溶液中的水使甲糖溶液浓度升高",
      "若测得乙糖溶液浓度不变，则乙组叶细胞的净吸水量为零",
      "若测得乙糖溶液浓度降低，则乙组叶肉细胞可能发生了质壁分离",
      "若测得乙糖溶液浓度升高，则叶细胞的净吸水量乙组大于甲组"
    ],
    "answer": 3,
    "difficulty": 3,
    "explain": "质量浓度相同不代表粒子浓度相同：甲糖相对分子质量约为乙糖两倍，因此甲糖物质的量浓度较低。 溶质不交换时，外液浓度升高说明水流入叶细胞，浓度降低说明细胞失水。 两组均吸水时，甲组外液粒子浓度更低，净吸水量应较大。D 把两者关系倒置，故错误。",
    "steps": [
      "质量浓度相同不代表粒子浓度相同：甲糖相对分子质量约为乙糖两倍，因此甲糖物质的量浓度较低。",
      "溶质不交换时，外液浓度升高说明水流入叶细胞，浓度降低说明细胞失水。",
      "两组均吸水时，甲组外液粒子浓度更低，净吸水量应较大。D 把两者关系倒置，故错误。"
    ],
    "hint": "质量浓度相同不代表粒子浓度相同：甲糖相对分子质量约为乙糖两倍，因此甲糖物质的量浓度较低。",
    "source": {
      "year": 2020,
      "paper": "新课标Ⅱ卷",
      "number": 5,
      "datasetIndex": 122,
      "url": "https://github.com/OpenLMLab/GAOKAO-Bench/blob/main/Data/Objective_Questions/2010-2022_Biology_MCQs.json",
      "publisher": "OpenLMLab · GAOKAO-Bench",
      "license": "Apache-2.0",
      "note": "公开数据集转录版；合并断行、拆分选项；表格按数据重排。解析由本站编写。"
    }
  },
  {
    "id": "gaokao-146",
    "topic": "osmosis",
    "text": "植物成熟叶肉细胞的细胞液浓度可以不同。现将a、b、c三种细胞液浓度不同的某种植物成熟叶肉细胞，分别放入三个装有相同浓度蔗糖溶液的试管中，当水分交换达到平衡时观察到：①细胞a未发生变化；②细胞b体积增大；③细胞c发生了质壁分离。若在水分交换期间细胞与蔗糖溶液没有溶质的交换，下列关于这一实验的叙述，不合理的是（）",
    "options": [
      "水分交换前，细胞b的细胞液浓度大于外界蔗糖溶液的浓度",
      "水分交换前，细胞液浓度大小关系为细胞b>细胞a>细胞c",
      "水分交换平衡时，细胞c的细胞液浓度大于细胞a的细胞液浓度",
      "水分交换平衡时，细胞c的细胞液浓度等于外界蔗糖溶液的浓度"
    ],
    "answer": 2,
    "difficulty": 3,
    "explain": "先根据初始变化判断：b 吸水说明细胞液浓度较高；c 失水说明较低；a 无净变化居中。 按本题高中渗透模型，质壁分离的 c 在平衡时细胞液浓度与外液相等，a 也与外液相当。 因此平衡时不能认为 c 的细胞液浓度大于 a；不合理项是 C。注意不要把变化前和变化后混为一谈。",
    "steps": [
      "先根据初始变化判断：b 吸水说明细胞液浓度较高；c 失水说明较低；a 无净变化居中。",
      "按本题高中渗透模型，质壁分离的 c 在平衡时细胞液浓度与外液相等，a 也与外液相当。",
      "因此平衡时不能认为 c 的细胞液浓度大于 a；不合理项是 C。注意不要把变化前和变化后混为一谈。"
    ],
    "hint": "先根据初始变化判断：b 吸水说明细胞液浓度较高；c 失水说明较低；a 无净变化居中。",
    "source": {
      "year": 2022,
      "paper": "全国甲卷",
      "number": 2,
      "datasetIndex": 146,
      "url": "https://github.com/OpenLMLab/GAOKAO-Bench/blob/main/Data/Objective_Questions/2010-2022_Biology_MCQs.json",
      "publisher": "OpenLMLab · GAOKAO-Bench",
      "license": "Apache-2.0",
      "note": "公开数据集转录版；合并断行、拆分选项；表格按数据重排。解析由本站编写。"
    }
  },
  {
    "id": "gaokao-49",
    "topic": "enzyme",
    "text": "若除酶外所有试剂均已预保温，则在测定酶活力的试验中，下列操作顺序合理的是（ ）",
    "options": [
      "加入酶 →加入底物 →加入缓冲液 →保温并计时 →一段时间后检测产物的量",
      "加入底物 →加入酶 →计时 →加入缓冲液 →保温 →一段时间后检测产物的量",
      "加入缓冲液 →加入底物 →加入酶 →保温并计时 →一段时间后检测产物的量",
      "加入底物 →计时 →加入酶 →加入缓冲液 →保温并计时 →一段时间后检测产物的量"
    ],
    "answer": 2,
    "difficulty": 3,
    "explain": "计时开始前，应先把 pH、温度和底物等条件准备好。 酶与底物接触就可能启动反应，过早加酶会使未计时反应产生误差。 先缓冲液，再底物，最后加酶并保温计时，随后测定产物，选 C。",
    "steps": [
      "计时开始前，应先把 pH、温度和底物等条件准备好。",
      "酶与底物接触就可能启动反应，过早加酶会使未计时反应产生误差。",
      "先缓冲液，再底物，最后加酶并保温计时，随后测定产物，选 C。"
    ],
    "hint": "计时开始前，应先把 pH、温度和底物等条件准备好。",
    "source": {
      "year": 2016,
      "paper": "新课标Ⅰ卷",
      "number": 3,
      "datasetIndex": 49,
      "url": "https://github.com/OpenLMLab/GAOKAO-Bench/blob/main/Data/Objective_Questions/2010-2022_Biology_MCQs.json",
      "publisher": "OpenLMLab · GAOKAO-Bench",
      "license": "Apache-2.0",
      "note": "公开数据集转录版；合并断行、拆分选项；表格按数据重排。解析由本站编写。"
    }
  },
  {
    "id": "gaokao-142",
    "topic": "enzyme",
    "text": "某种酶P由RNA和蛋白质组成，可催化底物转化为相应的产物。为探究该酶不同组分催化反应所需的条件。某同学进行了下列5组实验（表中“+”表示有，“－”表示无）。根据实验结果可以得出的结论是（）",
    "options": [
      "酶P必须在高浓度Mg2+条件下才具有催化活性",
      "蛋白质组分的催化活性随Mg2+浓度升高而升高",
      "在高浓度Mg2+条件下RNA组分具有催化活性",
      "在高浓度Mg2+条件下蛋白质组分具有催化活性"
    ],
    "answer": 2,
    "difficulty": 3,
    "explain": "先看第①组：完整酶在低 Mg²⁺ 下已有产物，因此 A 的“必须高浓度”不成立。 比较②与④，仅改变 Mg²⁺ 浓度；RNA 单独在高 Mg²⁺ 下形成产物，支持 C。 比较③与⑤，蛋白质单独在两种条件下都未形成产物；不能据此宣称升高 Mg²⁺ 提高其活性。选 C，结论限于实验条件。",
    "steps": [
      "先看第①组：完整酶在低 Mg²⁺ 下已有产物，因此 A 的“必须高浓度”不成立。",
      "比较②与④，仅改变 Mg²⁺ 浓度；RNA 单独在高 Mg²⁺ 下形成产物，支持 C。",
      "比较③与⑤，蛋白质单独在两种条件下都未形成产物；不能据此宣称升高 Mg²⁺ 提高其活性。选 C，结论限于实验条件。"
    ],
    "hint": "先看第①组：完整酶在低 Mg²⁺ 下已有产物，因此 A 的“必须高浓度”不成立。",
    "table": {
      "headers": [
        "实验组",
        "①",
        "②",
        "③",
        "④",
        "⑤"
      ],
      "rows": [
        [
          "底物",
          "+",
          "+",
          "+",
          "+",
          "+"
        ],
        [
          "RNA 组分",
          "+",
          "+",
          "－",
          "+",
          "－"
        ],
        [
          "蛋白质组分",
          "+",
          "－",
          "+",
          "－",
          "+"
        ],
        [
          "低浓度 Mg²⁺",
          "+",
          "+",
          "+",
          "－",
          "－"
        ],
        [
          "高浓度 Mg²⁺",
          "－",
          "－",
          "－",
          "+",
          "+"
        ],
        [
          "产物",
          "+",
          "－",
          "－",
          "+",
          "－"
        ]
      ]
    },
    "source": {
      "year": 2022,
      "paper": "全国乙卷",
      "number": 4,
      "datasetIndex": 142,
      "url": "https://github.com/OpenLMLab/GAOKAO-Bench/blob/main/Data/Objective_Questions/2010-2022_Biology_MCQs.json",
      "publisher": "OpenLMLab · GAOKAO-Bench",
      "license": "Apache-2.0",
      "note": "公开数据集转录版；合并断行、拆分选项；表格按数据重排。解析由本站编写。"
    }
  },
  {
    "id": "gaokao-74",
    "topic": "photo",
    "text": "植物光合作用的作用光谱是通过测量光合作用对不同波长光的反应（如O2的释放）来绘制的。下列叙述错误的是（）",
    "options": [
      "类胡萝卜素在红光区吸收的光能可用于光反应中ATP的合成",
      "叶绿素的吸收光谱可通过测量其对不同波长光的吸收值来绘制",
      "光合作用的作用光谱也可用CO2的吸收速率随光波长的变化来表示",
      "叶片在640～660nm波长光下释放O2是由叶绿素参与光合作用引起的"
    ],
    "answer": 0,
    "difficulty": 3,
    "explain": "区分吸收光谱（吸收多少光）与作用光谱（光合作用效果）。 叶绿素主要吸收红光和蓝紫光；类胡萝卜素主要吸收蓝紫光。 A 把红光吸收归给类胡萝卜素，因此错误。其余说法可用叶绿素吸光及气体交换解释。",
    "steps": [
      "区分吸收光谱（吸收多少光）与作用光谱（光合作用效果）。",
      "叶绿素主要吸收红光和蓝紫光；类胡萝卜素主要吸收蓝紫光。",
      "A 把红光吸收归给类胡萝卜素，因此错误。其余说法可用叶绿素吸光及气体交换解释。"
    ],
    "hint": "区分吸收光谱（吸收多少光）与作用光谱（光合作用效果）。",
    "source": {
      "year": 2017,
      "paper": "新课标Ⅲ卷",
      "number": 3,
      "datasetIndex": 74,
      "url": "https://github.com/OpenLMLab/GAOKAO-Bench/blob/main/Data/Objective_Questions/2010-2022_Biology_MCQs.json",
      "publisher": "OpenLMLab · GAOKAO-Bench",
      "license": "Apache-2.0",
      "note": "公开数据集转录版；合并断行、拆分选项；表格按数据重排。解析由本站编写。"
    }
  },
  {
    "id": "gaokao-140",
    "topic": "photo",
    "text": "某同学将一株生长正常的小麦置于密闭容器中，在适宜且恒定的温度和光照条件下培养，发现容器内CO2含量初期逐渐降低，之后保持相对稳定。关于这一实验现象，下列解释合理的是（）",
    "options": [
      "初期光合速率逐渐升高，之后光合速率等于呼吸速率",
      "初期光合速率和呼吸速率均降低，之后呼吸速率保持稳定",
      "初期呼吸速率大于光合速率，之后呼吸速率等于光合速率",
      "初期光合速率大于呼吸速率，之后光合速率等于呼吸速率"
    ],
    "answer": 3,
    "difficulty": 3,
    "explain": "密闭容器 CO₂ 降低说明净消耗：光合作用消耗 CO₂ 多于呼吸释放。 之后 CO₂ 稳定表示净交换约为零，不能解释成两种过程都停止。 在本题条件下，前期光合速率大于呼吸速率，后来二者相等，选择 D。不能仅据 CO₂ 变化断言呼吸速率如何变化。",
    "steps": [
      "密闭容器 CO₂ 降低说明净消耗：光合作用消耗 CO₂ 多于呼吸释放。",
      "之后 CO₂ 稳定表示净交换约为零，不能解释成两种过程都停止。",
      "在本题条件下，前期光合速率大于呼吸速率，后来二者相等，选择 D。不能仅据 CO₂ 变化断言呼吸速率如何变化。"
    ],
    "hint": "密闭容器 CO₂ 降低说明净消耗：光合作用消耗 CO₂ 多于呼吸释放。",
    "source": {
      "year": 2022,
      "paper": "全国乙卷",
      "number": 2,
      "datasetIndex": 140,
      "url": "https://github.com/OpenLMLab/GAOKAO-Bench/blob/main/Data/Objective_Questions/2010-2022_Biology_MCQs.json",
      "publisher": "OpenLMLab · GAOKAO-Bench",
      "license": "Apache-2.0",
      "note": "公开数据集转录版；合并断行、拆分选项；表格按数据重排。解析由本站编写。"
    }
  },
  {
    "id": "gaokao-113",
    "topic": "respiration",
    "text": "种子贮藏中需要控制呼吸作用以减少有机物的消耗。若作物种子呼吸作用所利用的物质是淀粉分解产生的葡萄糖，下列关于种子呼吸作用的叙述，错误的是（）",
    "options": [
      "若产生的CO2与乙醇的分子数相等，则细胞只进行无氧呼吸",
      "若细胞只进行有氧呼吸，则吸收O2的分子数与释放CO2的相等",
      "若细胞只进行无氧呼吸且产物是乳酸，则无O2吸收也无CO2释放",
      "若细胞同时进行有氧和无氧呼吸，则吸收O2的分子数比释放CO2的多"
    ],
    "answer": 3,
    "difficulty": 3,
    "explain": "只考虑葡萄糖：有氧呼吸的 O₂ 消耗量与 CO₂ 释放量相等。 酒精发酵释放 CO₂ 但不耗 O₂；乳酸发酵两种气体都不产生净交换。 两种途径同时存在时，O₂ 消耗不可能比 CO₂ 释放更多。D 错误，关键是先写清各途径的气体收支。",
    "steps": [
      "只考虑葡萄糖：有氧呼吸的 O₂ 消耗量与 CO₂ 释放量相等。",
      "酒精发酵释放 CO₂ 但不耗 O₂；乳酸发酵两种气体都不产生净交换。",
      "两种途径同时存在时，O₂ 消耗不可能比 CO₂ 释放更多。D 错误，关键是先写清各途径的气体收支。"
    ],
    "hint": "只考虑葡萄糖：有氧呼吸的 O₂ 消耗量与 CO₂ 释放量相等。",
    "source": {
      "year": 2020,
      "paper": "新课标Ⅰ卷",
      "number": 2,
      "datasetIndex": 113,
      "url": "https://github.com/OpenLMLab/GAOKAO-Bench/blob/main/Data/Objective_Questions/2010-2022_Biology_MCQs.json",
      "publisher": "OpenLMLab · GAOKAO-Bench",
      "license": "Apache-2.0",
      "note": "公开数据集转录版；合并断行、拆分选项；表格按数据重排。解析由本站编写。"
    }
  },
  {
    "id": "gaokao-148",
    "topic": "respiration",
    "text": "线粒体是细胞进行有氧呼吸的主要场所。研究发现，经常运动的人肌细胞中线粒体数量通常比缺乏锻炼的人多。下列与线粒体有关的叙述，错误的是（）",
    "options": [
      "有氧呼吸时细胞质基质和线粒体中都能产生ATP",
      "线粒体内膜上的酶可以参与[H]和氧反应形成水的过程",
      "线粒体中的丙酮酸分解成CO2和[H]的过程需要O2的直接参与",
      "线粒体中的DNA能够通过转录和翻译控制某些蛋白质的合成"
    ],
    "answer": 2,
    "difficulty": 3,
    "explain": "把有氧呼吸拆成细胞质基质、线粒体基质与内膜上的过程。 O₂ 作为最终电子受体，参与内膜电子传递链；丙酮酸分解不直接使用 O₂。 因此 C 把“有氧呼吸整体需要氧”误写为“每一步直接消耗氧”。其他选项符合相应结构的功能。",
    "steps": [
      "把有氧呼吸拆成细胞质基质、线粒体基质与内膜上的过程。",
      "O₂ 作为最终电子受体，参与内膜电子传递链；丙酮酸分解不直接使用 O₂。",
      "因此 C 把“有氧呼吸整体需要氧”误写为“每一步直接消耗氧”。其他选项符合相应结构的功能。"
    ],
    "hint": "把有氧呼吸拆成细胞质基质、线粒体基质与内膜上的过程。",
    "source": {
      "year": 2022,
      "paper": "全国甲卷",
      "number": 4,
      "datasetIndex": 148,
      "url": "https://github.com/OpenLMLab/GAOKAO-Bench/blob/main/Data/Objective_Questions/2010-2022_Biology_MCQs.json",
      "publisher": "OpenLMLab · GAOKAO-Bench",
      "license": "Apache-2.0",
      "note": "公开数据集转录版；合并断行、拆分选项；表格按数据重排。解析由本站编写。"
    }
  },
  {
    "id": "gaokao-72",
    "topic": "genetics",
    "text": "下列关于真核细胞中转录的叙述，错误的是（）",
    "options": [
      "tRNA、rRNA和mRNA都从DNA转录而来",
      "同一细胞中两种RNA的合成有可能同时发生",
      "细胞中的RNA合成过程不会在细胞核外发生",
      "转录出的RNA链与模板链的相应区域碱基互补"
    ],
    "answer": 2,
    "difficulty": 3,
    "explain": "真核细胞不仅细胞核有 DNA，线粒体、叶绿体也有自己的 DNA。 转录形成不同类型 RNA；它们可在不同基因上同时产生，并与各自模板互补。 线粒体和叶绿体中也能转录，因此“不会在细胞核外发生”的 C 错误。",
    "steps": [
      "真核细胞不仅细胞核有 DNA，线粒体、叶绿体也有自己的 DNA。",
      "转录形成不同类型 RNA；它们可在不同基因上同时产生，并与各自模板互补。",
      "线粒体和叶绿体中也能转录，因此“不会在细胞核外发生”的 C 错误。"
    ],
    "hint": "真核细胞不仅细胞核有 DNA，线粒体、叶绿体也有自己的 DNA。",
    "source": {
      "year": 2017,
      "paper": "新课标Ⅲ卷",
      "number": 1,
      "datasetIndex": 72,
      "url": "https://github.com/OpenLMLab/GAOKAO-Bench/blob/main/Data/Objective_Questions/2010-2022_Biology_MCQs.json",
      "publisher": "OpenLMLab · GAOKAO-Bench",
      "license": "Apache-2.0",
      "note": "公开数据集转录版；合并断行、拆分选项；表格按数据重排。解析由本站编写。"
    }
  },
  {
    "id": "gaokao-124",
    "topic": "genetics",
    "text": "关于真核生物的遗传信息及其传递的叙述，错误的是（）",
    "options": [
      "遗传信息可以从DNA流向RNA，也可以从RNA流向蛋白质",
      "细胞中以DNA的一条单链为模板转录出的RNA均可编码多肽",
      "细胞中DNA分子的碱基总数与所有基因的碱基数之和不相等",
      "染色体DNA分子中的一条单链可以转录出不同的RNA分子"
    ],
    "answer": 1,
    "difficulty": 3,
    "explain": "转录产物不只 mRNA，还有 rRNA、tRNA 等。 用于翻译编码多肽的是 mRNA；其他 RNA 也有功能，但不能据此说它们都编码多肽。 B 的“均可”过度概括，因此错误。DNA 还含有基因间区域，同一长 DNA 链可含多个转录单位。",
    "steps": [
      "转录产物不只 mRNA，还有 rRNA、tRNA 等。",
      "用于翻译编码多肽的是 mRNA；其他 RNA 也有功能，但不能据此说它们都编码多肽。",
      "B 的“均可”过度概括，因此错误。DNA 还含有基因间区域，同一长 DNA 链可含多个转录单位。"
    ],
    "hint": "转录产物不只 mRNA，还有 rRNA、tRNA 等。",
    "source": {
      "year": 2020,
      "paper": "新课标Ⅲ卷",
      "number": 1,
      "datasetIndex": 124,
      "url": "https://github.com/OpenLMLab/GAOKAO-Bench/blob/main/Data/Objective_Questions/2010-2022_Biology_MCQs.json",
      "publisher": "OpenLMLab · GAOKAO-Bench",
      "license": "Apache-2.0",
      "note": "公开数据集转录版；合并断行、拆分选项；表格按数据重排。解析由本站编写。"
    }
  },
  {
    "id": "gaokao-51",
    "topic": "ecology",
    "text": "在漫长的历史时期内，我们的祖先通过自身的生产和生活实践，积累了对生态方面的感性认识和经验，并形成了一些生态学思想，如：自然与人和谐统一的思想 ．根据这一思想和生态学知识 ，下列说法错误的是 （ ）",
    "options": [
      "生态系统的物质循环和能量流动有其自身的运行规律",
      "若人与自然和谐统一，生产者固定的能量便可反复利用",
      "“退耕还林、还草 ”是体现自然与人和谐统一思想的实例",
      "人类应以保持生态系统相对稳定为原则，确定自己的消耗标准"
    ],
    "answer": 1,
    "difficulty": 3,
    "explain": "分别追踪“物质”和“能量”，不要用循环一词统称两者。 物质可在生物与环境之间循环；能量在传递中逐级散失为热，需要外部持续输入。 人与自然和谐不能使已散失的能量循环利用，因此错误项是 B。",
    "steps": [
      "分别追踪“物质”和“能量”，不要用循环一词统称两者。",
      "物质可在生物与环境之间循环；能量在传递中逐级散失为热，需要外部持续输入。",
      "人与自然和谐不能使已散失的能量循环利用，因此错误项是 B。"
    ],
    "hint": "分别追踪“物质”和“能量”，不要用循环一词统称两者。",
    "source": {
      "year": 2016,
      "paper": "新课标Ⅰ卷",
      "number": 5,
      "datasetIndex": 51,
      "url": "https://github.com/OpenLMLab/GAOKAO-Bench/blob/main/Data/Objective_Questions/2010-2022_Biology_MCQs.json",
      "publisher": "OpenLMLab · GAOKAO-Bench",
      "license": "Apache-2.0",
      "note": "公开数据集转录版；合并断行、拆分选项；表格按数据重排。解析由本站编写。"
    }
  },
  {
    "id": "gaokao-143",
    "topic": "ecology",
    "text": "分层现象是群落研究的重要内容。下列关于森林群落分层现象的叙述，正确的是（）①森林群落的分层现象提高了生物对环境资源的利用能力②森林植物从上到下可分为不同层次，最上层为灌木层③垂直方向上森林中植物分层现象与对光的利用有关④森林群落中动物的分层现象与食物有关⑤森林群落中植物的分层现象是自然选择的结果⑥群落中植物垂直分层现象的形成是由动物种类决定的",
    "options": [
      "①③④⑤",
      "②④⑤⑥",
      "①②③⑥",
      "③④⑤⑥"
    ],
    "answer": 0,
    "difficulty": 3,
    "explain": "逐条判断比直接比较长选项更稳妥：最上层通常是乔木层，②错误。 植物分层与光资源利用有关；动物分层与食物和栖息空间有关；分层可提高资源利用。 ①③④⑤成立，⑥将植物分层归因于动物种类不合理，因此选 A。",
    "steps": [
      "逐条判断比直接比较长选项更稳妥：最上层通常是乔木层，②错误。",
      "植物分层与光资源利用有关；动物分层与食物和栖息空间有关；分层可提高资源利用。",
      "①③④⑤成立，⑥将植物分层归因于动物种类不合理，因此选 A。"
    ],
    "hint": "逐条判断比直接比较长选项更稳妥：最上层通常是乔木层，②错误。",
    "source": {
      "year": 2022,
      "paper": "全国乙卷",
      "number": 5,
      "datasetIndex": 143,
      "url": "https://github.com/OpenLMLab/GAOKAO-Bench/blob/main/Data/Objective_Questions/2010-2022_Biology_MCQs.json",
      "publisher": "OpenLMLab · GAOKAO-Bench",
      "license": "Apache-2.0",
      "note": "公开数据集转录版；合并断行、拆分选项；表格按数据重排。解析由本站编写。"
    }
  }
];
